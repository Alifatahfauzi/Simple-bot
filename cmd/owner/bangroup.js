/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m) => {
  let chat = global.db.data.chats[m.chat]
  chat.banned = true

  m.reply("Grup berhasil diban")
}

handler.command = /^(bangroup)$/i
handler.tags = ["owner"]
handler.help = ["bangroup"]
handler.owner = true
handler.group = true

export default handler