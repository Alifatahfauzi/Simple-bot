import sharp from "sharp"
import { imageToWebp, writeExifImg } from "../../library/exif.js"

let handler = async (m, { conn, reply }) => {
  try {
    const q = m.quoted || m
    const mime = q?.mimetype || q?.msg?.mimetype || ""

    if (!/image/.test(mime)) {
      return reply("Kirim/reply gambar dengan caption:\n.sblur")
    }

    const buffer = await q.download()
    if (!buffer) return reply("> Gagal download gambar")

    const output = await sharp(buffer)
      .resize(512, 512, { fit: "cover" })
      .blur(8)
      .png()
      .toBuffer()

    const sticker = global.packname || global.author
      ? await writeExifImg(output, {
          packname: global.packname,
          author: global.author
        })
      : await imageToWebp(output)

    await conn.sendMessage(m.chat, { sticker }, { quoted: m })

  } catch {
    return reply("> Gagal membuat sticker blur")
  }
}

handler.command = /^(sblur)$/i
handler.tags = ["stiker"]
handler.help = ["sblur"]
handler.limit = true
handler.daftar = true

export default handler