let handler = async (m, { conn, args }) => {
  // Ambil teks dari ketikan langsung (args) ATAU dari pesan yang di-reply (m.quoted)
  let text = args.length > 0 ? args.join(" ") : (m.quoted ? m.quoted.text || m.quoted.body : "")

  if (!text) return m.reply("Ketik teks pesannya atau reply pesan yang ada teksnya.\nContoh: .crm Uji coba relay message")

  const messageContent = {
    extendedTextMessage: {
      text: text,
      contextInfo: {
        participant: m.quoted ? m.quoted.sender : "0@s.whatsapp.net", // Menyesuaikan target reply
        stanzaId: m.quoted ? m.quoted.id : "SYSTEM_MSG_123", // Mengambil ID pesan target
        quotedMessage: {
          conversation: "Pesan ini dikirim menggunakan raw relayMessage."
        }
      }
    }
  }

  await conn.relayMessage(m.chat, messageContent, { 
    messageId: conn.generateMessageTag() 
  })
}

handler.command = /^(crm)$/i
handler.tags = ["owner"]
handler.help = ["crm"]

handler.daftar = false
handler.premium = false
handler.group = false
handler.admin = false
handler.private = false
handler.owner = true
handler.botAdmin = false
handler.limit = false

export default handler