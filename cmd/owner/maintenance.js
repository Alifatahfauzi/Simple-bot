/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args, conn }) => {
  const id = conn.decodeJid(conn.user.id)

  if (!global.db.data.settings) global.db.data.settings = {}
  if (!global.db.data.settings[id]) global.db.data.settings[id] = {}

  if (!args[0]) return m.reply("pakai: .maintenance on/off")

  if (args[0] === "on") global.db.data.settings[id].maintenance = true
  else if (args[0] === "off") global.db.data.settings[id].maintenance = false
  else return m.reply("pakai: .maintenance on/off")

  await global.db.write()
  m.reply(`Maintenance ${args[0].toUpperCase()}`)
}

handler.command = /^(maintenance)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["maintenance on/off"]

export default handler