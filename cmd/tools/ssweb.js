/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn, args, reply }) => {
  if (!args[0]) {
    return reply("contoh:\n.ssweb https://google.com\n.ssweb https://google.com desktop dark false")
  }

  let url = args[0]
  let device = args[1] || "desktop"
  let theme = args[2] || "dark"
  let fullPage = args[3] || "false"

  let api = `https://api.siputzx.my.id/api/tools/ssweb?url=${encodeURIComponent(url)}&device=${encodeURIComponent(device)}&theme=${encodeURIComponent(theme)}&fullPage=${encodeURIComponent(fullPage)}`

  await conn.sendMessage(m.chat, {
    image: { url: api },
    caption: `*S S W E B*\n\n*Url:* ${url}\n*Device:* ${device}\n*Theme:* ${theme}\n*FullPage:* ${fullPage}`
  }, { quoted: m })
}

handler.help = ["ssweb <url> [device] [theme] [fullPage]"]
handler.tags = ["tools"]
handler.command = /^(ssweb)$/i

export default handler