/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  const mode = (args[0] || "").toLowerCase()
  if (!["on", "off"].includes(mode)) return m.reply("pakai: .antihidetag on/off")

  const chat = global.db.data.chats[m.chat]
  chat.antihidetag = mode === "on"

  m.reply(`Antihidetag ${mode.toUpperCase()}`)
}

handler.command = /^(antihidetag)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.tags = ["group"]
handler.help = ["antihidetag on/off"]

export default handler