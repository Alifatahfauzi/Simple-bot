/*
    © credate by fauzialifatah 
    ~> hargai pembuatan script base, karna saya tau alur dan susunan script tersebut terimakasih🚀🎉
*/

import "./settings/config.js";
import { qtext, metaai } from "./source/quoted.js";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!global.__PLUGINS_VERSION__) global.__PLUGINS_VERSION__ = Date.now();

const cacheBustImport = async (absPath) => {
  let mtime = 0;
  try {
    mtime = fs.statSync(absPath).mtimeMs || Date.now();
  } catch {}
  const url = `${absPath}?v=${global.__PLUGINS_VERSION__}_${mtime}`;
  return import(url);
};

const listJsFilesRecursively = (directory) => {
  const results = [];
  try {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        results.push(...listJsFilesRecursively(fullPath));
      } else if (entry.isFile() && fullPath.endsWith(".js")) {
        results.push(fullPath);
      }
    }
  } catch {}
  return results;
};

export const pluginsLoader = async (directory) => {
  const plugins = [];
  try {
    const jsFiles = listJsFilesRecursively(directory);
    for (const filePath of jsFiles) {
      try {
        const pluginModule = await cacheBustImport(filePath);
        if (pluginModule?.default) {
          pluginModule.default.filename = path.basename(filePath);
          plugins.push(pluginModule.default);
        }
      } catch (error) {
        console.log(chalk.red(`Gagal memuat plugin di ${filePath}:`), error);
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.log(chalk.red("Gagal membaca direktori plugin:"), error);
    }
  }
  return plugins;
};

export const runPlugins = async (m, plug) => {
  const pluginsDisable = false;
  if (pluginsDisable) return false;

  const pluginsDir = path.resolve(__dirname, "./cmd");
  const plugins = await pluginsLoader(pluginsDir);

  for (const plugin of plugins) {
    if (plugin.command && plugin.command.find((e) => e === plug.command.toLowerCase())) {
      if (typeof plugin !== "function") continue;

      const isOwner = global.owner.includes(plug.sender.split("@")[0]) || global.owner.includes(plug.sender);

      if (plugin.owner && !isOwner) {
        await m.reply("Maaf, perintah ini hanya untuk Owner.");
        return true;
      }

      try {
        await plugin(m, plug);
        return true;
      } catch (error) {
        console.log(chalk.red("Terjadi error saat menjalankan plugin:"), error);
        return true;
      }
    }
  }
  return false;
};

const watchDirectories = new Set();
const watchCmdRecursive = (baseDir) => {
  if (!fs.existsSync(baseDir)) return;
  const stack = [baseDir];
  while (stack.length) {
    const dir = stack.pop();
    if (watchDirectories.has(dir)) continue;
    watchDirectories.add(dir);
    try {
      fs.watch(dir, { persistent: true }, (eventType, filename) => {
        if (!filename) return;
        const changedPath = path.join(dir, filename.toString());
        global.__PLUGINS_VERSION__ = Date.now();
        console.log(
          chalk.bgGreen.black(" PLUGINS "),
          chalk.white("reload"),
          chalk.gray("→"),
          chalk.cyan(path.relative(baseDir, changedPath))
        );
      });
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) stack.push(path.join(dir, entry.name));
      }
    } catch {}
  }
};

const cmdDir = path.resolve(__dirname, "./cmd");
watchCmdRecursive(cmdDir);

fs.watchFile(__filename, () => {
  fs.unwatchFile(__filename);
  console.log(chalk.cyan(`~> File updated: ${__filename}`));
  import(`${__filename}`);
});