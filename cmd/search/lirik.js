import axios from 'axios';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    if (!q) {
        return reply(`Format Salah!\n\nContoh: ${prefix}lirik body pata pata`);
    }

    await reaction(m.chat, "🎶");
    
    const BASE_URL = "https://zelapioffciall.koyeb.app/search/lirik";
    
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: q.trim()
            },
            headers: {
                'accept': 'application/json'
                // API ini tidak memerlukan X-API-Key berdasarkan curl example
            }
        });
        
        const result = response.data;

        if (result.status === true && result.result?.lyrics) {
            
            const song = result.result;
            
            const replyText = `
*✅ Lirik Ditemukan!*

*Judul:* ${song.track || 'N/A'}
*Artis:* ${song.artist || 'N/A'}
*Album:* ${song.album || 'N/A'}
*Durasi:* ${song.duration || 'N/A'}

*--- LIRIK ---*
${song.lyrics.trim()}
            `;
            
            await reply(replyText.trim());
            
        } else {
            reply(`Gagal mencari lirik lagu. Pesan API: ${result.message || 'Lirik tidak ditemukan untuk lagu tersebut.'}`);
        }

    } catch (error) {
        let errorMessage = `Terjadi kesalahan koneksi saat menghubungi API.`;
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}. Pesan: ${error.response.data?.message || 'Server API Error'}.`;
        }
        reply(errorMessage);
    }
};

handler.command = ['lirik', 'lyrics']; 
handler.help = ['lirik'];
handler.tags = ['search'];
handler.owner = false;

export default handler;