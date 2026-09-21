const hargaDaging = {
  babi: 150,
  rusa: 250,
  kelinci: 100,
  ayam: 50
}

let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let type = (args[0] || '').toLowerCase()
  let count = args[1]

  let namaDaging = {
    babi: 'daging_babi',
    rusa: 'daging_rusa',
    kelinci: 'daging_kelinci',
    ayam: 'daging_ayam'
  }

  if (type === 'all') {
    let totalDuit = 0
    let laporan = []

    for (let key in hargaDaging) {
      let dbKey = namaDaging[key]
      let jumlah = user[dbKey] || 0

      if (jumlah > 0) {
        let hasilJual = jumlah * hargaDaging[key]
        totalDuit += hasilJual
        user[dbKey] = 0
        laporan.push(` ├ 🐖 ${jumlah} Daging ${key.toUpperCase()} -> +$${hasilJual}`)
      }
    }

    if (totalDuit === 0) {
      return m.reply(`🎒 Kantong daging kamu sudah kosong, tidak ada yang bisa dijual.`)
    }

    user.money += totalDuit

    let teksAll = `💰 *SUKSES MENJUAL SEMUA HASIL BURUAN* 💰\n\n`
    teksAll += laporan.join('\n') + `\n`
    teksAll += ` └ 💵 Total Uang Didapat: *+$${totalDuit}*\n\n`
    teksAll += `💼 Sisa Uang Kamu: *$${user.money}*`
    return m.reply(teksAll.trim())
  }

  if (!hargaDaging[type]) {
    let listHarga = `🛒 *DAFTAR HARGA PASAR RPG* 🛒\n\n`
    listHarga += ` ├ 🐖 Daging Babi: $${hargaDaging.babi} /ekor\n`
    listHarga += ` ├ 🦌 Daging Rusa: $${hargaDaging.rusa} /ekor\n`
    listHarga += ` ├ 🐇 Daging Kelinci: $${hargaDaging.kelinci} /ekor\n`
    listHarga += ` └ 🐓 Daging Ayam: $${hargaDaging.ayam} /ekor\n\n`
    listHarga += `💡 *Format Perintah:*\n`
    listHarga += `• Jual satuan: *${global.prefix}sell [jenis] [jumlah]*\n`
    listHarga += `• Jual semua: *${global.prefix}sell all*\n\n`
    listHarga += `_Contoh: ${global.prefix}sell babi 2_`
    return m.reply(listHarga.trim())
  }

  count = Math.max(1, isNaN(count) ? 1 : parseInt(count))
  let targetDbKey = namaDaging[type]

  if (user[targetDbKey] < count) {
    return m.reply(`❌ Daging ${type} kamu tidak cukup! Kamu hanya memiliki *${user[targetDbKey]}* ekor di inventory.`)
  }

  let totalPendapatan = count * hargaDaging[type]
  user[targetDbKey] -= count
  user.money += totalPendapatan

  let teksSukses = `💰 *TRANSAKSI PASAR RPG BERHASIL* 💰\n\n`
  teksSukses += `👤 *Penjual:* ${user.name}\n`
  teksSukses += `📦 *Barang Jual:* ${count} Daging ${type.toUpperCase()}\n`
  teksSukses += `💵 *Pendapatan:* +$${totalPendapatan}\n\n`
  teksSukses += `🎒 *Sisa Stok:* ${user[targetDbKey]} ekor\n`
  teksSukses += `💵 *Total Uang Sekarang:* $${user.money}`

  m.reply(teksSukses.trim())
}

handler.command = /^(sell)$/i
handler.help = ["sell"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler
