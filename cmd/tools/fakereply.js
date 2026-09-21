let handler = async (m, { conn, text, reply }) => {
  if (!text) {
    return reply(
      `Contoh penggunaan:\n.fake pesan palsu @tag pesan asli`
    )
  }

  let jid

  if (text.includes("@0")) {
    jid = "0@s.whatsapp.net"
  } else if (m.isGroup) {
    jid = m.mentionedJid?.[0]
  } else {
    jid = m.chat
  }

  if (!jid) {
    return reply(
      `Tag target terlebih dahulu.\n\nContoh:\n.fake halo @user saya asli`
    )
  }

  let tag = "@" + jid.split("@")[0]
  let [fake, ...real] = text.split(tag)

  fake = fake?.trim()
  real = real.join(tag).trim()

  if (!fake || !real) {
    return reply(
      `Format salah.\n\nContoh:\n.fake halo @user saya asli`
    )
  }

  await conn.sendMessage(
    m.chat,
    {
      text: real,
      mentions: [jid]
    },
    {
      quoted: {
        key: {
          fromMe: false,
          participant: jid,
          remoteJid: m.chat
        },
        message: {
          conversation: fake
        }
      }
    }
  )
}

handler.command = /^(fake|fakereply|fitnah)$/i
handler.help = ["fake"]
handler.tags = ["tools"]

export default handler