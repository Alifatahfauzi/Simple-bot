/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply("Masukkan nomor.\nContoh: .add 6282199509537")

  let num = args[0].replace(/[^0-9]/g, "")
  if (!num) return m.reply("Nomor tidak valid.")

  const jid = num + "@s.whatsapp.net"

  await conn.groupParticipantsUpdate(m.chat, [jid], "add")
  return m.reply("Berhasil add.")
}

handler.command = /^(add)$/i
handler.tags = ["group"]
handler.help = ["add <nomor>"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler