import fs from 'fs-extra';
import path from 'path';

let handler = async (m, { q, reply }) => {
  try {
    let fullPath = q.trim();
    if (!fullPath) return reply('Tentukan path file yang ingin diambil.\nContoh: `.getplug owner/test.js`');

    if (!fullPath.endsWith('.js')) fullPath += '.js';

    const rootDir = process.cwd();
    const cmdDir = path.resolve(rootDir, './cmd');
    
    const targetPath = path.resolve(cmdDir, fullPath);

    const relativePath = path.relative(cmdDir, targetPath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return reply('Error: Ilegal path traversal detected.\nAnda hanya boleh mengambil file di dalam folder `./cmd/`');
    }

    if (await fs.pathExists(targetPath)) {
      const codeContent = await fs.readFile(targetPath, 'utf8');
      reply(codeContent);
    } else {
      return reply(`File tidak ditemukan di path tersebut:\n${targetPath}`);
    }

  } catch (e) {
    console.error(e);
    reply(`Gagal mengambil plugin:\n${e.message}`);
  }
};

handler.command = ['getplug', 'getplugin'];
handler.owner = true;
handler.help = ['getplug'];
handler.tags = ['owner'];

export default handler;