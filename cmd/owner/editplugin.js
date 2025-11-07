import fs from 'fs-extra';
import path from 'path';

let handler = async (m, { q, reply, quoted }) => {
  try {
    let fullPath;
    let codeContent;

    if (quoted && quoted.text && q) {
      fullPath = q.trim().replace('|', '/');
      codeContent = quoted.text;
    } else {
      return reply('Cara penggunaan:\nReply pesan yang berisi kode baru dengan perintah `.editplug path/file.js`');
    }

    if (!fullPath) return reply('Nama file atau path tidak boleh kosong.');
    if (!fullPath.endsWith('.js')) fullPath += '.js';
    if (!codeContent) return reply('Kode plugin tidak ditemukan.');

    const rootDir = process.cwd();
    const cmdDir = path.resolve(rootDir, './cmd');
    
    const targetPath = path.resolve(cmdDir, fullPath);

    const relativePath = path.relative(cmdDir, targetPath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return reply('Error: Ilegal path traversal detected.\nAnda hanya boleh mengedit file di dalam folder `./cmd/`');
    }

    if (!await fs.pathExists(targetPath)) {
      return reply(`File tidak ditemukan:\n${targetPath}\n\nGunakan .addplug untuk membuat file baru.`);
    }

    await fs.writeFile(targetPath, codeContent);

    reply(`✅ Plugin berhasil diedit di:\n${targetPath}\n\nPerubahan akan aktif (hot-reload) dalam beberapa detik.`);

  } catch (e) {
    console.error(e);
    reply(`Gagal mengedit plugin:\n${e.message}`);
  }
};

handler.command = ['editplug', 'saveplug'];
handler.owner = true;
handler.help = ['editplug'];
handler.tags = ['owner'];

export default handler;