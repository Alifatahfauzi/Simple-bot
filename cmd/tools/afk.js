/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  if (!global.db?.data) await global.loadDatabase()

  const reason = args.join(" ").trim() || "tanpa alasan"

  const user = global.db.data.users[m.sender]
  user.afk = true
  user.afkTime = Date.now()
  user.afkReason = reason

  m.reply(`AFK aktif\nAlasan: ${reason}`)
}

handler.command = /^(afk)$/i
handler.tags = ["tools"]
handler.help = ["afk <alasan>"]
handler.group = true

export default handler