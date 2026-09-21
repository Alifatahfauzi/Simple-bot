let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m

  let mime = (q.msg || q).mimetype || ""

  if (!/image/.test(mime)) {
    return m.reply("Reply gambar nya")
  }

  let media = await q.download()

  await conn.updateProfilePicture(
    conn.user.id,
    media
  )

  await conn.sendMessage(
    m.chat,
    {
      text: "Berhasil mengganti profile bot."
    },
    {
      quoted: m
    }
  )
}

handler.command = /^(setppbot)$/i
handler.tags = ["owner"]
handler.help = ["setppbot"]
handler.rowner = true

export default handler