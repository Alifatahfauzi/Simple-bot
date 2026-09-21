import Uploader from "../../library/upload.js"
import { getBuffer } from "../../library/utils.js"
import { imageToWebp, writeExifImg } from "../../library/exif.js"

let handler = async (m, { conn, q, reply }) => {
  try {
    const quoted = m.quoted || m
    const mime = quoted?.mimetype || quoted?.msg?.mimetype || ""

    if (!/image/.test(mime)) {
      return reply("Kirim/reply gambar dengan caption:\n.smeme teks atas|teks bawah")
    }

    if (!q) {
      return reply("Contoh:\n.smeme atas|bawah")
    }

    const [atas = "", bawah = ""] = q.split("|").map(v => v.trim())

    const buffer = await quoted.download()
    if (!buffer) return reply("Gagal download gambar.")

    const url =
      await Uploader.uguu(buffer) ||
      await Uploader.nekohime(buffer)

    if (!url) return reply("Gagal upload gambar.")

    const top = encodeURIComponent(atas || "_")
    const bottom = encodeURIComponent(bawah || "_")
    const bg = encodeURIComponent(url)

    const memeUrl = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${bg}`

    const memeBuffer = await getBuffer(memeUrl)

    const sticker = global.packname || global.author
      ? await writeExifImg(memeBuffer, {
          packname: global.packname,
          author: global.author
        })
      : await imageToWebp(memeBuffer)

    await conn.sendMessage(m.chat, { sticker }, { quoted: m })

  } catch {
    return reply("Gagal membuat smeme.")
  }
}

handler.command = /^smeme$/i
handler.tags = ["stiker"]
handler.help = ["smeme teks atas|teks bawah"]
handler.limit = true
handler.daftar = true

export default handler