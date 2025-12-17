let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction, fetchJson } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "tiktok link\nContoh: " + prefix + "tiktok https://vt.tiktok.com/ZSfEbDw89/");
    }

    const ttUrl = q.trim();

    if (!/^https?:\/\/(www\.)?(vm\.tiktok\.com|vt\.tiktok\.com|tiktok\.com)\//i.test(ttUrl)) {
        return reply("Link tidak valid. Pastikan link TikTok benar.");
    }

    await reaction(m.chat, "🎬");

    try {
        const params = new URLSearchParams({
            url: ttUrl
        });

        const apiUrl = "https://api.elrayyxml.web.id/api/downloader/tiktok?" + params.toString();
        const result = await fetchJson(apiUrl);

        if (!result || result.status !== true || !result.result) {
            return reply("Gagal mengambil data dari API TikTok.");
        }

        const data = result.result;

        const videoUrl = data.data;
        if (!videoUrl || typeof videoUrl !== "string" || !videoUrl.startsWith("http")) {
            return reply("Data berhasil diambil, tetapi link video tidak valid.");
        }

        const music = data.music_info || {};
        const audioUrl = music.url;

        let captionText = "📥 TikTok Downloader\n\n";

        if (data.title) captionText += "🎬 Judul: " + data.title + "\n";
        if (data.author && data.author.fullname) captionText += "👤 Author: " + data.author.fullname + "\n";
        if (data.region) captionText += "🌍 Region: " + data.region + "\n";
        if (data.duration) captionText += "⏱ Durasi: " + data.duration + "\n";

        captionText += "\nPowered by Fauzialifatah";

        await conn.sendMessage(
            m.chat,
            {
                video: { url: videoUrl },
                caption: captionText
            },
            { quoted: m }
        );

        if (audioUrl && audioUrl.startsWith("http")) {
            await conn.sendAudio(m.chat, audioUrl, { quoted: m, ptt: false });
        } else {
            await reply("Audio tidak ditemukan pada video ini.");
        }
    } catch {
        return reply("Terjadi kesalahan saat memproses TikTok.");
    }
};

handler.command = ["tiktok", "tt"];
handler.help = ["tiktok"];
handler.tags = ["downloader"];
handler.owner = false;

export default handler;