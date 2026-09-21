/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let limit = user?.limit ?? 0
  await conn.sendMessage(m.chat, { text: `Limit kamu: ${limit}` }, { quoted: m })
}

handler.command = /^(ceklimit)$/i
handler.tags = ["tools"]
handler.help = ["ceklimit"]

export default handler