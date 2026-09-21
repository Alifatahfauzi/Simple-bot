/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m) => {
  if (!m.isGroup) return m.reply("khusus grup")

  let chat = global.db.data.chats[m.chat]
  if (!chat) return m.reply("chat tidak ditemukan")
  if (!chat.sewa || !chat.sewaExpired) return m.reply("grup ini tidak dalam masa sewa")

  let sisa = Number(chat.sewaExpired) - Date.now()

  if (sisa <= 0) return m.reply("masa sewa sudah habis")

  let hari = Math.floor(sisa / 86400000)
  let jam = Math.floor(sisa / 3600000) % 24
  let menit = Math.floor(sisa / 60000) % 60
  let detik = Math.floor(sisa / 1000) % 60

  m.reply(`Status sewa aktif
Expired: ${new Date(chat.sewaExpired).toLocaleString("id-ID")}
Sisa: ${hari} hari ${jam} jam ${menit} menit ${detik} detik`)
}

handler.command = /^(ceksewa|sewa)$/i
handler.tags = ["group"]
handler.help = ["ceksewa"]
handler.group = true

export default handler