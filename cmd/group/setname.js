/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args }) => {
  const name = args.join(" ").trim()
  if (!name) return m.reply("Masukkan nama grup.\nContoh: .setname Nama Baru")

  await conn.groupUpdateSubject(m.chat, name)
  return m.reply("Berhasil ubah nama grup.")
}

handler.command = /^(setname)$/i
handler.tags = ["group"]
handler.help = ["setname <nama>"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler