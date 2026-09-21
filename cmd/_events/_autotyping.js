let handler = m => m

handler.before = async function (m, { conn }) {

  const id = conn.decodeJid(conn.user.id)

  const settings = global.db.data.settings[id]

  if (!settings?.autotyping) return true
  if (m.key.fromMe) return true

  await conn.sendPresenceUpdate("composing", m.chat)

  return true
}

export default handler