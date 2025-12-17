let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction, fetchJson } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "ghstalk username\nContoh: " + prefix + "ghstalk Alifatahfauzi");
    }

    let username = q.trim();
    if (username.startsWith("@")) username = username.slice(1);

    await reaction(m.chat, "🐱");

    try {
        const params = new URLSearchParams({
            apikey: global.velynApiKey,
            username: username
        });

        const apiUrl = "https://velyn.mom/api/stalker/github?" + params.toString();
        const result = await fetchJson(apiUrl);

        if (!result || result.status !== 200 || !result.data) {
            return reply("Gagal mengambil data GitHub.");
        }

        const data = result.data;

        const uname = data.username || "-";
        const nickname = data.nickname || "-";
        const bio = data.bio || "-";
        const url = data.url || "-";
        const profilePic = data.profile_pic || null;
        const type = data.type || "-";
        const admin = data.admin ? "Ya" : "Tidak";
        const company = data.company || "-";
        const blog = data.blog || "-";
        const location = data.location || "-";
        const email = data.email || "-";
        const repos = data.public_repo || 0;
        const gists = data.public_gists || 0;
        const followers = data.followers || 0;
        const following = data.following || 0;

        let createdAt = "-";
        let updatedAt = "-";

        if (data.created_at) {
            try {
                createdAt = new Date(data.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta", hour12: false });
            } catch {
                createdAt = data.created_at;
            }
        }

        if (data.updated_at) {
            try {
                updatedAt = new Date(data.updated_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta", hour12: false });
            } catch {
                updatedAt = data.updated_at;
            }
        }

        let teks = "🐱 GitHub Stalker\n\n";
        teks += "👤 Username : " + uname + "\n";
        teks += "📛 Nickname : " + nickname + "\n";
        teks += "📝 Bio      : " + bio + "\n";
        teks += "🔗 URL      : " + url + "\n\n";
        teks += "📦 Repo Publik : " + repos + "\n";
        teks += "📄 Gist Publik : " + gists + "\n";
        teks += "👥 Followers   : " + followers + "\n";
        teks += "👣 Following   : " + following + "\n\n";
        teks += "🏷 Tipe     : " + type + "\n";
        teks += "🛡 Admin    : " + admin + "\n";
        teks += "🏢 Company  : " + company + "\n";
        teks += "🌐 Blog     : " + blog + "\n";
        teks += "📍 Location : " + location + "\n";
        teks += "📧 Email    : " + email + "\n\n";
        teks += "📅 Dibuat   : " + createdAt + "\n";
        teks += "♻️ Diupdate : " + updatedAt + "\n\n";
        teks += "Powered by Fauzialifatah";

        if (profilePic && profilePic.startsWith("http")) {
            await conn.sendMessage(
                m.chat,
                { image: { url: profilePic }, caption: teks },
                { quoted: m }
            );
        } else {
            await reply(teks);
        }

    } catch {
        return reply("Terjadi kesalahan saat memproses GitHub Stalker.");
    }
};

handler.command = ["ghstalk", "githubstalk", "githubstalker"];
handler.help = ["ghstalk"];
handler.tags = ["stalker"];
handler.owner = false;

export default handler;