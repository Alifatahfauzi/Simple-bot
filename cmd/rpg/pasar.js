let handler = async (m, { conn, args, db }) => {
  let user = db.users[m.sender]
  let action = (args[0] || "").toLowerCase()
  let item = (args[1] || "").toLowerCase()
  let jumlah = parseInt(args[2])

  let turunNaik = Math.floor(Date.now() / (30 * 60 * 1000))
  
  const randomHarga = (base, rentang, pengali) => {
    let x = Math.sin(turunNaik + pengali) * 10000
    let acak = Math.floor((x - Math.floor(x)) * (rentang + 1))
    return base + acak
  }

  const hargaPasar = {
    kayu: randomHarga(10, 15, 1),
    daging_ayam: randomHarga(20, 20, 2),
    daging_kelinci: randomHarga(30, 30, 3),
    daging_babi: randomHarga(50, 40, 4),
    daging_rusa: randomHarga(80, 60, 5)
  }

  let sisaMili = (30 * 60 * 1000) - (Date.now() % (30 * 60 * 1000))
  let sisaMenit = Math.floor(sisaMili / 60000)
  let sisaDetik = Math.floor((sisaMili % 60000) / 1000)

  if (action === "jual") {
    if (!hargaPasar[item]) return m.reply("❌ Item tersebut tidak bisa dijual di pasar!\n💡 Contoh: *.pasar jual kayu 10*")
    if (isNaN(jumlah) || jumlah <= 0) return m.reply("❌ Masukkan jumlah item yang ingin dijual dengan benar!\n💡 Contoh: *.pasar jual kayu 10*")
    
    let namaDbItem = item
    if (user[namaDbItem] < jumlah) return m.reply(`❌ Item kamu tidak cukup! Kamu hanya memiliki *${user[namaDbItem]}* ${item.replace("_", " ")}.`)

    let totalDapat = hargaPasar[item] * jumlah
    user[namaDbItem] -= jumlah
    user.money += totalDapat

    let teksJual = `💰 *TRANSAKSI PASAR BERHASIL* 💰\n\n`
    teksJual += `🛒 Berhasil menjual: *${jumlah} ${item.replace("_", " ")}*\n`
    teksJual += `💵 Rate harga saat ini: *$${hargaPasar[item]}* / pcs\n`
    teksJual += `💵 Total uang diterima: *+$${totalDapat}*\n\n`
    teksJual += `🎒 Sisa ${item.replace("_", " ")}: ${user[namaDbItem]}\n`
    teksJual += `👛 Total Dompet: $${user.money}`
    return m.reply(teksJual)
  }

  if (action === "beli") {
    if (!hargaPasar[item]) return m.reply("❌ Item tersebut tidak tersedia di pasar!\n💡 Contoh: *.pasar beli kayu 5*")
    if (isNaN(jumlah) || jumlah <= 0) return m.reply("❌ Masukkan jumlah item yang ingin dibeli dengan benar!\n💡 Contoh: *.pasar beli kayu 5*")
    
    let hargaBeliSatuan = Math.floor(hargaPasar[item] * 1.5)
    let totalBiaya = hargaBeliSatuan * jumlah

    if (user.money < totalBiaya) return m.reply(`❌ Uang kamu tidak cukup! Total biaya: *$${totalBiaya}*, Uangmu: *$${user.money}*.`)

    user.money -= totalBiaya
    user[item] += jumlah

    let teksBeli = `🛍️ *TRANSAKSI BELI BERHASIL* 🛍️\n\n`
    teksBeli += `🛒 Berhasil membeli: *${jumlah} ${item.replace("_", " ")}*\n`
    teksBeli += `💵 Rate harga beli saat ini: *$${hargaBeliSatuan}* / pcs\n`
    teksBeli += `💸 Total uang dikeluarkan: *-$${totalBiaya}*\n\n`
    teksBeli += `🎒 Total ${item.replace("_", " ")} sekarang: ${user[item]}\n`
    teksBeli += `👛 Total Dompet: $${user.money}`
    return m.reply(teksBeli)
  }

  let teksPasar = `🏪 *HARGA PASAR SEKARANG* 🏪\n`
  teksPasar += `ini adalah pasar untuk jual ${user.name}\n\n`
  teksPasar += `⏳ Harga berubah dalam: *${sisaMenit} menit ${sisaDetik} detik*\n\n`
  
  teksPasar += `🪵 *Bahan Baku:*\n`
  teksPasar += ` └ 🪵 Kayu: 💸 Jual: *$${hargaPasar.kayu}* | 🛒 Beli: *$${Math.floor(hargaPasar.kayu * 1.5)}* (Milikmu: ${user.kayu})\n\n`
  
  teksPasar += `🥩 *Hasil Buruan (Mentah):*\n`
  teksPasar += ` ├ 🐓 Daging Ayam: 💸 Jual: *$${hargaPasar.daging_ayam}* | 🛒 Beli: *$${Math.floor(hargaPasar.daging_ayam * 1.5)}* (Milikmu: ${user.daging_ayam})\n`
  teksPasar += ` ├ 🐇 Daging Kelinci: 💸 Jual: *$${hargaPasar.daging_kelinci}* | 🛒 Beli: *$${Math.floor(hargaPasar.daging_kelinci * 1.5)}* (Milikmu: ${user.daging_kelinci})\n`
  teksPasar += ` ├ 🐖 Daging Babi: 💸 Jual: *$${hargaPasar.daging_babi}* | 🛒 Beli: *$${Math.floor(hargaPasar.daging_babi * 1.5)}* (Milikmu: ${user.daging_babi})\n`
  teksPasar += ` └ 🦌 Daging Rusa: 💸 Jual: *$${hargaPasar.daging_rusa}* | 🛒 Beli: *$${Math.floor(hargaPasar.daging_rusa * 1.5)}* (Milikmu: ${user.daging_rusa})\n\n`
  
  teksPasar += `👛 *Uangmu:* $${user.money}\n\n`
  teksPasar += `💡 *Navigasi Transaksi:* \n`
  teksPasar += ` ├ 💸 Jual: \`.pasar jual [nama_item] [jumlah]\`\n`
  teksPasar += ` └ 🛒 Beli: \`.pasar beli [nama_item] [jumlah]\``

  m.reply(teksPasar.trim())
}

handler.command = /^(pasar)$/i
handler.help = ["pasar"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler