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
    return reply("Format:\n.addplugin folder/nama.js\nBalas pesan/file/kode")
  }

  let target = args[0]
  if (!target.endsWith(".js")) target = target + ".js"

  const baseCmd = path.resolve(__dirname, "../")  // folder cmd
  const fullPath = path.join(baseCmd, target)

  const dir = path.dirname(fullPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const quoted = m.quoted || m
  const mime = quoted?.mimetype || ""
  let content

  if (/application\/javascript|text\/plain/.test(mime)) {
    content = await quoted.download()
  } else if (quoted?.text) {
    content = quoted.text
  } else if (m.text) {
    content = m.text
  } else {
    return reply("Balas pesan atau file .js untuk ditambahkan")
  }

  try {
    fs.writeFileSync(fullPath, content)
  } catch (e) {
    return reply("Gagal menyimpan plugin karena izin sistem (EACCES)")
  }

  reply(`Plugin berhasil ditambahkan:
${target}
Bot akan reload otomatis.`)
}

handler.command = /^(addplugin)$/i
handler.help = ["addplugin <folder/nama.js>"]
handler.tags = ["owner"]
handler.owner = true

export default handler