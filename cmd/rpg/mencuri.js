let handler = async (m, { conn, text, sleep }) => {
  const tungguh = 10 * 60 * 1000

  let user = global.db.data.users[m.sender]

  if (user.health < 40) {
    return conn.sendMessage(m.chat, { text: `❌ Darah kamu terlalu lelah (*${user.health} HP*) untuk melakukan aksi kriminal! Pulihkan dulu darahmu .makan` }, { quoted: m })
  }

  let korbanJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null
  if (!korbanJid) return conn.sendMessage(m.chat, { text: `💡 *Cara Penggunaan:* Tag atau reply orang yang mau dicuri.\nContoh: *${global.prefix}mencuri @user*` }, { quoted: m })

  if (korbanJid === m.sender) return conn.sendMessage(m.chat, { text: `❌ Kamu tidak bisa mencuri dari dirimu sendiri!` }, { quoted: m })

  let korban = global.db.data.users[korbanJid]
  if (!korban) return conn.sendMessage(m.chat, { text: `❌ Target tidak ditemukan di dalam database bot.` }, { quoted: m })

  let bankBisaDicuri = (typeof korban.pinbank === 'undefined' || korban.pinbank === '') && korban.bank > 0
  if (korban.money < 50 && !bankBisaDicuri) {
    return conn.sendMessage(m.chat, { text: `❌ Dompet target kosong dan brankas Bank miliknya terkunci rapat dengan PIN keamanan.` }, { quoted: m })
  }

  let waktuSisa = user.lastmencuri + tungguh - new Date()
  if (waktuSisa > 0) {
    let menit = Math.floor(waktuSisa / 60000)
    let detik = Math.floor((waktuSisa % 60000) / 1000)
    return conn.sendMessage(m.chat, { text: `⏳ Kamu masih diawasi warga setempat! Tunggu *${menit} menit ${detik} detik* lagi sebelum mencuri kembali.` }, { quoted: m })
  }

  user.lastmencuri = new Date().getTime()
  if (global.db?.write) await global.db.write()

  let { key } = await conn.sendMessage(m.chat, { text: `🥷 *Kamu mengenakan topeng hitam, menyiapkan linggis, dan mulai mengintai target...*` }, { quoted: m })

  try {
    await sleep(5000)
    await conn.sendMessage(m.chat, { text: `🧗‍♂️ *Kamu mulai memanjat pagar belakang rumah ${korban.name} dengan perlahan...*`, edit: key })

    await sleep(5000)
    await conn.sendMessage(m.chat, { text: `🐕 *Ups! Terdengar gonggongan anjing tetangga, kamu terpaksa tiarap berlindung di balik semak...*`, edit: key })

    await sleep(5000)
    await conn.sendMessage(m.chat, { text: `🪟 *Situasi kembali aman. Kamu mulai mencongkel jendela samping dengan sangat hati-hati...*`, edit: key })

    await sleep(5000)
    let teksIntai = `🚪 *Berhasil masuk! Kamu mengendap-endap menuju brankas dan meja rias utama...*`
    if (!korban.pinbank || korban.pinbank === '') {
      teksIntai += `\n⚠️ *Kamu melihat brankas Bank target tidak menggunakan PIN pengaman!*`
    }
    await conn.sendMessage(m.chat, { text: teksIntai, edit: key })
  } catch (e) {
    console.error(e)
  }

  user = global.db.data.users[m.sender]
  korban = global.db.data.users[korbanJid]

  if (korban.perangkap > 0) {
    let darahHilang = Math.floor(Math.random() * 21) + 20

    user.health = Math.max(0, user.health - darahHilang)
    korban.perangkap -= 1

    if (global.db?.write) await global.db.write()

    let teksGagal = `💥 *AKSI PENCURIAN GAGAL!* 💥\n\n`
    teksGagal += `Sial sekali! Rumah *${korban.name}* ternyata dilindungi oleh **Perangkap Kayu**! 🕸️\n`
    teksGagal += `🩸 Kamu terjebak dan terluka parah: *-${darahHilang} HP* (Sisa HP-mu: ${user.health})\n`
    teksGagal += `🛡️ *${korban.name}* kehilangan 1 Perangkap miliknya namun hartanya tetap aman!`
    return await conn.sendMessage(m.chat, { text: teksGagal.trim(), edit: key })
  }

  let persenCurian = Math.floor(Math.random() * 11) + 10
  let uangDicuri = korban.money >= 50 ? Math.floor((korban.money * persenCurian) / 100) : 0

  let uangBankDicuri = 0
  let kebobol = false
  if (!korban.pinbank || korban.pinbank === '') {
    if (korban.bank > 0) {
      let persenBank = Math.floor(Math.random() * 11) + 5
      uangBankDicuri = Math.floor((korban.bank * persenBank) / 100)
      kebobol = true
    }
  }

  let expDapat = Math.floor(Math.random() * 10) + 5

  korban.money -= uangDicuri
  korban.bank -= uangBankDicuri
  user.money += (uangDicuri + uangBankDicuri)
  user.exp += expDapat

  if (global.db?.write) await global.db.write()

  let teksSukses = `🥷 *AKSI PENCURIAN BERHASIL!* 🥷\n\n`
  teksSukses += `Kamu berhasil menyelinap ke dalam rumah *${korban.name}* tanpa ketahuan!\n`
  teksSukses += ` ├ 💵 Uang Dompet: *+$${uangDicuri}*\n`

  if (kebobol && uangBankDicuri > 0) {
    teksSukses += ` ├ 🏦 Uang Bank (No PIN): *+$${uangBankDicuri}* ⚠️\n`
  }

  teksSukses += ` ├ ✨ EXP Tambahan: +${expDapat} XP\n`
  teksSukses += ` └ 💸 Total Hasil Jarahan: +$${uangDicuri + uangBankDicuri}\n\n`
  teksSukses += `📊 *Total Dompetmu Sekarang:* $${user.money}\n`

  if (kebobol) {
    teksSukses += `🔓 _Brankas Bank korban ikut jebol karena tidak dilindungi password PIN!_`
  } else {
    teksSukses += `🔒 _Uang simpanan Bank milik korban tetap aman berkat perlindungan PIN._`
  }

  await conn.sendMessage(m.chat, { text: teksSukses.trim(), edit: key })
}

handler.command = /^(mencuri)$/i
handler.help = ["mencuri"]
handler.tags = ["rpg"]
handler.daftar = true
handler.group = true

export default handler
