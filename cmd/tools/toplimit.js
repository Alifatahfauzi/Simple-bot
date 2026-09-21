let handler = async (m, { conn }) => {
  let users = global.db?.data?.users || {}
  let list = Object.keys(users)
    .map(jid => ({
      jid,
      limit: Number(users[jid]?.limit || 0),
      name: users[jid]?.name || jid.split("@")[0]
    }))
    .sort((a, b) => b.limit - a.limit)
    .slice(0, 10)

  if (!list.length) return m.reply("data user kosong")

  let text = "*TOP LIMIT*\n\n" + list
    .map((v, i) => `${i + 1}. ${v.name}\n@${v.jid.split("@")[0]} • ${v.limit}`)
    .join("\n\n")

  await conn.sendMessage(
    m.chat,
    { text, mentions: list.map(v => v.jid) },
    { quoted: m }
  )
}

handler.command = /^(toplimit)$/i
handler.tags = ["tools"]
handler.help = ["toplimit"]
handler.limit = false
handler.group = true

export default handler