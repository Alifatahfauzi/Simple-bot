/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args }) => {
  const text = args.join(" ")
  if (!text) return m.reply("isi text nya")

  const groups = await conn.groupFetchAllParticipating()
  const ids = Object.keys(groups)

  if (!ids.length) return m.reply("bot belum ada di grup manapun")

  m.reply(`Broadcast ke ${ids.length} grup dalam 5 detik...`)

  await new Promise(r => setTimeout(r, 5000))

  for (let jid of ids) {
    await conn.sendMessage(jid, { text })
    await new Promise(r => setTimeout(r, 1500))
  }

  m.reply("Selesai.")
}

handler.command = /^(bcgc)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["bcgc <text>"]

export default handler