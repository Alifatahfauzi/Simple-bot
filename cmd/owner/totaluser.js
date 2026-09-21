/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  if (!global.db?.data) await global.loadDatabase()

  const users = global.db.data.users || {}
  const keys = Object.keys(users)

  const total = keys.length
  const registered = keys.filter(jid => users[jid]?.registered).length
  const unregistered = total - registered

  const groupUsers = keys.filter(jid => jid.endsWith("@s.whatsapp.net") && users[jid]).length

  const text =
`*STATISTIK USER BOT*

Total user: ${total}
Terdaftar: ${registered}
Belum daftar: ${unregistered}`

  return m.reply(text)
}

handler.command = /^(totaluser|userbot|statsuser)$/i
handler.tags = ["owner"]
handler.help = ["totaluser"]
handler.owner = true

export default handler