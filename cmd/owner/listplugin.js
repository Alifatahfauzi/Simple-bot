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

function readAll(dir) {
  let results = []
  const list = fs.readdirSync(dir)

  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      results = results.concat(readAll(filePath))
    } else if (filePath.endsWith(".js")) {
      results.push(filePath)
    }
  }

  return results
}

let handler = async (m, { reply }) => {
  const base = path.resolve(__dirname, "../")

  if (!fs.existsSync(base)) {
    return reply("Folder plugin tidak ditemukan")
  }

  const files = readAll(base)

  if (!files.length) {
    return reply("Tidak ada plugin ditemukan")
  }

  const list = files
    .map((v, i) => `${i + 1}. ${v.replace(base + path.sep, "")}`)
    .join("\n")

  reply(`Daftar plugin

Total: ${files.length}
──────────────
${list}`)
}

handler.command = /^(listplugin|plugins)$/i
handler.help = ["listplugin"]
handler.tags = ["owner"]
handler.owner = true

export default handler