/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const handler = async (m, { args, db, chat, reply }) => {
  const input = (args[0] || "").toLowerCase()

  if (input === "on") {
    db.chats[chat].antipromosi = true
    return reply("*⌗ antipromosi berhasil di aktifkan...*")
  }

  if (input === "off") {
    db.chats[chat].antipromosi = false
    return reply("*⌗ antipromosi berhasil di matikan...*")
  }

  return reply("pakai: .antipromosi on/off")
}

handler.help = ["antipromosi on/off"]
handler.tags = ["group"]
handler.command = /^(antipromosi)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler