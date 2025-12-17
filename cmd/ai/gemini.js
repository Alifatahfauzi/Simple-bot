import axios from 'axios';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    if (!q) return reply(`Contoh: ${prefix}gemini hai ai`);
    
    await reaction(m.chat, "🧠");
    
    try {
        const response = await axios.get("https://ytdlpyton.nvlgroup.my.id/ai/gemini", {
            params: {
                text: q.trim(),
                model: "gemma-3-27b-it"
            },
            headers: {
                'accept': 'application/json',
                'X-API-Key': global.nauvalApiKey,
            }
        });
        
        const result = response.data;

        if (result.result) {
            
            const replyText = `${result.result.trim()}

> — Creator Fauzialifatah
            `;
            await reply(replyText.trim());
            
        } else {
            reply(`❌ Gagal mendapatkan respons dari Gemini AI.
            \n*Pesan API:* ${result.message || 'Respons tidak valid atau API key bermasalah.'}`);
        }

    } catch (error) {
        
        let errorMessage = `❌ Terjadi kesalahan koneksi saat menghubungi API AI.`;
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}. Pesan: ${error.response.data?.message || 'Server API Error'}.`;
        }
        reply(errorMessage);
    }
};

handler.command = ['gemini']; 
handler.help = ['ai'];
handler.tags = ['ai'];
handler.owner = false;

export default handler;