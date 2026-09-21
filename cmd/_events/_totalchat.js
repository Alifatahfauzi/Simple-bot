/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = m => m

handler.before = async function (m) {
  if (!global.db?.data) return true
  if (!m?.sender || !m.isGroup) return true
  if (m.isBaileys) return true
  if (!m.message) return true
  if (!global.db.data.users[m.sender]) return true

  global.db.data.users[m.sender].totalchat += 1

  return true
}

export default handler