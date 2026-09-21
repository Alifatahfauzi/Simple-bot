/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {

  const mode = (args[0] || "").toLowerCase()

  if (!["on","off"].includes(mode)) {
    return m.reply("pakai: .welcome on/off")
  }

  const chat = global.db.data.chats[m.chat]

  chat.welcome = mode === "on"

  m.reply(`Welcome ${mode.toUpperCase()}`)
}

handler.command = /^(welcome)$/i
handler.group = true
handler.admin = true
handler.tags = ["group"]
handler.help = ["welcome on/off"]

export default handler