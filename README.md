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

Hallo, saya **Fauzialifatah**.
Ini adalah script bot WhatsApp yang dikembangkan menggunakan **Node.js**, **JavaScript**, dan **ES Module (ESM)** dengan struktur plugin yang modular sehingga fitur dapat dikembangkan dan ditambahkan dengan lebih mudah.

Bot menggunakan **Baileys** sebagai library koneksi WhatsApp serta dilengkapi berbagai fitur seperti group management, downloader, tools, sticker, RPG, AI, sistem owner, database, auto response, anti-link, dan berbagai fitur lainnya.

Project ini cocok digunakan untuk pembelajaran, pengembangan bot WhatsApp, project pribadi, maupun sebagai dasar untuk membuat bot dengan sistem plugin.

---

## Features

Bot ini memiliki berbagai kategori fitur:

| Category   | Description                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| Main       | Menu, ping, report, informasi bot, dan fitur utama                                                           |
| Downloader | TikTok, CapCut, Google Drive, SFile, pencarian Spotify                                                       |
| Group      | Kick, promote, demote, tagall, hidetag, welcome, rules, dan pengaturan grup                                  |
| Anti Link  | Anti link umum, Instagram, Facebook, TikTok, YouTube, media, promosi, dan lainnya                            |
| Owner      | Broadcast, premium, limit, plugin management, maintenance, restart, backup, setting bot, dan lainnya         |
| RPG        | Adventure, berburu, bank, crafting, inventory, memasak, pasar, mencuri, peternakan, leaderboard, dan lainnya |
| Sticker    | Sticker, Brat, Brat Video, Emoji Mix, QC, meme, watermark, dan berbagai efek sticker                         |
| To Image   | Tobotak, tohijab, tohitam, tokacamata, tolego, tomekah, tomonyet                                             |
| Tools      | OCR, translate, upload, screenshot website, Base64, device info, runtime, registrasi, cek limit, dan lainnya |
| AI         | Fitur AI melalui command `gita`                                                                              |

Project ini memiliki sekitar **141 file plugin command** yang terbagi dalam beberapa kategori.

---

## Tech Stack

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat-square\&logo=ubuntu\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square\&logo=nodedotjs\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square\&logo=javascript\&logoColor=black)
![Bash](https://img.shields.io/badge/-Bash-4EAA25?style=flat-square\&logo=gnu-bash\&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square\&logo=whatsapp\&logoColor=white)

### Dependencies utama

Project menggunakan beberapa package utama:

* `@whiskeysockets/baileys`
* `@hapi/boom`
* `axios`
* `archiver`
* `awesome-phonenumber`
* `canvafy`
* `canvas`
* `@napi-rs/canvas`
* `chalk`
* `cheerio`
* `crypto-js`
* `ffmpeg-static`
* `fluent-ffmpeg`
* `fs-extra`
* `jimp`
* `js-confuser`
* `lowdb`
* `node-cache`
* `node-fetch`
* `node-webpmux`
* `nodemon`
* `pino`
* `qrcode`
* `qrcode-reader`
* `sharp`
* `speedtest-cli`
* `speedtest-net`
* `syntax-error`

Project menggunakan `"type": "module"` sehingga file JavaScript dijalankan menggunakan sistem **ESM**.

---

## Requirements

`package.json` pada project ini tidak menetapkan field `engines`, sehingga versi Node.js tidak dikunci secara langsung oleh project.

Disarankan menggunakan:

```text
Node.js versi LTS terbaru
NPM versi terbaru
```

Pastikan Node.js dan NPM sudah terpasang sebelum menjalankan bot.

Cek versi:

```bash
node -v
npm -v
```

---

## Installation

### 1. Clone repository

```bash
git clone https://github.com/Alifatahfauzi/Simple-bot.git
cd Simple-bot
```

### 2. Install dependencies

```bash
npm install
```

Tunggu sampai seluruh dependency selesai di-install.

### 3. Jalankan bot

```bash
npm start
```

atau:

```bash
node index.js
```

### 4. Mode development

Untuk menjalankan bot menggunakan Nodemon:

```bash
npm run dev
```

---

## Configuration

Konfigurasi utama terdapat pada:

```text
settings/config.js
```

Contoh konfigurasi:

```js
import fs from "fs";
import chalk from "chalk";

/** info id **/
global.owner = ["NOMOR_OWNER", "LID_OWNER"];
global.limit = 10;
global.prefix = ".";

/** pairing Code Settings **/
global.pairingPhoneNumber = "NOMOR_WHATSAPP";
global.sessionName = "session";

/** settings bot **/
global.namebotz = "WhatsApp - Bot";
global.packname = "by";
global.nameown = "fauzialifatah || offc";
global.author = "fauzialifatah";
global.footer = "𝗍𝖾𝗅𝖾𝗀𝗋𝖺𝗆: @FauziAlifatah";
global.thumbnail = "./settings/image/dev.png";

/** media **/
global.YouTube = "https://www.youtube.com/@Fauzialifatah";
global.GitHub = "https://github.com/Alifatahfauzi";
global.Telegram = "https://t.me/FauziAlifatah";
global.ChannelWA = "https://whatsapp.com/channel/0029VbC5iM33LdQe3IxCZs1K";
```

### Konfigurasi penting

| Config                      | Fungsi                         |
| --------------------------- | ------------------------------ |
| `global.owner`              | Menentukan nomor/LID owner bot |
| `global.limit`              | Limit awal user                |
| `global.prefix`             | Prefix command bot             |
| `global.pairingPhoneNumber` | Nomor WhatsApp untuk pairing   |
| `global.sessionName`        | Nama folder/session WhatsApp   |
| `global.namebotz`           | Nama bot                       |
| `global.packname`           | Packname sticker               |
| `global.nameown`            | Nama owner                     |
| `global.author`             | Author sticker                 |
| `global.footer`             | Footer pesan bot               |
| `global.thumbnail`          | Thumbnail yang digunakan bot   |

Prefix default bot adalah:

```text
.
```

Contoh command:

```text
.menu
.ping
.runtime
.sticker
```

---

## Pairing Code

Bot menggunakan sistem **WhatsApp Pairing Code**.

Nomor pairing diatur melalui:

```js
global.pairingPhoneNumber = "NOMOR_WHATSAPP";
```

Setelah menjalankan:

```bash
npm start
```

apabila session belum terdaftar, bot akan menampilkan:

```text
PAIRING CODE
```

Masukkan kode tersebut melalui menu **Linked Devices / Perangkat Tertaut** pada WhatsApp.

Setelah proses pairing berhasil, session akan tersimpan pada folder:

```text
session/
```

Jangan membagikan folder session kepada orang lain.

---

## Database

Bot menggunakan **LowDB** untuk penyimpanan data.

Database utama berada di:

```text
database/database.json
```

Data yang disimpan antara lain:

* User
* Limit
* Premium
* XP
* Level
* Money
* Bank
* RPG data
* AFK
* Registrasi
* Group settings
* Anti-link settings
* Welcome
* Maintenance
* Auto read
* Auto typing
* Auto react

Folder temporary:

```text
database/tmp
```

Folder tersebut akan dibuat otomatis ketika bot dijalankan jika belum tersedia.

---

## Structure

Struktur project secara umum:

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
```
