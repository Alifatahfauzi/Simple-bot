import { imageToWebp, writeExifImg } from "../../library/exif.js"
import { getBuffer } from "../../library/utils.js"

let handler = async (m, { conn, args, reply }) => {
  try {
    const emoji1 = args[0]
    const emoji2 = args[1]

    if (!emoji1 || !emoji2) {
      return reply("Contoh:\n.emojimix 😎 😂")
    }

    const url = `https://emojik.vercel.app/s/${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}?size=512`

    const buffer = await getBuffer(url)
    if (!buffer) return reply("> Gagal ambil gambar")

    const sticker = global.packname || global.author
      ? await writeExifImg(buffer, {
          packname: global.packname,
          author: global.author
        })
      : await imageToWebp(buffer)

    await conn.sendMessage(m.chat, { sticker }, { quoted: m })

  } catch {
    return reply("> Gagal membuat sticker emoji mix")
  }
}

handler.command = /^(emojimix|emix)$/i
handler.tags = ["stiker"]
handler.help = ["emojimix emoji1 emoji2"]
handler.limit = true
handler.daftar = true

export default handler