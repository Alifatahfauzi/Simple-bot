/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  const metadata = await conn.groupMetadata(m.chat)
  const participants = metadata.participants || []
  const admins = participants.filter(v => v.admin)

  if (!admins.length) return m.reply("Admin tidak ditemukan.")

  const mentions = admins.map(v => v.id)

  const list = admins.map(v => {
    const jid = v.phoneNumber || v.id
    return `- @${String(jid).split("@")[0]} (${v.admin})`
  }).join("\n")

  const teks = ["LIST ADMIN", "", list].join("\n")

  return conn.sendMessage(m.chat, { text: teks, mentions }, { quoted: m })
}

handler.command = /^(listadmin)$/i
handler.tags = ["group"]
handler.help = ["listadmin"]
handler.group = true

export default handler