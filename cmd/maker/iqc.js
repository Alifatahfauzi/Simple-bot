let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "iqc teks");
    }

    await reaction(m.chat, "⏳");

    try {
        const params = new URLSearchParams({
            text: q,
            time: "18.30",
            bartime: "thx fauzialifatah"
        });

        const apiUrl = "https://api.zenitsu.web.id/api/maker/iqc?" + params.toString();

        const res = await fetch(apiUrl);
        if (!res.ok) {
            return reply("Gagal membuat IQC. Kode status: " + res.status);
        }

        const arrayBuf = await res.arrayBuffer();
        const imgBuffer = Buffer.from(arrayBuf);

        const captionText =
            "IQC Maker\n\n" +
            "Text: " + q + "\n" +
            "Time: 18.30\n\n" +
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
        return reply("Terjadi kesalahan saat membuat IQC.");
    }
};

handler.command = ["iqc"];
handler.help = ["iqc"];
handler.tags = ["maker"];
handler.owner = false;

export default handler;