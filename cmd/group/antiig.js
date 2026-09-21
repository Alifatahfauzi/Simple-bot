/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const handler = async (m, { args, db, chat, reply }) => {
  const input = (args[0] || "").toLowerCase()

  if (input === "on") {
    db.chats[chat].antiig = true
    return reply("*⌗ antiig berhasil di aktifkan...*")
  }

  if (input === "off") {
    db.chats[chat].antiig = false
    return reply("*⌗ antiig berhasil di matikan...*")
  }

  return reply("pakai: .antiig / .antilinkig on/off")
}

handler.help = ["antiig on/off"]
handler.tags = ["group"]
handler.command = /^(antiig|antilinkig)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler