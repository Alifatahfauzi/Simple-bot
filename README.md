[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<div align="center">

  <img src="https://readme-typing-svg.demolab.com/?font=Inconsolata&weight=500&size=50&duration=4000&pause=300&color=22C55E&center=true&vCenter=true&multiline=true&repeat=false&random=false&width=1300&height=140&lines=Hello+hello;I'm+Fauzialifatah%2C+WhatsApp+Bot" />

  <img src="https://files.catbox.moe/qr4d9g.jpg" />

  <a href="https://whatsapp.com/channel/0029VbC6j2u74NViqgNCLev3a">
    <img src="https://img.shields.io/badge/WhatsApp-Channel-25D366?logo=whatsapp&logoColor=white" alt="WhatsApp Channel" />
  </a>

  <p align="center">
    <a href="https://github.com/Alifatahfauzi">
      <img title="Author" src="https://img.shields.io/badge/OWNER-Fauzialifatah-green.svg?style=for-the-badge&logo=github">
    </a>
  </p>

</div>

# Simple Bot WhatsApp

## Deskripsi

**Simple Bot WhatsApp** merupakan script bot WhatsApp yang dikembangkan oleh **Fauzialifatah** menggunakan **Node.js**, **JavaScript**, dan **ECMAScript Modules (ESM)**.

Script ini dirancang dengan struktur yang modular sehingga setiap fitur dapat dikelola, dikembangkan, dan disesuaikan dengan kebutuhan pengguna. Sistem bot menggunakan pendekatan berbasis plugin sehingga penambahan maupun pengembangan fitur dapat dilakukan secara lebih terstruktur.

Bot menggunakan **Baileys** sebagai library untuk menghubungkan aplikasi dengan layanan WhatsApp. Selain itu, tersedia berbagai fitur yang mencakup pengelolaan grup, downloader, sticker, sistem RPG, AI, tools, sistem owner, database, serta berbagai fitur pendukung lainnya.

Script ini dapat digunakan sebagai media pembelajaran, dasar pengembangan bot WhatsApp, proyek pribadi, maupun pengembangan proyek publik dan privat.

---

## Features

Script bot ini menyediakan beberapa kategori fitur sebagai berikut:

| Kategori   | Deskripsi                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Main       | Menyediakan menu, ping, report, informasi bot, dan berbagai fitur utama lainnya.                                                                                          |
| Downloader | Menyediakan fitur pengunduhan dari TikTok, CapCut, Google Drive, SFile, serta pencarian Spotify.                                                                          |
| Group      | Menyediakan fitur pengelolaan grup seperti kick, promote, demote, tagall, hidetag, welcome, rules, serta berbagai pengaturan grup lainnya.                                |
| Anti Link  | Menyediakan perlindungan terhadap berbagai jenis tautan, seperti Instagram, Facebook, TikTok, YouTube, media, promosi, dan lainnya.                                       |
| Owner      | Menyediakan fitur pengelolaan bot, broadcast, premium, limit, plugin, maintenance, restart, backup, serta berbagai pengaturan lainnya.                                    |
| RPG        | Menyediakan sistem adventure, berburu, bank, crafting, inventory, memasak, pasar, mencuri, peternakan, leaderboard, serta fitur RPG lainnya.                              |
| Sticker    | Menyediakan pembuatan dan pengolahan sticker dengan berbagai fitur tambahan.                                                                                              |
| To Image   | Menyediakan berbagai fitur manipulasi dan pengolahan gambar.                                                                                                              |
| Tools      | Menyediakan OCR, penerjemahan, upload, screenshot situs web, Base64, informasi perangkat, runtime, registrasi, pemeriksaan limit, serta berbagai fitur pendukung lainnya. |
| AI         | Menyediakan fitur berbasis AI melalui command `gita`.                                                                                                                     |

---

## Technology

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat-square\&logo=ubuntu\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square\&logo=nodedotjs\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square\&logo=javascript\&logoColor=black)
![Bash](https://img.shields.io/badge/-Bash-4EAA25?style=flat-square\&logo=gnu-bash\&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square\&logo=whatsapp\&logoColor=white)

<details>
<summary><strong>Dependencies Utama</strong></summary>

Project ini menggunakan berbagai package untuk mendukung sistem bot, pengolahan media, database, sistem plugin, serta berbagai fungsi lainnya.

| Package                   | Fungsi                                                             |
| ------------------------- | ------------------------------------------------------------------ |
| `@whiskeysockets/baileys` | Library untuk koneksi dan komunikasi dengan WhatsApp.              |
| `@hapi/boom`              | Penanganan dan pengelolaan HTTP error.                             |
| `@napi-rs/canvas`         | Pengolahan gambar berbasis Canvas.                                 |
| `archiver`                | Pembuatan dan pengelolaan file arsip.                              |
| `axios`                   | HTTP client untuk melakukan request ke API atau server.            |
| `awesome-phonenumber`     | Validasi dan pemrosesan nomor telepon.                             |
| `canvafy`                 | Pembuatan gambar, kartu, dan visual tertentu.                      |
| `canvas`                  | Pemrosesan gambar menggunakan Canvas.                              |
| `chalk`                   | Memberikan warna pada output terminal.                             |
| `cheerio`                 | Parsing dan manipulasi HTML.                                       |
| `crypto-js`               | Menyediakan fungsi kriptografi.                                    |
| `ffmpeg-static`           | Menyediakan binary FFmpeg untuk pemrosesan media.                  |
| `fluent-ffmpeg`           | Antarmuka untuk mengoperasikan FFmpeg.                             |
| `fs-extra`                | Menyediakan fungsi tambahan untuk pengelolaan file system.         |
| `jimp`                    | Pengolahan dan manipulasi gambar.                                  |
| `js-confuser`             | Obfuscation pada kode JavaScript.                                  |
| `lowdb`                   | Penyimpanan data berbasis JSON.                                    |
| `node-cache`              | Sistem penyimpanan cache dalam memori.                             |
| `node-fetch`              | Melakukan HTTP request menggunakan Fetch API.                      |
| `node-webpmux`            | Pengolahan file WebP dan metadata terkait.                         |
| `nodemon`                 | Menjalankan ulang aplikasi secara otomatis pada saat pengembangan. |
| `pino`                    | Sistem logging untuk aplikasi Node.js.                             |
| `qrcode`                  | Pembuatan QR Code.                                                 |
| `qrcode-reader`           | Membaca dan memproses QR Code.                                     |
| `sharp`                   | Pengolahan, konversi, dan optimasi gambar.                         |
| `speedtest-cli`           | Pengujian kecepatan koneksi internet melalui command line.         |
| `speedtest-net`           | Pengujian kecepatan jaringan melalui Node.js.                      |
| `syntax-error`            | Pemeriksaan kesalahan sintaks pada kode JavaScript.                |

</details>

Project menggunakan konfigurasi:

```json
"type": "module"
```

Dengan konfigurasi tersebut, sistem modul yang digunakan adalah **ECMAScript Modules (ESM)**.

---

## Requirements

Project tidak menetapkan versi Node.js melalui field `engines`. Oleh karena itu, disarankan menggunakan versi **Node.js LTS** yang masih didukung.

Pastikan Node.js dan NPM telah terpasang pada sistem.

Periksa versi yang digunakan dengan perintah:

```bash
node -v
npm -v
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Alifatahfauzi/Simple-bot.git
cd Simple-bot
```

### 2. Install Dependencies

Pasang seluruh dependency yang diperlukan dengan perintah:

```bash
npm install
```

Tunggu hingga proses instalasi selesai.

### 3. Jalankan Bot

Bot dapat dijalankan dengan:

```bash
npm start
```

atau:

```bash
node index.js
```

### 4. Mode Development

Untuk menjalankan bot menggunakan Nodemon:

```bash
npm run dev
```

---

## Configuration

Konfigurasi utama bot terdapat pada:

```text
settings/config.js
```

Beberapa konfigurasi utama yang tersedia adalah:

```js
global.owner = ["NOMOR_OWNER", "LID_OWNER"];
global.limit = 10;
global.prefix = ".";

global.pairingPhoneNumber = "NOMOR_WHATSAPP";
global.sessionName = "session";

global.namebotz = "WhatsApp - Bot";
global.packname = "by";
global.nameown = "fauzialifatah || offc";
global.author = "fauzialifatah";
global.footer = "𝗍𝖾𝗅𝖾𝗀𝗋𝖺𝗆: @FauziAlifatah";
global.thumbnail = "./settings/image/dev.png";
```

### Parameter Konfigurasi

| Parameter                   | Fungsi                                                         |
| --------------------------- | -------------------------------------------------------------- |
| `global.owner`              | Menentukan nomor dan identitas pemilik bot.                    |
| `global.limit`              | Menentukan jumlah limit awal pengguna.                         |
| `global.prefix`             | Menentukan awalan command bot.                                 |
| `global.pairingPhoneNumber` | Menentukan nomor WhatsApp yang digunakan untuk proses pairing. |
| `global.sessionName`        | Menentukan nama session WhatsApp.                              |
| `global.namebotz`           | Menentukan nama bot.                                           |
| `global.packname`           | Menentukan nama pack sticker.                                  |
| `global.nameown`            | Menentukan nama pemilik bot.                                   |
| `global.author`             | Menentukan informasi author pada sticker.                      |
| `global.footer`             | Menentukan teks footer pada pesan bot.                         |
| `global.thumbnail`          | Menentukan gambar thumbnail bot.                               |

Prefix bawaan yang digunakan adalah:

```text
.
```

Contoh penggunaan command:

```text
.menu
.ping
.runtime
.sticker
```

---

## Pairing Code

Script menggunakan sistem **WhatsApp Pairing Code** untuk menghubungkan bot dengan akun WhatsApp.

Nomor yang digunakan dalam proses pairing dapat diatur melalui:

```js
global.pairingPhoneNumber = "NOMOR_WHATSAPP";
```

Setelah bot dijalankan:

```bash
npm start
```

apabila session belum tersedia, sistem akan menampilkan **pairing code**.

Kode tersebut dapat dimasukkan melalui menu **Perangkat Tertaut (Linked Devices)** pada aplikasi WhatsApp.

Setelah proses pairing berhasil, data session akan tersimpan pada folder:

```text
session/
```

Data session bersifat sensitif dan tidak disarankan untuk dibagikan kepada pihak lain.

---

## Database

Script menggunakan **LowDB** sebagai sistem penyimpanan data.

Database utama terdapat pada:

```text
database/database.json
```

Data yang dapat disimpan antara lain:

* Data pengguna
* Limit
* Status premium
* XP dan level
* Money
* Bank
* Data RPG
* AFK
* Registrasi
* Pengaturan grup
* Pengaturan anti-link
* Welcome
* Maintenance
* Auto read
* Auto typing
* Auto react

Folder untuk penyimpanan file sementara:

```text
database/tmp/
```

---

## Project Structure

Struktur utama project adalah sebagai berikut:

```text
Simple-bot/
│
├── cmd/
│   ├── _events/
│   ├── ai/
│   ├── download/
│   ├── group/
│   ├── main/
│   ├── menu/
│   ├── owner/
│   ├── rpg/
│   ├── stiker/
│   ├── toimage/
│   └── tools/
│
├── database/
│   ├── database.json
│   └── tmp/
│
├── library/
│   ├── canvas/
│   ├── scrape/
│   ├── system/
│   ├── exif.js
│   ├── upload.js
│   └── utils.js
│
├── settings/
│   ├── font/
│   ├── image/
│   ├── button.js
│   ├── config.js
│   └── myfunc.js
│
├── handler.js
├── index.js
├── package.json
└── package-lock.json
```

---

## Plugin System

Script menggunakan sistem berbasis plugin untuk mengatur berbagai command.

Plugin dikelompokkan berdasarkan kategori:

```text
cmd/
├── ai/
├── download/
├── group/
├── main/
├── menu/
├── owner/
├── rpg/
├── stiker/
├── toimage/
└── tools/
```

Dengan sistem tersebut, pengembangan fitur baru dapat dilakukan dengan menambahkan plugin sesuai kategori yang diperlukan.

Contoh struktur plugin:

```js
let handler = async (m, { reply }) => {
    await reply("Hello World");
};

handler.command = /^hello$/i;
handler.tags = ["main"];
handler.help = ["hello"];

export default handler;
```

---

## Group Features

Script menyediakan berbagai fitur untuk pengelolaan grup.

Beberapa command yang tersedia:

```text
.add
.kick
.promote
.demote
.tagall
.hidetag
.listadmin
.linkgc
.opengc
.closegc
.setname
.setdesc
.setppgc
.rules
.setrules
.welcome
```

Script juga menyediakan beberapa fitur perlindungan terhadap tautan:

```text
.antilink
.antifb
.antiig
.antitt
.antiyoutube
.antimedia
.antipromosi
.antitagall
.antihidetag
```

---

## RPG Features

Sistem RPG menyediakan berbagai aktivitas dan fitur pengelolaan data pengguna.

Beberapa command yang tersedia:

```text
.adventure
.bank
.berburu
.chop
.craft
.give
.heal
.inventory
.kandang
.leaderboard
.dapur
.mencuri
.pasar
.profile
.sell
.sertifikat
```

Data RPG disimpan dalam database dan mencakup berbagai informasi seperti level, XP, HP, uang, bank, inventory, hasil berburu, kayu, peternakan, serta data lainnya.

---

## Sticker Features

Bot menyediakan berbagai command untuk membuat dan mengolah sticker:

```text
.sticker
.brat
.bratvid
.circle
.emojimix
.qc
.sblur
.sgray
.smeme
.stext
.stickerwm
```

Contoh penggunaan:

```text
.sticker
```

```text
.brat Halo
```

```text
.emojimix 😭 😂
```

```text
.stickerwm NamaPack|Author
```

---

## Tools

Beberapa command yang tersedia pada kategori tools:

```text
.afk
.ascii
.b64url
.buttondemo
.cekidch
.ceklimit
.cekreg
.delmsg
.device
.fake
.fetch
.getpp
.ocr
.os
.owner
.register
.runtime
.ssweb
.toimg
.toplimit
.topt
.toptv
.totalfitur
.tourl
.translate
.tree
.unreg
.who
```

---

## Downloader

Script menyediakan beberapa fitur downloader:

```text
.capcut
.gdrive
.sfile
.spsearch
.tiktok
```

Contoh penggunaan:

```text
.tiktok https://www.tiktok.com/...
```

---

## Artificial Intelligence

Script menyediakan fitur berbasis AI melalui command:

```text
.gita <teks>
```

Contoh:

```text
.gita Jelaskan apa yang dimaksud dengan JavaScript.
```

---

## Owner Features

Fitur owner digunakan untuk mengelola sistem bot.

Beberapa command yang tersedia:

```text
.addlimit
.addplugin
.addprem
.addsewa
.autoreact
.autoread
.autotyping
.backup
.broadcast
.cekprem
.clearsesi
.dellimit
.delplugin
.delprem
.delsewa
.getplugin
.listplugin
.maintenance
.public
.reload
.restart
.run
.saveplugin
.srchplugin
.self
.setppbot
.totaluser
.unbangroup
```

Fitur yang memiliki akses khusus hanya dapat digunakan oleh nomor yang telah terdaftar pada:

```js
global.owner
```

---

## Bot Settings

Script menyediakan beberapa pengaturan untuk mengontrol perilaku bot, antara lain:

```text
Self Mode
Maintenance Mode
Auto Read
Auto Typing
Auto React
```

Pengaturan tersebut digunakan untuk menyesuaikan sistem bot dengan kebutuhan pengguna.

---

## Running

Setelah seluruh konfigurasi selesai dilakukan, jalankan perintah berikut:

```bash
npm install
npm start
```

Untuk mode pengembangan:

```bash
npm run dev
```

---

## Notes

Perhatikan beberapa hal berikut sebelum menjalankan bot:

1. Pastikan Node.js dan NPM telah terpasang.
2. Pastikan seluruh dependency berhasil diinstal menggunakan `npm install`.
3. Pastikan nomor WhatsApp untuk pairing telah dikonfigurasi dengan benar.
4. Jangan menghapus folder `session` selama bot masih digunakan.
5. Pastikan koneksi internet dalam keadaan stabil.
6. Jangan membagikan data session kepada pihak lain.
7. Jangan mempublikasikan API key, token, password, maupun credential pribadi ke repository.
8. Lakukan pencadangan database secara berkala untuk menghindari kehilangan data.

Bot menggunakan **Baileys**, yaitu library tidak resmi untuk berkomunikasi dengan WhatsApp. Perubahan pada sistem WhatsApp dapat memengaruhi kompatibilitas, kestabilan, maupun cara kerja bot. Oleh karena itu, dependency dan source code mungkin perlu diperbarui apabila terdapat perubahan yang memengaruhi sistem.

---

## Support

**WhatsApp Channel**
https://whatsapp.com/channel/0029VbC5iM33LdQe3IxCZs1K

**GitHub**
https://github.com/Alifatahfauzi

**Telegram**
https://t.me/FauziAlifatah

**YouTube**
https://www.youtube.com/@Fauzialifatah

---

## Credits

**Dikembangkan oleh Fauzialifatah**

GitHub:
https://github.com/Alifatahfauzi

© Fauzialifatah
