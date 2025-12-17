let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction, fetchJson } = plug;

    if (!q) {
        return reply("Masukkan link CapCut.\nContoh: " + prefix + "capcut https://www.capcut.com/tv2/XXXXXXXX");
    }

    if (!global.velynApiKey) {
        return reply("API key Velyn belum diatur di config.js");
    }

    const capcutUrl = q.trim();

    if (!/^https?:\/\/(www\.)?capcut\.com\//i.test(capcutUrl)) {
        return reply("Link tidak valid. Pastikan link CapCut benar.");
    }

    await reaction(m.chat, "🎬");

    try {
        const params = new URLSearchParams({
            apikey: global.velynApiKey,
            url: capcutUrl
        });

        const apiUrl = "https://velyn.mom/api/downloader/capcut?" + params.toString();
        const result = await fetchJson(apiUrl);

        if (!result || result.status !== 200 || !result.data) {
            return reply("Gagal mengambil data dari API CapCut.");
        }

        const data = result.data;
        const videoUrl = data.videoUrl;

        if (!videoUrl || typeof videoUrl !== "string" || !videoUrl.startsWith("http")) {
            return reply("Data berhasil diambil, tetapi link video tidak valid.");
        }

        const title = data.title || "-";
        const authorName = data.author && data.author.name ? data.author.name : "-";

        let captionText = "📥 CapCut Downloader\n\n";
        captionText += "🎬 Judul: " + title + "\n";
        captionText += "👤 Kreator: " + authorName + "\n\n";
        captionText += "Powered by Fauzialifatah";

        await conn.sendMessage(
            m.chat,
            { video: { url: videoUrl }, caption: captionText },
            { quoted: m }
        );
    } catch (e) {
        return reply("Terjadi kesalahan: " + (e.message || "Tidak diketahui"));
    }
};

handler.command = ["capcut"];
handler.help = ["capcut"];
handler.tags = ["downloader"];
handler.owner = false;

export default handler;