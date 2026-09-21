let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let action = (args[0] || '').toLowerCase()

  if (!action || !['setpin', 'simpan', 'tarik', 'saldo'].includes(action)) {
    let menuBank = `🏦 *MAZE BANK RPG SYSTEM* 🏦\n\n`
    menuBank += `Amankan uang hasil jerih payahmu di bank agar tidak dicuri maling!\n\n`
    menuBank += `📦 *Fitur Layanan Bank:*\n`
    menuBank += ` ├ 🔑 *setpin <4_angka>* : Membuat PIN keamanan bank\n`
    menuBank += ` ├ 💰 *saldo* : Cek total tabungan aman milikmu\n`
    menuBank += ` ├ 📥 *simpan <jumlah>* : Menabung uang ke dalam brankas bank\n`
    menuBank += ` └ 📤 *tarik <jumlah> <pin>* : Menarik uang menggunakan PIN rahasia\n\n`
    menuBank += `💡 *Contoh:* *${global.prefix}bank simpan 500* atau *${global.prefix}bank tarik 500 1234*`
    return conn.sendMessage(m.chat, { text: menuBank.trim() }, { quoted: m })
  }

  if (action === 'setpin') {
    let pin = args[1]
    if (!pin || isNaN(pin) || pin.length !== 4) {
      return conn.sendMessage(m.chat, { text: `❌ PIN harus berupa 4 digit angka! Contoh: *${global.prefix}bank setpin 1234*` }, { quoted: m })
    }
    if (user.pinbank !== '') {
      return conn.sendMessage(m.chat, { text: `❌ Kamu sudah memiliki PIN bank. Fitur ganti PIN saat ini belum tersedia demi keamanan.` }, { quoted: m })
    }

    user.pinbank = pin
    if (global.db?.write) await global.db.write()

    let teksPin = `🔑 *PIN BANK BERHASIL DIBUAT* 🔑\n\n`
    teksPin += `Brankas keamanan kamu sekarang telah aktif!\n`
    teksPin += ` ├ 👤 Pemilik: ${user.name}\n`
    teksPin += ` └ 🔒 Status PIN: *AKTIF (4 Digit)*\n\n`
    teksPin += `⚠️ *PENTING:* Ingat baik-baik PIN rahasiamu, bot tidak melayani klaim lupa PIN!`
    return conn.sendMessage(m.chat, { text: teksPin.trim() }, { quoted: m })
  }

  if (action === 'saldo') {
    let teksSaldo = `🏦 *INFORMASI REKENING BANK* 🏦\n\n`
    teksSaldo += `Berikut adalah rincian keuangan aman milikmu:\n`
    teksSaldo += ` ├ 👤 Nasabah: ${user.name}\n`
    teksSaldo += ` ├ 💵 Uang di Dompet: $${user.money} (Rawan Dicuri ⚠️)\n`
    teksSaldo += ` └ 💳 Uang di Bank: $${user.bank} (Aman 100% 🛡️)\n\n`
    teksSaldo += `💡 Simpan uangmu sekarang dengan perintah *${global.prefix}bank simpan <jumlah>*`
    return conn.sendMessage(m.chat, { text: teksSaldo.trim() }, { quoted: m })
  }

  if (action === 'simpan') {
    let jumlah = args[1]
    if (jumlah === 'all') jumlah = user.money
    jumlah = parseInt(jumlah)

    if (isNaN(jumlah) || jumlah <= 0) {
      return conn.sendMessage(m.chat, { text: `❌ Masukkan jumlah uang valid yang ingin disimpan!` }, { quoted: m })
    }
    if (user.money < jumlah) {
      return conn.sendMessage(m.chat, { text: `❌ Uang di dompetmu tidak cukup! Kamu hanya punya *$${user.money}* di dompet.` }, { quoted: m })
    }

    user.money -= jumlah
    user.bank += jumlah
    if (global.db?.write) await global.db.write()

    let teksSimpan = `📥 *TRANSAKSI SETORAN TUNAI* 📥\n\n`
    teksSimpan += `Uang berhasil dipindahkan ke brankas bank terisolasi!\n`
    teksSimpan += ` ├ 👤 Nasabah: ${user.name}\n`
    teksSimpan += ` ├ 📈 Setoran: +$${jumlah}\n`
    teksSimpan += ` ├ 💵 Sisa Dompet: $${user.money}\n`
    teksSimpan += ` └ 💳 Total Saldo Bank: $${user.bank}\n\n`
    teksSimpan += `🛡️ Uang di dalam bank dijamin aman dari target pembobolan perintah .mencuri!`
    return conn.sendMessage(m.chat, { text: teksSimpan.trim() }, { quoted: m })
  }

  if (action === 'tarik') {
    let jumlah = args[1]
    let pinInput = args[2]

    if (user.pinbank === '') {
      return conn.sendMessage(m.chat, { text: `❌ Kamu belum membuat PIN bank! Silakan buat terlebih dahulu dengan mengetik *${global.prefix}bank setpin <4_angka>*` }, { quoted: m })
    }

    if (jumlah === 'all') {
      jumlah = user.bank
      pinInput = args[2]
    }
    jumlah = parseInt(jumlah)

    if (isNaN(jumlah) || jumlah <= 0) {
      return conn.sendMessage(m.chat, { text: `❌ Masukkan jumlah uang valid yang ingin ditarik!` }, { quoted: m })
    }
    if (!pinInput) {
      return conn.sendMessage(m.chat, { text: `❌ Masukkan PIN keamanan bank kamu untuk melakukan penarikan!` }, { quoted: m })
    }
    if (pinInput !== user.pinbank) {
      return conn.sendMessage(m.chat, { text: `❌ PIN keamanan yang kamu masukkan salah/tidak cocok! Transaksi dibatalkan.` }, { quoted: m })
    }
    if (user.bank < jumlah) {
      return conn.sendMessage(m.chat, { text: `❌ Saldo tabungan bank kamu tidak mencukupi untuk penarikan sebesar *$${jumlah}*!` }, { quoted: m })
    }

    user.bank -= jumlah
    user.money += jumlah
    if (global.db?.write) await global.db.write()

    let teksTarik = `📤 *TRANSAKSI PENARIKAN TUNAI* 📤\n\n`
    teksTarik += `Penarikan berhasil diverifikasi oleh sistem keamanan bank!\n`
    teksTarik += ` ├ 👤 Nasabah: ${user.name}\n`
    teksTarik += ` ├ 📉 Penarikan: -$${jumlah}\n`
    teksTarik += ` ├ 💳 Sisa Saldo Bank: $${user.bank}\n`
    teksTarik += ` └ 💵 Total Dompet Sekarang: $${user.money}\n\n`
    teksTarik += `⚠️ Uang di dompet sekarang berstatus rawan, pasang perangkap/pagar rumah untuk berjaga-jaga.`
    return conn.sendMessage(m.chat, { text: teksTarik.trim() }, { quoted: m })
  }
}

handler.command = /^(bank)$/i
handler.help = ["bank"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler
