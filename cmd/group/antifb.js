/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const handler = async (m, { args, db, chat, reply }) => {
  const input = (args[0] || "").toLowerCase()

  if (input === "on") {
    db.chats[chat].antifb = true
    return reply("*⌗ antifb berhasil di aktifkan...*")
  }

  if (input === "off") {
    db.chats[chat].antifb = false
    return reply("*⌗ antifb berhasil di matikan...*")
  }

  return reply("pakai: .antifb / .antilinkfb on/off")
}

handler.help = ["antifb on/off"]
handler.tags = ["group"]
handler.command = /^(antifb|antilinkfb)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler