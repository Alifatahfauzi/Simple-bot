/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

import fs from "fs-extra"
import path from "path"
import archiver from "archiver"
import { once } from "events"

let handler = async (m, { conn, args, reply }) => {

  const rootDir = process.cwd()

  const name = args[0] || "backup"

  const fileName = `${name}.zip`

  const filePath = path.join(
    rootDir,
    fileName
  )

  try {

    reply("Sedang membuat backup...")

    const excludedPatterns = [
      "node_modules/**",
      "session/**",
      "tmp/**",
      "temp/**",
      ".git/**",
      ".cache/**",
      ".config/**",
      ".npm/**",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "backup_bot_*.zip",
      "*.mp4",
      "*.mkv",
      "*.mov",
      "*.zip",
      "*.tar.gz"
    ]

    const output = fs.createWriteStream(
      filePath
    )

    const archive = archiver(
      "zip",
      {
        zlib: {
          level: 5
        }
      }
    )

    archive.pipe(output)

    archive.glob("**/*", {
      cwd: rootDir,
      ignore: excludedPatterns,
      dot: true
    })

    await archive.finalize()

    await once(output, "close")

    await conn.sendMessage(
      m.chat,
      {
        document: await fs.readFile(filePath),
        mimetype: "application/zip",
        fileName
      },
      {
        quoted: m
      }
    )

    await fs.remove(filePath)

  } catch (e) {

    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath)
    }

    reply("Gagal membuat backup.")
  }
}

handler.help = ["backup <nama>"]
handler.tags = ["owner"]
handler.command = /^(backup|backupbot)$/i
handler.owner = true

export default handler