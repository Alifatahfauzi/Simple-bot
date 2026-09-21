let handler = async (m, { conn, reply }) => {
  try {
    let total = 0
    const kategori = {}

    for (const plugin of Object.values(global.plugins || {})) {
      if (!plugin || plugin.disabled || plugin.before) continue
      if (!plugin.help || !plugin.tags) continue

      const helps = Array.isArray(plugin.help) ? plugin.help : [plugin.help]
      const tags = Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]

      total += helps.length
      for (const tag of tags) {
        kategori[tag] = (kategori[tag] || 0) + helps.length
      }
    }

    const list = Object.entries(kategori).sort((a, b) => b[1] - a[1])
    const max = list.length ? list[0][1] : 1
    const barLen = 12
    const bar = n => {
      const filled = Math.round((n / max) * barLen)
      return "▰".repeat(filled) + "▱".repeat(barLen - filled)
    }

    const uptime = process.uptime()
    const h = Math.floor(uptime / 3600)
    const min = Math.floor((uptime % 3600) / 60)

    const body = `┌─「 ${global.namebotz || "Bot"} 」\n│ Total fitur : ${total}\n│ Kategori    : ${list.length}\n│ Uptime      : ${h}j ${min}m\n└─────────────`

    let footer = `📊 Distribusi Fitur\n\n`
    for (const [tag, count] of list) {
      const persen = ((count / total) * 100).toFixed(1)
      const nama = tag.charAt(0).toUpperCase() + tag.slice(1)
      footer += `*${nama}* — ${count} (${persen}%)\n${bar(count)}\n\n`
    }

    return await conn.sendButton(m.chat, body, footer.trim(), [], { quoted: m })
  } catch {
    return reply("> Gagal menghitung total fitur")
  }
}

handler.command = /^totalfitur$/i
handler.tags = ["tools"]
handler.help = ["totalfitur"]
handler.daftar = true

export default handler