import { exec } from "child_process"

let handler = async (m, { conn }) => {

  await conn.sendMessage(
    m.chat,
    {
      text: "Restarting pm2..."
    },
    {
      quoted: m
    }
  )

  exec("pm2 restart all", async (err) => {

    if (err) {
      return await conn.sendMessage(
        m.chat,
        {
          text: String(err)
        },
        {
          quoted: m
        }
      )
    }

    await conn.sendMessage(
      m.chat,
      {
        text: "Pm2 berhasil di restart."
      },
      {
        quoted: m
      }
    )
  })
}

handler.command = /^(restart|rst)$/i
handler.tags = ["owner"]
handler.help = ["restart"]
handler.rowner = true

export default handler