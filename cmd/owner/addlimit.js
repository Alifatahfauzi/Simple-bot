/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  let target = m.mentionedJid?.[0]
  if (!target) return m.reply("tag user\ncontoh: .addlimit @user,10")

  let jumlah = parseInt((args[0] || "").split(",")[1])
  if (!jumlah || jumlah < 1) return m.reply("format salah\ncontoh: .addlimit @user,10")

  let user = global.db.data.users[target]
  if (!user) return m.reply("user tidak ditemukan")

  user.limit = Number(user.limit) + jumlah

  m.reply(
    `Limit berhasil ditambah\nUser: @${target.split("@")[0]}\n+${jumlah}\nSisa: ${user.limit}`,
    { mentions: [target] }
  )
}

handler.command = /^(addlimit)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["addlimit @user,10"]

export default handler