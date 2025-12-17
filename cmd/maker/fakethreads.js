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
        return reply("Gunakan: " + prefix + "fakethreads teks | like\nContoh: " + prefix + "fakethreads haii | 600");
    }

    if (!m.quoted) {
        return reply("Reply ke gambar yang akan dijadikan avatar fakethreads.");
    }

    const qmsg = m.quoted;
    const mime = (qmsg.msg || qmsg).mimetype || "";
    if (!/image/.test(mime)) {
        return reply("Yang direply harus berupa gambar.");
    }

    const parts = q.split("|");
    const text = (parts[0] || "").trim();
    const likeRaw = (parts[1] || "").trim();
    const likeCount = likeRaw && !isNaN(Number(likeRaw)) ? String(Number(likeRaw)) : "0";

    if (!text) {
        return reply("Teks tidak boleh kosong.\nFormat: " + prefix + "fakethreads teks | like");
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

        const username = pushName || "User";
        const params = new URLSearchParams({
            username: username,
            avatar: catboxUrl,
            text: text,
            count_like: likeCount
        });

        const apiUrl = "https://api.elrayyxml.web.id/api/maker/fakethreads?" + params.toString();

        const res = await fetch(apiUrl);
        if (!res.ok) {
            return reply("Gagal membuat fakethreads. Kode status: " + res.status);
        }

        const arrayBuf = await res.arrayBuffer();
        const imgBuffer = Buffer.from(arrayBuf);

        const captionText =
            "Fake Threads\n\n" +
            "Username: " + username + "\n" +
            "Text: " + text + "\n" +
            "Like: " + likeCount + "\n\n" +
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
        return reply("Terjadi kesalahan saat membuat fakethreads.");
    }
};

handler.command = ["fakethreads"];
handler.help = ["fakethreads"];
handler.tags = ["maker"];
handler.owner = false;

export default handler;