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

  if (!target) return m.reply("Tag user atau reply pesan user yang mau di-promote.")
  if (target === conn.user.id) return m.reply("Bot sudah admin.")

  await conn.groupParticipantsUpdate(m.chat, [target], "promote")
  return m.reply("Berhasil promote.")
}

handler.command = /^(promote)$/i
handler.tags = ["group"]
handler.help = ["promote @user"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler