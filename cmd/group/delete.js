/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  const q = m.quoted
  if (!q) return m.reply("Reply pesan yang mau dihapus.")

  await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: q.fromMe, id: q.id, participant: q.sender } })
  return m.reply("Berhasil hapus pesan.")
}

handler.command = /^(delpsn)$/i
handler.tags = ["group"]
handler.help = ["delpsn (reply pesan)"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler