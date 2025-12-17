import fetch from 'node-fetch';

let handler = async (m, plug) => {
    const { reply, q, prefix, reaction } = plug;
    
    if (!q) {
        return reply(`Contoh: ${prefix}cf siapa presiden Indonesia sekarang?`);
    }
    await reaction(m.chat, "☁️");
    try {
        const urlParams = new URLSearchParams({
            apikey: global.velynApiKey,
            prompt: q.trim()
        });
        
        const apiUrl = `https://velyn.mom/api/ai/cloudflare?${urlParams.toString()}`;

        const apiResponse = await fetch(apiUrl);

        if (!apiResponse.ok) {
            let errorText = await apiResponse.text();
            return reply(`❌ Gagal terhubung ke Cloudflare AI. Status: ${apiResponse.status}.\nPesan: ${errorText}`);
        }
        
        const result = await apiResponse.json();
        if (result.status === 200 && result.data?.result) {
            
            let nestedResult;
            try {
                nestedResult = JSON.parse(result.data.result);
            } catch {
                nestedResult = { result: { response: result.data.result } };
            }
            const finalResponse = nestedResult.result?.response || nestedResult.result?.tool_calls || 'Respons tidak terdefinisi.';
            
            const replyText = `${(typeof finalResponse === 'string' ? finalResponse : JSON.stringify(finalResponse, null, 2)).trim()}

> — Creator: Fauzialifatah
            `;
            
            await reply(replyText.trim());
            
        } else {
            reply(`❌ Gagal mendapatkan respons dari Cloudflare AI. Pesan API: ${result.message || 'Error tidak diketahui.'}`);
        }

    } catch (error) {
        reply(`❌ Terjadi kesalahan saat memproses permintaan Cloudflare AI: ${error.message}`);
    }
};

handler.command = ['aicf', 'cloudflare']; 
handler.help = ['cf'];
handler.tags = ['ai'];
handler.owner = false;

export default handler;