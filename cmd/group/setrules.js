/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  const text = args.join(" ").trim()
  if (!text) return m.reply("masukkan rules\ncontoh: .setrules dilarang spam")

  const chat = global.db.data.chats[m.chat]
  chat.rules = text

  m.reply("Rules berhasil diupdate")
}

handler.command = /^(setrules)$/i
handler.group = true
handler.admin = true
handler.tags = ["group"]
handler.help = ["setrules <text>"]

export default handler