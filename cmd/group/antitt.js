/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const handler = async (m, { args, db, chat, reply }) => {
  const input = (args[0] || "").toLowerCase()

  if (input === "on") {
    db.chats[chat].antitt = true
    return reply("*⌗ antitt berhasil di aktifkan...*")
  }

  if (input === "off") {
    db.chats[chat].antitt = false
    return reply("*⌗ antitt berhasil di matikan...*")
  }

  return reply("pakai: .antitt / .antilinktt on/off")
}

handler.help = ["antitt on/off"]
handler.tags = ["group"]
handler.command = /^(antitt|antilinktt)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler