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
    return reply("Format:\n.getplugin folder/nama.js")
  }

  let target = args[0]
  if (!target.endsWith(".js")) target = target + ".js"

  const base = path.resolve(__dirname, "../")
  const fullPath = path.join(base, target)

  if (!fs.existsSync(fullPath)) {
    return reply("Plugin tidak ditemukan")
  }

  const content = fs.readFileSync(fullPath, "utf-8")

  const message = 
`Plugin: ${target}

\`\`\`js
${content}
\`\`\``

  reply(message)
}

handler.command = /^(getplugin)$/i
handler.help = ["getplugin <nama.js>"]
handler.tags = ["owner"]
handler.owner = true

export default handler