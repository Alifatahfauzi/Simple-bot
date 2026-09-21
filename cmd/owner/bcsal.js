/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const fauziaja = [
  "-@newsletter"
]

let handler = async (m, { conn, args }) => {
  const text = args.join(" ") || m.quoted?.text || m.quoted?.caption
  if (!text) return m.reply("isi text nya atau reply pesan")

  m.reply(`Mengirim ke ${fauziaja.length} saluran dalam 5 detik...`)

  await new Promise(r => setTimeout(r, 5000))

  for (let id of fauziaja) {
    await conn.sendMessage(id, { text })
    await new Promise(r => setTimeout(r, 2000))
  }

  m.reply("Selesai.")
}

handler.command = /^(bcsal)$/i
handler.owner = true
handler.tags = ["owner"]
handler.help = ["bcsal <text> / reply pesan"]

export default handler