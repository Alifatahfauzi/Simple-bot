/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = (m) => m

handler.before = async function (m, { conn, reply, isOwner, isAdmin, isBotAdmin }) {
  if (m.fromMe || !m.isGroup) return true
  if (isOwner || isAdmin) return true

  const chats = global.db.data.chats?.[m.chat]
  if (!chats?.antimedia) return true

  const msg = m.message || {}
  const isMedia =
    !!msg.imageMessage ||
    !!msg.videoMessage ||
    !!msg.documentMessage

  if (!isMedia) return true

  if (isBotAdmin) {
    await conn.sendMessage(m.chat, { delete: m.key }).catch(() => null)
  }

  await reply("‼️Media tidak diizinkan di grup ini. Harap ikuti peraturan📢")

  return true
}

export default handler