import fs from 'fs-extra';
import path from 'path';

let handler = async (m, { q, reply }) => {
  try {
    let fullPath = q.trim();
    if (!fullPath) return reply('Tentukan path file yang ingin dihapus.\nContoh: `.delplug owner/test.js`');

    if (!fullPath.endsWith('.js')) fullPath += '.js';

    const rootDir = process.cwd();
    const cmdDir = path.resolve(rootDir, './cmd');
    
    const targetPath = path.resolve(cmdDir, fullPath);

    const relativePath = path.relative(cmdDir, targetPath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return reply('Error: Ilegal path traversal detected.\nAnda hanya boleh menghapus file di dalam folder `./cmd/`');
    }

    if (await fs.pathExists(targetPath)) {
      const parentDir = path.dirname(targetPath);
      
      await fs.remove(targetPath);
      
      let replyMessage = `✅ Plugin berhasil dihapus dari:\n${targetPath}`;

      if (parentDir !== cmdDir) {
        const filesInDir = await fs.promises.readdir(parentDir);
        if (filesInDir.length === 0) {
          await fs.remove(parentDir);
          replyMessage += `\n\n✅ Folder kosong '${path.basename(parentDir)}' juga telah dihapus.`;
        }
      }
      
      reply(replyMessage);

    } else {
      return reply(`File tidak ditemukan di path tersebut:\n${targetPath}`);
    }

  } catch (e) {
    console.error(e);
    reply(`Gagal menghapus plugin:\n${e.message}`);
  }
};

handler.command = ['delplug', 'dellplugin'];
handler.owner = true;
handler.help = ['delplug'];
handler.tags = ['owner'];

export default handler;