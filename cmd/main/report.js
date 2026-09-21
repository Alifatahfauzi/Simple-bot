let handler = async (m, { conn, text }) => {

  if (!text) {
    return m.reply("Masukkan laporan bug/problem")
  }

  let teks = `
*乂 R E P O R T - B U G*

› Sender : @${m.sender.split("@")[0]}
› Report : ${text}

Laporan berhasil dikirim ke owner.
`.trim()

  await conn.sendMessage(
    global.nomorown + "@s.whatsapp.net",
    {
      text: teks,
      mentions: [m.sender]
    }
  )

  await conn.sendMessage(
    m.chat,
    {
      text: "Report berhasil dikirim ke owner."
    },
    {
      quoted: m
    }
  )
}

handler.command = /^(report)$/i
handler.tags = ["main"]
handler.help = ["report <text>"]

export default handler