let handler = async (m, plug) => {
    const { conn, reaction, reply } = plug;

    await reaction(m.chat, "📸");

    try {
        const url = "https://api.zenitsu.web.id/api/random/cecan/japan";

        await conn.sendMessage(
            m.chat,
            {
                image: { url },
                caption: "Random Cecan Japan\nPowered by Fauzialifatah"
            },
            { quoted: m }
        );
    } catch (e) {
        return reply("Terjadi kesalahan: " + (e.message || "Tidak diketahui"));
    }
};

handler.command = ["cecanjapan"];
handler.help = ["cecanjapan"];
handler.tags = ["random"];
handler.owner = false;

export default handler;