let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "nulis teks\nContoh: " + prefix + "nulis terimakasih fauzialifatah");
    }

    await reaction(m.chat, "✍️");

    try {
        const params = new URLSearchParams({
            text: q
        });

        const apiUrl = "https://api.elrayyxml.web.id/api/maker/nulis?" + params.toString();

        const res = await fetch(apiUrl);
        if (!res.ok) {
            return reply("Gagal membuat nulis. Kode status: " + res.status);
        }

        const arrayBuf = await res.arrayBuffer();
        const imgBuffer = Buffer.from(arrayBuf);

        const captionText =
            "Nulis Maker\n\n" +
            "Teks: " + q + "\n\n" +
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
        return reply("Terjadi kesalahan saat membuat nulis.");
    }
};

handler.command = ["nulis"];
handler.help = ["nulis"];
handler.tags = ["maker"];
handler.owner = false;

export default handler;