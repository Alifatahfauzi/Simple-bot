let handler = async (m, { conn }) => {

  if (!m.quoted) {
    return m.reply("Reply pesan yang ingin dihapus")
  }

  await conn.sendMessage(
    m.chat,
    {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.sender
      }
    }
  )
}

handler.command = /^(delmsg)$/i
handler.tags = ["tools"]
handler.help = ["delmsg"]

export default handler