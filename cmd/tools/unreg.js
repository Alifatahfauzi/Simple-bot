/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

let handler = async (m, { conn, args, reply }) => {

  const user = global.db.data.users[m.sender]

  if (!user?.registered) {
    return reply("Kamu belum terdaftar.")
  }

  if (args[0] === "confirm") {

    user.registered = false
    user.name = ""
    user.age = 0
    user.regTime = 0

    await global.db.write().catch(() => null)

    return reply("Berhasil menghapus registrasi.")
  }

  await conn.sendButton(
    m.chat,
    `\`⎔ account unregister\`\nData akun akan dihapus dari sistem bot`.trim(),
    global.footer,
    [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Ya, setuju",
          id: ".unreg confirm"
        })
      }
    ],
    {
      quoted: m
    }
  )
}

handler.command = /^(unreg|unregister)$/i
handler.tags = ["tools"]
handler.help = ["unreg"]
handler.daftar = false

export default handler