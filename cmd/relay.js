
/*

© Credate by fauzialifatah - simple bot
https://whatsapp.com/channel/0029Vb6j2u74NViqgNCLev3a

*/

import "../../settings/config.js";
import * as jimp from "jimp";

let handler = async (m, { conn, pushName, runtime, prefix, reaction }) => {
    await reaction(m.chat, "📢");
    const user = global.db.users[m.sender];

    const text = `*لسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ*

${pushName}🍁 Saya adalah asisten otomatis yang dirancang untuk membantu Anda dengan informasi dan jawaban yang Anda cari. Silakan bertanya atau meminta bantuan kepada saya.1

*status run:*
*[ ⌬ ] runtime:* ${runtime(process.uptime())}
*[ ⌬ ] role:* ${user.role}
*[ ⌬ ] total command:* ${user.command}

silahkan pilih menu yang tersedia di button whatsapp untuk memulai, saya akan memberikan layanan terbaik di bot kami
`;

    const fauziganteng = [
        {
            title: "Cek Waktu Aktif",
            description: "Menampilkan uptime bot",
            id: ".runtime"
        },
        {
            title: "Owner",
            description: "Menampilkan kontak pemilik bot",
            id: ".owner"
        }
    ];

    if (global.menuStyle === 'relay') {
        const relayButtons = [
            {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                    title: "Assisten",
                    sections: [
                        {
                            title: "Menu - Botz",
                            highlight_label: "PILIHAN",
                            rows: fauziganteng
                        }
                    ],
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Just call🕊️",
                    url: "https://t.me/FauziAlifatah"
                })
            }
        ];
        await conn.sendButtonRelay(m.chat, text, relayButtons, m);

    } else if (global.menuStyle === 'button') {
        const imageUrl = 'https://files.catbox.moe/6fk98a.jpg';
        const simpleButtons = fauziganteng;
        await conn.sendButton(m.chat, text, global.namebotz, "Silahkan Pilih Menu", imageUrl, null, simpleButtons, m);
    }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ["menu"];
handler.limit = 1;

export default handler;