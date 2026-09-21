/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fetch from "node-fetch"
import * as cheerio from "cheerio"

let handler = async (m, { conn, args, reply }) => {
  let url = args[0]
  if (!url) return reply("contoh:\n.sfile https://sfile.co/xxxx")

  try {
    let res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0"
      }
    })

    let html = await res.text()
    let $ = cheerio.load(html)

    let title = $("h1").text().trim() || "Unknown"
    let size = $("span:contains('Size')").next().text().trim() || "-"
    let uploaded = $("span:contains('Uploaded')").next().text().trim() || "-"

    let link =
      $("a#download").attr("href") ||
      $("a[href*='download']").attr("href")

    if (!link) return reply("link download tidak ditemukan")

    let caption = `
*SFILE DOWNLOADER*

• Nama: ${title}
• Size: ${size}
• Upload: ${uploaded}
• Link: ${link}
    `.trim()

    await conn.sendMessage(
      m.chat,
      { text: caption },
      { quoted: m }
    )

    await conn.sendMessage(
      m.chat,
      {
        document: { url: link },
        fileName: title,
        mimetype: "application/octet-stream"
      },
      { quoted: m }
    )

  } catch {
    reply("gagal scrape sfile")
  }
}

handler.help = ["sfile <url>"]
handler.tags = ["downloader"]
handler.command = /^(sfile)$/i
handler.limit = true
handler.daftar = true

export default handler