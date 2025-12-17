import fetch from 'node-fetch';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    if (!q) {
        return reply(`Contoh: ${prefix}llama siapa presiden Indonesia?`);
    }

    await reaction(m.chat, "🦙");
    try {
        const urlParams = new URLSearchParams({
            apikey: global.velynApiKey,
            prompt: q.trim()
        });
        
        const apiUrl = `https://velyn.mom/api/ai/llama-3.1-8b?${urlParams.toString()}`;

        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
            let errorText = await apiResponse.text();
            return reply(`❌ Gagal terhubung ke Llama AI. Status: ${apiResponse.status}.\nPesan: ${errorText}`);
        }
        
        const result = await apiResponse.json();
        if (result.status === 200 && result.data?.result) {
            
            let nestedResult;
            try {
                nestedResult = JSON.parse(result.data.result);
            } catch {
                nestedResult = { result: { response: result.data.result } };
            }
            
            const finalResponse = nestedResult.result?.response || 'Respons tidak terdefinisi.';
            
            const replyText = `${finalResponse.trim()}

> — Creator: Fauzialifatan
            `;
            
            await reply(replyText.trim());
            
        } else {
            reply(`❌ Gagal mendapatkan respons dari Llama AI. Pesan API: ${result.message || 'Error tidak diketahui.'}`);
        }

    } catch (error) {
        reply(`❌ Terjadi kesalahan saat memproses permintaan Llama AI: ${error.message}`);
    }
};

handler.command = ['llama', 'ai3']; 
handler.help = ['llama'];
handler.tags = ['ai'];
handler.owner = false;

export default handler;