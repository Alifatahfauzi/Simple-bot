/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  const chat = global.db.data.chats[m.chat]
  const mode = (args[0] || "").toLowerCase()

  if (!["on", "off"].includes(mode)) {
    return m.reply("pakai: .antitagall on/off")
  }

  chat.antitagall = mode === "on"

  m.reply(`Antitagall ${mode.toUpperCase()}`)
}

handler.command = /^(antitagall)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.tags = ["group"]
handler.help = ["antitagall on/off"]

export default handler