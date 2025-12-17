import axios from "axios";

let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction } = plug;

    if (!q) {
        return reply("Masukkan link Instagram.\nContoh: " + prefix + "igdl https://www.instagram.com/reel/XXXXXX");
    }

    const igUrl = q.trim();

    if (!/^https?:\/\/(www\.)?instagram\.com\//i.test(igUrl)) {
        return reply("Link tidak valid. Pastikan link Instagram benar.");
    }

    if (!global.velynApiKey) {
        return reply("API key Velyn belum diatur di config.js");
    }

    await reaction(m.chat, "⏬");

    try {
        const params = new URLSearchParams({
            apikey: global.velynApiKey,
            url: igUrl
        });

        const { data: result } = await axios.get("https://velyn.mom/api/downloader/instagram?" + params.toString());

        if (!result || result.status !== 200 || !result.data) {
            return reply("Gagal mengambil data dari API.");
        }

        const mediaUrls = Array.isArray(result.data.url) ? result.data.url : [];
        const meta = result.data.metadata || {};

        if (mediaUrls.length < 1) {
            return reply("Media tidak ditemukan pada link tersebut.");
        }

        const mediaUrl = mediaUrls[0];

        let captionText = "📥 Instagram Downloader\n";
        if (meta.username) captionText += "👤 Username: " + meta.username + "\n";
        if (typeof meta.like !== "undefined") captionText += "❤️ Like: " + meta.like + "\n";
        if (typeof meta.comment !== "undefined") captionText += "💬 Komentar: " + meta.comment + "\n";
        captionText += "🎥 Video: " + (meta.isVideo ? "Ya" : "Tidak") + "\n\n";
        if (meta.caption) captionText += "📝 Caption Asli:\n" + meta.caption + "\n\n";
        captionText += "Powered by Fauzialifatah";

        if (meta.isVideo) {
            await conn.sendMessage(
                m.chat,
                { video: { url: mediaUrl }, caption: captionText },
                { quoted: m }
            );
        } else {
            await conn.sendMessage(
                m.chat,
                { image: { url: mediaUrl }, caption: captionText },
                { quoted: m }
            );
        }
    } catch (e) {
        return reply("Terjadi kesalahan: " + (e.message || "Tidak diketahui"));
    }
};

handler.command = ["igdl"];
handler.help = ["igdl"];
handler.tags = ["downloader"];
handler.owner = false;

export default handler;