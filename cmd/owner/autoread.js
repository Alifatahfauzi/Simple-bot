/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

const handler = async (m, { conn, args, reply }) => {
  const input = (args[0] || "").toLowerCase()
  const id = conn.decodeJid(conn.user.id)

  if (input === "on") {
    global.db.data.settings[id].autoread = true
    return reply("*⌗ autoread berhasil di aktifkan...*")
  }

  if (input === "off") {
    global.db.data.settings[id].autoread = false
    return reply("*⌗ autoread berhasil di matikan...*")
  }

  return reply("pakai: .autoread on/off")
}

handler.help = ["autoread on/off"]
handler.tags = ["owner"]
handler.command = /^(autoread)$/i
handler.rowner = true

export default handler