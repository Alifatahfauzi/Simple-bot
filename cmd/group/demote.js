/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  const target =
    m.mentionedJid && m.mentionedJid.length
      ? m.mentionedJid[0]
      : m.quoted && m.quoted.sender
        ? m.quoted.sender
        : ""

  if (!target) return m.reply("Tag user atau reply pesan user yang mau di-demote.")
  if (target === conn.user.id) return m.reply("Tidak bisa demote bot.")

  await conn.groupParticipantsUpdate(m.chat, [target], "demote")
  return m.reply("Berhasil demote.")
}

handler.command = /^(demote)$/i
handler.tags = ["group"]
handler.help = ["demote @user"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler