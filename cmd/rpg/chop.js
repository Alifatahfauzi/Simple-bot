let handler = async (m, { conn }) => {
  const tungguh = 5 * 60 * 1000

  let user = global.db.data.users[m.sender]

  if (user.health < 20) {
    return m.reply(`❌ Darah kamu terlalu lelah (*${user.health} HP*) untuk menebang pohon! Pulihkan dulu darahmu dengan memakan daging kelinci/ayam .makan`)
  }

  let waktuSisa = user.lastchop + tungguh - new Date()
  if (waktuSisa > 0) {
    let menit = Math.floor(waktuSisa / 60000)
    let detik = Math.floor((waktuSisa % 60000) / 1000)
    return m.reply(`⏳ Kamu masih kelelahan. Tunggu *${menit} menit ${detik} detik* lagi untuk kembali menebang pohon.`)
  }

  let kayuDapat = Math.floor(Math.random() * 5) + 2
  let expDapat = Math.floor(Math.random() * 6) + 3
  let darahHilang = Math.floor(Math.random() * 4) + 3

  user = global.db.data.users[m.sender]

  user.kayu += kayuDapat
  user.exp += expDapat
  user.health = Math.max(0, user.health - darahHilang)
  user.lastchop = new Date().getTime()

  if (global.db?.write) await global.db.write()

  let teksHasil = `🪓 *MENEBANG POHON DI HUTAN* 🪓\n\n`
  teksHasil += `👤 *Pekerja:* ${user.name}\n`
  teksHasil += `🩸 *Darah Berkurang:* -${darahHilang} HP (Sisa: ${user.health} HP)\n\n`
  teksHasil += `🎒 *Hasil Tebangan:*\n`
  teksHasil += ` ├ 🪵 Kayu Didapat: *+${kayuDapat} Batang*\n`
  teksHasil += ` └ ✨ EXP Didapat: +${expDapat} XP\n\n`
  teksHasil += `📊 *Total Kayu di Inventory:* ${user.kayu} Batang`

  m.reply(teksHasil.trim())
}

handler.command = /^(chop)$/i
handler.help = ["chop"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler
