/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  const mode = (args[0] || "").toLowerCase()
  if (!["on", "off"].includes(mode)) {
    return m.reply("pakai: .antilink on/off")
  }

  const chat = global.db.data.chats[m.chat]
  chat.antilink = mode === "on"

  await global.db.write()

  m.reply(`Antilink ${mode.toUpperCase()}`)
}

handler.command = /^(antilink)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.tags = ["group"]
handler.help = ["antilink on/off"]

export default handler