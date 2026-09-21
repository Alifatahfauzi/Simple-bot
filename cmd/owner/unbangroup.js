/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m) => {
  let chat = global.db.data.chats[m.chat]
  chat.banned = false

  m.reply("Ban grup dibuka")
}

handler.command = /^(unbangroup)$/i
handler.tags = ["owner"]
handler.help = ["unbangroup"]
handler.owner = true
handler.group = true

export default handler