/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { args, reply }) => {
  if (!args[0]) {
    return reply("Format:\n.saveplugin nama.js\nBalas kode/plugin yang ingin disimpan")
  }

  let target = args[0]
  if (!target.endsWith(".js")) target = target + ".js"

  const base = path.resolve(__dirname, "../")
  const fullPath = path.join(base, target)

  if (!fs.existsSync(fullPath)) {
    return reply("Gagal menyimpan.\nPlugin tidak ditemukan.")
  }

  const quoted = m.quoted || m
  let content

  if (quoted?.text) {
    content = quoted.text
  } else if (m.text) {
    content = m.text
  } else {
    return reply("Balas pesan/kode plugin yang ingin disimpan")
  }

  try {
    fs.writeFileSync(fullPath, content)
  } catch {
    return reply("Gagal menyimpan plugin")
  }

  reply(`Plugin berhasil diperbarui:
${target}`)
}

handler.command = /^(saveplugin)$/i
handler.help = ["saveplugin <nama.js>"]
handler.tags = ["owner"]
handler.owner = true

export default handler