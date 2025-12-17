import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';

let handler = async (m, { conn, reply }) => {
  try {
    await reply('🔄 Sedang memproses backup... Mohon tunggu.');

    const excludedPatterns = [
        "node_modules/**",
        "session/**",
        "package-lock.json",
        "yarn.lock",
        ".npm/**",
        ".cache/**",
        ".config/**",
        "backup_bot_*.zip"
    ];

    const rootDir = process.cwd();
    const zipName = `backup_bot_${Date.now()}.zip`;
    const zipPath = path.join(rootDir, zipName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: zipPath },
          mimetype: 'application/zip',
          fileName: zipName
        },
        { quoted: m }
      );
      await fs.remove(zipPath);
    });

    archive.on('warning', () => {});
    archive.on('error', (err) => { throw err; });

    archive.pipe(output);

    archive.glob('**/*', {
      cwd: rootDir,
      ignore: excludedPatterns,
      dot: true
    });

    await archive.finalize();

  } catch (e) {
    reply("Gagal membuat backup: " + e.message);
  }
};

handler.command = ['backup'];
handler.owner = false;
handler.help = ['backup'];
handler.tags = ['owner'];

export default handler;