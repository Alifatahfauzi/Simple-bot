/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let lastCheck = 0

let handler = m => m

handler.before = async function (m) {
  if (!global.db?.data) return true

  let now = Date.now()
  if (now - lastCheck < 10000) return true
  lastCheck = now

  for (let id in global.db.data.chats) {
    let chat = global.db.data.chats[id]
    if (!chat || !chat.sewa) continue
    if (!chat.sewaExpired) continue
    if (now < Number(chat.sewaExpired)) continue

    chat.sewa = false
    chat.sewaExpired = 0

    await this.sendMessage(id, {
      text: "‼️Masa sewa bot di grup ini sudah habis. Bot akan keluar otomatis📢"
    }).catch(() => null)

    await this.groupLeave(id).catch(() => null)
  }

  return true
}

export default handler