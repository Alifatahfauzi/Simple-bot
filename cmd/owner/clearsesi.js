import { readdirSync, statSync, unlinkSync } from "fs"
import { join } from "path"

let handler = async (m, { reply }) => {
  const sesi = ["./session"]
  const array = []

  sesi.forEach(dirname => {
    readdirSync(dirname).forEach(file => {
      if (file !== "creds.json") {
        array.push(join(dirname, file))
      }
    })
  })

  const deletedFiles = []

  array.forEach(file => {
    const stats = statSync(file)

    if (!stats.isDirectory()) {
      unlinkSync(file)
      deletedFiles.push(file)
    }
  })

  if (deletedFiles.length > 0) {
    reply("success")
    console.log("Deleted files:", deletedFiles)
  } else {
    reply("tidak ada file yang tersisa di folder sessions")
  }
}

handler.help = ["clearsesi"]
handler.tags = ["owner"]
handler.command = /^(csesi|clearsesi)$/i
handler.owner = true

export default handler