import sharp from "sharp"

let handler = async (m, { conn, q, reply }) => {
  try {
    if (!q) {
      return reply("Contoh:\n.stext halo dunia")
    }

    const text = q.slice(0, 50)

    const svg = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" rx="40" fill="white"/>
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-size="48"
          font-weight="bold"
          fill="#111"
          font-family="Arial, sans-serif"
        >
          ${text}
        </text>
      </svg>
    `

    const output = await sharp(Buffer.from(svg))
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
    return reply("> Gagal membuat sticker text")
  }
}

handler.command = /^(stext)$/i
handler.tags = ["stiker"]
handler.help = ["stext <teks>"]
handler.limit = true
handler.daftar = true

export default handler