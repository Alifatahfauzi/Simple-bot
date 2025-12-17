let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction, fetchJson } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "igstalk username\nContoh: " + prefix + "igstalk fauzialifatah_");
    }

    let username = q.trim();
    if (username.startsWith("@")) username = username.slice(1);

    await reaction(m.chat, "🔍");

    try {
        const params = new URLSearchParams({
            apikey: global.velynApiKey,
            username: username
        });

        const apiUrl = "https://velyn.mom/api/stalker/instagram?" + params.toString();
        const result = await fetchJson(apiUrl);

        if (!result || result.status !== 200 || !result.data) {
            return reply("Gagal mengambil data Instagram.");
        }

        const data = result.data;

        const uname = data.username || "Tidak diketahui";
        const name = data.name || "Tidak diketahui";
        const profileUrl = data.profileUrl || "-";
        const avatar = data.avatar || null;
        const followers = data.followers || "-";
        const uploads = data.uploads || "-";
        const engagement = data.engagement || "-";
        const source = data.source || "-";

        let teks = "📷 Instagram Stalker\n\n";
        teks += "👤 Nama       : " + name + "\n";
        teks += "🔖 Username   : " + uname + "\n";
        teks += "📎 Profil     : " + profileUrl + "\n";
        teks += "👥 Followers  : " + followers + "\n";
        teks += "📤 Uploads    : " + uploads + "\n";
        teks += "📊 Engagement : " + engagement + "\n";
        teks += "🧾 Source     : " + source + "\n\n";
        teks += "Powered by Fauzialifatah";

        if (avatar && typeof avatar === "string" && avatar.startsWith("http")) {
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: avatar },
                    caption: teks
                },
                { quoted: m }
            );
        } else {
            await reply(teks);
        }
    } catch {
        return reply("Terjadi kesalahan saat memproses IG Stalker.");
    }
};

handler.command = ["igstalk", "igstalker"];
handler.help = ["igstalk"];
handler.tags = ["stalker"];
handler.owner = false;

export default handler;