/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fetch from "node-fetch"
import Uploader from "../../library/upload.js"

let handler = async (m, { conn, reply }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""

  if (!/image\/(jpe?g|png|webp)/i.test(mime)) {
    return reply("reply / kirim gambar dengan caption .tokacamata")
  }
  
  await react(m, "⏳")

  let buffer = await q.download?.().catch(() => null)
  if (!buffer) return reply("gagal mengambil gambar")

  let imageUrl =
    await Uploader.uguu(buffer).catch(() => null) ||
    await Uploader.nekohime(buffer).catch(() => null)

  if (!imageUrl) return reply("gagal upload gambar")

  let api = `https://api-faa.my.id/faa/tokacamata?url=${encodeURIComponent(imageUrl)}`
  let res = await fetch(api).catch(() => null)
  if (!res || !res.ok) return reply("gagal mengambil data api")

  let img = await res.buffer().catch(() => null)
  if (!img) return reply("gagal memproses gambar")

  await conn.sendMessage(
    m.chat,
    {
      image: img,
      caption: "*T O K A C A M A T A*"
    },
    { quoted: m }
  )
}

handler.help = ["tokacamata"]
handler.tags = ["toimage"]
handler.command = /^(tokacamata)$/i
handler.daftar = true
handler.limit = true

export default handler