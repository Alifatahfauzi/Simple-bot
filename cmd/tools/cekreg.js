/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m) => {
  const u = global.db.data.users[m.sender]
  if (!u?.registered) return m.reply("Kamu belum terdaftar\nKetik: .register nama|umur\nContoh: .register fauzi|19")

  m.reply(
    `Status: TERDAFTAR ✅\nNama: ${u.name}\nUmur: ${u.age}\nSejak: ${u.regTime ? new Date(u.regTime).toLocaleString("id-ID") : "-"}`
  )
}

handler.command = /^(cekreg)$/i
handler.tags = ["tools"]
handler.help = ["cekreg"]
handler.daftar = false

export default handler