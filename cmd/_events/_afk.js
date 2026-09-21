/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = m => m

const msToTime = (ms = 0) => {
  ms = Math.max(0, Number(ms) || 0)
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const mnt = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h) return `${h} jam ${mnt} menit`
  if (mnt) return `${mnt} menit ${sec} detik`
  return `${sec} detik`
}

const afkSpam = new Map()
const keySpam = (chat, target, sender) => `${chat}|${target}|${sender}`

handler.before = async function (m, { conn, reply }) {
  if (!m?.isGroup) return true
  if (!global.db?.data) return true
  if (!m?.sender) return true
  if (m.fromMe || m.key?.fromMe) return true

  const user = global.db.data.users?.[m.sender]
  if (!user) return true

  const text = (m.text || m.body || m.msg?.text || m.msg?.caption || "").trim()
  const now = Date.now()

  if (user.afk && text && !text.startsWith(".afk")) {
    const dur = now - (user.afkTime || now)
    const reason = user.afkReason || "tanpa alasan"

    user.afk = false
    user.afkTime = 0
    user.afkReason = ""

    await conn.sendMessage(
      m.chat,
      {
        text: `@${m.sender.split("@")[0]} sudah kembali\nDurasi AFK: ${msToTime(dur)}\nAlasan: ${reason}`,
        mentions: [m.sender]
      },
      { quoted: m }
    ).catch(() => null)

    return true
  }

  const targets = [
    ...(m.mentionedJid || []),
    ...(m.quoted?.sender ? [m.quoted.sender] : [])
  ]

  if (!targets.length) return true

  for (const jid of targets) {
    const u = global.db.data.users?.[jid]
    if (!u?.afk) continue

    const k = keySpam(m.chat, jid, m.sender)
    const last = afkSpam.get(k) || 0
    if (now - last < 10000) continue
    afkSpam.set(k, now)

    const dur = now - (u.afkTime || now)
    const reason = u.afkReason || "tanpa alasan"

    await conn.sendMessage(
      m.chat,
      {
        text: `@${jid.split("@")[0]} sedang AFK\nSejak: ${msToTime(dur)}\nAlasan: ${reason}`,
        mentions: [jid]
      },
      { quoted: m }
    ).catch(() => null)
  }

  return true
}

export default handler