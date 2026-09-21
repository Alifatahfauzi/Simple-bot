/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""

  if (!/image/.test(mime))
    return m.reply("Reply gambar dengan caption .setppgc")

  let img = await q.download()
  if (!img)
    return m.reply("Gambar tidak ditemukan")

  await conn.updateProfilePicture(m.chat, img)
  m.reply("Berhasil mengubah foto profil grup.")
}

handler.help = ["setppgc"]
handler.tags = ["group"]
handler.command = /^(setppgc)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler