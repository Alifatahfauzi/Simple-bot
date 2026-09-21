/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

import fs from "fs"
import { Jimp } from "jimp"
import QrCode from "qrcode-reader"
import QRCode from "qrcode"

let cachedBase = null

const readQRFromImage = async (filePath) => {
  const img = await Jimp.read(filePath)
  return new Promise((resolve, reject) => {
    const qr = new QrCode()
    qr.callback = (err, value) => {
      if (err) return reject(err)
      resolve(value?.result || null)
    }
    qr.decode(img.bitmap)
  })
}

const crc16ccittFalse = (str) => {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1)
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0")
}

const parseTLV = (payload) => {
  let i = 0
  const res = []
  while (i + 4 <= payload.length) {
    const id = payload.slice(i, i + 2)
    const len = parseInt(payload.slice(i + 2, i + 4), 10)
    const val = payload.slice(i + 4, i + 4 + len)
    if (!Number.isFinite(len) || i + 4 + len > payload.length) break
    res.push({ id, val })
    i += 4 + len
  }
  return res
}

const buildTLV = (items) => items.map(v => `${v.id}${String(v.val.length).padStart(2, "0")}${v.val}`).join("")

const setTag = (items, id, val) => {
  const idx = items.findIndex(v => v.id === id)
  if (idx >= 0) items[idx].val = val
  else items.push({ id, val })
}

const removeTag = (items, id) => {
  const idx = items.findIndex(v => v.id === id)
  if (idx >= 0) items.splice(idx, 1)
}

const makeQrisWithAmount = (base, amount) => {
  const clean = String(base || "").trim()
  if (!clean.startsWith("000201")) return null
  const noCrc = clean.replace(/6304[0-9A-Fa-f]{4}$/, "")
  const items = parseTLV(noCrc)
  removeTag(items, "63")
  const amt = String(Number(amount)).trim()
  if (!amt || !Number.isFinite(Number(amt)) || Number(amt) <= 0) return null
  setTag(items, "54", amt)
  setTag(items, "01", "12")
  const body = buildTLV(items)
  const withCrcTag = `${body}6304`
  const crc = crc16ccittFalse(withCrcTag)
  return `${withCrcTag}${crc}`
}

let handler = async (m, { conn, args }) => {
  const nominal = (args[0] || "").replace(/[^0-9]/g, "")
  if (!nominal) return m.reply("contoh: .pay 5000")

  const qrisImagePath = "./settings/image/qris.png"
  if (!fs.existsSync(qrisImagePath)) {
    return m.reply("file QRIS belum ada di ./settings/image/qris.png")
  }

  if (!cachedBase) {
    cachedBase = await readQRFromImage(qrisImagePath).catch(() => null)
  }

  if (!cachedBase) return m.reply("gagal membaca QR dari gambar QRIS")

  const payload = makeQrisWithAmount(cachedBase, nominal)
  if (!payload) return m.reply("gagal membuat QRIS nominal")

  const qrBuffer = await QRCode.toBuffer(payload, { type: "png", width: 900 })

  await conn.sendMessage(
    m.chat,
    {
      image: qrBuffer,
      caption: `QRIS Payment\nNominal: Rp${Number(nominal).toLocaleString("id-ID")}`
    },
    { quoted: m }
  )
}

handler.command = /^(pay)$/i
handler.tags = ["owner"]
handler.help = ["pay <nominal>"]
handler.owner = true

export default handler