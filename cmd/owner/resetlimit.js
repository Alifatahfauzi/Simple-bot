/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  const defaultLimit = 2
  let users = global.db?.data?.users
  if (!users) return m.reply("database tidak ditemukan")

  if (args[0] === "all") {
    for (let jid in users) {
      if (typeof users[jid] !== "object") users[jid] = {}
      users[jid].limit = defaultLimit
    }
    return m.reply(`berhasil reset limit semua user ke ${defaultLimit}`)
  }

  const target =
    m.mentionedJid?.[0] ||
    m.quoted?.sender ||
    (args[0] && args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net")

  if (!target) return m.reply("tag / reply / nomor\ncontoh: .resetlimit @user")

  if (typeof users[target] !== "object") users[target] = {}
  users[target].limit = defaultLimit

  await m.reply(
    `limit berhasil direset\n@${target.split("@")[0]} sekarang ${defaultLimit}`,
    { mentions: [target] }
  )
}

handler.command = /^(resetlimit)$/i
handler.tags = ["owner"]
handler.help = ["resetlimit @user"]
handler.owner = true
handler.limit = false

export default handler