let handler = async (m, { conn, sleep }) => {
  const durasiTotal = 7 * 60 * 1000

  let user = global.db.data.users[m.sender]

  if (user.health < 30) {
    return m.reply(`❌ Darah kamu terlalu lelah (*${user.health} HP*) untuk berpetualang! Pulihkan dulu darahmu dengan memakan daging kelinci/ayam .makan`)
  }

  let waktuSisa = user.lastadventure + durasiTotal - new Date()
  if (waktuSisa > 0) {
    let menit = Math.floor(waktuSisa / 60000)
    let detik = Math.floor((waktuSisa % 60000) / 1000)
    return m.reply(`⏳ Kamu masih dalam perjalanan petualangan sebelumnya. Tunggu *${menit} menit ${detik} detik* lagi.`)
  }

  user.lastadventure = new Date().getTime()
  if (global.db?.write) await global.db.write()

  let { key } = await m.reply(`🚶‍♂️ *Kamu mengemas tas, mengikat tali sepatu, dan mulai melangkah keluar dari desa...*`)

  let totalDarahHilang = 0

  try {
    const potongDarahDiJalan = async () => {
      let damage = Math.floor(Math.random() * 4) + 4
      totalDarahHilang += damage

      let u = global.db.data.users[m.sender]
      u.health = Math.max(0, u.health - damage)
      if (global.db?.write) await global.db.write()
      return u.health
    }

    await sleep(60000)
    let hp1 = await potongDarahDiJalan()
    await conn.sendMessage(m.chat, { text: `🌲 *Kamu mulai memasuki kawasan hutan belantara yang lebat dan berkabut...* (🩸 HP: ${hp1})`, edit: key })

    await sleep(60000)
    let hp2 = await potongDarahDiJalan()
    await conn.sendMessage(m.chat, { text: `🌊 *Langkahmu terhenti sejenak untuk menyeberangi jembatan gantung tua di atas sungai deras...* (🩸 HP: ${hp2})`, edit: key })

    await sleep(60000)
    let hp3 = await potongDarahDiJalan()
    await conn.sendMessage(m.chat, { text: `🏔️ *Perjalanan berlanjut mendaki tebing berbatu, mencari jalur aman di antara lereng gunung...* (🩸 HP: ${hp3})`, edit: key })

    await sleep(60000)
    let hp4 = await potongDarahDiJalan()
    await conn.sendMessage(m.chat, { text: `🔍 *Kamu menemukan reruntuhan kuno tertutup semak-semak dan mencoba menyelidiki area sekitar...* (🩸 HP: ${hp4})`, edit: key })

    await sleep(60000)
    let hp5 = await potongDarahDiJalan()
    await conn.sendMessage(m.chat, { text: `⛺ *Duduk di atas batang pohon tumbang, kamu meneguk air dari persediaan untuk melepas lelah...* (🩸 HP: ${hp5})`, edit: key })

    await sleep(60000)
    let hp6 = await potongDarahDiJalan()
    await conn.sendMessage(m.chat, { text: `⚔️ *Sembari bersiaga, kamu berhasil menghalau gangguan beberapa goblin yang mengincar tas bawaanmu...* (🩸 HP: ${hp6})`, edit: key })

    await sleep(60000)
    let hp7 = await potongDarahDiJalan()
    await conn.sendMessage(m.chat, { text: `🏡 *Matahari mulai terbenam, kamu segera bergegas mengambil jalan pulang menuju gerbang desa...* (🩸 HP: ${hp7})`, edit: key })

  } catch (e) {
    console.error(e)
  }

  user = global.db.data.users[m.sender]

  let expDapat = Math.floor(Math.random() * 16) + 5
  let moneyDapat = Math.floor(Math.random() * 150) + 50

  user.exp += expDapat
  user.money += moneyDapat

  if (global.db?.write) await global.db.write()

  let teksHasil = `🚶‍♂️ *PETUALANGAN SANTAI SELESAI* 🚶‍♂️\n\n`
  teksHasil += `👤 *Petualang:* ${user.name}\n`
  teksHasil += `🩸 *Total Darah Berkurang:* -${totalDarahHilang} HP (Sisa: ${user.health} HP)\n\n`
  teksHasil += `🎒 *Hasil Nemu Di Jalan:*\n`
  teksHasil += ` ├ ✨ EXP Didapat: *+${expDapat} XP*\n`
  teksHasil += ` └ 💰 Uang Bonus: +$${moneyDapat}\n\n`
  teksHasil += `📊 *Total EXP Sekarang:* ${user.exp}`

  await conn.sendMessage(m.chat, { text: teksHasil.trim() }, { quoted: m })
}

handler.command = /^(adventure)$/i
handler.help = ["adventure"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler
