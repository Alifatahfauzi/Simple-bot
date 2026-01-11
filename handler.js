import "./settings/config.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!global.plugins) global.plugins = Date.now();

const k = async (absPath) => {
  let mtime = 0;
  try { mtime = fs.statSync(absPath).mtimeMs || Date.now(); } catch {}
  return import(`${pathToFileURL(absPath).href}?v=${global.plugins}_${mtime}`);
};

const s = (dir) => {
  let files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const res = path.join(dir, entry.name);
      if (entry.isDirectory()) files.push(...s(res));
      else if (res.endsWith(".js")) files.push(res);
    }
  } catch {}
  return files;
};

const x = {
  loader: async (directory) => {
    const plugins = [];
    const jsFiles = s(directory);
    for (const filePath of jsFiles) {
      try {
        const mod = await k(filePath);
        const plugin = mod?.default || mod;
        if (!plugin) continue;
        plugin.filename = path.basename(filePath);
        plugins.push(plugin);
      } catch (e) { console.log(chalk.red(`Error loading ${filePath}:`), e); }
    }
    return plugins;
  },

  run: async (m, plug) => {
    const pluginsDir = path.resolve(__dirname, "./cmd");
    const plugins = await x.loader(pluginsDir);

    for (const plugin of plugins) {
      if (plugin.before && typeof plugin.before === "function") {
        try {
          await plugin.before.call(plugin, m, { 
            ...plug,
            isBotAdmin: plug.isBotAdmin,
            isAdmin: plug.isAdmin
          });
        } catch (e) { console.error("Error in plugin.before:", e); }
      }
    }

    const cmd = String(plug?.command || "").toLowerCase();
    if (!cmd) return false;

    const isOwner = global.owner.includes(plug?.sender?.split("@")[0]) || global.owner.includes(plug?.sender);
    const isGroup = m.key.remoteJid.endsWith("@g.us");

    for (const plugin of plugins) {
      const matched = (Array.isArray(plugin.command) ? plugin.command : []).some(c => String(c).toLowerCase() === cmd);
      if (!matched) continue;

      if (plugin.owner && !isOwner) return m.reply(global.mess.owner);
      if (plugin.group && !isGroup) return m.reply(global.mess.group);
      if (plugin.private && isGroup) return m.reply(global.mess.private);
      if (plugin.admin && !plug.isAdmin) return m.reply(global.mess.admin);

      try { 
        await plugin(m, plug); 
        return true; 
      } catch (e) { 
        console.log(chalk.red("Plugin Error:"), e); 
        return true; 
      }
    }
    return false;
  },

  watch: (dir) => {
    if (!fs.existsSync(dir)) return;
    fs.watch(dir, { recursive: true }, (event, filename) => {
      if (filename?.endsWith(".js")) {
        global.plugins = Date.now();
        console.log(chalk.bgGreen.black(" RELOAD "), chalk.cyan(filename));
      }
    });
  }
};

x.watch(path.resolve(__dirname, "./cmd"));

fs.watchFile(__filename, () => {
  fs.unwatchFile(__filename);
  import(`${pathToFileURL(__filename).href}?v=${Date.now()}`);
});

export default x;
