let handler = async (m, { conn, sleep }) => {
  const tunggu = 5 * 60 * 1000

  let user = global.db.data.users[m.sender]

  if (user.health < 20) {
    return m.reply(`❌ Darah kamu terlalu sekarat (*${user.health} HP*) untuk berburu! Pulihkan dulu darahmu.`)
  }

  let waktuSisa = user.lastberburu + tunggu - new Date()
  if (waktuSisa > 0) {
    let menit = Math.floor(waktuSisa / 60000)
    let detik = Math.floor((waktuSisa % 60000) / 1000)
    return m.reply(`⏳ Kamu masih lelah. Tunggu *${menit} menit ${detik} detik* lagi untuk kembali berburu.`)
  }

  user.lastberburu = new Date().getTime()
  if (global.db?.write) await global.db.write()

  let { key } = await m.reply(`🚶‍♂️ *Kamu menyiapkan busur dan pisau berburu, lalu melangkah masuk ke dalam hutan...*`)

  try {
    await sleep(25000)
    await conn.sendMessage(m.chat, { text: `🌲 *Hutan semakin lebat. Suara burung dan gemerisik daun terdengar di sekelilingmu...*`, edit: key })

    await sleep(25000)
    await conn.sendMessage(m.chat, { text: `🔍 *Kamu menemukan jejak kaki segar di tanah. Sepertinya ada hewan tidak jauh dari sini...*`, edit: key })

    await sleep(30000)
    await conn.sendMessage(m.chat, { text: `🌿 *Ssstt! Target terlihat di balik semak-semak. Kamu perlahan mendekat sambil membidik...*`, edit: key })

    await sleep(30000)
    await conn.sendMessage(m.chat, { text: `⚔️ *Serangan mendadak! Pertarungan sengit pun tak terhindarkan...*`, edit: key })

    await sleep(20000)
    await conn.sendMessage(m.chat, { text: `🩹 *Pertarungan usai. Kamu memeriksa luka dan mulai mengumpulkan hasil buruan...*`, edit: key })

    await sleep(20000)
    await conn.sendMessage(m.chat, { text: `🎒 *Kamu berkemas dan bersiap kembali ke desa membawa hasil buruan hari ini...*`, edit: key })

    await sleep(2000)
  } catch (e) {
  }

  let babi = Math.floor(Math.random() * 3)
  let rusa = Math.floor(Math.random() * 2)
  let kelinci = Math.floor(Math.random() * 4)
  let ayam = Math.floor(Math.random() * 5)
  let darahHilang = Math.floor(Math.random() * 15) + 5
  let dapatDuit = Math.floor(Math.random() * 500) + 100

  user = global.db.data.users[m.sender]

  let totalTernak = user.ternak_ayam + user.ternak_kelinci
  let ayamMasukKandang = 0
  let kelinciMasukKandang = 0

  if (user.kandang_level > 0) {
    for (let i = 0; i < ayam; i++) {
      if (totalTernak < user.slot_kandang) {
        user.ternak_ayam += 1
        totalTernak += 1
        ayamMasukKandang += 1
      } else {
        user.daging_ayam += (ayam - ayamMasukKandang)
        break
      }
    }
  } else {
    user.daging_ayam += ayam
  }

  if (user.kandang_level > 0) {
    for (let i = 0; i < kelinci; i++) {
      if (totalTernak < user.slot_kandang) {
        user.ternak_kelinci += 1
        totalTernak += 1
        kelinciMasukKandang += 1
      } else {
        user.daging_kelinci += (kelinci - kelinciMasukKandang)
        break
      }
    }
  } else {
    user.daging_kelinci += kelinci
  }

  user.daging_babi += babi
  user.daging_rusa += rusa
  user.health = Math.max(0, user.health - darahHilang)
  user.money += dapatDuit

  if (global.db?.write) await global.db.write()

  let teksHasil = `⚔️ *BERBURU DI HUTAN RPG* ⚔️\n\n`
  teksHasil += `👤 *Pemburu:* ${user.name}\n`
  teksHasil += `🩸 *Darah Berkurang:* -${darahHilang} HP (Sisa: ${user.health} HP)\n`
  teksHasil += `💰 *Uang Didapat:* +$${dapatDuit}\n\n`
  teksHasil += `🎒 *Hasil Buruan:*`
  
  if (babi > 0) teksHasil += `\n🐖 ${babi} Daging Babi`
  if (rusa > 0) teksHasil += `\n🦌 ${rusa} Daging Rusa`
  
  if (ayam > 0) {
    let dagingAyamDapat = ayam - ayamMasukKandang
    if (ayamMasukKandang > 0) teksHasil += `\n🐓 ${ayamMasukKandang} Ayam Hidup (Masuk Kandang)`
    if (dagingAyamDapat > 0) teksHasil += `\n🍗 ${dagingAyamDapat} Daging Ayam`
  }
  
  if (kelinci > 0) {
    let dagingKelinciDapat = kelinci - kelinciMasukKandang
    if (kelinciMasukKandang > 0) teksHasil += `\n🐇 ${kelinciMasukKandang} Kelinci Hidup (Masuk Kandang)`
    if (dagingKelinciDapat > 0) teksHasil += `\n🥩 ${dagingKelinciDapat} Daging Kelinci`
  }

  if (babi === 0 && rusa === 0 && kelinci === 0 && ayam === 0) {
    teksHasil += `\n🚫 Sial! Hewan buruanmu berhasil meloloskan diri.`
  }

  await conn.sendMessage(m.chat, { text: teksHasil.trim() }, { quoted: m })
}

handler.command = /^(berburu)$/i
handler.help = ["berburu"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler