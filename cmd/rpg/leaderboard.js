let handler = async (m, { conn, args }) => {
  let users = Object.entries(global.db.data.users).map(([jid, user]) => {
    return { jid, ...user }
  })

  let type = (args[0] || '').toLowerCase() === 'money' ? 'money' : 'level'

  let sortedUsers = users.sort((a, b) => (b[type] || 0) - (a[type] || 0))

  let topTen = sortedUsers.slice(0, 10)

  let teks = `🏆 *LEADERBOARD RPG - TOP 10* 🏆\n`
  teks += `Urutan berdasarkan: *${type.toUpperCase()}*\n\n`

  let nomor = 1
  for (let user of topTen) {
    let nama = user.name || 'User'
    let nilai = type === 'money' ? `$${user.money}` : `Lv. ${user.level}`

    let medal = nomor === 1 ? '🥇' : nomor === 2 ? '🥈' : nomor === 3 ? '🥉' : '✨'

    teks += `${medal} *${nomor}.* ${nama}\n`
    teks += `   └ 📊 ${type === 'money' ? 'Kekayaan' : 'Tingkat'}: *${nilai}* • ${user.role}\n\n`
    nomor++
  }

  teks += `💡 *Tips:* Ketik *${global.prefix}leaderboard money* untuk melihat daftar user paling kaya!`

  m.reply(teks.trim())
}

handler.command = /^(leaderboard)$/i
handler.help = ["leaderboard"]
handler.tags = ["rpg"]
handler.daftar = true

export default handler
