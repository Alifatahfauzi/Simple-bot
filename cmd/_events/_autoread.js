let handler = m => m

handler.before = async function (m, { conn }) {

  const id = conn.decodeJid(conn.user.id)

  const settings = global.db.data.settings[id]

  if (!settings?.autoread) return true
  if (m.key.fromMe) return true

  await conn.readMessages([m.key])

  await conn.sendMessage(
    m.chat,
    {
      react: {
        text: "👀",
        key: m.key
      }
    }
  )

  return true
}

export default handler