/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  const target =
    m.mentionedJid?.[0] ||
    m.quoted?.sender ||
    (args[0] && args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net")

  const jumlah = parseInt(args.find(v => /^\d+$/.test(v)))

  if (!target) return m.reply("tag / reply / nomor\ncontoh: .dellimit @user 10")
  if (!jumlah || jumlah < 1) return m.reply("masukkan jumlah limit")

  const user = global.db.data.users[target] ||= { name: "User", limit: 0 }
  user.limit = Math.max(0, (user.limit || 0) - jumlah)

  m.reply(
    `Limit berhasil dikurangi\nUser: @${target.split("@")[0]}\n-${jumlah}\nSisa: ${user.limit}`,
    { mentions: [target] }
  )
}

handler.command = /^(dellimit)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["dellimit @user <jumlah>"]

export default handler