/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args }) => {
  const text = args.join(" ").trim()
  if (!text) return m.reply("masukkan informasi\ncontoh: .shareinfo bot sedang maintenance")

  const me = conn.decodeJid(conn.user.id)
  const users = Object.keys(global.db.data.users || {}).filter(jid =>
    jid !== me &&
    (jid.endsWith("@s.whatsapp.net") || jid.endsWith("@lid"))
  )

  if (!users.length) return m.reply("tidak ada user di database")

  let sukses = 0
  let gagal = 0

  m.reply(`mengirim informasi ke ${users.length} user...`)

  for (const jid of users) {
    try {
      await conn.sendMessage(jid, { text })
      sukses++
      await new Promise(r => setTimeout(r, 15000))
    } catch {
      gagal++
    }
  }

  m.reply(
    `berhasil mengirim informasi\n\n` +
    `total user: ${users.length}\n` +
    `berhasil: ${sukses}\n` +
    `gagal: ${gagal}`
  )
}

handler.command = /^(shareinfo|bcuser)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["shareinfo <teks>"]

export default handler