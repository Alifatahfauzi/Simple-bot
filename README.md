# Alifatah WhatsApp Bot

![Pair](https://files.catbox.moe/vifubv.jpg)

1. support dukungan buttonsMessage dan interactiveMessage WhatsApp bisnis dan WhatsApp asli
2. ringan dan online 24 jam nonstop 
3. masih menggunakan node20
4. tidak ada 100% encryption
5. support pairing

# settings/config.js
```config.js
import fs from "fs";
import chalk from "chalk";

global.owner = ["6282199509537"];
global.mode = false;

global.namebotz = "Alifatah wabot !";
global.packname = 'www.ziihost.store';
global.nameown = "Fauzialifatah | Projects";
global.author = 'https://www.github.com/Alifatahfauzi';
global.footer = "𝗍𝖾𝗅𝖾𝗀𝗋𝖺𝗆: @FauziAlifatah";

global.YouTube = "https://www.youtube.com/@Fauzialifatah";
global.GitHub = "https://github.com/Alifatahfauzi";
global.Telegram = "https://t.me/FauziAlifatah";
global.ChannelWA = "https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z";
```

# Cara run
```
git clone https://github.com/Alifatahfauzi/Simple-bot
cd Simple-bot
npm install
node index.js ( start bot )
```

# sendButton 
```javascript
const buttonData = [
    {
        title: `${global.nameown}`,
        description: `${global.namebotz}`, 
        id: '.rt' // tujuan command nya
    }
];
await conn.sendButton(m.chat, text, footer, btnklick, image1, image2, buttonData, m);
```

**jid:** Tujuan Pengiriman. Ini adalah nomor WhatsApp atau ID grup (m.chat) ke mana pesan akan dikirim.

**text:** Teks Utama Pesan. Ini adalah caption atau isi teks utama yang muncul di atas gambar.

**footer:** Teks Bagian Bawah. Teks kecil yang akan ditampilkan di bagian paling bawah pesan.

**btnklick:** Judul Saat Tombol Diklik. Teks ini akan menjadi judul besar ketika pengguna mengklik tombol dan daftar pilihan muncul.

**image1:** URL Gambar Utama. Link gambar yang akan menjadi media utama dalam pesan.

**image2:** URL Gambar Kedua. Dalam kode Anda, parameter ini ada tetapi tidak digunakan secara langsung di dalam pembuatan pesan utama. Mungkin disiapkan untuk penggunaan lain.

**buttons:** Data Tombol. Ini adalah sebuah array yang berisi objek-objek. Setiap objek mendefinisikan satu baris tombol yang akan ditampilkan.

# cmd/menu.js
ini adlaah fitur **menu** yang menggunakan button **single_select** dan menu ini lebih mudah untuk di otak atik

```javascript
import "../../settings/config.js";

let handler = async (m, { conn, runtime, pushName, prefix }) => {
    const user = global.db.users[m.sender];
    const text = `*Halo ${pushName}🪸!* \nSaya adalah asisten ${global.namebotz} otomatis, siap membantu Anda dengan informasi dan jawaban yang Anda cari
    
▢ runtime: ${runtime(process.uptime())}
▢ role: ${user.role}
▢ limit: ${user.limit === Infinity ? '∞' : user.limit}
▢ total command: ${user.command}

command:
 ▢ ${prefix}eval
 ▢ ${prefix}runtime
`;
    const footer = `${global.footer}`;
    const image1 = `https://files.catbox.moe/y9rs67.jpg`;
    const image2 = `https://files.catbox.moe/y9rs67.jpg`;
    const btnklick = "Assisten";

    const buttonData = [
        {
            title: `${global.nameown}`,
            description: `${global.namebotz}`,
            id: '.rt'
        }
    ];
    await conn.sendButton(m.chat, text, footer, btnklick, image1, image2, buttonData, m);
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ["menu"];
handler.limit = 1;

export default handler;
```
# fix carousel slide ( esm )
```javascript
import baileys from "@whiskeysockets/baileys";

const {
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = baileys;

let handler = async (m, { conn, user }) => {
    
    let password = 'PasswordContoh123';
    let Randomimagebyvynnox = 'https://files.catbox.moe/254wej.jpg';
    let pan = `-Panerudēta`;

    let msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: pan },
                        carouselMessage: {
                            cards: [
                                {
                                    header: baileys.proto.Message.InteractiveMessage.Header.create({
                                        ...(await prepareWAMessageMedia(
                                            { image: { url: Randomimagebyvynnox } },
                                            { upload: conn.waUploadToServer },
                                        )),
                                        title: ``,
                                        gifPlayback: true,
                                        subtitle: global.ownername,
                                        hasMediaAttachment: false,
                                    }),
                                    body: {
                                        text: `「 *[USER + LOGIN]* 」\n\n*[ ${global.title} ]*\n> • Jangan Spam/Mainin Bot\n> • Jangan Telpon/Call Bot\n> • Langgar Tanggung Konsekuensi`,
                                    },
                                    nativeFlowMessage: {
                                        buttons: [
                                            {
                                                name: 'cta_url',
                                                buttonParamsJson: `{"display_text":"🚀 Login ( ${global.domain} )","url":"${global.domain}","merchant_url":"${global.domain}"}`,
                                            },
                                            {
                                                name: 'cta_copy',
                                                buttonParamsJson: `{"display_text": "✩ 🚀 Copy User","copy_code": "${user.username}"}`,
                                            },
                                        ],
                                    },
                                },
                                {
                                    header: baileys.proto.Message.InteractiveMessage.Header.create({
                                        ...(await prepareWAMessageMedia(
                                            { image: { url: Randomimagebyvynnox } },
                                            { upload: conn.waUploadToServer },
                                        )),
                                        title: ``,
                                        gifPlayback: true,
                                        subtitle: global.ownername,
                                        hasMediaAttachment: false,
                                    }),
                                    body: {
                                        text: `「 *[PW + CH DEV]* 」\n\n*[ ${global.title} ]*\n• Follow Dulu\n• Ch Dev Gw\n• Beli Prem Dll Chat Owner\n• Silahkan Gunakan Dengan Bijak`,
                                    },
                                    nativeFlowMessage: {
                                        buttons: [
                                            {
                                                name: 'cta_url',
                                                buttonParamsJson: `{"display_text":"  🚀  Saluran Dev ( ${global.title} )","url":"${global.chdev}","merchant_url":"${global.chdev}"}`,
                                            },
                                            {
                                                name: 'cta_copy',
                                                buttonParamsJson: `{"display_text": "✩ 🚀 Copy Pw","copy_code": "${password}"}`,
                                            },
                                        ],
                                    },
                                },
                            ],
                            messageVersion: 1,
                        },
                    },
                },
            },
        },
        {},
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = ["carousel"];
handler.help = ["carousel"];
handler.tags = ["main"];

export default handler;
```
