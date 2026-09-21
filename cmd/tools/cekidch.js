let handler = async (m, { conn, args, reply }) => {
  const input = args[0]
  if (!input) return reply(`Masukkan link channel WhatsApp.\nContoh: ${global.prefix}cekidch https://whatsapp.com/channel/0029VbXXXXXXXXXXXXXX`)

  const match = input.match(/channel\/([A-Za-z0-9]+)/)
  const code = match ? match[1] : input.trim()

  try {
    const meta = await conn.newsletterMetadata("invite", code)
    if (!meta || !meta.id) return reply("Channel tidak ditemukan / link salah.")

    const teks = `*[ INFO CHANNEL ]*

Nama       : ${meta.name || "-"}
ID         : ${meta.id}
Deskripsi  : ${meta.description || "-"}
Subscriber : ${meta.subscribers ?? "-"}
Verified   : ${meta.verification === "VERIFIED" ? "Ya" : "Tidak"}
Dibuat     : ${meta.creation_time ? new Date(meta.creation_time * 1000).toLocaleString("id-ID") : "-"}`

    reply(teks)
  } catch (e) {
    reply("Gagal ambil data channel. Pastikan link/ID valid.")
  }
}

handler.command = /^(cekidch|idch)$/i
handler.tags = ["tools"]
handler.help = ["cekidch <link channel>"]

export default handler