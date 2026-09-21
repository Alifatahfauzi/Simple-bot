/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

const handler = async (m, { conn, args, reply }) => {
  const input = (args[0] || "").toLowerCase()
  const id = conn.decodeJid(conn.user.id)

  if (input === "on") {
    global.db.data.settings[id].autotyping = true
    return reply("*⌗ autotyping berhasil di aktifkan...*")
  }

  if (input === "off") {
    global.db.data.settings[id].autotyping = false
    return reply("*⌗ autotyping berhasil di matikan...*")
  }

  return reply("pakai: .autotyping on/off")
}

handler.help = ["autotyping on/off"]
handler.tags = ["owner"]
handler.command = /^(autotyping)$/i
handler.rowner = true

export default handler