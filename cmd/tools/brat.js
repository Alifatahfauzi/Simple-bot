import { makeStickerFromUrl } from "../../source/events/_sticker.js";
import { getBuffer } from "../../source/myfunc.js";

let handler = async (m, plug) => {
  const { reply, q, prefix, reaction } = plug;
  
  if (!q) {
    return reply(`Format Salah! Masukkan teks.\nContoh: ${prefix}brat haii`);
  }
  
  const textEncoded = encodeURIComponent(q.substring(0, 100));
  const url = `https://rynekoo-api.hf.space/canvas/brat/v1?text=${textEncoded}`;
  await reaction(m.chat, "⏳");

  try {
    
    const imageBuffer = await getBuffer(url, {
      headers: {
        'Accept': 'image/png'
      }
    });

    if (!imageBuffer || imageBuffer.length < 100) {
      return reply("❌ Gagal mendapatkan gambar dari API. Mungkin teks terlalu panjang atau API sedang down.");
    }
    
    const base64Image = imageBuffer.toString("base64");
    const mimeType = 'image/png';
    const imageUrl = `data:${mimeType};base64,${base64Image}`;

    await makeStickerFromUrl(imageUrl, plug.conn, m, reply, global.packname, global.author);
    
    plug.conn.sendMessage(m.chat, { delete: m.key });

  } catch (error) {
    reply("❌ Terjadi kesalahan saat membuat stiker. Coba lagi nanti.");
  }
};

handler.command = ['brat']; 
handler.help = ['brat'];
handler.tags = ['fun'];
handler.owner = false;

export default handler;