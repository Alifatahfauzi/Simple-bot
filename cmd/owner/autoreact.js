const handler = async (m, { conn, args, reply }) => {
  const input = (args[0] || "").toLowerCase()
  const id = conn.decodeJid(conn.user.id)

  if (input === "on") {
    global.db.data.settings[id].autoreact = true
    return reply("*⌗ autoreact berhasil di aktifkan...*")
  }

  if (input === "off") {
    global.db.data.settings[id].autoreact = false
    return reply("*⌗ autoreact berhasil di matikan...*")
  }

  return reply("pakai: .autoreact on/off")
}

handler.help = ["autoreact on/off"]
handler.tags = ["owner"]
handler.command = /^(autoreact)$/i
handler.owner = true

export default handler