import fs from "fs"
import path from "path"
import { tmpdir } from "os"
import crypto from "crypto"
import ffmpeg from "fluent-ffmpeg"
import ffmpegPath from "ffmpeg-static"

ffmpeg.setFfmpegPath(ffmpegPath)

let handler = async (m, { conn, reply }) => {
  const files = []

  try {
    const quoted = m.quoted || m
    const mime = quoted?.mimetype || quoted?.msg?.mimetype || ""

    if (!/audio/.test(mime)) {
      return reply("Kirim/reply audio dengan caption:\n.topt")
    }

    const buffer = await quoted.download()
    if (!buffer) return reply("> Gagal download audio")

    const input = path.join(tmpdir(), `${crypto.randomBytes(6).toString("hex")}.mp3`)
    const output = path.join(tmpdir(), `${crypto.randomBytes(6).toString("hex")}.opus`)

    files.push(input, output)
    fs.writeFileSync(input, buffer)

    await new Promise((resolve, reject) => {
      ffmpeg(input)
        .audioCodec("libopus")
        .format("opus")
        .on("end", resolve)
        .on("error", reject)
        .save(output)
    })

    await conn.sendMessage(
      m.chat,
      {
        audio: fs.readFileSync(output),
        mimetype: "audio/ogg; codecs=opus",
        ptt: true
      },
      { quoted: m }
    )
  } catch (e) {
    return reply("> Gagal mengubah audio ke voice note")
  } finally {
    for (const file of files) {
      if (fs.existsSync(file)) fs.unlinkSync(file)
    }
  }
}

handler.command = /^(topt|tovn|topt)$/i
handler.tags = ["tools"]
handler.help = ["topt"]
handler.limit = true
handler.daftar = true

export default handler