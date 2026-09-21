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

  if (!target) return m.reply("tag / reply / nomor\ncontoh: .delprem @user")

  const user = global.db.data.users[target]
  if (!user) return m.reply("user tidak ditemukan")

  user.premium = false

  m.reply(`Premium berhasil dihapus\nUser: @${target.split("@")[0]}`, {
    mentions: [target]
  })
}

handler.command = /^(delprem|delpremium)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["delprem @user"]

export default handler