export const decodeJid = (jid) => {
  if (!jid) return jid
  if (/:\d+@/gi.test(jid)) {
    const d = jid.split(":")
    return (d[0] + "@" + d[1].split("@")[1]) || jid
  }
  return jid
}

export const normUser = (jid) => {
  const u = (decodeJid(jid) || "").split("@")[0]
  return u.replace(/[^0-9]/g, "")
}

export const sameUser = (a, b) => {
  if (!a || !b) return false
  const decA = decodeJid(a)
  const decB = decodeJid(b)
  if (decA === decB) return true
  const ua = normUser(decA)
  const ub = normUser(decB)
  return !!ua && !!ub && ua === ub
}

export const getUsername = (conn, jid) => {
  if (!jid) return null
  const target = decodeJid(jid)
  const contacts = conn.store?.contacts || {}
  const contact =
    contacts[target] ||
    Object.values(contacts).find((c) => sameUser(c.id, target) || sameUser(c.lid, target))
  return contact?.username || null
}

export const getGroupParticipantData = async (conn, chat, sender) => {
  const groupMetadata = await conn.groupMetadata(chat).catch(() => ({}))
  const participants = groupMetadata?.participants || []

  // Fungsi pencarian participant yang mendukung JID, LID, dan ID string
  const findPart = (targetJid) => {
    if (!targetJid) return null
    const target = decodeJid(targetJid)
    return participants.find((p) => 
      p.id === target || 
      p.jid === target || 
      p.lid === target || 
      sameUser(p.id, target) || 
      sameUser(p.jid, target)
    ) || null
  }

  const userPart = findPart(sender)
  
  // Mencari data bot di dalam grup
  const botPart = findPart(conn.user?.id) || findPart(conn.user?.jid) || findPart(conn.user?.lid)

  const isAdmin = userPart?.admin === "admin" || userPart?.admin === "superadmin"
  const isBotAdmin = botPart?.admin === "admin" || botPart?.admin === "superadmin"

  return {
    groupMetadata,
    participants,
    userPart,
    botPart,
    isAdmin,
    isBotAdmin
  }
}