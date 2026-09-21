let handler = async (m, { conn, args, sleep }) => {
  let user = global.db.data.users[m.sender]

  const kayuPerangkap = 15
  const duitPerangkap = 200

  const kayuPagar = 30
  const duitPagar = 450

  let type = (args[0] || '').toLowerCase()

  if (!type || !['perangkap', 'pagar'].includes(type)) {
    let menuCraft = `🛠️ *WORKBENCH CRAFTING RPG* 🛠️\n\n`
    menuCraft += `Silakan racik bahan tokomu untuk membuat alat bantu pertahanan!\n\n`
    menuCraft += `📦 *Resep yang Tersedia:*\n\n`
    menuCraft += ` ├ 🕸️ **perangkap** (Perangkap Kayu)\n`
    menuCraft += ` ├ 🪵 Kebutuhan: ${kayuPerangkap} Batang Kayu (Milikmu: ${user.kayu})\n`
    menuCraft += ` └ 💰 Biaya Tukang: $${duitPerangkap} (Milikmu: $${user.money})\n\n`
    menuCraft += ` ├ 🚧 **pagar** (Pagar Rumah Kokoh)\n`
    menuCraft += ` ├ 🪵 Kebutuhan: ${kayuPagar} Batang Kayu (Milikmu: ${user.kayu})\n`
    menuCraft += ` └ 💰 Biaya Tukang: $${duitPagar} (Milikmu: $${user.money})\n\n`
    menuCraft += `💡 *Cara Membuat:* Ketik *${global.prefix}craft <nama-item>*`
    return m.reply(menuCraft.trim())
  }

  if (type === 'perangkap') {
    if (user.kayu < kayuPerangkap) {
      return m.reply(`❌ Kayu kamu tidak cukup! Kamu butuh *${kayuPerangkap} batang kayu*, sedangkan kamu hanya punya *${user.kayu} batang kayu*.`)
    }
    if (user.money < duitPerangkap) {
      return m.reply(`❌ Uang kamu tidak cukup! Dibutuhkan *$${duitPerangkap}*, sedangkan dompetmu hanya berisi *$${user.money}*.`)
    }

    user.kayu -= kayuPerangkap
    user.money -= duitPerangkap
    user.perangkap += 1

    if (global.db?.write) await global.db.write()

    let { key } = await m.reply(`🛠️ Mempersiapkan bahan baku kayu...`)
    
    await sleep(2000)
    await conn.sendMessage(m.chat, { text: `🔨 Mulai merakit komponen perangkap...`, edit: key })

    await sleep(2000)
    await conn.sendMessage(m.chat, { text: `⚙️ Memasang mekanisme pegas pertahanan...`, edit: key })

    await sleep(2000)
    let teksSukses = `🔨 *CRAFTING BERHASIL SUKSES* 🔨\n\n`
    teksSukses += `🎉 Selamat *${user.name}*, kamu berhasil merakit sebuah peralatan baru!\n`
    teksSukses += ` ├ 🕸️ Item Baru: *+1 Perangkap Kayu*\n`
    teksSukses += ` ├ 🪵 Sisa Kayu: ${user.kayu} Batang\n`
    teksSukses += ` └ 💰 Sisa Uang: $${user.money}\n\n`
    teksSukses += `💡 *Kegunaan:* Perangkap ini akan otomatis melukai pencuri (*-HP*) saat mereka mencoba membobol rumahmu lewat perintah *${global.prefix}mencuri*!`
    
    return await conn.sendMessage(m.chat, { text: teksSukses.trim(), edit: key })
  }

  if (type === 'pagar') {
    if (user.kayu < kayuPagar) {
      return m.reply(`❌ Kayu kamu tidak cukup! Kamu butuh *${kayuPagar} batang kayu*, sedangkan kamu hanya punya *${user.kayu} batang kayu*.`)
    }
    if (user.money < duitPagar) {
      return m.reply(`❌ Uang kamu tidak cukup! Dibutuhkan *$${duitPagar}*, sedangkan dompetmu hanya berisi *$${user.money}*.`)
    }

    user.kayu -= kayuPagar
    user.money -= duitPagar
    user.perangkap += 3

    if (global.db?.write) await global.db.write()

    let { key } = await m.reply(`🪵 Memotong dan menghaluskan balok kayu...`)

    await sleep(2000)
    await conn.sendMessage(m.chat, { text: `🔨 Mendirikan pondasi tiang pertahanan...`, edit: key })

    await sleep(2000)
    await conn.sendMessage(m.chat, { text: `🚧 Memperkuat struktur anyaman pagar...`, edit: key })

    await sleep(2000)
    let teksSukses = `🔨 *CRAFTING BERHASIL SUKSES* 🔨\n\n`
    teksSukses += `🎉 Selamat *${user.name}*, kamu berhasil membangun pertahanan baru!\n`
    teksSukses += ` ├ 🚧 Item Baru: *+1 Pagar Rumah Kokoh* (+3 Poin Perangkap)\n`
    teksSukses += ` ├ 🪵 Sisa Kayu: ${user.kayu} Batang\n`
    teksSukses += ` └ 💰 Sisa Uang: $${user.money}\n\n`
    teksSukses += `💡 *Kegunaan:* Pagar rumah memberikan perlindungan ekstra tinggi yang setara dengan memasang 3 perangkap sekaligus untuk menghalau para pencuri!`
    
    return await conn.sendMessage(m.chat, { text: teksSukses.trim(), edit: key })
  }
}

handler.command = /^(craft)$/i
handler.help = ["craft"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler