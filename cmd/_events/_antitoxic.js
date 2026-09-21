/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = m => m

handler.before = async function (m, { reply }) {
  if (m.fromMe || !m.isGroup) return true

  const text = (m.text || m.body || m.msg?.text || m.msg?.caption || "").toLowerCase()
  const toxicWords = /anjing|babi|kntl|memek|ajg|goblog|tolol|peler|asuh/i

  if (!toxicWords.test(text)) return true

  const realJid = m.key?.participantAlt || m.participantAlt || m.sender

  await reply("‼️Pesan kamu terdeteksi mengandung kata kasar. Harap gunakan bahasa yang sopan📢")

  return true
}

export default handler