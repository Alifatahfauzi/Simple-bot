/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  const id = conn.decodeJid(conn.user.id)
  const st = global.db.data.settings?.[id] || {}
  m.reply(`Maintenance: ${st.maintenance ? "ON" : "OFF"}`)
}

handler.command = /^(statusmaintenance|maintenancestatus|stmaint)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["statusmaintenance"]

export default handler