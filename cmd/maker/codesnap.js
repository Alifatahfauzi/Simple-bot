let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "codesnap code\nContoh: " + prefix + "codesnap console.log('hello world');");
    }

    await reaction(m.chat, "💻");

    try {
        const params = new URLSearchParams({
            code: q
        });

        const apiUrl = "https://api.elrayyxml.web.id/api/maker/codesnap?" + params.toString();

        const res = await fetch(apiUrl);
        if (!res.ok) {
            return reply("Gagal membuat codesnap. Kode status: " + res.status);
        }

        const arrayBuf = await res.arrayBuffer();
        const imgBuffer = Buffer.from(arrayBuf);

        const captionText =
            "CodeSnap\n\n" +
            "Code: " + q + "\n\n" +
            "Powered by Fauzialifatah";

        await conn.sendMessage(
            m.chat,
            {
                image: imgBuffer,
                caption: captionText
            },
            { quoted: m }
        );
    } catch {
        return reply("Terjadi kesalahan saat membuat codesnap.");
    }
};

handler.command = ["codesnap"];
handler.help = ["codesnap"];
handler.tags = ["maker"];
handler.owner = false;

export default handler;