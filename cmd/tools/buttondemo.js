let handler = async (m, { conn }) => {
  const btn = new global.ButtonV2(conn)
    .setTitle(global.namebotz || "WhatsApp Bot")
    .setSubtitle("Demo Semua Fitur Button")
    .setBody(`Halo @${m.sender.split("@")[0]}\n\nIni contoh semua jenis button yang tersedia.`)
    .setFooter(global.footer)
    .setThumbnail(global.thumbnail)
    .setContextInfo({ mentionedJid: [m.sender] })
    .addButton("📋 Menu", `${global.prefix}allmenu`)
    .addUrl("🔗 Owner", `https://wa.me/${global.owner[0]}`)
    .addCopy("📄 Copy Kode", "NIXEL-1234")
    .addCall("📞 Telepon", global.owner[0])
    .addSelection("📂 Pilih Kategori")
    .makeSections("Kategori Utama")

  btn.makeRow("AI", "Fitur AI", `${global.prefix}allmenu ai`)
  btn.makeRow("Tools", "Fitur Tools", `${global.prefix}allmenu tools`)
  btn.makeRow("Download", "Fitur Download", `${global.prefix}allmenu download`)

  await btn.send(m.chat, { quoted: m })
}

handler.command = /^(buttondemo)$/i
handler.tags = ["tools"]
handler.help = ["buttondemo"]
handler.owner = true

export default handler