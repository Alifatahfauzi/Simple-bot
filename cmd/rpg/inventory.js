let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]

  let teks = `🎒 *INVENTORY RPG - ${user.name}* 🎒\n\n`

  teks += `❤️ *Status Karakter:*\n`
  teks += ` ├ 🩸 Darah: ${user.health} HP\n`
  teks += ` ├ 👑 Level: ${user.level} (✨ ${user.exp} XP)\n`
  teks += ` └ 💰 Uang: $${user.money}\n\n`

  teks += `🪵 *Bahan Baku:*\n`
  teks += ` └ 🪵 Kayu: ${user.kayu} batang\n\n`

  teks += `🥩 *Isi Kantong Daging (Mentah):*\n`
  teks += ` ├ 🐓 Daging Ayam: ${user.daging_ayam} pcs\n`
  teks += ` ├ 🐇 Daging Kelinci: ${user.daging_kelinci} pcs\n`
  teks += ` ├ 🐖 Daging Babi: ${user.daging_babi} pcs\n`
  teks += ` └ 🦌 Daging Rusa: ${user.daging_rusa} pcs\n\n`

  teks += `🏡 *Hewan Ternak (Hidup):*\n`
  teks += ` ├ 🎪 Kandang: Level ${user.kandang_level} ( Slot: ${user.ternak_ayam + user.ternak_kelinci} / ${user.slot_kandang} )\n`
  teks += ` ├ 🐓 Ayam Ternak: ${user.ternak_ayam} ekor\n`
  teks += ` └ 🐇 Kelinci Ternak: ${user.ternak_kelinci} ekor\n\n`

  teks += `💡 *Tips:* Kamu bisa menjual persediaan daging mentah atau kayumu di pasar fluktuatif dengan mengetik *.pasar jual [nama_item] [jumlah]* untuk mendapatkan keuntungan uang!`

  m.reply(teks.trim())
}

handler.command = /^(inventory)$/i
handler.help = ["inventory"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler