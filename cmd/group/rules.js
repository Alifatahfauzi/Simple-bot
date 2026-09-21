/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m) => {
  const chat = global.db.data.chats[m.chat]
  const text = chat.rules || "Rules belum diatur admin"

  m.reply(`*RULES GROUP*\n\n${text}`)
}

handler.command = /^(rules|rule)$/i
handler.group = true
handler.tags = ["group"]
handler.help = ["rules"]

export default handler