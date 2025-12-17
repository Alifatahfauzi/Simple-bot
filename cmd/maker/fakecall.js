import fs from 'fs';
import fetch, { Blob, FormData } from 'node-fetch';

const uploadToCatbox = async (buffer) => {
    try {
        const ext = 'jpg';
        const mimeType = 'image/jpeg';
        const blob = new Blob([buffer], { type: mimeType });
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', blob, 'file.' + ext);
        const res = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
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
    const { reply, q, prefix, reaction, conn, quoted } = plug;

    if (!q || !q.includes('|')) {
        return reply(
            `⚠️ Format Salah!\n\n` +
            `Gunakan sebagai caption atau reply foto:\n` +
            `${prefix}fakecall [Nama]|[Durasi (hh:mm:ss)]\n\n` +
            `Contoh:\n` +
            `${prefix}fakecall Boss|00:05:12`
        );
    }

    const parts = q.split('|').map(s => s.trim());
    if (parts.length < 2) {
        return reply(
            `⚠️ Format Tidak Lengkap!\n\n` +
            `Gunakan sebagai caption atau reply foto:\n` +
            `${prefix}fakecall [Nama]|[Durasi (hh:mm:ss)]\n\n` +
            `Contoh:\n` +
            `${prefix}fakecall Boss|00:05:12`
        );
    }

    const name = parts[0];
    const duration = parts[1];

    if (!name || !duration) {
        return reply(
            `⚠️ Nama atau Durasi kosong!\n\n` +
            `Format:\n` +
            `${prefix}fakecall [Nama]|[Durasi (hh:mm:ss)]`
        );
    }

    const targetMsg = m.quoted ? m.quoted : quoted || m;
    const mime =
        (targetMsg.msg && targetMsg.msg.mimetype) ||
        targetMsg.mimetype ||
        targetMsg.mediaType ||
        '';

    if (!/image/.test(mime)) {
        return reply(
            `❌ Avatar tidak ditemukan.\n\n` +
            `Jadikan perintah sebagai caption foto atau reply ke foto:\n` +
            `${prefix}fakecall [Nama]|[Durasi (hh:mm:ss)]`
        );
    }

    await reaction(m.chat, '📞');

    const BASE_URL = 'https://velyn.mom/api/maker/calling';
    let cleanupMediaPath = null;
    let avatarUrl = null;

    try {
        const mediaPath = await conn.downloadAndSaveMediaMessage(targetMsg);
        cleanupMediaPath = mediaPath;
        const buffer = fs.readFileSync(mediaPath);
        avatarUrl = await uploadToCatbox(buffer);
        fs.unlinkSync(mediaPath);
        cleanupMediaPath = null;
        if (!avatarUrl) {
            throw new Error('URL Catbox kosong setelah upload.');
        }
    } catch (e) {
        if (cleanupMediaPath) {
            try { fs.unlinkSync(cleanupMediaPath); } catch {}
        }
        return reply(`❌ Gagal menyiapkan avatar untuk fake call. ${e.message || e}`);
    }

    try {
        const urlParams = new URLSearchParams({
            apikey: global.velynApiKey,
            name: name,
            duration: duration,
            avatar: avatarUrl
        });

        const apiUrl = `${BASE_URL}?${urlParams.toString()}`;
        const apiResponse = await fetch(apiUrl);
        const result = await apiResponse.json();

        if (result.status === true && result.result?.url) {
            await conn.sendMessage(
                m.chat,
                {
                    image: { url: result.result.url },
                    caption:
                        `✅ Fake Calling Screenshot Berhasil Dibuat!\n` +
                        `Penelepon: ${name}\n` +
                        `Durasi: ${duration}`
                },
                { quoted: m }
            );
        } else {
            reply(
                `❌ Gagal memproses permintaan.\n` +
                `Pesan API: ${result.message || 'Respons tidak valid atau API key bermasalah.'}`
            );
        }
    } catch (error) {
        reply(`❌ Terjadi kesalahan koneksi saat memproses permintaan: ${error.message}`);
    }
};

handler.command = ['fakecall', 'call'];
handler.help = ['fakecall'];
handler.tags = ['fun', 'maker'];
handler.owner = false;

export default handler;