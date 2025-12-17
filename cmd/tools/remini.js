import fs from "fs";
import fileType from "file-type";

async function uploadToCatbox(buffer) {
    try {
        const typeInfo = await fileType.fromBuffer(buffer);
        const ext = typeInfo?.ext || "bin";
        const mimeType = typeInfo?.mime || "application/octet-stream";
        const blob = new Blob([buffer], { type: mimeType });
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", blob, "file." + ext);
        const res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form
        });
        return await res.text();
    } catch {
        return null;
    }
}

let handler = async (m, plug) => {
    const { conn, reply, reaction } = plug;

    if (!m.quoted) {
        return reply("Reply ke gambar yang ingin diperjelas dengan .remini");
    }

    const qmsg = m.quoted;
    const mime = (qmsg.msg || qmsg).mimetype || "";
    if (!/image/.test(mime)) {
        return reply("Yang direply harus berupa gambar.");
    }

    await reaction(m.chat, "✨");

    try {
        const mediaPath = await conn.downloadAndSaveMediaMessage(qmsg);
        const buffer = fs.readFileSync(mediaPath);
        const catboxUrl = await uploadToCatbox(buffer);

        try {
            fs.unlinkSync(mediaPath);
        } catch {}

        if (!catboxUrl || !catboxUrl.startsWith("http")) {
            return reply("Gagal mengupload gambar ke Catbox.");
        }

        const apiUrl = "https://api.elrayyxml.web.id/api/tools/remini?url=" + encodeURIComponent(catboxUrl);

        const res = await fetch(apiUrl);
        if (!res.ok) {
            return reply("Gagal memproses gambar dengan Remini. Kode status: " + res.status);
        }

        const arrayBuf = await res.arrayBuffer();
        const imgBuffer = Buffer.from(arrayBuf);

        const captionText =
            "Remini Enhance\n\n" +
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
        return reply("Terjadi kesalahan saat memproses Remini.");
    }
};

handler.command = ["remini"];
handler.help = ["remini"];
handler.tags = ["tools"];
handler.owner = false;

export default handler;