/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import Uploader from "../../library/upload.js"

let handler = async (m, { conn, reply }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""
  if (!mime) return reply("Reply atau kirim media yang ingin diubah ke URL!")

  await reply("_Sedang proses upload..._")

  try {
    let buffer = await q.download()
    if (!buffer) return reply("Gagal mengunduh media dari WhatsApp.")
    const [uguu, nekohime] = await Promise.all([
      Uploader.uguu(buffer),
      Uploader.nekohime(buffer)
    ])

    let teks = `*MEDIA UPLOADER*\n\n`
    teks += `┌  ◦  *Uguu:* ${uguu || "Gagal"}\n`
    teks += `└  ◦  *Nekohime:* ${nekohime || "Gagal"}`

    await reply(teks)
  } catch (e) {
    console.error(e)
    reply("Terjadi kesalahan saat memproses media.")
  }
}

handler.help = ["tourl"]
handler.tags = ["tools"]
handler.command = /^(tourl|upload)$/i

export default handler