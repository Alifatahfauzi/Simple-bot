import fetch from 'node-fetch';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    let input = q.trim();
    let imageUrl = null;
    let prompt = null;

    if (!input.includes('|')) {
        return reply(`Contoh: ${prefix}rmimg https://gambar.com/foto.jpg|hapus baju`);
    }

    [imageUrl, prompt] = input.split('|').map(s => s.trim());

    if (!imageUrl || !imageUrl.startsWith('http')) {
        return reply(`❌ URL gambar tidak valid. Pastikan URL diawali dengan 'http'.`);
    }
    
    if (!prompt) {
        return reply(`Contoh: ${prefix}rmimg ${imageUrl}|hapus topi`);
    }

    await reaction(m.chat, "⏳");

    try {
        const urlParams = new URLSearchParams({
            apikey: global.velynApiKey,
            url: imageUrl,
            prompt: prompt
        });
        
        const apiUrl = `https://velyn.mom/api/tools/remove?${urlParams.toString()}`;

        const apiResponse = await fetch(apiUrl);
        const result = await apiResponse.json();

        if (result.status === true && result.result?.url) {
            
            await conn.sendMessage(m.chat, { 
                image: { url: result.result.url },
                caption: `✅ Image Edit Berhasil!\n*Prompt:* ${prompt}`
            }, { quoted: m });
            
        } else {
            reply(`❌ Gagal memproses gambar. Pesan API: ${result.message || 'Respons tidak valid atau API key bermasalah.'}`);
        }

    } catch (error) {
        reply(`❌ Terjadi kesalahan koneksi saat memproses gambar: ${error.message}`);
    }
};

handler.command = ['imageremove', 'rmimg']; 
handler.help = ['imageremove'];
handler.tags = ['tools'];
handler.owner = false;

export default handler;