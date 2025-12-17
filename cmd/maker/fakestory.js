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
        const text = await res.text();
        return text.trim();
    } catch {
        return null;
    }
}

let handler = async (m, plug) => {
    const { conn, reply, q, prefix, reaction, pushName } = plug;

    if (!q) {
        return reply("Gunakan: " + prefix + "fakestory teks\nLalu reply ke foto yang mau dipakai.");
    }

    if (!m.quoted) {
        return reply("Reply ke gambar yang ingin dijadikan fake story.");
    }

    const qmsg = m.quoted;
    const mime = (qmsg.msg || qmsg).mimetype || "";
    if (!/image/.test(mime)) {
        return reply("Yang direply harus berupa gambar.");
    }

    await reaction(m.chat, "⏳");

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

        const userName = pushName || "User";
        const params = new URLSearchParams({
            user: userName,
            caption: q,
            pp: catboxUrl
        });

        const apiUrl = "https://api.zenitsu.web.id/api/maker/fakestory?" + params.toString();

        const res = await fetch(apiUrl);
        if (!res.ok) {
            return reply("Fake story gagal dibuat. Kode status: " + res.status);
        }

        const arrayBuf = await res.arrayBuffer();
        const imgBuffer = Buffer.from(arrayBuf);

        const captionText =
            "Fake Story\n\n" +
            "User: " + userName + "\n" +
            "Caption: " + q + "\n\n" +
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
        return reply("Terjadi kesalahan saat membuat fake story.");
    }
};

handler.command = ["fakestory"];
handler.help = ["fakestory"];
handler.tags = ["maker"];
handler.owner = false;

export default handler;