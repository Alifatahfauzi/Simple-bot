/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  await conn.groupSettingUpdate(m.chat, "announcement")
  return m.reply("Group ditutup.")
}

handler.command = /^(closegc)$/i
handler.tags = ["group"]
handler.help = ["closegc"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler