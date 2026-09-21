import fetch from "node-fetch"

let handler = async (m, { conn, args, reply }) => {
  let url = args[0]
  if (!url) return reply("contoh: .gdrive https://drive.google.com/...")

  try {
    await m.reply("_Sedang mengambil file dari Google Drive..._")

    let api = `https://api.siputzx.my.id/api/d/gdrive?url=${encodeURIComponent(url)}`
    let res = await fetch(api).then(v => v.json()).catch(() => null)

    if (!res || !res.status || !res.data) {
      return reply("gagal mengambil file")
    }

    let { name, download } = res.data

    if (!download) return reply("link download tidak ditemukan")

    await conn.sendMessage(
      m.chat,
      {
        document: { url: download },
        fileName: name,
        mimetype: "application/octet-stream"
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    reply("terjadi kesalahan saat mengambil file")
  }
}

handler.help = ["gdrive <url>"]
handler.tags = ["downloader"]
handler.command = /^(gdrive|gddown)$/i
handler.limit = true
handler.daftar = true

export default handler