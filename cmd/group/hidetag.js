/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args }) => {
  const metadata = await conn.groupMetadata(m.chat)
  const participants = metadata.participants || []
  const mentions = participants.map(v => v.id)

  if (!m.quoted && !args.length)
    return m.reply("Masukkan teks atau reply gambar.")

  let text = args.join(" ") || m.quoted?.text || m.quoted?.caption || ""

  if (m.quoted && /image/.test(m.quoted.mtype)) {
    const media = await m.quoted.download()
    return conn.sendMessage(
      m.chat,
      {
        image: media,
        caption: text,
        mentions
      },
      { quoted: m }
    )
  }

  if (/image/.test(m.mtype)) {
    const media = await m.download()
    return conn.sendMessage(
      m.chat,
      {
        image: media,
        caption: text,
        mentions
      },
      { quoted: m }
    )
  }

  return conn.sendMessage(
    m.chat,
    {
      text,
      mentions
    },
    { quoted: m }
  )
}

handler.command = /^(hidetag)$/i
handler.tags = ["group"]
handler.help = ["hidetag <teks>"]
handler.group = true
handler.admin = true

export default handler