/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

import { writeFileSync, unlinkSync } from "fs"
import { tmpdir } from "os"
import path from "path"

const handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ""

  if (!/webp/.test(mime)) return m.reply("Reply sticker.")

  let media = await q.download()
  let file = path.join(tmpdir(), `${Date.now()}.webp`)
  let out = path.join(tmpdir(), `${Date.now()}.png`)

  writeFileSync(file, media)

  await conn.sendMessage(m.chat, {
    image: { url: file },
    caption: "Berhasil convert sticker ke image."
  }, { quoted: m })

  unlinkSync(file)
}

handler.command = /^toimg$/i
handler.tags = ["tools"]
handler.help = ["toimg"]

export default handler