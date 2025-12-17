import axios from 'axios';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    if (!q) return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${prefix}pinterest kucing lucu\n${prefix}pinterest pemandangan alam `);
    const limit = 2;

    await reaction(m.chat, "⏳");
    
    try {
        const response = await axios.get("https://ytdlpyton.nvlgroup.my.id/pinterest/search", {
            params: {
                query: q.trim(),
                limit: limit
            },
            headers: {
                'accept': 'application/json',
                'X-API-Key': "fauzialifatah"
            }
        });
        
        const result = response.data;
        const results = result.results;

        if (results && results.length > 0) {
            
            let captionText = `✅ *Pinterest Search Berhasil!*\n\n*Keyword:* ${result.query}\n\n`;

            for (let i = 0; i < results.length; i++) {
                const item = results[i];
                const imageUrl = item.media?.images?.orig?.url;
                
                if (imageUrl) {
                    let detailCaption = 
`--- Hasil ${i + 1}/${limit} ---
*Judul:* ${item.title || item.description || 'Tidak ada judul'}
*Uploader:* ${item.uploader?.full_name || item.uploader?.username || 'Anonim'}
*Link Pin:* ${item.pin_url}
`;
                    captionText += detailCaption;

                    await plug.conn.sendMessage(m.chat, {
                        image: { url: imageUrl },
                        caption: detailCaption.trim()
                    }, { quoted: m });
                }
            }

        } else {
            reply(`❌ Tidak ditemukan hasil untuk kata kunci: *${q}*`);
        }

    } catch (error) {
        
        let errorMessage = `❌ Terjadi kesalahan koneksi saat menghubungi API Pinterest.`;
        if (error.response) {
            errorMessage += ` Status: ${error.response.status}. Pesan: ${error.response.data?.message || 'Server API Error'}.`;
        }
        reply(errorMessage);
    }
};

handler.command = ['pinterest', 'pin']; 
handler.help = ['pinterest'];
handler.tags = ['search'];
handler.owner = false;

export default handler;