/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  let botJid = conn.decodeJid(conn.user.id)
  if (!global.db.data.settings[botJid].self) return m.reply('Mode *Public* sudah aktif sebelumnya.')
  
  global.db.data.settings[botJid].self = false
  await m.reply('Berhasil mengubah ke mode *Public*.\n\nSekarang bot dapat digunakan oleh semua orang.')
}

handler.help = ['public']
handler.tags = ['owner']
handler.command = /^(public)$/i
handler.owner = true

export default handler