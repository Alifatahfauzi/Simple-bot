import fetch from "node-fetch"

let handler = async (m, { conn, args, reply }) => {
  const text = args.join(" ")

  if (!text) {
    return reply("contoh:\n.brat hallo")
  }

  const res = await fetch("https://api.siputzx.my.id/api/m/brat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      isAnimated: false,
      delay: 500
    })
  }).catch(() => null)

  if (!res || !res.ok) {
    return reply("gagal mengambil brat")
  }

  const buffer = await res.buffer().catch(() => null)
  if (!buffer) return reply("gagal membuat stiker")

  const sticker = global.packname || global.author
    ? await writeExifImg(buffer, {
        packname: global.packname,
        author: global.author
      })
    : await imageToWebp(buffer)

  await conn.sendMessage(m.chat, {
    sticker
  }, { quoted: m })
}

handler.help = ["brat <teks>"]
handler.tags = ["stiker"]
handler.command = /^(brat)$/i

export default handler