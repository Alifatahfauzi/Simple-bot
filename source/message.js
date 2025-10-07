
 /*

 * Thank you dev and friends
 * Fauzialifatah ( me )
 * Arifzyn 
 * Kiur
 
 */

import "../source/events/database.js";
import "../settings/config.js";
import {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} from "@whiskeysockets/baileys";
import fs from "fs";
import util from "util";
import chalk from "chalk";
import { exec } from "child_process";
import axios from "axios";
import syntaxerror from "syntax-error";
import { fileURLToPath } from 'url';
import path from "path"
import os from "os";
import jimp from "jimp";
import speed from 'performance-now';
import {
  generateProfilePicture,
  getBuffer,
  fetchJson,
  fetchText,
  getRandom,
  getGroupAdmins,
  runtime,
  sleep,
  makeid,
} from "../source/myfunc.js";
import { qtext } from '../source/quoted.js';
import { runPlugins } from '../handler.js';
import { leveluser } from '../source/events/_levelup.js';

let prefix = ".";
let mode = true;

export default async (conn, m) => {
  loadDataBase(conn, m);
  try {
    const body = m.body || m.text || "";
    const budy = m.body || m.text || "";
    const command = body.startsWith(prefix) ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : "";
    const commands = command.replace(prefix, "");
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const quoted = m.quoted ? m.quoted : m;
    const message = m;
    const messageType = m.mtype;
    const messageKey = message.key;
    const pushName = m.pushName || "Undefined";
    const itsMe = m.key.fromMe;
    const chat = m.chat;
    const sender = m.sender;
    const userId = sender.split("@")[0];
    const reply = m.reply;
    const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
    
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const groupMetadata = isGroup ? await conn.groupMetadata(chat) : '';
    const groupName = isGroup ? groupMetadata.subject : '';
    const groupId = isGroup ? groupMetadata.id : '';
    const groupMembers = isGroup ? groupMetadata.participants : '';
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
    const isGroupAdmins = groupAdmins.includes(sender);

    if (body.startsWith("$")) {
      if (!itsMe) return;
      await m.reply("_Executing..._");
      exec(q, async (err, stdout) => {
        if (err) return m.reply(`${err}`);
        if (stdout) {
          await m.reply(`${stdout}`);
        }
      });
    }

    if (body.startsWith(">")) {
      if (!itsMe) return;
      try {
        const txtt = util.format(await eval(`(async()=>{ ${q} })()`));
        m.reply(txtt);
      } catch (e) {
        let _syntax = "";
        let _err = util.format(e);
        let err = syntaxerror(q, "EvalError", {
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
          sourceType: "module",
        });
        if (err) _syntax = err + "\n\n";
        m.reply(util.format(_syntax + _err));
      }
    }

    if (body.startsWith("=>")) {
      if (!itsMe) return;
      try {
        const txtt = util.format(await eval(`(async()=>{ return ${q} })()`));
        m.reply(txtt);
      } catch (e) {
        let _syntax = "";
        let _err = util.format(e);
        let err = syntaxerror(q, "EvalError", {
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
          sourceType: "module",
        });
        if (err) _syntax = err + "\n\n";
        m.reply(util.format(_syntax + _err));
      }
    }

    if (!mode) {
      if (!m.key.fromMe) return;
    }

    if (m.message) {
      console.log(chalk.bgMagenta(" [===>] "), chalk.cyanBright("Time: ") + chalk.greenBright(new Date()) + "\n", chalk.cyanBright("Message: ") + chalk.greenBright(budy || m.mtype) + "\n" + chalk.cyanBright("From:"), chalk.greenBright(pushName), chalk.yellow("- " + m.sender) + "\n" + chalk.cyanBright("Chat Type:"), chalk.greenBright(!m.isGroup ? "Private Chat" : "Group Chat - " + chalk.yellow(m.chat)));
    }

    if (!body.startsWith(prefix)) {
      return;
    }
    
    if (global.db && global.db.users && global.db.users[m.sender]) {
    const user = global.db.users[m.sender];
    const oldRole = user.role;
    user.command += 1;
    const newRole = leveluser(user.command).rank;
    if (oldRole !== newRole) {
        user.role = newRole;
        const upuser = `🎉 *SELAMAT NAIK LEVEL!* 🎉\n\n*Nama:* ${pushName}\n*Level Lama:* ${oldRole}\n*Level Baru:* ${newRole}\n\nTerus gunakan bot untuk mencapai level selanjutnya!`;
        
        conn.sendMessage(m.chat, { text: upuser }, { quoted: qtext });
    }
}

    const resize = async (imageUrl, width, height) => {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const read = await jimp.read(response.data);
  const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
  return data;
};

    const reaction = async (jid, emoji) => {
    conn.sendMessage(jid, { react: { text: emoji, key: m.key }}
        );
    };
   
    const plug = { conn, command, quoted, fetchJson, qtext, budy, commands, args, q, message, messageType, messageKey, pushName, itsMe, chat, sender, userId, reply, botNumber, isGroup, groupMetadata, groupName, groupId, groupMembers, groupAdmins, isBotGroupAdmins, isGroupAdmins, generateProfilePicture, getBuffer, fetchJson,fetchText, getRandom, runtime, sleep, makeid, prefix, reaction };

    const pluginHandled = await runPlugins(m, plug);
    if (pluginHandled) {
        return;
    }

    switch (commands) {
      case "mode": {
        m.reply(`🤖 Bot Mode: ${conn.public ? "Public" : "Self"}`);
      }
      break;
      
      case "only": {
         let duh = body.slice(body.indexOf(commands) + commands.length).trim() || "return m"
           try {
                    let evaled = await eval(`(async () => { ${duh} })()`)
                    if (typeof evaled !== "string") evaled = util.inspect(evaled)
                    await m.reply(evaled)
                } catch (err) {
                    m.reply(String(err))
                }
                break
            }
      
      case 'hidetag': {
        if (!isGroup) return;
        let teks = quoted.text ? quoted.text : q ? q : '';
        let mem = [];
        groupMembers.map(i => mem.push(i.id));
        conn.sendMessage(m.chat, { text: teks, mentions: mem }, { quoted: m });
      }
      break;

      case 'runtime': case 'rt': case 'ping': {
const startTime = Date.now();
function formatRuntime(ms) {
let seconds = Math.floor(ms / 1000);
let days = Math.floor(seconds / 86400);
seconds %= 86400;
let hours = Math.floor(seconds / 3600);
seconds %= 3600;
let minutes = Math.floor(seconds / 60);
seconds %= 60;
return `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
}
let timestamp = speed();
let latensi = speed() - timestamp;
// info VPS
let totalMem = os.totalmem();
let freeMem = os.freemem();
let usedMem = totalMem - freeMem;
let memUsage = (usedMem / totalMem) * 100;
// uptime server
let uptimeServer = formatRuntime(os.uptime() * 1000);
// waktu server sekarang
let serverTime = new Date().toLocaleString("id-ID", {
timeZone: "Asia/Jakarta",
hour12: false
});
let teks = `
*— Informasi Bot 🤖*
- *Nama Bot :* ${global.botName || "undefined"}
- *Runtime Bot :* ${runtime(process.uptime())}
- *Response Speed :* ${latensi.toFixed(4)} _Second_ 
- *NodeJS Version :* ${process.version}

*— Informasi Server VPS 🖥️*
- *OS Platform :* ${os.type()} (${os.arch()})
- *Total RAM :* ${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB
- *Terpakai :* ${(usedMem / 1024 / 1024 / 1024).toFixed(2)} GB (${memUsage.toFixed(2)}%)
- *Tersisa :* ${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB
- *Total Disk :* 199.9 GB
- *CPU Core :* ${os.cpus().length} Core
- *Load Avg :* ${(os.loadavg()[0] * 100 / os.cpus().length).toFixed(2)}%
- *Uptime VPS :* ${uptimeServer}
- *Server Time :* ${serverTime}
`;
m.reply(teks.trim());
}
break

            case "get":{
                if (!/^https?:\/\//.test(q)) return reply(`*ex:* ${prefix + command} https://kyuurzy.site`);
                const ajg = await fetch(q);
                await reaction(m.chat, "⚡")
                
                if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
                    throw `Content-Length: ${ajg.headers.get("content-length")}`;
                }

                const contentType = ajg.headers.get("content-type");
                if (contentType.startsWith("image/")) {
                    return client.sendMessage(m.chat, {
                        image: { url: q }
                    }, { quoted: fquoted.packSticker });
                }
        
                if (contentType.startsWith("video/")) {
                    return client.sendMessage(m.chat, {
                        video: { url: q } 
                    }, { quoted: fquoted.packSticker });
                }
                
                if (contentType.startsWith("audio/")) {
                    return client.sendMessage(m.chat, {
                        audio: { url: q },
                        mimetype: 'audio/mpeg', 
                        ptt: true
                    }, { quoted: fquoted.packSticker });
                }
        
                let alak = await ajg.buffer();
                try {
                    alak = util.format(JSON.parse(alak + ""));
                } catch (e) {
                    alak = alak + "";
                } finally {
                    return reply(alak.slice(0, 65536));
                }
            }
            break

      default:
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};


let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(` ~> File updated: ${file}`);
    import(`${file}`);
});