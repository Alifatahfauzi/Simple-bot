/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m) => {
  if (!m.isGroup) return m.reply("gunakan di grup target")

  let chat = global.db.data.chats[m.chat]
  if (!chat) return m.reply("chat tidak ditemukan")

  chat.sewa = false
  chat.sewaExpired = 0

  m.reply("Sewa grup berhasil dihapus")
}

handler.command = /^(delsewa)$/i
handler.tags = ["owner"]
handler.help = ["delsewa"]
handler.owner = true
handler.group = true

export default handler