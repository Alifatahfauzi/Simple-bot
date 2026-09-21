import { createCanvas } from "canvas"

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  
  let targetJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
  let targetUser = global.db.data.users[targetJid]
  
  if (!targetUser) return m.reply("❌ Pengguna tidak ditemukan di dalam database.")

  await m.reply("⏳ *Sedang mendesain dan mencetak sertifikat penghargaan...*")

  try {
    const canvas = createCanvas(1200, 850)
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, 1200, 850)

    ctx.fillStyle = "#1e1b4b"
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(300, 0)
    ctx.lineTo(0, 300)
    ctx.fill()
    
    ctx.beginPath()
    ctx.moveTo(1200, 850)
    ctx.lineTo(900, 850)
    ctx.lineTo(1200, 550)
    ctx.fill()

    ctx.strokeStyle = "#d4af37"
    ctx.lineWidth = 12
    ctx.strokeRect(40, 40, 1120, 770)

    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.strokeRect(55, 55, 1090, 740)

    ctx.font = "bold 26px Sans-Serif"
    ctx.fillStyle = "#d4af37"
    ctx.textAlign = "center"
    ctx.letterSpacing = "4px"
    ctx.fillText("OFFICIAL RPG ACHIEVEMENT", 600, 140)

    ctx.font = "bold 60px Serif"
    ctx.fillStyle = "#ffffff"
    ctx.fillText("SERTIFIKAT PENGHARGAAN", 600, 240)

    ctx.font = "italic 22px Sans-Serif"
    ctx.fillStyle = "#94a3b8"
    ctx.fillText("Piagam penghargaan ini diberikan dengan hormat kepada petualang:", 600, 320)

    ctx.font = "bold 52px Sans-Serif"
    ctx.fillStyle = "#d4af37"
    ctx.fillText(targetUser.name.toUpperCase(), 600, 420)

    ctx.fillStyle = "#d4af37"
    ctx.fillRect(350, 450, 500, 3)

    ctx.font = "24px Sans-Serif"
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText(`Atas keberanian, dedikasi, dan kontribusi besarnya dalam menjelajahi`, 600, 520)
    ctx.fillText(`dunia fantasi serta mengumpulkan kekayaan di jagat raya RPG System.`, 600, 560)

    ctx.font = "bold 20px Monospace"
    ctx.fillStyle = "#64748b"
    ctx.fillText(`Pangkat: ${targetUser.role || "Petualang"}  |  Tingkat: Level ${targetUser.level}`, 600, 630)

    ctx.font = "italic 24px Serif"
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText("Fauzi Alifatah", 300, 730)
    ctx.font = "16px Sans-Serif"
    ctx.fillStyle = "#64748b"
    ctx.fillText("Developer Utama System", 300, 760)

    ctx.font = "italic 24px Serif"
    ctx.fillStyle = "#cbd5e1"
    ctx.fillText("Alifatah - Bot", 900, 730)
    ctx.font = "16px Sans-Serif"
    ctx.fillStyle = "#64748b"
    ctx.fillText("Robot WhatsApp", 900, 760)

    const buffer = canvas.toBuffer("image/png")
    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: `🏅 *Sertifikat RPG Berhasil Diterbitkan!*\nPenghargaan resmi telah diserahkan kepada *@${targetJid.split("@")[0]}*.`,
      contextInfo: { mentionedJid: [targetJid] }
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    await conn.sendMessage(m.chat, { text: `❌ Terjadi kegagalan sistem saat mencetak sertifikat: ${err.message}`, edit: key })
  }
}

handler.command = /^(sertifikat|cert|piagam)$/i
handler.tags = ["rpg"]
handler.help = ["sertifikat"]
handler.daftar = true

export default handler