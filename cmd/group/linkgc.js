/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

const handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply("Fitur ini hanya untuk grup.")

  let link = await conn.groupInviteCode(m.chat)
  let url = "https://chat.whatsapp.com/" + link

  m.reply(`Link Grup:\n${url}`)
}

handler.command = /^linkgc$/i
handler.tags = ["group"]
handler.help = ["linkgc"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler