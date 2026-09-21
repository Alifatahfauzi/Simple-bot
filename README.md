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

Bot menggunakan **Baileys** sebagai library untuk menghubungkan aplikasi dengan layanan WhatsApp. Selain itu, tersedia berbagai fitur yang mencakup downloader, sticker, AI, tools, sistem owner, database, serta berbagai fitur pendukung lainnya.

Script ini dapat digunakan sebagai media pembelajaran, dasar pengembangan bot WhatsApp, proyek pribadi, maupun pengembangan proyek publik dan privat.

---

## Features

Script bot ini menyediakan beberapa kategori fitur sebagai berikut:

| Kategori   | Deskripsi                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Main       | Menyediakan menu, ping, report, informasi bot, dan berbagai fitur utama lainnya.                                                                                          |
| Downloader | Menyediakan fitur pengunduhan dari TikTok, CapCut, Google Drive, SFile, serta pencarian Spotify.                                                                          |
| Sticker    | Menyediakan pembuatan dan pengolahan sticker dengan berbagai fitur tambahan.                                                                                              |
| To Image   | Menyediakan berbagai fitur manipulasi dan pengolahan gambar.                                                                                                              |
| Tools      | Menyediakan OCR, penerjemahan, upload, screenshot situs web, Base64, informasi perangkat, runtime, registrasi, pemeriksaan limit, serta berbagai fitur pendukung lainnya. |
| AI         | Menyediakan fitur berbasis AI melalui command `gita`.                                                                                                                     |
| Owner      | Menyediakan fitur pengelolaan bot, broadcast, premium, limit, plugin, maintenance, restart, backup, serta berbagai pengaturan lainnya.                                    |
| Anti Link  | Menyediakan perlindungan terhadap berbagai jenis tautan, seperti Instagram, Facebook, TikTok, YouTube, media, promosi, dan lainnya.                                       |

---

## Technology

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat-square\&logo=ubuntu\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square\&logo=nodedotjs\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square\&logo=javascript\&logoColor=black)
![Bash](https://img.shields.io/badge/-Bash-4EAA25?style=flat-square\&logo=gnu-bash\&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square\&logo=whatsapp\&logoColor=white)

<details>
<summary><strong>Dependencies Utama</strong></summary>

| Package                   | Version   |
| ------------------------- | --------- |
| `@hapi/boom`              | `^10.0.1` |
| `@napi-rs/canvas`         | `^0.1.84` |
| `@whiskeysockets/baileys` | `latest`  |
| `archiver`                | `^7.0.1`  |
| `axios`                   | `^1.13.2` |
| `awesome-phonenumber`     | `^7.6.0`  |
| `canvafy`                 | `^6.0.0`  |
| `canvas`                  | `^3.2.0`  |
| `chalk`                   | `^5.6.2`  |
| `cheerio`                 | `^1.1.2`  |
| `crypto-js`               | `^4.2.0`  |
| `ffmpeg-static`           | `^5.3.0`  |
| `fluent-ffmpeg`           | `^2.1.3`  |
| `fs-extra`                | `^11.3.2` |
| `jimp`                    | `*`       |
| `js-confuser`             | `^2.0.0`  |
| `lowdb`                   | `^7.0.1`  |
| `node-cache`              | `^5.1.2`  |
| `node-fetch`              | `^3.3.2`  |
| `node-webpmux`            | `^2.2.0`  |
| `nodemon`                 | `^3.1.11` |
| `pino`                    | `^10.1.0` |
| `qrcode`                  | `^1.5.4`  |
| `qrcode-reader`           | `^1.0.4`  |
| `sharp`                   | `*`       |
| `speedtest-cli`           | `^2.1.3`  |
| `speedtest-net`           | `^2.2.0`  |
| `syntax-error`            | `^1.4.0`  |

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
