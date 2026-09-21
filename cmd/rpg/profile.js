let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]

  let expLvl = user.level * 200 + 100

  let teksProfile = `👤 *PROFIL KARAKTER RPG* 👤\n\n`
  teksProfile += ` STATUS UTAMA:\n`
  teksProfile += ` ├ 👤 Nama: ${user.name}\n`
  teksProfile += ` ├ 👑 Role: ${user.role}\n`
  teksProfile += ` ├ 📈 Level: ${user.level}\n`
  teksProfile += ` ├ ✨ EXP: ${user.exp} / ${expLvl} XP\n`
  teksProfile += ` ├ 🩸 Darah: ${user.health} / 100 HP\n`
  teksProfile += ` └ 💰 Uang: $${user.money}\n\n`
  
  teksProfile += `💡 *Tips:* Tingkatkan levelmu dengan sering bekerja (.nebang / .berburu) atau berpetualang (.adventure) untuk mengubah status role menjadi lebih kuat!`

  m.reply(teksProfile.trim())
}

handler.command = /^(profile)$/i
handler.help = ["profile"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler