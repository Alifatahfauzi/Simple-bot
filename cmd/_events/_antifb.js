/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = (m) => m

handler.before = async function (m, { conn, reply, isOwner, isAdmin, isBotAdmin }) {
  if (m.fromMe || !m.isGroup) return true

  const text = (m.text || m.body || m.msg?.text || m.msg?.caption || "")
  if (!text) return true

  if (isOwner || isAdmin) return true

  const chats = global.db.data.chats?.[m.chat]
  if (!chats?.antifb) return true

  const isFacebook = /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch|fb\.com|m\.facebook\.com)\//i.test(text)
  if (!isFacebook) return true

  if (isBotAdmin) {
    await conn.sendMessage(m.chat, { delete: m.key }).catch(() => null)
  }

  await reply("‼️Link Facebook tidak diizinkan di grup ini. Harap ikuti peraturan📢")

  return true
}

export default handler