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

function listJs(dir) {
  let res = []
  const list = fs.readdirSync(dir)
  for (const f of list) {
    const loc = path.join(dir, f)
    const stat = fs.statSync(loc)
    if (stat.isDirectory()) res = res.concat(listJs(loc))
    else if (loc.endsWith(".js")) res.push(loc)
  }
  return res
}

let handler = async (m, { args, reply }) => {
  if (!args[0]) return reply("Masukan nama fitur yang ingin di cari")

  const keyword = args[0].toLowerCase()
  const base = path.resolve(__dirname, "../")
  const files = listJs(base)

  let hits = []

  for (const file of files) {
    const txt = fs.readFileSync(file, "utf-8")

    const cmdMatch = txt.match(/handler\.command\s*=\s*(.+)/)
    if (!cmdMatch) continue

    const raw = cmdMatch[1]
    const clean = raw.replace(/[\[\]\s'"]/g, "").split(",")

    for (const c of clean) {
      if (!c) continue
      if (c.toLowerCase().includes(keyword)) {
        hits.push({
          command: c,
          path: file.replace(base + path.sep, "")
        })
      }
    }
  }

  if (!hits.length) return reply("Command tidak ditemukan")

  const result = hits
    .map((v, i) => `${i + 1}. ${v.command}  ➜  ${v.path}`)
    .join("\n")

  reply(`Hasil pencarian:

${result}`)
}

handler.command = /^(searchplugin|cari)$/i
handler.help = ["searchplugin <keyword>"]
handler.tags = ["owner"]
handler.owner = true

export default handler