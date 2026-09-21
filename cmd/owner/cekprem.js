/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args }) => {
  const target =
    m.mentionedJid?.[0] ||
    m.quoted?.sender ||
    (args[0] && args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net") ||
    m.sender

  const user = global.db.data.users[target]
  if (!user) return m.reply("user tidak ditemukan")

  m.reply(
    `Status Premium\n` +
    `User: @${target.split("@")[0]}\n` +
    `Premium: ${user.premium ? "Yes" : "No"}`,
    { mentions: [target] }
  )
}

handler.command = /^(cekprem|checkprem)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["cekprem"]

export default handler