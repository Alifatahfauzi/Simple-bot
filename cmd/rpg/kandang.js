let handler = async (m, { conn, args, db }) => {
  let user = db.users[m.sender]
  let action = (args[0] || "").toLowerCase()

  let nextLevel = user.kandang_level + 1
  let kayuButuh = nextLevel * 25
  let uangButuh = nextLevel * 500
  let slotTambahan = 5

  if (action === "build" || action === "upgrade") {
    if (user.kayu < kayuButuh) return m.reply(`❌ Kayu kamu tidak cukup! Butuh *${kayuButuh}* Batang Kayu. Sisa: ${user.kayu}\n💡 Ketik *.chop* atau *.nebang* untuk mendapatkan kayu terlebih dahulu.`)
    if (user.money < uangButuh) return m.reply(`❌ Uang kamu tidak cukup! Butuh *${uangButuh}* Money. Sisa: ${user.money}`)

    user.kayu -= kayuButuh
    user.money -= uangButuh
    user.kandang_level = nextLevel
    user.slot_kandang += slotTambahan

    let teksUp = `🏗️ *SUKSES ${user.kandang_level === 1 ? "MEMBANGUN" : "UPGRADE"} KANDANG* 🏗️\n\n`
    teksUp += `📊 Kandang kamu sekarang *Level ${user.kandang_level}*\n`
    teksUp += `📦 Slot kapasitas bertambah: *+${slotTambahan} Slot* (Total: ${user.slot_kandang} Slot)\n\n`
    teksUp += `🪵 Sisa Kayu: ${user.kayu} Batang\n`
    teksUp += `💰 Sisa Uang: $${user.money}`
    return m.reply(teksUp)
  }

  if (action === "claim" || action === "panen") {
    if (user.kandang_level === 0) return m.reply(`❌ Kamu belum membangun kandang! Ketik *.kandang build* untuk membangun.`)
    if (user.ternak_ayam === 0 && user.ternak_kelinci === 0) return m.reply(`❌ Kandang kamu kosong! Isi kandang terlebih dahulu lewat fitur berburu.`)

    let cooldown = 4 * 60 * 60 * 1000 
    let sisaWaktu = user.lastclaim_ternak + cooldown - Date.now()
    if (sisaWaktu > 0) {
      let jam = Math.floor(sisaWaktu / 3600000)
      let menit = Math.floor((sisaWaktu % 3600000) / 60000)
      return m.reply(`⏳ Ternak belum memproduksi hasil baru. Tunggu *${jam} jam ${menit} menit* lagi.`)
    }

    let hasilDuit = (user.ternak_ayam * 50) + (user.ternak_kelinci * 80)
    let hasilExp = (user.ternak_ayam * 10) + (user.ternak_kelinci * 15)

    user.money += hasilDuit
    user.exp += hasilExp
    user.lastclaim_ternak = Date.now()

    let teksClaim = `🧺 *HASIL PANEN TERNAK* 🧺\n\n`
    teksClaim += `🐓 Ayam aktif: ${user.ternak_ayam}\n`
    teksClaim += `🐇 Kelinci aktif: ${user.ternak_kelinci}\n\n`
    teksClaim += `🎒 *Pendapatan Pajak Ternak:*\n`
    teksClaim += ` ├ 💰 Uang didapat: *+$${hasilDuit}*\n`
    teksClaim += ` └ ✨ EXP didapat: *+${hasilExp} XP*\n\n`
    teksClaim += `💰 Total Dompetmu: $${user.money}`
    return m.reply(teksClaim)
  }

  let totalTernak = user.ternak_ayam + user.ternak_kelinci
  let teksMain = `🏡 *MANAJEMEN KANDANG RPG* 🏡\n\n`
  
  if (user.kandang_level === 0) {
    teksMain += `Status: *Belum Memiliki Kandang*\n\n`
    teksMain += `🛠️ *Biaya Pembangunan Awal:*\n`
    teksMain += ` ├ 🪵 Kayu: *25 Batang*\n`
    teksMain += ` └ 💰 Uang: *$500*\n\n`
    teksMain += `💡 Ketik *.kandang build* untuk mulai membangun tempat peternakan.`
  } else {
    teksMain += `👤 Pemilik: ${user.name}\n`
    teksMain += `📊 Level Kandang: *Level ${user.kandang_level}*\n`
    teksMain += `📦 Kapasitas Slot: *${totalTernak} / ${user.slot_kandang} Ekor*\n\n`
    teksMain += `🐓 Jumlah Ayam: ${user.ternak_ayam} Ekor\n`
    teksMain += `🐇 Jumlah Kelinci: ${user.ternak_kelinci} Ekor\n\n`
    teksMain += `🛠️ *Biaya Upgrade Berikutnya (Lv.${nextLevel}):*\n`
    teksMain += ` ├ 🪵 Kayu: *${kayuButuh} Batang*\n`
    teksMain += ` └ 💰 Uang: *$${uangButuh}*\n\n`
    teksMain += `💡 *Opsi Perintah:*\n`
    teksMain += ` ├ \`.kandang upgrade\` (Naikkan slot)\n`
    teksMain += ` └ \`.kandang claim\` (Panen duit/exp pasif per 4 jam)`
  }

  m.reply(teksMain.trim())
}

handler.command = /^(kandang)$/i
handler.help = ["kandang"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler