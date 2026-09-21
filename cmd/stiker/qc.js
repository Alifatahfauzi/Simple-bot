import axios from "axios"
import { imageToWebp, writeExifImg } from "../../library/exif.js"

let handler = async (m, { conn, q, reply }) => {
  if (!q) return reply("mana pesannya anjg, contoh: .qc peler")

  await conn.sendMessage(m.chat, {
    react: { text: "⚡", key: m.key }
  })

  const obj = {
    type: "quote",
    format: "png",
    backgroundColor: "#232023",
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: m.pushName || "User",
          photo: {
            url: await conn.profilePictureUrl(m.sender, "image")
              .catch(() => "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
          }
        },
        text: q,
        replyMessage: {}
      }
    ]
  }

  const res = await axios.post("https://bot.lyo.su/quote/generate", obj, {
    headers: { "Content-Type": "application/json" }
  }).catch(() => null)

  if (!res || !res.data?.result?.image) {
    return reply("gagal membuat qc")
  }

  const buffer = Buffer.from(res.data.result.image, "base64")
  const sticker = global.packname || global.author
    ? await writeExifImg(buffer, {
        packname: global.packname,
        author: global.author
      })
    : await imageToWebp(buffer)

  await conn.sendMessage(m.chat, { sticker }, { quoted: m })
}

handler.help = ["qc <teks>"]
handler.tags = ["stiker"]
handler.command = /^(qc)$/i

export default handler