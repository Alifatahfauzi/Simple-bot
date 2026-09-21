/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

let handler = async (m, { conn, args }) => {
  const user = global.db.data.users[m.sender]

  if (user?.registered) return m.reply(`Kamu sudah terdaftar ✅\nNama: ${user.name}\nUmur: ${user.age}`)

  const input = args.join(" ").trim()
  if (!input) return m.reply("Ketik: .register nama|umur\nContoh: .register fauzi|19")

  const [name = "", ageStr = ""] = input.split("|").map(v => v.trim())
  const age = parseInt(ageStr)

  if (!name) return m.reply("Nama tidak boleh kosong\nContoh: .register fauzi|19")
  if (!Number.isFinite(age) || age < 5 || age > 100) return m.reply("Umur tidak valid\nContoh: .register fauzi|19")

  Object.assign(user, { registered: true, regTime: Date.now(), name, age })
  await global.db.write().catch(() => null)

  await conn.sendButton(
    m.chat,
    `Berhasil daftar ✅\nNama: ${user.name}\nUmur: ${user.age}`,
    "Verifikasi ✅",
    [],
    { quoted: m }
  )
}

handler.command = /^(register|daftar)$/i
handler.tags = ["tools"]
handler.help = ["register nama|umur"]
handler.daftar = false
handler.private = true

export default handler