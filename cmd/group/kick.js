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

  if (!target) return m.reply("Tag user atau reply pesan user yang mau di-kick.")

  if (target === conn.user.id) return m.reply("Tidak bisa kick bot.")
  if (target === m.sender) return m.reply("Tidak bisa kick diri sendiri.")

  await conn.groupParticipantsUpdate(m.chat, [target], "remove")
  return m.reply("Berhasil kick.")
}

handler.command = /^(kick)$/i
handler.tags = ["group"]
handler.help = ["kick @user"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler