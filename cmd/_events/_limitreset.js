let handler = m => m

handler.before = async function () {
  if (!global.db?.data) return true

  const now = new Date()
  const today = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`

  if (global.lastLimitReset === today) return true

  for (const jid in global.db.data.users) {
    const user = global.db.data.users[jid]
    if (!user) continue

    user.limit = Number(global.limit)
    user.lastLimitReset = today
  }

  global.lastLimitReset = today

  return true
}

export default handler