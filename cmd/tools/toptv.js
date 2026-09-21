let handler = async (m, { conn, reply }) => {
  try {
    const quoted = m.quoted || m
    const mime = quoted?.mimetype || quoted?.msg?.mimetype || ""

    if (!/video/.test(mime)) {
      return reply("Kirim/reply video dengan caption:\n.toptv")
    }

    const buffer = await quoted.download()
    if (!buffer) return reply("> Gagal download video")

    await conn.sendMessage(
      m.chat,
      {
        video: buffer,
        ptv: true
      },
      { quoted: m }
    )
  } catch (e) {
    return reply("> Gagal mengubah video ke video note")
  }
}

handler.command = /^(toptv)$/i
handler.tags = ["tools"]
handler.help = ["toptv"]
handler.limit = true
handler.daftar = true

export default handler