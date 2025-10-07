
 /*

 * Thank you dev and friends
 * Fauzialifatah ( me )
 * Arifzyn 
 * Kiur
 
 */

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pluginsLoader = async (directory) => {
    let plugins = [];
    try {
        const entries = fs.readdirSync(directory, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                const subDirectoryFiles = fs.readdirSync(fullPath, { withFileTypes: true });
                for (const subFile of subDirectoryFiles) {
                    const subFilePath = path.join(fullPath, subFile.name);
                    if (subFile.isFile() && subFilePath.endsWith(".js")) {
                        try {
                            const pluginModule = await import(`${subFilePath}`);
                            pluginModule.default.filename = subFile.name;
                            plugins.push(pluginModule.default);
                        } catch (error) {
                            console.log(`Gagal memuat plugin di ${subFilePath}:`, error);
                        }
                    }
                }
            } else if (entry.isFile() && fullPath.endsWith(".js")) {
                try {
                    const pluginModule = await import(`${subFilePath}`);
                    pluginModule.default.filename = entry.name;
                    plugins.push(pluginModule.default);
                } catch (error) {
                    console.log(`Gagal memuat plugin di ${fullPath}:`, error);
                }
            }
        }
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.log("Gagal membaca direktori plugin:", error);
        }
    }
    return plugins;
};

export const runPlugins = async (m, plug) => {
    const pluginsDisable = false;
    if (pluginsDisable) {
        return false;
    }
    const plugins = await pluginsLoader(path.resolve(__dirname, "./cmd"));
    for (let plugin of plugins) {
        if (plugin.command && plugin.command.find(e => e === plug.command.toLowerCase())) {
            if (typeof plugin !== "function") continue;
            
            if (plugin.owner && !global.owner.includes(plug.sender.split('@')[0])) {
                await m.reply("Maaf, perintah ini hanya untuk Owner.");
                return true;
            }

            let user = global.db.users[plug.sender];
            const limitCost = plugin.limit || 0;
            if (user.limit < limitCost) {
                await m.reply(`Maaf, limit Anda tidak cukup untuk menggunakan perintah ini.\n𝗟𝗶𝗺𝗶𝘁 𝗔𝗻𝗱𝗮: ${user.limit}\n𝗗𝗶𝗯𝘂𝘁𝘂𝗵𝗸𝗮𝗻: ${limitCost}`);
                return true;
            }
            try {
                await plugin(m, plug);
                if (limitCost > 0) {
                    user.limit -= limitCost;
                    console.log(`Mengurangi ${limitCost} limit dari ${plug.pushName}`);
                }
                return true;
            } catch (error) {
                console.log(error);
                return true;
            }
        }
    }
    return false;
};

let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(` ~> File updated: ${file}`);
    import (`${file}`);
});