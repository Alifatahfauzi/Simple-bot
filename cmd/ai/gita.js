let handler = async (m, { args }) => {
  let text = args.join(" ")

  if (!text) return m.reply("Masukkan pertanyaan.\nContoh: .gita sekarang tanggal berapa?")

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/ai/gita?q=${encodeURIComponent(text)}`)
    let json = await res.json()

    if (!json?.status || !json?.data) return m.reply("Gagal mengambil jawaban AI.")

    m.reply(`*[ AI ]:* ${json.data}`)
  } catch (e) {
    m.reply("Terjadi error saat mengambil data.")
  }
}

handler.command = /^(gita)$/i
handler.tags = ["ai"]
handler.help = ["gita <text>"]
handler.limit = true

export default handler