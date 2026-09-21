/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args }) => {
  const metadata = await conn.groupMetadata(m.chat)
  const participants = metadata.participants || []
  const mentions = participants.map(v => v.id)

  const teks = args.join(" ").trim()
  const header = teks ? teks + "\n\n" : ""

  const list = participants.map(v => {
    const jid = v.phoneNumber || v.id
    return `@${String(jid).split("@")[0]}`
  }).join("\n")

  return conn.sendMessage(
    m.chat,
    { text: header + list, mentions },
    { quoted: m }
  )
}

handler.command = /^(tagall)$/i
handler.tags = ["group"]
handler.help = ["tagall <teks>"]
handler.group = true
handler.admin = true

export default handler