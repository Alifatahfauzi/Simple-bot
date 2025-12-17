let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction, fetchJson } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "ytstalk username\nContoh: " + prefix + "ytstalk ErerexIDChx");
    }

    let username = q.trim();
    await reaction(m.chat, "📺");

    try {
        const params = new URLSearchParams({
            apikey: global.velynApiKey,
            username: username
        });

        const apiUrl = "https://velyn.mom/api/stalker/youtube?" + params.toString();
        const result = await fetchJson(apiUrl);

        if (!result || result.status !== 200 || !result.data) {
            return reply("Gagal mengambil data YouTube.");
        }

        const data = result.data;
        const meta = data.channelMetadata || {};
        const videos = Array.isArray(data.videoDataList) ? data.videoDataList : [];

        const chName = meta.username || "Tidak diketahui";
        const subs = meta.subscriberCount || "-";
        const chUrl = meta.channelUrl || "-";
        const desc = meta.description || "-";
        const avatarUrl = meta.avatarUrl || null;

        let teks = "📺 YouTube Stalker\n\n";
        teks += "📌 Channel  : " + chName + "\n";
        teks += "👥 Subscriber: " + subs + "\n";
        teks += "🔗 URL      : " + chUrl + "\n";
        teks += "📝 Deskripsi: " + desc + "\n\n";

        if (videos.length > 0) {
            teks += "🎬 Video Terbaru:\n";
            const maxShow = Math.min(videos.length, 5);

            for (let i = 0; i < maxShow; i++) {
                const v = videos[i];
                const vidTitle = v.title || "Tanpa judul";
                const published = v.publishedTime || "-";
                const views = v.viewCount || "-";
                const vidId = v.videoId || "";
                const watchUrl = vidId ? "https://www.youtube.com/watch?v=" + vidId : "-";

                teks += (i + 1) + ". " + vidTitle + "\n";
                teks += "   ⏱ " + published + " • 👁 " + views + "\n";
                teks += "   🔗 " + watchUrl + "\n\n";
            }
        } else {
            teks += "Tidak ada data video tersedia.\n\n";
        }

        teks += "Powered by Fauzialifatah";

        let thumb = null;
        if (avatarUrl && avatarUrl.startsWith("http")) {
            thumb = avatarUrl;
        } else if (videos[0] && videos[0].thumbnail && videos[0].thumbnail.startsWith("http")) {
            thumb = videos[0].thumbnail;
        }

        if (thumb) {
            await conn.sendMessage(
                m.chat,
                { image: { url: thumb }, caption: teks },
                { quoted: m }
            );
        } else {
            await reply(teks);
        }

    } catch {
        return reply("Terjadi kesalahan saat memproses YouTube Stalker.");
    }
};

handler.command = ["ytstalk", "ytstalker"];
handler.help = ["ytstalk"];
handler.tags = ["stalker"];
handler.owner = false;

export default handler;