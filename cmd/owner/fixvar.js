
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

import fs from 'fs-extra';
import path from 'path';

let handler = async (m, { q, reply }) => {
  try {
    const args = q.split(' ');
    if (args.length < 2) {
      return reply('Perintah salah.\nContoh: `.fixvar owner/file.js client,sock,bot`');
    }

    let fullPath = args[0].trim();
    const varsString = args.slice(1).join(' ');
    const varsToReplace = varsString.split(',').map(v => v.trim()).filter(v => v.length > 0);

    if (!fullPath) return reply('Path file tidak boleh kosong.');
    if (varsToReplace.length === 0) return reply('Daftar variabel (client,sock,dll) tidak boleh kosong.');

    if (!fullPath.endsWith('.js')) fullPath += '.js';

    const rootDir = process.cwd();
    const cmdDir = path.resolve(rootDir, './cmd');
    
    const targetPath = path.resolve(cmdDir, fullPath);

    const relativePath = path.relative(cmdDir, targetPath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return reply('Error: Ilegal path traversal detected.\nAnda hanya boleh mengedit file di dalam folder `./cmd/`');
    }

    if (!await fs.pathExists(targetPath)) {
      return reply(`File tidak ditemukan di path tersebut:\n${targetPath}`);
    }

    const oldContent = await fs.readFile(targetPath, 'utf8');
    let newContent = oldContent;
    let totalReplacements = 0;
    let replacedWords = [];

    for (const varName of varsToReplace) {
      const regex = new RegExp('\\b' + varName + '\\b', 'g');
      const matches = newContent.match(regex);
      
      if (matches) {
        totalReplacements += matches.length;
        if (!replacedWords.includes(varName)) {
            replacedWords.push(varName);
        }
        newContent = newContent.replace(regex, 'conn');
      }
    }

    if (totalReplacements === 0) {
      return reply(`Tidak ada variabel ('${varsString}') yang ditemukan sebagai kata utuh di file:\n${fullPath}`);
    }

    await fs.writeFile(targetPath, newContent);

    reply(`✅ Berhasil mengganti ${totalReplacements} kata (untuk: '${replacedWords.join(', ')}') menjadi 'conn' di:\n${fullPath}\n\nPlugin akan di-reload (hot-reload) dalam beberapa detik.`);

  } catch (e) {
    console.error(e);
    reply(`Gagal meng-update plugin:\n${e.message}`);
  }
};

handler.command = ['fixvar'];
handler.owner = true;
handler.help = ['fixvar'];
handler.tags = ['owner'];

export default handler;