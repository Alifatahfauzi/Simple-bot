/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  await conn.groupSettingUpdate(m.chat, "not_announcement")
  return m.reply("Berhasil membuka chat group")
}

handler.command = /^(opengc)$/i
handler.tags = ["group"]
handler.help = ["opengc"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler