let handler = async (m, plug) => {
    const { conn, reply, reaction } = plug;

    await reaction(m.chat, "📸");

    try {
        const imageUrl = "https://api.zenitsu.web.id/api/random/cecan/indonesia";

        await conn.sendMessage(
            m.chat,
            {
                image: { url: imageUrl },
                caption: "Random Cecan Indonesia\nPowered by Fauzialifatah"
            },
            { quoted: m }
        );
    } catch (e) {
        return reply("Terjadi kesalahan: " + (e.message || "Tidak diketahui"));
    }
};

handler.command = ["cecan"];
handler.help = ["cecan"];
handler.tags = ["random"];
handler.owner = false;

export default handler;