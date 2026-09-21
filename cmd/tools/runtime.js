import os from "os"
import fs from "fs"
import path from "path"
import { exec } from "child_process"
import { runtime } from "../../settings/myfunc.js"

let handler = async (m, { conn }) => {
  let start = Date.now()

  let uptime = runtime(process.uptime())
  let totalUser = Object.keys(global.db.data.users || {}).length
  let totalChat = Object.keys(global.db.data.chats || {}).length
  let totalPlugin = Object.keys(global.plugins || {}).length

  let cpu = os.cpus()[0].model
  let cores = os.cpus().length
  let load = os.loadavg().map(n => n.toFixed(2))

  let ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  let ramTotal = (os.totalmem() / 1024 / 1024).toFixed(2)
  let sysRamUsedPercent = (((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(1)

  let dbSize = await new Promise((resolve) => {
    fs.stat(path.join(process.cwd(), "database", "database.json"), (err, stat) => {
      if (err) return resolve("-")
      resolve((stat.size / 1024).toFixed(2) + " KB")
    })
  })

  let disk = await new Promise((resolve) => {
    exec("df -h /", (err, stdout) => {
      if (err) return resolve({ total: "-", used: "-", free: "-", percent: "-" })

      let line = stdout.split("\n")[1]
      if (!line) return resolve({ total: "-", used: "-", free: "-", percent: "-" })

      let d = line.split(/\s+/)
      resolve({
        total: d[1],
        used: d[2],
        free: d[3],
        percent: d[4]
      })
    })
  })

  let speed = Date.now() - start

  let teks = `
- runtime bot

- status  : aktif
- uptime  : ${uptime}
- mode    : ${global.opts?.self ? "self" : "public"}

- user    : ${totalUser}
- chat    : ${totalChat}
- plugin  : ${totalPlugin}
- db size : ${dbSize}

- ram     : ${ramUsed} MB / ${ramTotal} MB (${sysRamUsedPercent}% used)
- disk    : ${disk.used} / ${disk.total}
- free    : ${disk.free} (${disk.percent})

- cpu     : ${cpu}
- cores   : ${cores}
- load    : ${load[0]}, ${load[1]}, ${load[2]}
- node    : ${process.version}
- os      : ${os.platform()} ${os.arch()}
- speed   : ${speed} ms
`.trim()

  await conn.sendMessage(m.chat, { text: teks }, { quoted: m })
}

handler.command = /^(runtime)$/i
handler.tags = ["tools"]
handler.help = ["runtime"]

export default handler