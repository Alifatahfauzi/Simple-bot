let handler = async (m, { conn, text }) => {

  if (!text) {
    return m.reply("Masukkan request fitur")
  }

  let teks = `
*乂 R E Q U E S T - F I T U R*

› Sender : @${m.sender.split("@")[0]}
› Request : ${text}

Request berhasil dikirim ke developer.
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
      text: "Request fitur berhasil dikirim."
    },
    {
      quoted: m
    }
  )
}

handler.command = /^(request|reqfitur)$/i
handler.tags = ["main"]
handler.help = ["request <text>"]

export default handler