import sharp from "sharp"

let handler = async (m, { conn, reply }) => {
  try {
    const q = m.quoted || m
    const mime = q?.mimetype || q?.msg?.mimetype || ""

    if (!/image|webp/.test(mime)) {
      return reply("Kirim/reply gambar atau stiker dengan caption:\n.sgray")
    }

    const buffer = await q.download()
    if (!buffer) return reply("> Gagal download media")

    const output = await sharp(buffer)
      .resize(512, 512, {
        fit: "contain",
        background: {
          r: 0,
          g: 0,
          b: 0,
          alpha: 0
        }
      })
      .grayscale()
      .png()
      .toBuffer()

    const sticker = global.packname || global.author
      ? await writeExifImg(output, {
          packname: global.packname,
          author: global.author
        })
      : await imageToWebp(output)

    await conn.sendMessage(m.chat, {
      sticker
    }, { quoted: m })

  } catch {
    return reply("> Gagal membuat sticker grayscale")
  }
}

handler.command = /^(sgray)$/i
handler.tags = ["stiker"]
handler.help = ["sgray"]
handler.limit = true
handler.daftar = true

export default handler