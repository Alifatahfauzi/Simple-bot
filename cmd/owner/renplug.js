
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
    if (!q.includes('|')) {
      return reply('Format salah.\nContoh: `.renplug path/lama.js | path/baru.js`');
    }

    let [oldPath, newPath] = q.split('|').map(p => p.trim());

    if (!oldPath || !newPath) {
      return reply('Path lama dan path baru tidak boleh kosong.');
    }

    if (!oldPath.endsWith('.js')) oldPath += '.js';
    if (!newPath.endsWith('.js')) newPath += '.js';

    const rootDir = process.cwd();
    const cmdDir = path.resolve(rootDir, './cmd');
    
    const targetOldPath = path.resolve(cmdDir, oldPath);
    const targetNewPath = path.resolve(cmdDir, newPath);

    const relOld = path.relative(cmdDir, targetOldPath);
    const relNew = path.relative(cmdDir, targetNewPath);

    if (relOld.startsWith('..') || path.isAbsolute(relOld) || relNew.startsWith('..') || path.isAbsolute(relNew)) {
      return reply('Error: Ilegal path traversal detected.\nAnda hanya boleh memindahkan file di dalam folder `./cmd/`');
    }

    if (!await fs.pathExists(targetOldPath)) {
      return reply(`File lama tidak ditemukan:\n${targetOldPath}`);
    }

    if (await fs.pathExists(targetNewPath)) {
      return reply(`File di path baru sudah ada:\n${targetNewPath}\n\nHapus file tersebut dulu jika ingin mengganti.`);
    }
    
    await fs.move(targetOldPath, targetNewPath);

    reply(`✅ Plugin berhasil dipindahkan:\nDari: ${oldPath}\nKe: ${newPath}\n\nPerubahan akan aktif (hot-reload) dalam beberapa detik.`);

  } catch (e) {
    console.error(e);
    reply(`Gagal memindahkan plugin:\n${e.message}`);
  }
};

handler.command = ['mvplugin'];
handler.owner = true;
handler.help = ['renplug'];
handler.tags = ['owner'];

export default handler;