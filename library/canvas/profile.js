import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas"

GlobalFonts.registerFromPath("./settings/font/Poppins-Bold.ttf", "Poppins")

export async function profileCanvas(conn, m, user) {

  let ppuser = await conn.profilePictureUrl(m.sender, "image")
    .catch(() => "https://athars.space/uploads/58d365df.jpg")

  let avatar = await loadImage(ppuser)

  let canvas = createCanvas(1400, 750)
  let ctx = canvas.getContext("2d")

  let bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  bg.addColorStop(0, "#0f172a")
  bg.addColorStop(1, "#1e293b")

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "rgba(255,255,255,0.05)"
  ctx.beginPath()
  ctx.roundRect(60, 60, 1280, 630, 45)
  ctx.fill()

  ctx.fillStyle = "rgba(255,255,255,0.03)"
  ctx.beginPath()
  ctx.roundRect(85, 85, 1230, 580, 35)
  ctx.fill()

  ctx.fillStyle = "rgba(59,130,246,0.10)"
  ctx.beginPath()
  ctx.arc(1180, 120, 260, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "rgba(168,85,247,0.10)"
  ctx.beginPath()
  ctx.arc(100, 700, 240, 0, Math.PI * 2)
  ctx.fill()

  ctx.save()

  ctx.beginPath()
  ctx.arc(250, 240, 130, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()

  ctx.drawImage(avatar, 120, 110, 260, 260)

  ctx.restore()

  ctx.lineWidth = 8
  ctx.strokeStyle = "#3b82f6"

  ctx.beginPath()
  ctx.arc(250, 240, 136, 0, Math.PI * 2)
  ctx.stroke()

  ctx.shadowColor = "#3b82f6"
  ctx.shadowBlur = 25

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 58px Poppins"

  ctx.fillText(
    m.pushName || "User",
    450,
    180
  )

  ctx.shadowBlur = 0

  ctx.fillStyle = "#94a3b8"
  ctx.font = "28px Poppins"

  ctx.fillText(
    `@${m.sender.split("@")[0]}`,
    450,
    235
  )

  let cards = [
    ["LEVEL", user.level],
    ["EXP", user.exp],
    ["LIMIT", user.limit],
    ["PREMIUM", user.premium ? "YES" : "NO"],
    ["TOTAL CHAT", user.totalchat],
    ["ROLE", user.role]
  ]

  let startX = 450
  let startY = 310
  let cardW = 340
  let cardH = 95
  let gapX = 35
  let gapY = 30

  cards.forEach((v, i) => {

    let x = startX + ((i % 2) * (cardW + gapX))
    let y = startY + (Math.floor(i / 2) * (cardH + gapY))

    ctx.fillStyle = "rgba(255,255,255,0.05)"

    ctx.beginPath()
    ctx.roundRect(x, y, cardW, cardH, 25)
    ctx.fill()

    ctx.fillStyle = "#94a3b8"
    ctx.font = "24px Poppins"

    ctx.fillText(
      v[0],
      x + 25,
      y + 35
    )

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 30px Poppins"

    ctx.fillText(
      String(v[1]),
      x + 25,
      y + 72
    )
  })

  ctx.fillStyle = "#64748b"
  ctx.font = "24px Poppins"

  ctx.fillText(
    global.namebotz || "WhatsApp Bot",
    85,
    655
  )

  return canvas.toBuffer("image/png")
}