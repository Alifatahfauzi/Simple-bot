/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import Uploader from "../../library/upload.js"

const handler = async (m, { fetchJson }) => {
  const q = m.quoted || m
  const mime = q.mimetype || q.msg?.mimetype || ""

  if (!/image/.test(mime)) return m.reply("Reply atau kirim gambar dengan caption .ocr")

  const buffer = await q.download().catch(() => null)
  if (!buffer) return m.reply("Gagal mengunduh gambar.")

  try {
    await m.reply("_Sedang membaca teks dari gambar..._")

    const uploaders = [Uploader.nekohime, Uploader.uguu]
    let imageUrl = null

    for (const upload of uploaders) {
      try {
        const url = await upload(buffer)
        if (typeof url === "string" && /^https?:\/\//.test(url)) {
          imageUrl = url
          break
        }
      } catch {
        continue
      }
    }

    if (!imageUrl) return m.reply("Gagal mengunggah gambar ke server.")

    const api = `https://api-faa.my.id/faa/ocr?url=${encodeURIComponent(imageUrl)}`
    const res = await fetchJson(api).catch(() => null)

    if (!res || !res.status) return m.reply("Gagal mengambil hasil OCR.")

    const hasil = res.result?.ParsedResults?.map(v => v.ParsedText).join("\n").trim()
    if (!hasil) return m.reply("Teks tidak ditemukan.")

    m.reply(hasil)
  } catch (err) {
    console.error(err)
    m.reply("Terjadi kesalahan sistem saat memproses gambar.")
  }
}

handler.command = /^(ocr)$/i
handler.tags = ["tools"]
handler.help = ["ocr"]
handler.limit = true

export default handler