# Alifatah WhatsApp Bot

![Pair](https://files.catbox.moe/0lvfdg.jpg)

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
node index.js pair ( start bot )
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
