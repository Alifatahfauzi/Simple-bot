/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fetch from "node-fetch"

let handler = async (m, { q, reply }) => {
  if (!q) return reply("Masukkan kata kunci pencarian Spotify")

  try {
    const url = `https://ytdlpyton.nvlgroup.my.id/spotify/search?query=${encodeURIComponent(q)}`
    const res = await fetch(url, {
      headers: {
        "accept": "application/json",
        "X-API-Key": global.nvlApikey
      }
    })

    const json = await res.json()

    if (!json.results || !json.results.length) {
      return reply("Lagu tidak ditemukan")
    }

    let teks = `🎧 Spotify Search\n`
    teks += `Pencarian: *${json.query}*\n\n`

    json.results.slice(0, 10).forEach((v, i) => {
      teks += `${i + 1}. *${v.title}*\n`
      teks += `   Artis : ${v.artist}\n`
      teks += `   Link  : ${v.spotify_url}\n\n`
    })

    reply(teks.trim())

  } catch (e) {
    reply("Terjadi kesalahan saat mencari lagu Spotify")
  }
}

handler.command = /^(spsearch|spotifysearch)$/i
handler.tags = ["downloader"]
handler.help = ["spsearch <judul lagu>"]
handler.limit = true
handler.daftar = true

export default handler