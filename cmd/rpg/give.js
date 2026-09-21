let handler = async (m, { conn, args }) => {
  let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : ''

  let itemIdx = m.mentionedJid && m.mentionedJid[0] ? 1 : m.quoted ? 0 : -1
  let countIdx = itemIdx !== -1 ? itemIdx + 1 : -1

  let item = itemIdx !== -1 && args[itemIdx] ? args[itemIdx].toLowerCase() : ''
  let count = countIdx !== -1 && args[countIdx] ? parseInt(args[countIdx]) : NaN

  if (!target || !item || isNaN(count) || count <= 0) {
    let teksTutor = `👑 *OWNER GIVE SYSTEM* 👑\n\n`
    teksTutor += `Gunakan fitur ini untuk memberikan item RPG kepada pengguna!\n\n`
    teksTutor += `💡 *Format Penggunaan:*\n`
    teksTutor += ` ├ 🏷️ *${global.prefix}give <tag/reply> <nama-item> <jumlah>*\n`
    teksTutor += ` └ 📝 Contoh: *${global.prefix}give @user money 1000*\n\n`
    teksTutor += `📦 *Daftar Item RPG Umum:*\n`
    teksTutor += ` ├ money, exp, limit\n`
    teksTutor += ` ├ kayu, perangkap\n`
    teksTutor += ` └ daging_ayam, daging_kelinci, daging_rusa`
    return conn.sendMessage(m.chat, { text: teksTutor.trim() }, { quoted: m })
  }

  if (!global.db.data.users[target]) {
    return conn.sendMessage(m.chat, { text: `❌ Pengguna tidak ditemukan di dalam database bot!` }, { quoted: m })
  }

  if (typeof global.db.data.users[target][item] === 'undefined') {
    return conn.sendMessage(m.chat, { text: `❌ Item *${item}* tidak terdaftar di dalam database RPG pengguna!` }, { quoted: m })
  }

  global.db.data.users[target][item] += count
  if (global.db?.write) await global.db.write()

  let teksSukses = `🎁 *GIVE ITEM SUCCESS* 🎁\n\n`
  teksSukses += `Owner berhasil mengirimkan pasokan barang RPG baru!\n`
  teksSukses += ` ├ 👤 Penerima: @${target.split('@')[0]}\n`
  teksSukses += ` ├ 📦 Nama Item: *${item}*\n`
  teksSukses += ` ├ 📈 Jumlah Dikirim: +${count}\n`
  teksSukses += ` └ 💰 Total Sekarang: ${global.db.data.users[target][item]}\n\n`
  teksSukses += `💡 Selamat bermain dan gunakan barang tersebut dengan bijak!`

  await conn.sendMessage(m.chat, {
    text: teksSukses.trim(),
    contextInfo: {
      mentionedJid: [target]
    }
  }, { quoted: m })
}

handler.command = /^(give)$/i
handler.help = ["give"]
handler.tags = ["owner"]
handler.owner = true
handler.group = true

export default handler