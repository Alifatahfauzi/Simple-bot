import fs from 'fs-extra';
import path from 'path';

let handler = async (m, { q, reply, quoted }) => {
  try {
    let fullPath;
    let codeContent;

    if (quoted && quoted.text && q) {
      fullPath = q.trim().replace('|', '/');
      codeContent = quoted.text;
    } else if (q.includes('|')) {
      const parts = q.split('|');
      fullPath = parts[0].trim();
      codeContent = parts.slice(1).join('|').trim();
    } else {
      return reply('Cara penggunaan:\n\n1. `.addplug path/file.js|...kode...`\n\n2. `.addplug path/file.js` (sambil reply kodenya)');
    }

    if (!fullPath) return reply('Nama file atau path tidak boleh kosong.');
    if (!fullPath.endsWith('.js')) fullPath += '.js';
    if (!codeContent) return reply('Kode plugin tidak ditemukan.');

    const rootDir = process.cwd();
    const cmdDir = path.resolve(rootDir, './cmd');
    
    const targetPath = path.resolve(cmdDir, fullPath);

    const relativePath = path.relative(cmdDir, targetPath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return reply('Error: Ilegal path traversal detected.\nAnda hanya boleh membuat file di dalam folder `./cmd/`');
    }
    
    const targetDir = path.dirname(targetPath);
    await fs.ensureDir(targetDir);

    await fs.writeFile(targetPath, codeContent);

    reply(`✅ Plugin berhasil ditambahkan di:\n${targetPath}\n\nPlugin akan otomatis dimuat (hot-reload) dalam beberapa detik.`);

  } catch (e) {
    console.error(e);
    reply(`Gagal menambahkan plugin:\n${e.message}`);
  }
};

handler.command = ['addplug', 'addplugin'];
handler.owner = true;

export default handler;
