/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = m => m

handler.before = async function (m, { conn, reply, isAdmin, isOwner, isBotAdmin }) {
  if (!m.isGroup) return true
  if (m.fromMe || m.key?.fromMe) return true
  if (isOwner || isAdmin) return true

  const chat = global.db.data.chats[m.chat]
  if (!chat?.antitagall) return true

  const mentions = m.mentionedJid || []
  if (mentions.length < 5) return true

  if (isBotAdmin) {
    await conn.sendMessage(m.chat, { delete: m.key }).catch(() => null)
  }

  await reply("‼️Tagall tidak diizinkan di grup ini. Harap ikuti peraturan📢").catch(() => null)

  return true
}

export default handler