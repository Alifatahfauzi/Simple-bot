import fetch from 'node-fetch';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    if (!q) {
        return reply(`Contoh: ${prefix}google siapa penemu bola lampu?`);
    }

    await reaction(m.chat, "🔎");
    try {
        const urlParams = new URLSearchParams({
            apikey: global.velynApiKey,
            prompt: q.trim()
        });
        
        const apiUrl = `https://velyn.mom/api/ai/google?${urlParams.toString()}`;

        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
            let errorText = await apiResponse.text();
            return reply(`❌ Gagal terhubung ke Google AI. Status: ${apiResponse.status}.\nPesan: ${errorText}`);
        }
        
        const result = await apiResponse.json();
        if (result.status === 200 && result.data?.result) {
            
            const finalResponse = result.data.result;
            
            const replyText = `${finalResponse.trim()}

> — Creator: Fauzialifatah
            `;
            
            await reply(replyText.trim());
            
        } else {
            reply(`❌ Gagal mendapatkan respons dari Google AI. Pesan API: ${result.message || 'Error tidak diketahui atau respons kosong.'}`);
        }

    } catch (error) {
        reply(`❌ Terjadi kesalahan saat memproses permintaan Google AI: ${error.message}`);
    }
};

handler.command = ['google', 'ai4']; 
handler.help = ['google'];
handler.tags = ['ai'];
handler.owner = false;

export default handler;