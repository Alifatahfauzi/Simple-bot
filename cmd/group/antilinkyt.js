/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const handler = async (m, { args, db, chat, reply }) => {
  const input = (args[0] || "").toLowerCase()

  if (input === "on") {
    db.chats[chat].antiyoutube = true
    return reply("*⌗ antiyoutube berhasil di aktifkan...*")
  }

  if (input === "off") {
    db.chats[chat].antiyoutube = false
    return reply("*⌗ antiyoutube berhasil di matikan...*")
  }

  return reply("pakai: .antiyoutube / .antilinkyt on/off")
}

handler.help = ["antiyoutube on/off"]
handler.tags = ["group"]
handler.command = /^(antiyoutube|antilinkyt)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler