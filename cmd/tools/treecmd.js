/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fs from "fs"
import path from "path"

const IGNORE = [
  "node_modules",
  "session",
  ".npm",
  ".cache",
  ".config"
]

function isIgnored(name) {
  if (IGNORE.includes(name)) return true
  if (name === "package-lock.json") return true
  if (name === "yarn.lock") return true
  if (/^backup_bot_.*\.zip$/i.test(name)) return true
  return false
}

function walk(dir, prefix = "") {
  let out = ""
  let items = []

  try {
    items = fs.readdirSync(dir, { withFileTypes: true })
      .filter(v => !v.name.startsWith(".") || v.name === ".config")
      .filter(v => !isIgnored(v.name))
  } catch {
    return out
  }

  items.sort(
    (a, b) =>
      Number(b.isDirectory()) - Number(a.isDirectory()) ||
      a.name.localeCompare(b.name)
  )

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const last = i === items.length - 1
    out += prefix + (last ? "└─ " : "├─ ") + item.name + (item.isDirectory() ? "/" : "") + "\n"

    if (item.isDirectory()) {
      out += walk(
        path.join(dir, item.name),
        prefix + (last ? "   " : "│  ")
      )
    }
  }

  return out
}

let handler = async (m) => {
  const root = process.cwd()
  const text = "./\n" + walk(root)
  return m.reply(text)
}

handler.command = /^(tree)$/i
handler.tags = ["tools"]
handler.help = ["tree"]

export default handler