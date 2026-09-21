let handler = async (m, { conn, db, runtime }) => {
  const user = db.users[m.sender] || {}

  const d = new Date()
  const time = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Makassar" })
  const date = d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  const jam = d.getHours()

  let ucapan = "Selamat dini hari"
  if (jam >= 4 && jam < 10) ucapan = "Selamat pagi"
  else if (jam >= 10 && jam < 15) ucapan = "Selamat siang"
  else if (jam >= 15 && jam < 18) ucapan = "Selamat sore"
  else if (jam >= 18) ucapan = "Selamat malam"

  let body = `*✦ ${ucapan}, @${m.sender.split("@")[0]} ✦*\n`
  body += `_${date}_\n_${time} WITA_\n`

  let footer = `⿻ ｢ *User Info* ｣\n`
  footer += `⌗ Nama : ${m.pushName || "User"}\n`
  footer += `⌗ Status : ${user.premium ? "Premium" : "Freemium"}\n`
  footer += `⌗ Coin : ${user.limit || 0}\n`
  footer += `⌗ Level : Lv.${user.level || 0} • ${user.exp || 0} xp\n`
  footer += `⌗ HP : ${user.health || 100}/100\n`
  footer += `┈────────┈\n\n`

  footer += `⿻ ｢ *Bot Info* ｣\n`
  footer += `▧ Owner : Fauzialifatah\n`
  footer += `▧ Status : Online\n`
  footer += `▧ Mode : ${m.isGroup ? "Group" : "Private"}\n`
  footer += `▧ Database : ${Object.keys(db.users).length} Users\n`
  footer += `▧ Uptime : ${runtime(process.uptime())}\n`
  footer += `┈────────┈`

  await new global.ButtonV2(conn)
    .setTitle("simple")
    .setSubtitle(`lib - bailyes`)
    .setBody(body)
    .setFooter(footer)
    .setThumbnail(global.thumbnail)
    .setContextInfo({ mentionedJid: [m.sender] })
    .addRawButton({
      buttonText: { displayText: "menu" },
      buttonId: "menu-select",
      type: 1,
      nativeFlowInfo: {
        name: "single_select",
        paramsJson: JSON.stringify({
          title: "Click Here!",
          sections: [
            {
              title: global.namebotz || "Bot",
              highlight_label: "",
              rows: [
                { header: "", title: "List Menu", description: "Lihat semua fitur bot", id: `${global.prefix}allmenu` },
                { header: "", title: "Donasi", description: "Dukung pengembangan bot", id: `${global.prefix}donasi` }
              ]
            }
          ]
        })
      }
    })
    .send(m.chat, { quoted: m })
}

handler.command = /^(menu|help)$/i
handler.tags = ["main"]
handler.help = ["menu"]

handler.daftar = true

export default handler