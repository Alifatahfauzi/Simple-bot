let handler = async (m, { conn, q, reply }) => {
  try {
    const qmsg = m.quoted || m
    const mime = qmsg?.mimetype || qmsg?.msg?.mimetype || ""

    if (!/webp/.test(mime)) {
      return reply("Reply stiker dengan caption:\n.stickerwm packname|author")
    }

    if (!q) {
      return reply("Contoh:\n.stickerwm always fauzi|fauzialifatah")
    }

    const [packname = "", author = ""] = q
      .split("|")
      .map(v => v.trim())

    if (!packname) {
      return reply("> Packname tidak boleh kosong")
    }

    const buffer = await qmsg.download()
    if (!buffer) return reply("> Gagal download stiker")

    const sticker = await writeExifImg(buffer, {
      packname,
      author: author || global.author
    })

    await conn.sendMessage(m.chat, {
      sticker
    }, { quoted: m })

  } catch {
    return reply("> Gagal mengubah watermark stiker")
  }
}

handler.command = /^(stickerwm|stikerwm|swm)$/i
handler.tags = ["stiker"]
handler.help = ["stickerwm packname|author"]
handler.limit = true
handler.daftar = true

export default handler