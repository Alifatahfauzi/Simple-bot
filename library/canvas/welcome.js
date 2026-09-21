import { createCanvas } from "canvas"

export async function welcomeCanvas(
  pushname = "User",
  groupName = "GROUP",
  totalMember = 0
) {

  const canvas = createCanvas(1000, 500)

  const ctx = canvas.getContext("2d")

  const bg = ctx.createLinearGradient(0, 0, 1000, 500)

  bg.addColorStop(0, "#0f172a")
  bg.addColorStop(1, "#1e293b")

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "rgba(255,255,255,0.05)"

  ctx.beginPath()
  ctx.arc(850, 120, 120, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(130, 430, 90, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = "rgba(15,23,42,0.88)"

  ctx.beginPath()
  ctx.roundRect(120, 90, 760, 320, 40)
  ctx.fill()

  ctx.strokeStyle = "rgba(255,255,255,0.10)"
  ctx.lineWidth = 2

  ctx.beginPath()
  ctx.roundRect(120, 90, 760, 320, 40)
  ctx.stroke()

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 68px Arial"
  ctx.textAlign = "center"

  ctx.fillText(
    "WELCOME",
    500,
    200
  )

  ctx.fillStyle = "#7dd3fc"
  ctx.font = "bold 42px Arial"

  ctx.fillText(
    pushname,
    500,
    270
  )

  ctx.fillStyle = "#cbd5e1"
  ctx.font = "28px Arial"

  ctx.fillText(
    groupName,
    500,
    325
  )

  ctx.fillStyle = "#94a3b8"
  ctx.font = "22px Arial"

  ctx.fillText(
    `${totalMember} Members`,
    500,
    370
  )

  ctx.fillStyle = "#38bdf8"

  for (let i = 0; i < 12; i++) {

    ctx.beginPath()

    ctx.arc(
      390 + (i * 18),
      395,
      4,
      0,
      Math.PI * 2
    )

    ctx.fill()

  }

  return canvas.toBuffer()

}