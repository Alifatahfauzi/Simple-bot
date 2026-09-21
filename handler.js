/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import "./settings/config.js"
import fs from "fs"
import path from "path"
import util from "util"
import { fileURLToPath } from "url"
import { exec } from "child_process"
import pluginLoader from "./library/system/loader.js"

import {
  smsg,
  decodeJid,
  getGroupParticipantData,
  generateProfilePicture,
  getBuffer,
  fetchJson,
  fetchText,
  runtime,
  sleep,
  makeid,
  conlog
} from "./library/utils.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dfail = (type, m, conn) => global.dfail?.(type, m, conn)
const isNumber = x => typeof x === 'number' && !isNaN(x)

export async function handler(chatUpdate) {
  if (!chatUpdate.messages) return
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m?.message) return

  try {
    const conn = this
    m = smsg(conn, m)
    const body = m.body || m.text || ""
    const isCmd = body.startsWith(global.prefix)
    const text = isCmd ? body.slice(global.prefix.length).trim() : ""
    const parts = text.split(/ +/).filter(Boolean)
    const command = isCmd ? (parts[0] || "").toLowerCase() : ""
    const args = isCmd ? parts.slice(1) : []
    const q = args.join(" ")

    m.exp = 0

    const sender = decodeJid(m.sender)
    const userId = (sender || "").split("@")[0]
    const isOwner = global.owner.some((v) => v.replace(/[^0-9]/g, "") === userId) || m.key.fromMe
    const isGroup = m.isGroup
    const chat = m.chat

    const groupData = isGroup ? await getGroupParticipantData(conn, chat, sender).catch(() => ({})) : {}
    const groupMetadata = groupData.groupMetadata || {}
    const isAdmin = groupData.isAdmin || false
    const isBotAdmin = groupData.isBotAdmin || false

    const reply = async (teks, options = {}) => {
      return conn.sendMessage(chat,
        { text: `${teks}` },
        { quoted: m }
      )
    }

    m.reply = reply

    try {
      if (!global.db?.data) await global.loadDatabase()

      let user = global.db.data.users[m.sender]
      if (typeof user !== "object") global.db.data.users[m.sender] = {}

      if (user) {
        if (!("name" in user)) user.name = m.pushName || "User"
        if (!("limit" in user)) user.limit = global.limit
        if (!("afk" in user)) user.afk = false
        if (!isNumber(user.afkTime)) user.afkTime = 0
        if (!("afkReason" in user)) user.afkReason = ""
        if (!("registered" in user)) user.registered = false
        if (!isNumber(user.regTime)) user.regTime = 0
        if (!isNumber(user.age)) user.age = 0
        if (!("lastLimitReset" in user)) user.lastLimitReset = ""
        if (!("premium" in user)) user.premium = false
        if (!isNumber(user.totalchat)) user.totalchat = 0
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.level)) user.level = 0
        if (!isNumber(user.lastExp)) user.lastExp = 0
        if (!("role" in user)) user.role = "Newbie ㋡"
        if (!isNumber(user.health)) user.health = 100
        if (!isNumber(user.money)) user.money = 100
        
        if (!isNumber(user.bank)) user.bank = 0
        if (!("pinbank" in user)) user.pinbank = ""
        if (!isNumber(user.lastmencuri)) user.lastmencuri = 0

        if (!isNumber(user.lastberburu)) user.lastberburu = 0
        if (!isNumber(user.lastadventure)) user.lastadventure = 0
        if (!isNumber(user.daging_rusa)) user.daging_rusa = 0
        if (!isNumber(user.daging_babi)) user.daging_babi = 0
        if (!isNumber(user.daging_kelinci)) user.daging_kelinci = 0
        if (!isNumber(user.daging_ayam)) user.daging_ayam = 0
        if (!isNumber(user.kayu)) user.kayu = 0
        if (!isNumber(user.perangkap)) user.perangkap = 0
        if (!isNumber(user.kandang_level)) user.kandang_level = 0
        if (!isNumber(user.slot_kandang)) user.slot_kandang = 0
        if (!isNumber(user.ternak_ayam)) user.ternak_ayam = 0
        if (!isNumber(user.ternak_kelinci)) user.ternak_kelinci = 0
        if (!isNumber(user.lastclaim_ternak)) user.lastclaim_ternak = 0
      } else {
        global.db.data.users[m.sender] = {
          name: m.pushName || "User",
          limit: global.limit,
          afk: false,
          afkTime: 0,
          afkReason: "",
          registered: false,
          regTime: 0,
          age: 0,
          lastLimitReset: "",
          premium: false,
          totalchat: 0,
          exp: 0,
          level: 0,
          lastExp: 0,
          role: "Newbie ㋡",
          health: 100,
          money: 100,
          
          bank: 0,
          pinbank: "",
          lastmencuri: 0,

          lastberburu: 0,
          lastadventure: 0,
          daging_rusa: 0,
          daging_babi: 0,
          daging_kelinci: 0,
          daging_ayam: 0,
          kayu: 0,
          perangkap: 0,
          kandang_level: 0,
          slot_kandang: 0,
          ternak_ayam: 0,
          ternak_kelinci: 0,
          lastclaim_ternak: 0
        }
      }
      user = global.db.data.users[m.sender]



      let chats = global.db.data.chats[m.chat]
      if (typeof chats !== "object") global.db.data.chats[m.chat] = {}

      if (chats) {
        if (!("welcome" in chats)) chats.welcome = true
        if (!("antilink" in chats)) chats.antilink = true
        if (!("antitagall" in chats)) chats.antitagall = false
        if (!("antihidetag" in chats)) chats.antihidetag = true
        if (!("antimedia" in chats)) chats.antimedia = false
        if (!("antiyoutube" in chats)) chats.antiyoutube = false
        if (!("antipromosi" in chats)) chats.antipromosi = false
        if (!("antiig" in chats)) chats.antiig = false
        if (!("antifb" in chats)) chats.antifb = false
        if (!("antitt" in chats)) chats.antitt = false
        if (!("sewa" in chats)) chats.sewa = false
        if (!("banned" in chats)) chats.banned = false
        if (!("rules" in chats)) chats.rules = ""
        if (!("sewaExpired" in chats)) chats.sewaExpired = 0
      } else {
        global.db.data.chats[m.chat] = {
          welcome: true,
          antilink: false,
          antitagall: false,
          antihidetag: false,
          antimedia: false,
          antiyoutube: false,
          antipromosi: false,
          antiig: false,
          antifb: false,
          antitt: false,
          sewa: false,
          banned: false,
          rules: "",
          sewaExpired: 0
        }
      }
      chats = global.db.data.chats[m.chat]

      const id = conn.decodeJid(conn.user.id)
      if (!global.db.data.settings) global.db.data.settings = {}
      let settings = global.db.data.settings[id]
      if (typeof settings !== "object") global.db.data.settings[id] = {}

      if (settings) {
        if (!("self" in settings)) settings.self = false
        if (!("maintenance" in settings)) settings.maintenance = false
        if (!("autoread" in settings)) settings.autoread = false
        if (!("autotyping" in settings)) settings.autotyping = false
        if (!("autoreact" in settings)) settings.autoreact = false
      } else {
        global.db.data.settings[id] = {
          self: false,
          maintenance: false,
          autoread: false,
          autotyping: false,
          autoreact: false
        }
      }
      settings = global.db.data.settings[id]
      
      if (settings.self && !isOwner) return
      if (settings.maintenance && !isOwner && isCmd) {
        return m.reply("Bot sedang maintenance, silahkan tunggu ya.")
      }
    } catch (e) {
      console.error("Error init DB di handler:", e)
    }

    const db = global.db.data
    const dbUser = global.db.data.users
    const userData = global.db.data.users[m.sender]
    const chatData = global.db.data.chats[m.chat]

    const plug = {
      conn,
      body,
      command,
      args,
      q,
      isOwner,
      isAdmin,
      isBotAdmin,
      isGroup,
      sender,
      userId,
      chat,
      pushName: m.pushName,
      metadata: groupMetadata,
      generateProfilePicture,
      getBuffer,
      fetchJson,
      fetchText,
      runtime,
      sleep,
      makeid,
      reply,
      db
    }

    if (body.startsWith("$")) {
      if (!isOwner) return
      const cmd = body.slice(1).trim()
      if (!cmd) return reply("command kosong")
      await reply("_Executing..._")
      exec(cmd, (err, stdout, stderr) => {
        if (err) return reply(String(err))
        const out = (stdout || stderr || "").trim()
        return reply(out || "done")
      })
      return
    }

    if (body.startsWith("~")) {
      if (!isOwner) return
      await conn.sendMessage(m.chat, { react: { text: "🐉", key: m.key } })
      const txt = body.slice(1).trim()
      const Return = (sul) => {
        const sat = JSON.stringify(sul, null, 2)
        return sat === undefined ? util.format(sul) : util.format(sat)
      }
      try {
        const result = await eval(`(async () => { return ${txt} })()`)
        reply(Return(result))
      } catch (e) {
        reply(util.format(e))
      }
      return
    }

    if (isGroup && chatData?.banned && !isOwner) return

    for (const name in global.plugins) {
      const plugin = global.plugins[name]
      if (!plugin || plugin.disabled) continue

      if (typeof plugin.before === "function") {
        if (await plugin.before.call(this, m, plug)) continue
      }

      if (!isCmd) continue
      if (!(plugin.command instanceof RegExp)) continue
      if (!plugin.command.test(command)) continue

      if (plugin.daftar && !isOwner) {
        if (!userData?.registered) {
          dfail("daftar", m, conn)
          continue
        }
      }

      if (plugin.premium && !isOwner) {
        if (!userData?.premium) {
          dfail("premium", m, conn)
          continue
        }
      }

      if (plugin.group && !isGroup) {
        dfail("group", m, conn)
        continue
      }

      if (plugin.admin && !isAdmin) {
        dfail("admin", m, conn)
        continue
      }

      if (plugin.private && isGroup) {
        dfail("private", m, conn)
        continue
      }

      if (plugin.owner && !isOwner) {
        dfail("owner", m, conn)
        continue
      }

      if (plugin.botAdmin && !isBotAdmin) {
        dfail("botadmin", m, conn)
        continue
      }

      if (plugin.limit && !isOwner) {
        let u = global.db.data.users[m.sender]
        if (typeof u !== "object") global.db.data.users[m.sender] = {}
        u = global.db.data.users[m.sender]
        if (!("limit" in u)) u.limit = global.limit
        if (Number(u.limit) <= 0) {
          dfail("limit", m, conn)
          continue
        }
      }

      plug.limit = isOwner ? Infinity : global.db.data.users[m.sender].limit

      try {
        conlog(m, command, plugin, plug)

        const run = typeof plugin === "function" ? plugin : plugin.run || plugin.default
        await run.call(this, m, plug)
        
        if (global.db && typeof global.db.write === "function") {
          await global.db.write()
        }    

        if (!isOwner) {
          const user = global.db.data.users[m.sender]
          if (!user) return
        
          const xp = Math.floor(Math.random() * 3) + 1
          user.exp += xp
        }

        if (plugin.limit && !isOwner) {
          m.limit = 1
          dbUser[m.sender].limit -= m.limit
          m.reply(`🔖 Limit telah digunakan: ${m.limit * 1}\nTersisa: ${dbUser[m.sender].limit}`)
        }
      } catch (e) {
        const err = String(e?.message || e)
        reply(`Plugin Error\nCommand: ${command}\nError: ${err}`)
        console.error(e)
      }

      break
    }
  } catch (e) {
    console.error(util.format(e))
  }
}

