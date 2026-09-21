import axios from "axios"

let handler = async (m, { conn, args, reply }) => {
  let link = args[0]
  if (!link) return reply("contoh:\n.tiktok https://vt.tiktok.com/ZSunn22oE/")

  const fix = (p) => p && (p.startsWith("http") ? p : "https://www.tikwm.com" + p)

  const getBuffer = async (url) => {
    let { data } = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "user-agent": "Mozilla/5.0"
      },
      timeout: 60000
    })
    return Buffer.from(data)
  }

  try {
    let { data } = await axios.post(
      "https://www.tikwm.com/api/",
      new URLSearchParams({
        url: link,
        hd: 1
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "user-agent": "Mozilla/5.0"
        },
        timeout: 60000
      }
    )

    let res = data?.data
    if (!res) return reply("gagal mengambil media tiktok")

    if (res.images && res.images.length > 0) {
      let caption = [
        "*T I K T O K - D O W N L O A D*",
        "",
        `*Type:* Slide`,
        `*Title:* ${res.title || "-"}`
      ].join("\n")

      for (let i = 0; i < res.images.length; i++) {
        let img = await getBuffer(fix(res.images[i]))
        await conn.sendMessage(
          m.chat,
          {
            image: img,
            caption: i === 0 ? caption : ""
          },
          { quoted: m }
        )
      }

      let audio = fix(res.music)
      if (audio) {
        let aud = await getBuffer(audio)
        await conn.sendMessage(
          m.chat,
          {
            audio: aud,
            mimetype: "audio/mpeg",
            ptt: false
          },
          { quoted: m }
        )
      }

      return
    }

    let video = fix(res.play)
    let audio = fix(res.music)
    if (!video) return reply("video tidak ditemukan")

    let caption = [
      "*T I K T O K - D O W N L O A D*",
      "",
      `*Type:* Video`,
      `*Title:* ${res.title || "-"}`
    ].join("\n")

    let vid = await getBuffer(video)

    await conn.sendMessage(
      m.chat,
      {
        video: vid,
        mimetype: "video/mp4",
        caption
      },
      { quoted: m }
    )

    if (audio) {
      let aud = await getBuffer(audio)
      await conn.sendMessage(
        m.chat,
        {
          audio: aud,
          mimetype: "audio/mpeg",
          ptt: false
        },
        { quoted: m }
      )
    }
  } catch (e) {
    reply(`gagal scrape tiktok\n${e.message}`)
  }
}

handler.help = ["tiktok <url>"]
handler.tags = ["downloader"]
handler.command = /^(tiktok|tt)$/i
handler.limit = true
handler.daftar = true

export default handler