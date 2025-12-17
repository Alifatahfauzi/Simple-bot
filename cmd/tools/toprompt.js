import fetch from 'node-fetch';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    let input = q.trim();
    let imageUrl = null;
    let userQuestion = null;
    if (input.includes('|')) {
        [imageUrl, userQuestion] = input.split('|').map(s => s.trim());
    } else {
        imageUrl = input;
    }

    if (!imageUrl || !imageUrl.startsWith('http')) {
        return reply(`⚠️ *Format Salah!*\n\nFormat harus: ${prefix}toprompt [url gambar]|(pertanyaan)\n\nContoh:\n${prefix}toprompt https://gambar.com/foto.jpg|apa yang dia lakukan?\n${prefix}toprompt https://gambar.com/foto.jpg`);
    }

    if (!userQuestion) {
        userQuestion = "jelaskan gambar ini secara detail.";
    }

    await reaction(m.chat, "📝");
    try {
        const urlParams = new URLSearchParams({
            apikey: global.velynApiKey,
            url: imageUrl,
            prompt: userQuestion 
        });
        
        const apiUrl = `https://velyn.mom/api/tools/prompt?${urlParams.toString()}`;

        const apiResponse = await fetch(apiUrl);
        const result = await apiResponse.json();
        if (result.status === 200 && result.data) {
            
            const finalPrompt = result.data.prompt;
            const apiMessage = result.message || 'Error API internal.';

            if (finalPrompt) {
                
                const replyText = `
*✅ Image Analysis (Image-to-Prompt)*

*Pertanyaan/Arahan:* ${userQuestion}
*Model:* ${result.data.model || 'N/A'}

*Hasil Deskripsi (Prompt):*
${finalPrompt.trim()}

> — Creator Fauzialifatah 
                `;
                
                await reply(replyText.trim());
                
            } else {
                reply(`❌ Gagal mendapatkan Prompt. ${apiMessage}\nKemungkinan gambar tidak dapat diproses atau tidak mengandung objek yang jelas.`);
            }

        } else {
            reply(`❌ Gagal memproses gambar. Pesan API: ${result.message || 'Error tidak diketahui dari respons API.'}`);
        }

    } catch (error) {
        reply(`❌ Terjadi kesalahan koneksi saat memproses gambar: ${error.message}`);
    }
};

handler.command = ['toprompt', 'descimg']; 
handler.help = ['toprompt'];
handler.tags = ['tools'];
handler.owner = false;

export default handler;