export async function groupsUpdate(groupsUpdate) {
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    let text = ""
    if (groupUpdate.desc) text = (this.sDesc || "```Description has been changed to```\n@desc").replace("@desc", groupUpdate.desc)
    if (groupUpdate.subject) text = (this.sSubject || "```Subject has been changed to```\n@subject").replace("@subject", groupUpdate.subject)
    if (groupUpdate.icon) text = this.sIcon || "```Icon has been changed to```"
    if (groupUpdate.revoke) text = (this.sRevoke || "```Group link has been changed to```\n@revoke").replace("@revoke", groupUpdate.revoke)
    if (groupUpdate.announce === true) text = this.sAnnounceOn || "*Group has been closed!*"
    if (groupUpdate.announce === false) text = this.sAnnounceOff || "*Group has been open!*"
    if (groupUpdate.restrict === true) text = this.sRestrictOn || "*Group has been all participants!*"
    if (groupUpdate.restrict === false) text = this.sRestrictOff || "*Group has been only admin!*"
    if (!text) continue
    this.sendMessage(id, { text: text.trim() })
  }
}

export async function participantsUpdate({ id, participants, action }) {
  for (let user of participants) {
    let jid = typeof user === "string"
      ? user
      : (user.id || user)
    if (!jid) continue
    const mentionJid = jid
    const mentionNum = jid.split("@")[0]
    const getDisplayName = (jidStr) => {
      const saved = global.db?.data?.users?.[jidStr]?.name
      if (saved && saved !== "User" && !saved.match(/^\d+$/)) return saved
      return jidStr.split("@")[0]
    }

    let metadata = await this.groupMetadata(id)
      .catch(() => ({}))

    if (action === "add" && global.db.data.chats[id]?.welcome) {
      const displayName = getDisplayName(jid)

      let textAdd = (this.welcome || "Welcome @user to @subject")
        .replace("@subject", metadata.subject || "this group")
        .replace("@desc", metadata.desc?.toString() || "No Description")
        .replace("@user", "@" + mentionNum)
      let image = await welcomeCanvas(displayName, metadata.subject, metadata.participants?.length || 0)
      await this.sendButton(id, textAdd.trim(), global.footer,
        [{ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "Menu", id: ".menu" }) }],
        { image, quoted: null, mentions: [mentionJid] }
      )
    }

    if (action === "remove" && global.db.data.chats[id]?.welcome) {
      const displayName = getDisplayName(jid)

      let textRemove = (this.bye || "Goodbye @user")
        .replace("@subject", metadata.subject || "this group")
        .replace("@user", "@" + mentionNum)
      let image = await goodbyeCanvas(displayName, metadata.subject, metadata.participants?.length || 0)
      await this.sendButton(id, textRemove.trim(), global.footer,
        [{ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "Menu", id: ".menu" }) }],
        { image, quoted: null, mentions: [mentionJid] }
      )
    }
  }
}

global.dfail = (type, m) => {
  const msg = {
    group: "*`ⓘ ngapain? khusus grup`*",
    admin: "*`ⓘ ngapain? khusus admin`*",
    private: "*`ⓘ khusus private`*",
    owner: "*`ⓘ khusus owner`*",
    premium: "*`ⓘ fitur ini khusus member premium`*",
    botadmin: "*`ⓘ bot bukan admin`*",
    limit: "*`ⓘ limit kamu habis`*",
    daftar: "Kamu belum terdaftar\nKetik: .register nama|umur\nContoh: .register fauzi|19"
  }[type]

  if (msg) return m.reply(msg)
}

const pluginsDir = path.resolve(__dirname, "./cmd")
pluginLoader.init(pluginsDir)
pluginLoader.watch(pluginsDir)

export default pluginLoader
