# UPDATE V TERBARU 

<div align="center">

  <img src="https://files.catbox.moe/zbe5n3.jpg" />

  <a href="https://whatsapp.com/channel/0029Vb6j2u74NViqgNCLev3a">
    <img src="https://img.shields.io/badge/WhatsApp-Channel-25D366?logo=whatsapp&logoColor=white" alt="WhatsApp Channel" />
  </a>

</div>

selamat menggunakan base bot whatsapp, kami telah update base bot whatsapp ini dengan lebih stabill dan mudah di ( rename ) menggunakan bahasa ( Java script ) support pairing code, support lid & jid khusunya ! isOwner menggunakan node js versi 24 selamat menggunakan base bot whatsapp dari #Fauzialifatah

### Support JID & LID

<details>
<summary style="font-weight: bold; cursor: pointer; padding: 8px; border-bottom: 1px solid #eee; margin-bottom: 5px;">config.js</summary>
<div style="padding: 10px 15px; background: #f9f9f9; border: 1px solid #eee; border-top: none; border-radius: 0 0 5px 5px;">

```js
import fs from "fs";
import chalk from "chalk";

/** info id **/
global.owner = ["628xxx","999999@lid"];
global.mode = false;

/** nama bot **/
global.namebotz = "Alifatah wabot !";
global.packname = 'www.ziihost.store';
global.nameown = "Fauzialifatah | Projects";
global.author = 'https://www.github.com/Alifatahfauzi';
global.footer = "𝗍𝖾𝗅𝖾𝗀𝗋𝖺𝗆: @FauziAlifatah";

/** media **/
global.YouTube = "https://www.youtube.com/@Fauzialifatah";
global.GitHub = "https://github.com/Alifatahfauzi";
global.Telegram = "https://t.me/FauziAlifatah";
global.ChannelWA = "https://whatsapp.com/channel/0029VawsCnQ9mrGkOuburC1z";

/** message **/
global.mess = {
    group: "ngapain? khusus grup njrr",
    admin: "ngapain? khusus admin njrr",
    owner: "apalah, bukan owner",
    botadmin: "bot bukan admin"
}
```
*isOwner sudah support dengan @Lid & @Jid jadi kalian tinggal gunakan dengan baik.*
</div>
</details>

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
