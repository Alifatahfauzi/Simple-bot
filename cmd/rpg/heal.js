const pulihHP = {
  kelinci: 15,
  ayam: 10
}

let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let type = (args[0] || '').toLowerCase()
  let count = args[1]

  if (user.health >= 100) {
    return m.reply(`❤️ Darah kamu sudah penuh (*100 HP*), tidak perlu melakukan pemulihan.`)
  }

  let namaDaging = {
    kelinci: 'daging_kelinci',
    ayam: 'daging_ayam'
  }

  if (!pulihHP[type]) {
    let panduan = `🩹 *MENU PEMULIHAN DARAH (HEAL)* 🩹\n\n`
    panduan += `🥩 *Daging Yang Bisa Dimakan:*\n`
    panduan += ` ├ 🐇 Daging Kelinci (+$${pulihHP.kelinci} HP /ekor) -> Stok: ${user.daging_kelinci}\n`
    panduan += ` └ 🐓 Daging Ayam (+$${pulihHP.ayam} HP /ekor) -> Stok: ${user.daging_ayam}\n\n`
    panduan += `💡 *Format Perintah:*\n`
    panduan += `• *${global.prefix}heal [kelinci/ayam] [jumlah]*\n\n`
    panduan += `_Contoh: ${global.prefix}heal kelinci 2_`
    return m.reply(panduan.trim())
  }

  count = Math.max(1, isNaN(count) ? 1 : parseInt(count))
  let targetDbKey = namaDaging[type]

  if (user[targetDbKey] < count) {
    return m.reply(`❌ Daging ${type} kamu tidak cukup! Kamu hanya memiliki *${user[targetDbKey]}* ekor di inventory.`)
  }

  let totalHeal = count * pulihHP[type]
  let darahSebelum = user.health
  user.health = Math.min(100, user.health + totalHeal)
  let totalDarahMasuk = user.health - darahSebelum

  user[targetDbKey] -= count

  let teksSukses = `🩹 *PEMULIHAN DARAH BERHASIL* 🩹\n\n`
  teksSukses += `👤 *Karakter:* ${user.name}\n`
  teksSukses += `🍽️ *Mengonsumsi:* ${count} Daging ${type.toUpperCase()}\n`
  teksSukses += `💚 *Darah Bertambah:* +${totalDarahMasuk} HP\n`
  teksSukses += `🎒 *Sisa Stok:* ${user[targetDbKey]} ekor\n`
  teksSukses += `🩸 *Status Darah Sekarang:* *${user.health} / 100 HP*`

  m.reply(teksSukses.trim())
}

handler.command = /^(heal)$/i
handler.help = ["heal"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler
