/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"

let handler = async (m, { reply }) => {
  let dir = "./cmd"
  let files = []

  const getFiles = (dirPath) => {
    let list = fs.readdirSync(dirPath)
    for (let file of list) {
      let full = path.join(dirPath, file)
      if (fs.statSync(full).isDirectory()) {
        getFiles(full)
      } else if (file.endsWith(".js")) {
        files.push(full)
      }
    }
  }

  getFiles(dir)

  let errors = []

  for (let file of files) {
    try {
      let fileUrl = pathToFileURL(path.resolve(file)).href
      await import(fileUrl + "?update=" + Date.now())
    } catch (e) {
      errors.push({
        file,
        error: e.message
      })
    }
  }

  if (!errors.length) {
    return reply("Semua plugin aman, tidak ada error")
  }

  let txt = "\nCek Error Plugin\n\n"

  for (let err of errors) {
    txt += `${err.file}\n${err.error}\n`
  }

  reply(txt)
}

handler.help = ["cekerror"]
handler.tags = ["owner"]
handler.command = /^(cekerror)$/i

export default handler