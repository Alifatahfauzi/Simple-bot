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
  if (!chats?.antihidetag) return true

  const directMention =
    m.mentionedJid?.length ||
    m.msg?.contextInfo?.mentionedJid?.length ||
    0

  const quotedMention =
    m.quoted?.contextInfo?.mentionedJid?.length ||
    m.msg?.contextInfo?.quotedMessage?.extendedTextMessage?.contextInfo?.mentionedJid?.length ||
    m.msg?.contextInfo?.quotedMessage?.conversation?.contextInfo?.mentionedJid?.length ||
    0

  const totalMention = directMention + quotedMention

  if (!totalMention) return true

  if (isBotAdmin) {
    await conn.sendMessage(m.chat, { delete: m.key }).catch(() => null)
  }

  await reply("‼️Hidetag tidak diizinkan di grup ini. Harap ikuti peraturan📢")

  return true
}

export default handler