let handler = async (m, { conn, reply }) => {
  try {
    const prefix = global.prefix || "."
    const kategori = {}

    for (const plugin of Object.values(global.plugins || {})) {
      if (!plugin || plugin.disabled || plugin.before) continue
      if (!plugin.help || !plugin.tags) continue

      const helps = Array.isArray(plugin.help) ? plugin.help : [plugin.help]
      const tags = Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]

      for (const tag of tags) {
        if (!kategori[tag]) kategori[tag] = []
        for (const h of helps) kategori[tag].push(h)
      }
    }

    const urutan = Object.keys(kategori).sort()
    let total = 0

    let body = `┌─「 *${global.namebotz || "Bot"}* 」\n`
    for (const tag of urutan) {
      const list = [...new Set(kategori[tag])].sort()
      total += list.length

      const nama = tag.charAt(0).toUpperCase() + tag.slice(1)
      body += `│\n├─「 *${nama}* 」\n`
      for (const h of list) {
        body += `│ ➥ ${prefix}${h}\n`
      }
    }
    body += `│\n└─「 Total : ${total} fitur 」`

    const footer = `Gunakan *${prefix}menu* untuk kembali ke menu utama.`

    return await conn.sendButton(m.chat, body, footer, [], { quoted: m })
  } catch (e) {
    return reply("> Gagal memuat allmenu")
  }
}

handler.command = /^allmenu$/i
handler.tags = ["main"]
handler.help = ["allmenu"]

export default handler