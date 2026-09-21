let handler = async (m, { conn, args }) => {
  let user = global.db.data.users[m.sender]
  let action = (args[0] || "").toLowerCase()
  let item = (args[1] || "").toLowerCase()
  let jumlah = parseInt(args[2])

  let dagingMentah = Object.keys(user).filter(key => key.startsWith("daging_"))
  let listNama = dagingMentah.map(key => key.replace("daging_", ""))

  if (action === "masak") {
    if (!listNama.includes(item)) return m.reply(`❌ Jenis daging tidak valid!\nPilihan yang tersedia: ${listNama.join(", ")}\n💡 Contoh: *.dapur masak ayam 5*`)
    if (isNaN(jumlah) || jumlah <= 0) return m.reply("❌ Masukkan jumlah daging yang ingin dimasak dengan benar!\n💡 Contoh: *.dapur masak ayam 5*")

    let dbMentah = `daging_${item}`
    let dbMatang = `masak_${item}`

    user[dbMatang] = user[dbMatang] || 0

    if (user[dbMentah] < jumlah) return m.reply(`❌ Daging mentah kamu tidak cukup! Kamu hanya memiliki *${user[dbMentah]}* daging ${item} mentah.`)
    if (user.kayu < jumlah) return m.reply(`❌ Kayu bakar kamu tidak cukup! Memasak *${jumlah}* daging butuh *${jumlah}* batang kayu. Kamu hanya memiliki *${user.kayu}* kayu.`)

    user[dbMentah] -= jumlah
    user.kayu -= jumlah
    user[dbMatang] += jumlah

    if (global.db?.write) await global.db.write()

    let teksMasak = `🍳 *KEGIATAN MEMASAK RPG* 🍳\n\n`
    teksMasak += `🔥 Berhasil memasak: *${jumlah} Daging ${item.replace(/^\w/, c => c.toUpperCase())} Matang*\n`
    teksMasak += `🪵 Kayu bakar digunakan: -${jumlah} batang\n\n`
    teksMasak += `🎒 Stok hidangan matangmu:\n`
    teksMasak += ` └ 🍖 Daging Matang: ${user[dbMatang]} pcs\n\n`
    teksMasak += `💡 Ketik \`.dapur makan ${item} 1\` untuk memulihkan darahmu.`
    return m.reply(teksMasak)
  }

  if (action === "makan") {
    if (!listNama.includes(item)) return m.reply(`❌ Hidangan makanan tidak ditemukan!\nPilihan yang tersedia: ${listNama.join(", ")}\n💡 Contoh: *.dapur makan ayam 1*`)
    if (isNaN(jumlah) || jumlah <= 0) return m.reply("❌ Masukkan jumlah makanan yang ingin dimakan dengan benar!\n💡 Contoh: *.dapur makan ayam 1*")
    if (user.health >= 100) return m.reply("❤️ Darah kamu sudah penuh (100 HP)!")

    let dbMatang = `masak_${item}`
    user[dbMatang] = user[dbMatang] || 0

    if (user[dbMatang] < jumlah) return m.reply(`❌ Kamu tidak memiliki hidangan *Daging ${item.replace(/^\w/, c => c.toUpperCase())} Matang* di tas! Masak terlebih dahulu.`)

    let indeksDaging = listNama.indexOf(item) + 1
    let poinHealSatuan = indeksDaging * 15
    let totalHeal = poinHealSatuan * jumlah

    user[dbMatang] -= jumlah
    user.health = Math.min(100, user.health + totalHeal)

    if (global.db?.write) await global.db.write()

    let teksMakan = `🍽️ *MENGKONSUMSI HIDANGAN* 🍽️\n\n`
    teksMakan += `👤 *Karakter:* ${user.name}\n`
    teksMakan += `🍖 Memakan: *${jumlah} Daging ${item.replace(/^\w/, c => c.toUpperCase())} Matang*\n`
    teksMakan += `🩸 Efek Pemulihan: *+${totalHeal} HP*\n\n`
    teksMakan += `❤️ Status Darah Sekarang: *${user.health} / 100 HP*`
    return m.reply(teksMakan)
  }

  let teksMenu = `🍳 *DAPUR & KULINER DESA RPG* 🍳\n\n`
  teksMenu += `Halo *${user.name}*, di sini kamu bisa mengolah daging mentah menjadi makanan siap saji menggunakan kayu bakar agar bisa memulihkan HP!\n\n`
  
  teksMenu += `🥩 *Persediaan Daging Mentah:*\n`
  for (let nama of listNama) {
    teksMenu += ` ├ ${nama.replace(/^\w/, c => c.toUpperCase())}: ${user[`daging_${nama}`]} pcs\n`
  }
  teksMenu += `\n🍖 *Persediaan Makanan Matang:*\n`
  for (let i = 0; i < listNama.length; i++) {
    let nama = listNama[i]
    let poin = (i + 1) * 15
    user[`masak_${nama}`] = user[`masak_${nama}`] || 0
    teksMenu += ` ├ ${nama.replace(/^\w/, c => c.toUpperCase())} Matang: ${user[`masak_${nama}`]} pcs (+${poin} HP/pcs)\n`
  }

  teksMenu += `\n🪵 *Kayu Bakarmu:* ${user.kayu} batang\n`
  teksMenu += `🩸 *Darahmu saat ini:* ${user.health} HP\n\n`
  teksMenu += `💡 *Panduan Perintah:* \n`
  teksMenu += ` ├ 🍳 Mengolah: \`.dapur masak [jenis_daging] [jumlah]\`\n`
  teksMenu += ` └ 🍽️ Menyantap: \`.dapur makan [jenis_daging] [jumlah]\``

  m.reply(teksMenu.trim())
}

handler.command = /^(dapur)$/i
handler.help = ["dapur"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler