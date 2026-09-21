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

**Simple Bot WhatsApp** merupakan script bot WhatsApp yang dikembangkan oleh **Fauzialifatah** menggunakan **Node.js**, **JavaScript**, dan **ECMAScript Modules (ESM)**

Script ini dirancang dengan struktur modular sehingga setiap komponen dapat dikelola, dikembangkan, dan disesuaikan sesuai dengan kebutuhan pengguna

Sistem bot menggunakan pendekatan berbasis plugin sehingga pengembangan dan penambahan fitur dapat dilakukan secara lebih terstruktur

Bot menggunakan **Baileys** sebagai library untuk menghubungkan aplikasi dengan layanan WhatsApp

Script dilengkapi dengan berbagai kategori fitur yang mencakup downloader, sticker, AI, tools, sistem owner, database, serta berbagai fitur pendukung lainnya

Script ini dapat digunakan sebagai media pembelajaran, dasar pengembangan bot WhatsApp, proyek pribadi, maupun pengembangan proyek publik dan privat

---

## Features

Script bot menyediakan beberapa kategori fitur utama sebagai berikut

| Kategori   | Deskripsi                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------- |
| Main       | Menyediakan berbagai fungsi utama bot, termasuk sistem menu, informasi bot, dan fitur umum lainnya |
| Downloader | Menyediakan berbagai fitur untuk mengunduh dan mengambil konten dari beberapa layanan internet     |
| Sticker    | Menyediakan berbagai fitur untuk membuat, mengolah, dan menyesuaikan sticker                       |
| To Image   | Menyediakan berbagai fitur untuk melakukan manipulasi dan pengolahan gambar                        |
| Tools      | Menyediakan berbagai utilitas yang mendukung kebutuhan bot dan pengguna                            |
| AI         | Menyediakan fitur berbasis kecerdasan buatan untuk mendukung interaksi pengguna                    |
| Owner      | Menyediakan fitur khusus untuk pengelolaan dan administrasi bot                                    |
| Anti Link  | Menyediakan sistem perlindungan terhadap berbagai tautan dan aktivitas tertentu di dalam grup      |

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

Project menggunakan konfigurasi

```json
"type": "module"
```

Dengan konfigurasi tersebut, project menggunakan sistem modul **ECMAScript Modules (ESM)**

---

## Requirements

Project tidak menetapkan versi Node.js melalui field `engines`

Oleh karena itu, disarankan menggunakan versi **Node.js LTS** yang masih didukung

Pastikan Node.js dan NPM telah terpasang pada sistem

Untuk memeriksa versi yang digunakan

```bash
node -v
npm -v
```

---

## Installation

### 1 Clone Repository

```bash
git clone https://github.com/Alifatahfauzi/Simple-bot.git
cd Simple-bot
```

### 2 Install Dependencies

Instal seluruh dependency yang diperlukan dengan perintah

```bash
npm install
```

Tunggu hingga proses instalasi selesai

### 3 Jalankan Bot

Bot dapat dijalankan menggunakan

```bash
npm start
```

atau

```bash
node index.js
```

### 4 Mode Development

Untuk menjalankan bot menggunakan Nodemon

```bash
npm run dev
```

---

## Configuration

Konfigurasi utama bot terdapat pada

```text
settings/config.js
```

Beberapa konfigurasi utama yang tersedia meliputi informasi owner, limit, prefix, nomor pairing, nama bot, informasi author, footer, dan thumbnail

Contoh konfigurasi

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

| Parameter                   | Keterangan                                                    |
| --------------------------- | ------------------------------------------------------------- |
| `global.owner`              | Menentukan nomor dan identitas pemilik bot                    |
| `global.limit`              | Menentukan jumlah limit awal pengguna                         |
| `global.prefix`             | Menentukan awalan perintah bot                                |
| `global.pairingPhoneNumber` | Menentukan nomor WhatsApp yang digunakan untuk proses pairing |
| `global.sessionName`        | Menentukan nama session WhatsApp                              |
| `global.namebotz`           | Menentukan nama bot                                           |
| `global.packname`           | Menentukan nama pack sticker                                  |
| `global.nameown`            | Menentukan nama pemilik bot                                   |
| `global.author`             | Menentukan informasi pembuat atau author                      |
| `global.footer`             | Menentukan teks footer pada pesan bot                         |
| `global.thumbnail`          | Menentukan gambar thumbnail bot                               |

---

## Pairing Code

Script menggunakan sistem **WhatsApp Pairing Code** untuk menghubungkan bot dengan akun WhatsApp

Nomor yang digunakan dalam proses pairing dapat diatur melalui konfigurasi

```js
global.pairingPhoneNumber = "NOMOR_WHATSAPP";
```

Setelah bot dijalankan, apabila session belum tersedia, sistem akan menampilkan **pairing code**

Kode tersebut dapat dimasukkan melalui menu **Perangkat Tertaut atau Linked Devices** pada aplikasi WhatsApp

Setelah proses pairing berhasil, data session akan tersimpan pada folder

```text
session/
```

Data session bersifat sensitif dan tidak disarankan untuk dibagikan kepada pihak lain

---

## Database

Script menggunakan **LowDB** sebagai sistem penyimpanan data

Database utama terdapat pada

```text
database/database.json
```

Database digunakan untuk menyimpan berbagai data yang diperlukan oleh sistem bot

Folder untuk penyimpanan file sementara

```text
database/tmp/
```

---

## Project Structure

Struktur utama project adalah sebagai berikut

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

Script menggunakan sistem berbasis plugin untuk mengelola berbagai fitur bot

Setiap plugin dikelompokkan berdasarkan kategori sehingga struktur project menjadi lebih terorganisasi dan mudah dikembangkan

Kategori plugin yang tersedia meliputi

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

Sistem plugin memungkinkan pengembang untuk menambahkan, mengubah, atau menghapus fitur secara lebih terstruktur tanpa perlu melakukan perubahan besar pada sistem utama bot

---

## Sticker Features

Kategori sticker menyediakan berbagai fitur untuk pembuatan dan pengolahan sticker

Fitur yang tersedia mencakup pembuatan sticker, pengolahan gambar, penambahan teks, pembuatan sticker berbasis template, serta berbagai bentuk pengolahan media lainnya

---

## Tools

Kategori tools menyediakan berbagai utilitas yang mendukung kebutuhan pengguna dan sistem bot, termasuk pengolahan media, pemeriksaan informasi, konversi data, pengambilan informasi, penerjemahan, pengunggahan file, serta berbagai fungsi pendukung lainnya

---

## Downloader

Kategori downloader menyediakan berbagai fitur untuk mengambil dan mengunduh konten dari beberapa layanan internet

Sistem downloader dirancang untuk menangani berbagai jenis media sesuai dengan dukungan yang tersedia pada script

---

## Artificial Intelligence

Script menyediakan kategori **Artificial Intelligence atau AI** yang digunakan untuk mendukung interaksi berbasis kecerdasan buatan

Fitur ini dapat digunakan untuk melakukan pemrosesan atau menghasilkan respons berdasarkan input yang diberikan oleh pengguna

---

## Owner Features

Kategori owner menyediakan berbagai fitur khusus untuk pengelolaan sistem bot

Fitur tersebut mencakup pengelolaan pengguna, sistem premium, pengaturan limit, pengelolaan plugin, broadcast, backup, maintenance, pengaturan bot, serta berbagai fungsi administrasi lainnya

Akses terhadap fitur khusus tersebut dibatasi hanya untuk owner yang telah terdaftar pada konfigurasi

```js
global.owner
```

---

## Bot Settings

Script menyediakan beberapa pengaturan untuk mengontrol perilaku bot, seperti

* Self Mode
* Maintenance Mode
* Auto Read
* Auto Typing
* Auto React

Pengaturan tersebut digunakan untuk menyesuaikan perilaku bot sesuai dengan kebutuhan pengguna

---

## Running

Setelah seluruh konfigurasi selesai dilakukan, jalankan

```bash
npm install
npm start
```

Untuk menjalankan dalam mode pengembangan

```bash
npm run dev
```

---

## Notes

Perhatikan beberapa hal berikut sebelum menjalankan bot

1. Pastikan Node.js dan NPM telah terpasang
2. Pastikan seluruh dependency berhasil diinstal menggunakan `npm install`
3. Pastikan konfigurasi nomor WhatsApp untuk pairing telah diatur dengan benar
4. Jangan menghapus folder `session` selama bot masih digunakan
5. Pastikan koneksi internet dalam keadaan stabil
6. Jangan membagikan data session kepada pihak lain
7. Jangan mempublikasikan API key, token, password, atau credential pribadi ke repository
8. Lakukan pencadangan database secara berkala untuk mengurangi risiko kehilangan data

Bot menggunakan **Baileys**, yaitu library tidak resmi untuk berkomunikasi dengan WhatsApp

Perubahan pada sistem WhatsApp dapat memengaruhi kompatibilitas, kestabilan, maupun cara kerja bot

Oleh karena itu, dependency dan source code dapat memerlukan pembaruan apabila terdapat perubahan yang memengaruhi sistem

---

## Support & Credits

**Dikembangkan oleh Fauzialifatah**

| Platform         | Tautan                                                 |
| ---------------- | ------------------------------------------------------ |
| Telegram         | https://t.me/FauziAlifatah                             |
| GitHub           | https://github.com/Alifatahfauzi                       |
| WhatsApp Channel | https://whatsapp.com/channel/0029VbC6j2u74NViqgNCLev3a |

---

© 2026 Fauzialifatah
