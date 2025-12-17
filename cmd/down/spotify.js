function formatDuration(ms) {
  if (!ms || isNaN(ms)) return "-";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const s = seconds < 10 ? "0" + seconds : String(seconds);
  return minutes + ":" + s;
}

let handler = async (m, plug) => {
  const { conn, reply, q, prefix, reaction, fetchJson } = plug;

  if (!q) {
    return reply("Masukkan link Spotify.\nContoh: " + prefix + "spotify https://open.spotify.com/track/XXXXXXXX");
  }

  if (!global.velynApiKey) {
    return reply("API key Velyn belum diatur di config.js");
  }

  const spotifyUrl = q.trim();

  if (!/^https?:\/\/(open\.spotify\.com)\//i.test(spotifyUrl)) {
    return reply("Link tidak valid. Pastikan link Spotify benar.");
  }

  await reaction(m.chat, "🎧");

  try {
    const params = new URLSearchParams({
      apikey: global.velynApiKey,
      url: spotifyUrl
    });

    const apiUrl = "https://velyn.mom/api/downloader/spotify?" + params.toString();
    const result = await fetchJson(apiUrl);

    if (!result || result.status !== 200 || !result.data) {
      return reply("Gagal mengambil data dari API Spotify.");
    }

    const data = result.data;
    const audioUrl = data.url;
    const title = data.title || "-";
    const artists = data.artists || "-";
    const thumbnail = data.thumbnail || "";
    const durasi = formatDuration(data.duration);

    let captionText = "🎵 Spotify Downloader\n\n";
    captionText += "🎧 Judul: " + title + "\n";
    captionText += "👤 Artis: " + artists + "\n";
    captionText += "⏱ Durasi: " + durasi + "\n\n";
    captionText += "Powered by Fauzialifatah";

    if (thumbnail) {
      await conn.sendImage(m.chat, thumbnail, captionText, m);
    } else {
      await reply(captionText);
    }

    if (
      !audioUrl ||
      typeof audioUrl !== "string" ||
      !audioUrl.startsWith("http") ||
      audioUrl.includes("undefined")
    ) {
      return reply("Data lagu berhasil diambil, tetapi link audio tidak valid.\nURL: " + (audioUrl || "-"));
    }

    await conn.sendAudio(m.chat, audioUrl, { quoted: m });
  } catch (e) {
    return reply("Terjadi kesalahan saat memproses permintaan Spotify.");
  }
};

handler.command = ["spotify"];
handler.help = ["spotify"];
handler.tags = ["downloader"];
handler.owner = false;

export default handler;