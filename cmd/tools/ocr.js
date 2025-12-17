import fs from 'fs';
import fetch, { Blob, FormData } from 'node-fetch';

let uploadToCatbox = async (buffer) => {
    try {
        const ext = "jpg";
        const mimeType = "image/jpeg";

        const blob = new Blob([buffer], { type: mimeType });
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("fileToUpload", blob, "file." + ext);

        const res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form
        });

        const url = await res.text();
        if (url.startsWith('https://')) return url;
        throw new Error(url);
    } catch (e) {
        throw new Error(`Gagal mengunggah ke Catbox: ${e.message || e}`);
    }
};

let handler = async (m, plug) => {
    const { reply, quoted, prefix, reaction, conn } = plug;

    const targetMsg = m.quoted ? m.quoted : quoted || m;

    let mime =
        (targetMsg.msg && targetMsg.msg.mimetype) ||
        targetMsg.mimetype ||
        targetMsg.mediaType ||
        '';

    if (!/image/.test(mime)) {
        return reply(
            `*Format Salah!*\n\n` +
            `Kirim *atau reply* gambar yang ingin di-OCR dengan caption *${prefix}ocr*`
        );
    }

    await reaction(m.chat, "⌛");
    let imageUrl = null;
    let cleanupMediaPath = null;

    try {
        const mediaPath = await conn.downloadAndSaveMediaMessage(targetMsg);
        cleanupMediaPath = mediaPath;

        const buffer = fs.readFileSync(mediaPath);

        imageUrl = await uploadToCatbox(buffer);

        fs.unlinkSync(mediaPath);
        cleanupMediaPath = null;

        if (!imageUrl) {
            throw new Error("URL Catbox kosong setelah upload.");
        }
    } catch (e) {
        if (cleanupMediaPath) {
            try { fs.unlinkSync(cleanupMediaPath); } catch {}
        }
        return reply(`Gagal menyiapkan gambar untuk OCR. ${e.message || e}`);
    }

    try {
        const urlParams = new URLSearchParams({ imgUrl: imageUrl });
        const apiUrl = `https://api.zenitsu.web.id/api/tools/ocr?${urlParams.toString()}`;

        const apiResponse = await fetch(apiUrl);
        const result = await apiResponse.json();

        if (result.statusCode === 200 && result.results) {
            const replyText = `
*Hasil Teks:*
*${(result.results || '').trim()}*
            `;
            await reply(replyText.trim());
        } else {
            reply(
                `❌ Gagal menjalankan OCR. Pesan API: ` +
                `${result.message || result.results || 'Gambar tidak mengandung teks yang dapat dibaca.'}`
            );
        }

    } catch (error) {
        reply(`❌ Terjadi kesalahan koneksi saat memproses OCR: ${error.message || error}`);
    }
};

handler.command = ['ocr'];
handler.help = ['ocr'];
handler.tags = ['tools'];
handler.owner = false;

export default handler;