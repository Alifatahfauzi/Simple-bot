import sharp from "sharp"

let handler = async (m, { conn, reply }) => {
  try {
    const q = m.quoted || m
    const mime = q?.mimetype || q?.msg?.mimetype || ""

    if (!/image/.test(mime)) {
      return reply("Kirim/reply gambar dengan caption:\n.circle")
    }

    const buffer = await q.download()
    if (!buffer) return reply("> Gagal download gambar")

    const size = 512

    const circle = Buffer.from(`
      <svg width="${size}" height="${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
      </svg>
    `)

    const output = await sharp(buffer)
      .resize(size, size, { fit: "cover" })
      .composite([{ input: circle, blend: "dest-in" }])
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
    return reply("> Gagal membuat sticker circle")
  }
}

handler.command = /^(circle)$/i
handler.tags = ["stiker"]
handler.help = ["circle"]
handler.limit = true
handler.daftar = true

export default handler