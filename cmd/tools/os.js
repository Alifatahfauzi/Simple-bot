let handler = async (m, { conn }) => {
  // Fokus ke pesan yang di-reply, jika tidak ada, cek pesan sendiri
  let target = m.quoted ? m.quoted : m
  
  // Ambil ID pesan target
  let id = target.id || target.key.id
  let device = "Tidak diketahui"

  // Logika deteksi berdasarkan pola Message ID WhatsApp
  if (id.startsWith("BAE5") || id.length === 16) {
    device = "Bot / Baileys"
  } else if (id.length === 20) {
    device = "iOS / iPhone"
  } else if (id.length === 22) {
    device = "WhatsApp Web"
  } else if (id.length === 32) {
    device = "Android"
  }

  let teks = `▧ *DETEKSI PERANGKAT*\n`
  teks += `│ ⌗ Pengirim: ${target.pushName || "User"}\n`
  teks += `│ ⌗ ID Pesan: ${id}\n`
  teks += `│ ⌗ Perangkat: ${device}\n`
  teks += `╰──────────────┈`

  await m.reply(teks)
}

handler.command = /^(cekdevice|cekhape|os)$/i
handler.tags = ["tools"]
handler.help = ["cekdevice"]

handler.daftar = false
handler.premium = false
handler.group = false
handler.admin = false
handler.private = false
handler.owner = false
handler.botAdmin = false
handler.limit = false

export default handler