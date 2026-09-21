/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args }) => {
  const desc = args.join(" ").trim()
  if (!desc) return m.reply("Masukkan deskripsi.\nContoh: .setdesc Deskripsi grup")

  await conn.groupUpdateDescription(m.chat, desc)
  return m.reply("Berhasil ubah deskripsi grup.")
}

handler.command = /^(setdesc)$/i
handler.tags = ["group"]
handler.help = ["setdesc <deskripsi>"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler