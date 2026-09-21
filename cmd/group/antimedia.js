/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const handler = async (m, { args, db, chat, reply }) => {
  const input = (args[0] || "").toLowerCase()

  if (input === "on") {
    db.chats[chat].antimedia = true
    return reply("*⌗ antimedia berhasil di aktifkan...*")
  }

  if (input === "off") {
    db.chats[chat].antimedia = false
    return reply("*⌗ antimedia berhasil di matikan...*")
  }

  return reply("pakai: .antimedia on/off")
}

handler.help = ["antimedia on/off"]
handler.tags = ["group"]
handler.command = /^(antimedia)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler