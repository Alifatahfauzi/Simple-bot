let handler = async (m, { conn, args }) => {
  let url = args[0]

  if (!url) return m.reply("Masukkan link CapCut.\nContoh: .capcut https://www.capcut.com/tv2/ZSmm1R7Sd/")

  try {
    let api = `https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(url)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json?.status || !json?.data?.originalVideoUrl) {
      return m.reply("Gagal mengambil video CapCut.")
    }

    let data = json.data
    let caption = `
*[ CAPCUT DOWNLOADER ]*

*Title:* ${data.title?.trim() || "-"}
*Author:* ${data.authorName || "-"}
`.trim()

    await conn.sendMessage(m.chat, {
      video: { url: data.originalVideoUrl },
      caption
    }, { quoted: m })

  } catch (e) {
    m.reply("Terjadi error saat mengambil video CapCut.")
  }
}

handler.command = /^(capcut)$/i
handler.tags = ["downloader"]
handler.help = ["capcut <url>"]
handler.limit = true
handler.daftar = true

export default handler