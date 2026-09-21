/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  let botJid = conn.decodeJid(conn.user.id)
  if (global.db.data.settings[botJid].self) return m.reply('Mode *Self* sudah aktif sebelumnya.')
  
  global.db.data.settings[botJid].self = true
  await m.reply('Berhasil mengubah ke mode *Self*.\n\nSekarang bot hanya merespon Owner.')
}

handler.help = ['self']
handler.tags = ['owner']
handler.command = /^(self)$/i
handler.owner = true

export default handler