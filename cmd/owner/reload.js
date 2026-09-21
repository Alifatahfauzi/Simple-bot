import fs from "fs"
import path from "path"

let handler = async (m, { reply }) => {
  try {
    const folder = "./cmd"

    const scan = async (dir) => {
      let files = []

      for (const file of fs.readdirSync(dir)) {
        const location = path.join(dir, file)
        const stat = fs.statSync(location)

        if (stat.isDirectory()) {
          files.push(...await scan(location))
        } else if (file.endsWith(".js")) {
          files.push(location)
        }
      }

      return files
    }

    const files = await scan(folder)

    global.plugins = {}

    for (const file of files) {
      try {
        const plugin = await import(`../../${file}?update=${Date.now()}`)

        global.plugins[file] = plugin.default || plugin
      } catch (e) {
        console.log(e)
      }
    }

    reply(`Berhasil reload ${files.length} plugin.`)

  } catch (e) {
    reply(String(e))
  }
}

handler.command = /^(reload)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["reload"]

export default handler