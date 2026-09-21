/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  if (!m.isGroup) return m.reply("gunakan di grup target")

  let input = (args[0] || "").toLowerCase()
  if (!input) return m.reply("contoh: .addsewa 10m\ncontoh: .addsewa 7d\ncontoh: .addsewa 1mo")

  let ms = 0

  if (/^\d+m$/.test(input)) ms = parseInt(input) * 60 * 1000
  else if (/^\d+d$/.test(input)) ms = parseInt(input) * 24 * 60 * 60 * 1000
  else if (/^\d+mo$/.test(input)) ms = parseInt(input) * 30 * 24 * 60 * 60 * 1000

  if (!ms) return m.reply("format salah\npakai: 10m / 7d / 1mo")

  let chat = global.db.data.chats[m.chat]
  if (!chat) return m.reply("chat tidak ditemukan")

  let now = Date.now()
  let base = chat.sewa && chat.sewaExpired > now ? Number(chat.sewaExpired) : now

  chat.sewa = true
  chat.sewaExpired = base + ms

  let expired = new Date(chat.sewaExpired).toLocaleString("id-ID")

  m.reply(`Sewa berhasil ditambahkan\nAktif sampai: ${expired}`)
}

handler.command = /^(addsewa)$/i
handler.tags = ["owner"]
handler.help = ["addsewa 10m"]
handler.owner = true
handler.group = true

export default handler