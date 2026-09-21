/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fetch from "node-fetch"

const decode = (s = "") => Buffer.from(String(s), "base64").toString("utf8").trim()

let handler = async (m, { conn, args, command }) => {
  let prefix = global.prefix || "."
  let input = args.join(" ").trim()
  if (!input) return m.reply(`Penggunaan: ${prefix}${command} base64_url`)

  try {
    let url = decode(input)
    if (!/^https?:\/\//i.test(url)) return m.reply("Base64 bukan URL valid.")

    let res = await fetch(url)
    let text = await res.text().catch(() => "")

    if (!res.ok) return m.reply(`HTTP ${res.status}`)

    try {
      let json = JSON.parse(text)
      return m.reply("Result:\n\n" + JSON.stringify(json, null, 2))
    } catch {
      return m.reply("Result:\n\n" + text.slice(0, 4000))
    }

  } catch (e) {
    return m.reply(`Error: ${e?.message || e}`)
  }
}

handler.tags = ["tools"]
handler.command = /^(b64url)$/i
handler.help = ["b64url <base64_url>"]

export default handler