# Cara Mengganti Nama dan Detail Bot (Branding)

Dokumen ini menjelaskan cara mengubah nama, nama owner, dan detail lainnya yang ditampilkan oleh bot Anda. Semua pengaturan ini terpusat di satu file untuk kemudahan.

## File Konfigurasi Utama

Semua pengaturan utama untuk nama dan identitas bot ada di dalam file `config.js`. Buka file tersebut untuk menemukan dan mengubah variabel-variabel berikut:

* `global.owner`
    * **Tujuan**: Nomor WhatsApp Anda sebagai pemilik utama bot.
    * **Contoh**: `global.owner = ["6281234567890"];`

* `global.namebotz`
    * **Tujuan**: Nama utama bot Anda yang akan muncul di berbagai pesan, termasuk menu dan balasan lainnya.
    * **Contoh**: `global.namebotz = "Asisten AI Ku";`

* `global.packname`
    * **Tujuan**: Nama paket stiker saat bot membuat stiker.
    * **Contoh**: `global.packname = 'Sticker Pack';`

* `global.nameown`
    * **Tujuan**: Nama Anda atau brand Anda sebagai pemilik. Sering muncul di bagian `body` atau `title` pada pesan balasan.
    * **Contoh**: `global.nameown = "Nama Saya";`

* `global.author`
    * **Tujuan**: Nama pembuat stiker saat bot membuat stiker.
    * **Contoh**: `global.author = 'Dibuat oleh Bot';`

* `global.footer`
    * **Tujuan**: Teks kecil yang muncul di bagian bawah (footer) pada beberapa jenis pesan, seperti menu.
    * **Contoh**: `global.footer = "© 2025 Bot Canggih";`

* `global.YouTube`, `global.GitHub`, `global.Telegram`, `global.ChannelWA`
    * **Tujuan**: Tautan sosial media dan channel yang digunakan dalam pesan balasan atau menu.
    * **Contoh**: `global.YouTube = "https://youtube.com/channel/ANDA";`

## Langkah-langkah Mengubah

1.  **Buka File**: Buka file `config.js` menggunakan text editor.
2.  **Cari Variabel**: Temukan variabel yang ingin Anda ubah (contoh: `global.namebotz`).
3.  **Ubah Nilai**: Ganti teks yang ada di dalam tanda kutip (`"..."`) dengan teks yang Anda inginkan.
4.  **Simpan File**: Simpan perubahan yang telah Anda buat.
5.  **Restart Bot**: Matikan dan nyalakan kembali bot Anda (`node index.js`) agar perubahan yang baru dapat diterapkan.

### Contoh Perubahan

**Sebelum:**
```javascript
global.namebotz = "Alifatah wabot !";
global.nameown = "Fauzialsyah | Projects";
