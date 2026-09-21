/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  if (!m.isGroup) return m.reply("khusus grup")

  let metadata = await conn.groupMetadata(m.chat)
  let participants = metadata.participants || []
  let memberIds = participants.map(v => v.id)
  let data = []

  for (let jid of memberIds) {
    let user = global.db.data.users[jid] || {}
    let totalchat = Number(user.totalchat || 0)

    if (totalchat < 1) continue

    data.push({
      jid,
      totalchat
    })
  }

  if (!data.length) return m.reply("belum ada data chat member")

  data.sort((a, b) => b.totalchat - a.totalchat)

  let teks = `*TOTAL CHAT📊*\n\n`
  let mentions = []
  let no = 1

  for (let user of data) {
    teks += `${no}. @${user.jid.split("@")[0]} - ${user.totalchat} chat\n`
    mentions.push(user.jid)
    no++
  }

  await conn.sendMessage(
    m.chat,
    {
      text: teks.trim(),
      mentions
    },
    { quoted: m }
  )
}

handler.command = /^(totalchat)$/i
handler.tags = ["group"]
handler.help = ["totalchat"]
handler.group = true

export default handler