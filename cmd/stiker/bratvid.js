import fetch from "node-fetch"

let handler = async (m, { conn, args, reply }) => {
  const text = args.join(" ")

  if (!text) {
    return reply("contoh:\n.bratvid hallo")
  }

  const url = `https://api.deline.web.id/maker/bratvid?text=${encodeURIComponent(text)}`

  const res = await fetch(url).catch(() => null)

  if (!res || !res.ok) {
    return reply("gagal mengambil brat vid")
  }

  const buffer = await res.buffer().catch(() => null)
  if (!buffer) return reply("gagal membuat brat vid")

  const sticker = global.packname || global.author
    ? await writeExifVid(buffer, {
        packname: global.packname,
        author: global.author
      })
    : await videoToWebp(buffer)

  await conn.sendMessage(m.chat, {
    sticker
  }, { quoted: m })
}

handler.help = ["bratvid <teks>"]
handler.tags = ["stiker"]
handler.command = /^(bratvid)$/i

export default handler