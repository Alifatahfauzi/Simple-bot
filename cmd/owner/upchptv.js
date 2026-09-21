let handler = async (m, { conn, args, reply }) => {
  const newsletterJid = (args[0] || "").trim()
  const usage = "Reply video, caption .upchptv <jid_channel>"

  if (!newsletterJid || !newsletterJid.endsWith("@newsletter")) return reply(usage)

  const quoted = m.quoted || m
  const mimetype = quoted?.mimetype || quoted?.msg?.mimetype || ""
  if (!/video/.test(mimetype)) return reply(usage)

  await reply("⏳ Sedang proses & upload video (ptv) ke channel...")

  try {
    const buffer = await quoted.download()
    if (!buffer) return reply("❌ Gagal download video")

    await conn.sendMessage(newsletterJid, {
      video: buffer,
      ptv: true
    })

    await reply("✅ Video (ptv) berhasil diupload ke channel.")
  } catch (err) {
    console.error(err)
    reply(`❌ Gagal upload video ke channel.\n${err.message || err}`)
  }
}

handler.command = /^(upchptv)$/i
handler.tags = ["owner"]
handler.help = ["upchptv <jid_channel> (reply video)"]
handler.owner = true

export default handler