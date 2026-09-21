/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m) => {
  if (!m.isGroup) return m.reply("khusus grup")

  let chat = global.db.data.chats[m.chat]
  if (!chat) return m.reply("chat tidak ditemukan")

  m.reply(chat.banned ? "grup ini sedang diban" : "grup ini tidak diban")
}

handler.command = /^(cekbangroup)$/i
handler.tags = ["group"]
handler.help = ["cekbangroup"]
handler.group = true

export default handler