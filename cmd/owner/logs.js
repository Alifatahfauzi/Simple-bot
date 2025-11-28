
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';

let handler = async (m, { q, reply }) => {
  try {
    const args = q.split(' ').filter(Boolean);
    let logType = 'error';
    let lineCount = 50;

    const logFileNames = {
      error: 'stderr.log',
      out: 'stdout.log'
    };

    for (const arg of args) {
      if (arg.toLowerCase() === 'out') {
        logType = 'out';
      } else if (arg.toLowerCase() === 'error') {
        logType = 'error';
      } else if (!isNaN(parseInt(arg))) {
        lineCount = parseInt(arg);
      }
    }

    const rootDir = process.cwd();
    const logFileName = logFileNames[logType];
    
    const logPath = path.resolve(rootDir, logFileName);

    if (!await fs.pathExists(logPath)) {
      return reply(`Log file tidak ditemukan di:\n${logPath}\n\nPastikan Anda menjalankan bot menggunakan PM2 atau 'node index.js > stdout.log 2> stderr.log'`);
    }
    
    const command = `tail -n ${lineCount} ${logPath}`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        throw new Error(`Gagal membaca log: ${err.message}`);
      }
      if (stderr && !stdout) {
        return reply(`Gagal membaca log: ${stderr}`);
      }
      if (!stdout) {
        return reply(`Log file '${logFileName}' kosong.`);
      }
      reply(stdout);
    });

  } catch (e) {
    console.error(e);
    reply(`Gagal mengambil log:\n${e.message}`);
  }
};

handler.command = ['logs', 'log', 'errlog'];
handler.owner = true;
handler.help = ['logs'];
handler.tags = ['owner'];

export default handler;