import { downloadContentFromMessage } from "@whiskeysockets/baileys"

let handler = async (m, { conn, reply }) => {
  const q = m.quoted ? m.quoted : m
  const mime = q.mimetype || q.msg?.mimetype || ""

  if (!/image|video/.test(mime)) {
    return reply("Kirim foto/video nya!")
  }

  const isVideo = /video/.test(mime)

  if (isVideo && (q.seconds || q.msg?.seconds || 0) > 15) {
    return reply("Durasi video maksimal 15 detik!")
  }

  const type = q.mtype.replace(/Message/gi, "")
  const stream = await downloadContentFromMessage(q.msg || q, type)

  let buffer = Buffer.from([])

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }

  const sticker = isVideo
    ? global.packname || global.author
      ? await writeExifVid(buffer, {
          packname: global.packname,
          author: global.author
        })
      : await videoToWebp(buffer)
    : global.packname || global.author
      ? await writeExifImg(buffer, {
          packname: global.packname,
          author: global.author
        })
      : await imageToWebp(buffer)

  await conn.sendMessage(m.chat, {
    sticker
  }, { quoted: m })
}

handler.command = /^(s|sticker)$/i
handler.help = ["sticker"]
handler.tags = ["stiker"]

export default handler