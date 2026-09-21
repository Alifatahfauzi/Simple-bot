import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas"

GlobalFonts.registerFromPath(
  "./settings/font/Poppins-Bold.ttf",
  "Poppins"
)

export async function levelupCanvas(conn, m, before, after, role) {

  let ppuser = await conn.profilePictureUrl(m.sender, "image")
    .catch(() => "https://athars.space/uploads/58d365df.jpg")

  let avatar = await loadImage(ppuser)

  let canvas = createCanvas(1400, 500)
  let ctx = canvas.getContext("2d")

  let bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  bg.addColorStop(0, "#0f172a")
  bg.addColorStop(1, "#1e293b")

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "rgba(255,255,255,0.05)"
  ctx.beginPath()
  ctx.roundRect(50, 50, 1300, 400, 40)
  ctx.fill()

  ctx.fillStyle = "rgba(255,255,255,0.03)"
  ctx.beginPath()
  ctx.roundRect(70, 70, 1260, 360, 35)
  ctx.fill()

  ctx.fillStyle = "rgba(34,197,94,0.12)"
  ctx.beginPath()
  ctx.arc(1200, 120, 220, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "rgba(34,197,94,0.10)"
  ctx.beginPath()
  ctx.arc(120, 430, 180, 0, Math.PI * 2)
  ctx.fill()

  ctx.save()

  ctx.beginPath()
  ctx.arc(220, 250, 120, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()

  ctx.drawImage(avatar, 100, 130, 240, 240)

  ctx.restore()

  ctx.lineWidth = 8
  ctx.strokeStyle = "#22c55e"

  ctx.beginPath()
  ctx.arc(220, 250, 125, 0, Math.PI * 2)
  ctx.stroke()

  ctx.shadowColor = "#22c55e"
  ctx.shadowBlur = 25

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 74px Poppins"

  ctx.fillText(
    "LEVEL UP",
    430,
    160
  )

  ctx.shadowBlur = 0

  ctx.fillStyle = "#22c55e"
  ctx.font = "bold 52px Poppins"

  ctx.fillText(
    `${before}  >>>  ${after}`,
    430,
    255
  )

  ctx.fillStyle = "#e2e8f0"
  ctx.font = "bold 34px Poppins"

  ctx.fillText(
    `ROLE : ${role}`,
    430,
    340
  )

  ctx.fillStyle = "#94a3b8"
  ctx.font = "28px Poppins"

  ctx.fillText(
    "Selamat! terus aktif menggunakan bot",
    430,
    405
  )

  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = "rgba(255,255,255,0.05)"

    ctx.beginPath()

    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 4 + 1,
      0,
      Math.PI * 2
    )

    ctx.fill()
  }

  return canvas.toBuffer("image/png")
}