import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { runtime } from '../../source/myfunc.js';

const listmenu = (directory) => {
  const results = [];
  try {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        results.push(...listmenu(fullPath));
      } else if (entry.isFile() && fullPath.endsWith(".js")) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    console.error(`Gagal membaca direktori: ${directory}`, e);
  }
  return results;
};

const loadPluginsForMenu = async (directory) => {
  const plugins = [];
  const jsFiles = listmenu(directory);
  
  for (const filePath of jsFiles) {
    try {
      const cacheBust = Date.now();
      const modulePath = pathToFileURL(filePath).href;
      const module = await import(`${modulePath}?v=${cacheBust}`);
      
      if (module.default) {
        plugins.push({ plugin: module.default, path: filePath });
      }
    } catch (error) {
      console.log(`Gagal memuat plugin untuk menu: ${filePath}`, error);
    }
  }
  return plugins;
};

let handler = async (m, { conn, prefix, reply, metaai }) => {
  try {
    const rootDir = process.cwd();
    const cmdDir = path.resolve(rootDir, './cmd');
    const plugins = await loadPluginsForMenu(cmdDir);
    const categories = {};
    const isOwner = global.owner.includes(m.sender.split("@")[0]) || global.owner.includes(m.sender);

    for (const { plugin, path: filePath } of plugins) {
      if (!plugin.help || !plugin.command) continue;

      const relativePath = path.relative(cmdDir, filePath);
      const pathParts = relativePath.split(path.sep);
      let tagName;

      if (pathParts.length > 1) {
        tagName = pathParts[0];
      } else {
        tagName = 'main';
      }

      if (!categories[tagName]) {
        categories[tagName] = [];
      }
      
      const helpCommand = plugin.help[0];
      if (helpCommand) {
         if (!categories[tagName].some(p => p.command === helpCommand)) {
            categories[tagName].push({
                command: helpCommand,
                owner: plugin.owner || false
            });
         }
      }
    }

    const sortedCategories = Object.keys(categories).sort();
    let totalCommands = 0;
    let commandListText = "";

    for (const tag of sortedCategories) {
      if (tag.toLowerCase() === 'owner' && !isOwner) {
        continue;
      }

      const commands = categories[tag].filter(cmd => !(cmd.owner && !isOwner));
      if (commands.length === 0) continue;
      
      totalCommands += commands.length;
      const categoryName = tag.charAt(0).toUpperCase() + tag.slice(1);

      commandListText += `*📁 ${categoryName} Menu*\n`;
      for (const cmd of commands) {
         commandListText += `› ${prefix}${cmd.command}\n`;
      }
      commandListText += '\n';
    }

    if (totalCommands === 0) {
        return reply('Tidak ada perintah menu yang tersedia untuk Anda.');
    }

    const botName = global.namebotz || 'Bot WhatsApp';
    const footerText = global.nameown || 'Owner Bot';
    
    const senderName = m.pushName || 'Pengguna';
    const botRuntime = runtime(process.uptime());

    const menuCaption = `
*${botName}*
*Halo, ${senderName}!*

┌  *INFO BOT*
│  ›  Runtime: ${botRuntime}
│  ›  Total Perintah: ${totalCommands}
└─────────────────

${commandListText.trim()}

> © ${footerText}
`.trim();

    await conn.sendMessage(m.chat, {
        text: menuCaption
    }, { quoted: metaai });

  } catch (e) {
    console.error(e);
    reply('Gagal membuat menu. Silakan coba lagi.');
  }
};

handler.command = ['menu', 'help'];
handler.help = ['menu'];
handler.tags = ['main'];

export default handler;