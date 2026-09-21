import "./settings/config.js"
import * as func from "./library/utils.js"
import makeWASocket, {
  useMultiFileAuthState,
  jidDecode,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto,
  Browsers
} from "@whiskeysockets/baileys"
import { Boom } from "@hapi/boom"
import pino from "pino"
import chalk from "chalk"
import fs from "fs-extra"
import NodeCache from "node-cache"
import axios from "axios"
import path from "path"
import { fileURLToPath } from "url"
import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { smsg } from "./settings/myfunc.js"
import * as handler from "./handler.js"
import decorate from "./library/system/client.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (!fs.existsSync('./database/tmp')) {
  fs.mkdirSync('./database/tmp')
  console.log(chalk.green('Folder tmp berhasil dibuat.'))
}

const msgRetryCounterCache = new NodeCache()
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const msgStore = new Map()
const msgStoreKey = (key) => `${key?.remoteJid}:${key?.id}`
const saveMsgToStore = (m) => {
  if (!m?.key?.id) return
  msgStore.set(msgStoreKey(m.key), m.message)
}
const getMessageFromStore = async (key) => {
  return msgStore.get(msgStoreKey(key))
}

const getBuffer = async (url, options = {}) => {
  const res = await axios({
    method: "get",
    url,
    headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
    responseType: "arraybuffer",
    ...options
  })
  return res.data
}

process.on("unhandledRejection", (e) => console.error("[unhandledRejection]", e))
process.on("uncaughtException", (e) => console.error("[uncaughtException]", e))

const dbPath = path.join(__dirname, "./database/database.json")
await fs.ensureFile(dbPath)

const adapter = new JSONFile(dbPath)
global.db = new Low(adapter, { users: {}, chats: {}, settings: {} })

global.loadDatabase = async () => {
  if (global.db.READ) return global.db.data || {}

  global.db.READ = true
  await global.db.read().catch(() => null)

  global.db.data ||= { users: {}, chats: {}, settings: {} }

  global.db.READ = false
  return global.db.data
}

await global.loadDatabase()
await global.db.write().catch(() => null)
Object.assign(global, func)

const plugins = new Map()
const loadPlugins = async () => {
  const pluginFolder = path.join(__dirname, "cmd")
  await fs.ensureDir(pluginFolder)
  const files = (await fs.readdir(pluginFolder)).filter((v) => v.endsWith(".js"))
  for (const file of files) {
    try {
      const plugin = await import(`./cmd/${file}?update=${Date.now()}`)
      plugins.set(file, plugin.default || plugin)
    } catch (e) {
      console.error(`Error loading plugin ${file}:`, e)
    }
  }
}

let conn = null
let isStarting = false

