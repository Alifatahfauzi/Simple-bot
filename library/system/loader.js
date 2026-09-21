import fs from "fs"
import path from "path"
import chalk from "chalk"
import { pathToFileURL } from "url"

global.plugins = global.plugins || {}

const watchers = new Map()
const reloadTimeouts = new Map()

// Helpers
const normalize = (p) => p.replace(/\\/g, "/")
const isJs = (file) => file.endsWith(".js")
const getPluginKey = (root, file) => normalize(path.relative(root, file))

// Simple Logger
const log = {
  reload: (file) => console.log(chalk.yellow(`[~] Reloaded: ${file}`)),
  remove: (file) => console.log(chalk.red(`[-] Removed: ${file}`)),
  error: (file, err) => {
    console.log(chalk.bgRed.white(` [!] ERROR : ${file} `))
    console.log(chalk.red(err?.message || String(err)))
  }
}

// Core Functions
const importFresh = async (file) => {
  const url = `${pathToFileURL(file).href}?t=${Date.now()}`
  const mod = await import(url)
  return mod.default || mod
}

const savePlugin = async (root, file, isReload = false) => {
  const key = getPluginKey(root, file)
  const lamawoii = global.plugins[key]

  try {
    global.plugins[key] = await importFresh(file)
    if (isReload) log.reload(key)
  } catch (err) {
    if (isReload && lamawoii) {
      global.plugins[key] = lamawoii
      console.log(chalk.red(`[!] Error pada ${key}, kembali ke kode lama.`))
    } else {
      delete global.plugins[key]
    }
    log.error(key, err)
  }
}

const removePlugin = (root, file) => {
  const key = getPluginKey(root, file)
  delete global.plugins[key]
  log.remove(key)
}

// Scanner & Watcher
const scanDir = (dir) => {
  let files = []
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) files.push(...scanDir(fullPath))
    else if (isJs(item.name)) files.push(fullPath)
  }
  return files
}

const watchFolder = (root, dir) => {
  const id = normalize(dir)
  if (watchers.has(id)) return

  const watcher = fs.watch(dir, (event, filename) => {
    if (!filename || !isJs(filename)) return
    
    const fullPath = path.join(dir, filename)
    const key = getPluginKey(root, fullPath)

    clearTimeout(reloadTimeouts.get(key))
    reloadTimeouts.set(key, setTimeout(async () => {
      reloadTimeouts.delete(key)
      
      if (!fs.existsSync(fullPath)) return removePlugin(root, fullPath)
      await savePlugin(root, fullPath, !!global.plugins[key])
    }, 250))
  })

  watchers.set(id, watcher)

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isDirectory()) watchFolder(root, path.join(dir, item.name))
  }
}

export default {
  async init(root) {
    if (!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true })
    
    console.log(chalk.magenta.bold("\n[ Memuat System Plugin... ]"))
    const files = scanDir(root)
    
    for (const file of files) await savePlugin(root, file, false)
    
    console.log(chalk.green(`[+] Berhasil memuat ${Object.keys(global.plugins).length} plugins.\n`))
  },
  
  watch(root) {
    if (!fs.existsSync(root)) fs.mkdirSync(root, { recursive: true })
    watchFolder(root, root)
  }
}
