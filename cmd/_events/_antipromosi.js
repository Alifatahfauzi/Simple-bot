/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = (m) => m

handler.before = async function (m, { conn, reply, isOwner, isAdmin, isBotAdmin }) {
  if (m.fromMe || !m.isGroup) return true

  const text = (m.text || m.body || m.msg?.text || m.msg?.caption || "")
  if (!text) return true

  if (isOwner || isAdmin) return true

  const chats = global.db.data.chats?.[m.chat]
  if (!chats?.antipromosi) return true

  const isPromosi = /(?:open\s*jastip|jastip|open\s*order|open\s*po|po\s*sekarang|pre\s*order|promo|promosi|diskon|discount|sale|big\s*sale|flash\s*sale|harga\s*promo|harga\s*spesial|murah|termurah|super\s*murah|ready\s*stok|stok\s*ready|restock|jual|jualan|seller|reseller|dropship|dropshipper|agen|mitra|partner|order\s*via|pesan\s*sekarang|beli\s*sekarang|minat\s*chat|minat\s*dm|hubungi\s*wa|hubungi\s*admin|chat\s*wa|wa\.me\/|wa\s*aja|via\s*wa|order\s*wa|dm\s*untuk\s*order|dm\s*aja|klik\s*link\s*di\s*bio|link\s*di\s*bio|cek\s*bio|panel\s*pterodactyl|panel\s*ptero|pterodactyl\s*panel|jual\s*panel|panel\s*bot|panel\s*unli|panel\s*unlimited|panel\s*hosting|hosting\s*murah|hosting\s*unli|jual\s*vps|vps\s*murah|vps\s*unli|vps\s*digital|digital\s*ocean|digitalocean|do\s*vps|server\s*vps|sewa\s*vps|cloud\s*server|server\s*murah)/i.test(text)
  if (!isPromosi) return true

  if (isBotAdmin) {
    await conn.sendMessage(m.chat, { delete: m.key }).catch(() => null)
  }

  await reply("‼️Pesan promosi tidak diizinkan di grup ini. Harap ikuti peraturan📢")

  return true
}

export default handler