async function connect() {
  if (isStarting) return conn
  isStarting = true

  try {
    await loadPlugins()

    const { version } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState("./" + (global.sessionName || "session"))

    conn = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      browser: Browsers.ubuntu('Chrome'),
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
      },
      msgRetryCounterCache,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 25000,
      emitOwnEvents: true,
      fireInitQueries: false,
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: getMessageFromStore
    })

    decorate(conn)
    conn.getBuffer = getBuffer

    conn.sendButton = async (jid, body, footer, buttons = [], options = {}) => {
      const { image, quoted, title = '', mentions = [] } = options

      let header
      if (image) {
        const media = await prepareWAMessageMedia(
          { image: Buffer.isBuffer(image) ? image : { url: image } },
          { upload: conn.waUploadToServer }
        )
        header = proto.Message.InteractiveMessage.Header.create({
          title: title || '',
          hasMediaAttachment: true,
          imageMessage: media.imageMessage
        })
      } else {
        header = proto.Message.InteractiveMessage.Header.create({
          title: title || '',
          hasMediaAttachment: false
        })
      }

      const msg = generateWAMessageFromContent(jid, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              header,
              body: proto.Message.InteractiveMessage.Body.create({
                text: body || ''
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: footer || global.footer || ''
              }),
              contextInfo: mentions.length ? proto.ContextInfo.create({ mentionedJid: mentions }) : undefined,
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons
              })
            })
          }
        }
      }, { quoted })

      return await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id,
        additionalNodes: [
          {
            tag: 'biz',
            attrs: {},
            content: [
              {
                tag: 'interactive',
                attrs: { type: 'native_flow', v: '1' },
                content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }]
              }
            ]
          }
        ]
      })
    }

    conn.welcome      = "───「  W E L C O M E  」───\n\nHaii @user 👋\nSelamat bergabung di *@subject*\n\nSemoga betah dan jangan lupa baca deskripsi:\n@desc\n\nKeep it chill and enjoy!"
    conn.bye          = "❖━━━━━━[ Meninggalkan ]━━━━━━❖\nSayonara @user 👋😃"
    conn.spromote     = "@user Sekarang jadi admin!"
    conn.sdemote      = "@user Sekarang bukan lagi admin!"
    conn.sDesc        = "Deskripsi telah diubah menjadi \n@desc"
    conn.sSubject     = "Judul grup telah diubah menjadi \n@subject"
    conn.sIcon        = "Icon grup telah diubah!"
    conn.sRevoke      = "Link group telah diubah ke \n@revoke"
    conn.sAnnounceOn  = "Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan."
    conn.sAnnounceOff = "Group telah di buka!\nsekarang semua peserta dapat mengirim pesan."
    conn.sRestrictOn  = "Edit Info Grup di ubah ke hanya admin!"
    conn.sRestrictOff = "Edit Info Grup di ubah ke semua peserta!"

    conn.ev.on("groups.update", async (u) => typeof handler.groupsUpdate === "function" && handler.groupsUpdate.call(conn, u))
    conn.ev.on("group-participants.update", async (u) => typeof handler.participantsUpdate === "function" && handler.participantsUpdate.call(conn, u))

    if (!conn.authState.creds.registered) {
      const phoneNumber = global.pairingPhoneNumber
      if (phoneNumber) {
        await wait(3000)
        const code = await conn.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ""))
        const displayCode = code?.match(/.{1,4}/g)?.join("-") || code
        console.log(chalk.black(chalk.bgCyan(" PAIRING CODE ")), chalk.black(chalk.bgWhite(` ${displayCode} `)))
      }
    }

    conn.ev.on("creds.update", saveCreds)

    conn.ev.on("messages.upsert", async (chatUpdate) => {
      for (const msgRaw of chatUpdate.messages || []) {
        saveMsgToStore(msgRaw)
      }

      const m = chatUpdate.messages?.[0]
      if (!m?.message) return

      m.message =
        Object.keys(m.message)[0] === "ephemeralMessage"
          ? m.message.ephemeralMessage.message
          : m.message

      if (global.db.data?.settings?.[conn.decodeJid(conn.user.id)]?.autoreact && m.key?.remoteJid === "status@broadcast") {
        try {
          const emoji = ["😘", "😭", "😂", "😹", "😍", "😋", "🙏", "😜", "😢", "😠", "🤫", "😎"]
          const pick = emoji[Math.floor(Math.random() * emoji.length)]

          await conn.readMessages([m.key])
          await conn.sendMessage(
            "status@broadcast",
            { react: { text: pick, key: m.key } },
            { statusJidList: [m.key.participant] }
          )
        } catch (e) {
          console.error("Gagal auto react status:", e)
        }
      }

      if (m.key?.remoteJid === "status@broadcast") return
      if (m.message.protocolMessage || m.message.senderKeyDistributionMessage) return

      try {
        await global.loadDatabase()
        const msg = smsg(conn, m)

        for (const plugin of plugins.values()) {
          if (typeof plugin?.run === "function") {
            await plugin.run(conn, msg, chatUpdate)
          }
        }

        await handler.handler.call(conn, chatUpdate)
        if (global.db.data) await global.db.write().catch(() => null)
      } catch (e) {
        console.error(e)
      }
    })

    conn.ev.on("connection.update", async (u) => {
      const { connection, lastDisconnect } = u

      if (connection === "open") {
        console.log(chalk.greenBright("[+] Bot Connection Open"))
        return
      }

      if (connection === "close") {
        const err  = lastDisconnect?.error
        const code = new Boom(err)?.output?.statusCode

        console.log(chalk.red(`Connection Closed: ${code || "unknown"}`))

        conn.ev.removeAllListeners()

        if (code === DisconnectReason.loggedOut) {
          console.log(chalk.red("Logged out. Hapus folder session lalu pairing ulang."))
          process.exit(1)
        } else {
          console.log(chalk.yellow("Reconnecting in 3 seconds..."))
          setTimeout(() => connect(), 3000)
        }
      }
    })

    conn.decodeJid = (jid) => {
      if (!jid) return jid
      if (/:\d+@/gi.test(jid)) {
        const d = jidDecode(jid) || {}
        return (d.user && d.server && d.user + "@" + d.server) || jid
      }
      return jid
    }

    return conn
  } finally {
    isStarting = false
  }
}

connect()
