/* 
 - Created by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

let handler = async (m, { conn }) => {
  let teks = `
🛒 *SHOP PREMIUM SCRIPT WHATSAPP BOT* 🛒

Dapatkan script bot unggulan dengan performa optimal dan fitur melimpah untuk kebutuhan grup atau pribadi!

💰 *Harga Script:* *Rp 30.000*

🚀 *Keunggulan & Fitur Utama:*
 ├ 🖥️ Free Panel Pterodactyl
 ├ 🔑 Free Apikey 1/2 Bulan
 ├ ⚔️ **Full RPG System (Inventory, Bank, Mencuri, Crafting, dll.)**
 ├ 🔄 Free Update Script Terbaru
 ├ 💡 Free Request Fitur Khusus
 ├ 🔓 No Security (Full Decrypted)
 ├ 🏷️ Simple & Easy Rename
 ├ 🔘 Support Button Interactive
 ├ 🖼️ Support Canvas Welcome
 ├ 📈 Support Canvas Levelup
 ├ 📦 ESM Module Configuration
 └ 🔌 Full Plugin Architecture System

⚠️ *Catatan Request Fitur (Tidak Termasuk):*
 ├ 🎮 Mini Games Interaktif
 └ 💳 Gateway Pembayaran Otomatis

Berminat untuk meminang script premium ini?
Silahkan hubungi Developer resmi sekarang juga!

📞 *Hubungi Owner:*
 ├ 💬 WhatsApp: wa.me/6282199509537
 └ ✈️ Telegram: t.me/FauziAlifatah
`.trim()

  await new global.ButtonV2(conn)
    .setBody(teks)
    .setFooter(global.footer)
    .setThumbnail(global.thumbnail)
    .addButton("menu", ".menu")
    .addButton("owner", ".owner")
    .send(m.chat, { quoted: m })
}

handler.command = /^(sc|script)$/i
handler.tags = ["main"]
handler.help = ["sc"]

export default handler