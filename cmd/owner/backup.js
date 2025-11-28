
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';

let handler = async (m, { conn, reply }) => {
  try {
    await reply('🔄 Sedang memproses backup... Ini mungkin memakan waktu beberapa menit. Mohon tunggu.');

    const excludedPatterns = [
        "node_modules/**", 
        "session/**",
        "package-lock.json", 
        "yarn.lock", 
        ".npm/**",
        "backup_bot_*.zip"
    ];
        
    const rootDir = process.cwd();
    const zipName = `backup_bot_${Date.now()}.zip`;
    const zipPath = path.join(rootDir, zipName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      await conn.sendMessage(m.chat, {
        document: { url: zipPath },
        mimetype: 'application/zip',
        fileName: zipName
      }, { quoted: m });
      
      await fs.remove(zipPath);
    });

    archive.on('warning', (err) => {
      console.warn(err);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    archive.glob('**/*', {
      cwd: rootDir,
      ignore: excludedPatterns,
      dot: true
    });

    await archive.finalize();

  } catch (e) {
    console.error(e);
    reply(`Gagal membuat backup:\n${e.message}`);
  }
};

handler.command = ['backup'];
handler.owner = false;
handler.help = ['backup'];
handler.tags = ['owner'];

export default handler;
