import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import { Readable } from "stream";

let handler = async (m, { conn }) => {
  if (!m.quoted) {
    return "Reply ke pesan audio atau video yang ingin dikirim ke saluran!";
  }
  const qted = m.quoted;
  const mime = (qted.mimetype || "").toLowerCase();
  if (!/(video\/(mp4|webm|ogg|quicktime|3gpp|mpeg))|(audio\/(mpeg|ogg|opus|wav|webm|mp3))/.test(mime)) {
    return "File yang Anda reply harus berupa audio atau video.";
  }
  await conn.sendMessage(m.chat, { react: { text: "🔄", key: m.key } });
  const media = await qted.download();
  if (!media) {
    throw "Gagal mengunduh media.";
  }
  const newsletterJid = "120363404741298748@newsletter";
  try {
    const audioBuffer = await new Promise((resolve, reject) => {
      const inputStream = Readable.from(media);
      const chunks = [];
      const ffmpegProcess = ffmpeg(inputStream)
        .setFfmpegPath(ffmpegStatic)
        .noVideo()
        .audioCodec("libopus")
        .format("opus")
        .outputOptions(["-vn", "-ar 48000", "-ac 2", "-b:a 128k"])
        .on("error", reject)
        .pipe();
      ffmpegProcess.on("data", chunk => chunks.push(chunk));
      ffmpegProcess.on("end", () => resolve(Buffer.concat(chunks)));
    });
    await conn.sendMessage(newsletterJid, { audio: audioBuffer, mimetype: "audio/ogg; codecs=opus", ptt: true });
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    throw `Terjadi kesalahan saat konversi audio: ${e.message}`;
  }
};
handler.help = ["hii"];
handler.tags = ["owner"];
handler.command = ["woii"];
export default handler;