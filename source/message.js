
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

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
  downloadContentFromMessage
} from "@whiskeysockets/baileys";
import fs from "fs-extra";
import util from "util";
import chalk from "chalk";
import { exec, spawn } from "child_process";
import axios from "axios";
import syntaxerror from "syntax-error";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";
import JsConfuser from "js-confuser";
import * as jimp from "jimp";
import speed from "performance-now";
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import sharp from "sharp";
import fileType from "file-type";

import { 
    addProduk, 
    getListProduk, 
    deleteProduk, 
    editProduk, 
    findProduk 
} from './events/store.js';

import {
  generateProfilePicture,
  getBuffer,
  fetchJson,
  fetchText,
  getRandom,
  runtime,
  sleep,
  makeid,
  toRupiah
} from "../source/myfunc.js";
import { qtext, metaai } from "../source/quoted.js";
import { runPlugins, pluginsLoader } from "../handler.js";
import { makeStickerFromUrl } from "../source/events/_sticker.js";
import Case from './events/system.js';
import { addSaldo, minSaldo, cekSaldo } from './events/deposit.js';
let db_saldo = JSON.parse(fs.readFileSync("./settings/dbku/saldo.json", "utf8"));
let prefix = ".";
let mode = true;

function levenshtein(a, b) {
  let dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
  return dp[a.length][b.length];
}

function similarityPercent(a, b) {
  let maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 100;
  let distance = levenshtein(a, b);
  let similarity = ((maxLength - distance) / maxLength) * 100;
  return Math.round(similarity);
}

async function getCaseCommands(filePath) {
  try {
    let code = await fs.promises.readFile(filePath, "utf8");
    let regex = /case\s+['"`](.*?)['"`]/g;
    let matches = [];
    let match;
    while ((match = regex.exec(code)) !== null) matches.push(match[1]);
    return matches;
  } catch {
    return [];
  }
}

export default async (conn, m) => {
  try {
    let body = m.body || m.text || "";
    let budy = m.body || m.text || "";
    let command = body.startsWith(prefix)
      ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
      : "";
    let commands = command.replace(prefix, "");
    let args = body.trim().split(/ +/).slice(1);
    let q = args.join(" ");
    let qmsg = (m.quoted || m)
    let quoted = m.quoted ? m.quoted : m;
    let mime = quoted?.msg?.mimetype || quoted?.mimetype || null
    let message = m;
    let messageType = m.mtype;
    let messageKey = message.key;
    let pushName = m.pushName || "Undefined";
    let itsMe = m.key.fromMe;
    let chat = m.chat;
    let sender = m.sender;
    let userId = sender.split("@")[0];
    let isOwner = global.owner.includes(sender.split("@")[0]) || global.owner.includes(sender);
    let botNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    let isGroup = m.key.remoteJid.endsWith("@g.us");
    let isNet = (m.key.remoteJidAlt || m.key.remoteJid).replace(/@lid$/, "@s.whatsapp.net");
    let isNomor = m.key.participantAlt || m.key.remoteJidAlt || (m.sender || '').replace(/@lid$/, "@s.whatsapp.net");
    let isNumber = isNomor.split("@")[0];
    
    let groupMetadata = {};
    let groupName = "";
    let groupId = "";
    let groupMembers = [];
    let isGroupAdmins = false;
    let isBotGroupAdmins = false;
    let me = {};

    if (isGroup) {
      groupMetadata = await conn.groupMetadata(chat).catch(() => ({}));
      groupName = groupMetadata.subject || "";
      groupId = groupMetadata.id || "";
      groupMembers = groupMetadata.participants || [];
      isGroupAdmins = !!groupMembers.find((p) => p.admin && p.id === sender);
      isBotGroupAdmins = !!groupMembers.find((p) => p.admin && p.id === botNumber);
      me = groupMembers.find(p => p.id === m.sender || p.jid === m.sender) || {};
    }

    let TypeMess = getContentType(m?.message);
    let reactions = TypeMess == "reactionMessage" ? m?.message[TypeMess]?.text : false;
    
    let reply = async (teks) => {
      return conn.sendMessage(m.chat, {
        text: `${teks}`,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: `${global.namebotz}`,
            body: `Are you Reddy?`,
            thumbnail: fs.readFileSync('./settings/image/image.jpg'),
            sourceUrl: "https://t.me/FauziAlifatah",
          }
        }
      }, { quoted: m });
    };
    
    if (reactions) {
      if (["😂"].includes(reactions)) {
        conn.sendMessage(m.chat, { text: "*KWKWKWKWK😹*" }, { quoted: null });
      }
    }

    if (body.startsWith("$")) {
      if (!isOwner) return
      await reply("_Executing..._");
      exec(q, async (err, stdout) => {
        if (err) return reply(`${err}`);
        if (stdout) await reply(`${stdout}`);
      });
    }

    if (body.startsWith(">")) {
      if (!isOwner) return
      try {
        let txtt = util.format(await eval(`(async()=>{ ${q} })()`));
        reply(txtt);
      } catch (e) {
        let _syntax = "";
        let _err = util.format(e);
        let err = syntaxerror(q, "EvalError", {
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
          sourceType: "module"
        });
        if (err) _syntax = err + "\n\n";
        reply(util.format(_syntax + _err));
      }
    }

    if (body.startsWith("=>")) {
      if (!isOwner) return
      try {
        let txtt = util.format(await eval(`(async()=>{ return ${q} })()`));
        reply(txtt);
      } catch (e) {
        let _syntax = "";
        let _err = util.format(e);
        let err = syntaxerror(q, "EvalError", {
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
          sourceType: "module"
        });
        if (err) _syntax = err + "\n\n";
        reply(util.format(_syntax + _err));
      }
    }

    if (m.message) {
      let time = new Date().toLocaleTimeString("id-ID", { hour12: false });
      let line = chalk.gray("│");
      let who = `${chalk.yellow(pushName)} ${chalk.gray("(" + m.sender + ")")}`;
      
      let actualSender = m.chat.endsWith('@newsletter') ? isNumber : who; 
      
      let place = isGroup ? chalk.magenta("Group: " + groupName) : chalk.green("Private");
      console.log(
        chalk.gray("╭────────────────────────────────"),
        `\n${line} ${chalk.cyan("🕒")} ${time}`,
        `\n${line} ${chalk.cyan("💬")} ${chalk.green(budy || m.mtype)}`,
        `\n${line} ${chalk.cyan("👤")} ${who}`, 
        `\n${line} ${chalk.cyan("📞")} ${isNumber}`, 
        `\n${line} ${chalk.cyan("🏷️")} ${place}`,
        `\n${chalk.gray("╰────────────────────────────────")}\n`
      );
    }

    if (!mode && !itsMe) return;
    if (!body.startsWith(prefix)) return;

    let resize = async (imagePathOrUrl, width, height) => {
      let imageBuffer;
      if (/^https?:\/\//.test(imagePathOrUrl)) {
        let response = await axios.get(imagePathOrUrl, { responseType: "arraybuffer" });
        imageBuffer = response.data;
      } else {
        imageBuffer = await fs.readFile(imagePathOrUrl);
      }
      let read = await jimp.read(imageBuffer);
      let data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
      return data;
    };

    let reaction = async (jid, emoji) => {
      conn.sendMessage(jid, { react: { text: emoji, key: m.key } });
    };

    let plug = {
      conn,
      command,
      quoted,
      fetchJson,
      qtext,
      budy,
      commands,
      args,
      q,
      message,
      messageType,
      messageKey,
      pushName,
      itsMe,
      chat,
      sender,
      userId,
      reply,
      botNumber,
      isGroup,
      groupMetadata,
      groupName,
      groupId,
      groupMembers,
      isBotGroupAdmins,
      isGroupAdmins,
      generateProfilePicture,
      getBuffer,
      fetchJson,
      fetchText,
      getRandom,
      runtime,
      sleep,
      makeid,
      prefix,
      reaction,
      resize,
      metaai, 
      isNumber,
      addSaldo, 
      minSaldo, 
      cekSaldo,
      toRupiah
    };

    let pluginHandled = await runPlugins(m, plug);
    if (pluginHandled) return;

    let __filename = fileURLToPath(import.meta.url);
    let __dirname = path.dirname(__filename);

    let plugins = await pluginsLoader(path.resolve(__dirname, "../cmd"));
    let pluginCommands = plugins.flatMap((p) => p.command || []);
    let caseCommands = await getCaseCommands(__filename);
    let allCommands = [...new Set([...pluginCommands, ...caseCommands])];

    if (!allCommands.includes(command)) {
      let similarities = allCommands.map((cmd) => ({
        name: cmd,
        percent: similarityPercent(command, cmd)
      }));
      let sorted = similarities.sort((a, b) => b.percent - a.percent).slice(0, 3);
      let filtered = sorted.filter((s) => s.percent >= 60);
      let suggestions = filtered.map((s, i) => `${i + 1}. *${prefix + s.name}* — ${s.percent}%`).join("\n");

      if (filtered.length > 0) {
        let buttons = filtered.map((s) => ({
          buttonId: `${prefix}${s.name}`,
          buttonText: { displayText: `${prefix}${s.name}` },
          type: 1
        }));

        await conn.sendMessage(
          m.chat,
          {
            text: `🔍 Mungkin yang kamu maksud:\n${suggestions}`,
            footer: global.namebotz || "Bot",
            buttons,
            headerType: 1,
            viewOnce: true
          },
          { quoted: metaai }
        );
      }

      return;
    }

    switch (commands) {
      case "mode": {
        await reaction(m.chat, "🧠");
        reply(`🤖 Bot Mode: ${conn.public ? "Public" : "Self"}`);
        break;
      }

      case "only": {
        if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
        let duh = body.slice(body.indexOf(commands) + commands.length).trim() || "return m";
        try {
          let evaled = await eval(`(async () => { ${duh} })()`);
          if (typeof evaled !== "string") evaled = util.inspect(evaled);
          await reply(evaled);
        } catch (err) {
          reply(String(err));
        }
        break;
      }

      case "runtime":
      

      case "cekidch":
      case "idch": {
        if (!q) return reply(`*Contoh penggunaan :*\nketik ${commands} linkchannel`);
        if (!q.includes("https://whatsapp.com/channel/")) return reply("Link channel tidak valid");
        let result = q.split("https://whatsapp.com/channel/")[1];
        let res = await conn.newsletterMetadata("invite", result);
        let teks = `${res.id}`;
        return reply(teks);
      }
      break

      case "sticker":
      case "s": {
        let quotedMessage = m.quoted ? m.quoted : m;
        let mime = (quotedMessage.msg || quotedMessage).mimetype || "";
        if (!/image|video/.test(mime)) return reply(`Reply sebuah gambar/video dengan caption ${prefix}${commands}`);
        try {
          if (/image/.test(mime)) {
            let media = await quotedMessage.download();
            let imageUrl = `data:${mime};base64,${media.toString("base64")}`;
            await makeStickerFromUrl(imageUrl, conn, m, reply);
          } else if (/video/.test(mime)) {
            if ((quotedMessage?.msg || quotedMessage)?.seconds > 10) return reply("Durasi video maksimal 10 detik!");
            let media = await quotedMessage.download();
            let videoUrl = `data:${mime};base64,${media.toString("base64")}`;
            await makeStickerFromUrl(videoUrl, conn, m, reply);
          }
        } catch (error) {
          console.error(error);
          return reply("Terjadi kesalahan saat memproses media. Coba lagi.");
        }
        break;
      }

      case "autotag":
      case "atag": {
        try {
          if (args.length < 2) {
            return reply(`*${prefix + command}* 628xx,628xx url caption`);
          }
          let kontol = args[0];
          let memek = args[1];
          let fauzi = args.slice(2).join(" ");
          let jids = kontol
            .split(",")
            .map(n => n.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
            .filter(v => v.length > 15);
          if (typeof conn.sendStatusMentions === "function") {
            await conn.sendStatusMentions(
              {
                image: { url: memek },
                fauzi
              },
              jids
            );
            reply(`✅ Status berhasil dikirim dan mention ke: ${jids.map(j => `@${j.split("@")[0]}`).join(", ")}`, m.chat, {
              mentions: jids
            });
          } else {
            reply("Baileys kamu belum mendukung `sendStatusMentions()`. Perbarui Baileys atau aktifkan fitur Status API.");
          }
        } catch (err) {
          reply("❌ Gagal mengirim status mention.\n" + String(err?.message || err));
        }
      }
      break;

      case "bot": {
        await conn.sendMessage(m.chat, {
          requestPhoneNumber: {}
        });
      }
      break

      case "jid":
      case "getjid": {
        await reply(chat);
        break;
      }
      
      case "getcase": { 
          if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
          if (!q) return reply(`Contoh: ${prefix}getcase namacase`);
          try {
              let hasil = Case.get(q);
              reply(`✅ Case ditemukan:\n\n${hasil}`);
          } catch (e) {
              reply(e.message);
          }
      }
      break;
      
      case "addcase": {
          if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
          if (!q) return reply(`Contoh: ${prefix}addcase case "namacase": {\n  reply("test");\n  break;\n}`);
          try {
              Case.add(q);
              reply("✅ Case berhasil ditambahkan.\n\n*Catatan:* Harap restart bot agar perintah baru dapat dieksekusi.");
          } catch (e) {
              reply(e.message);
          }
      }
      break;
      
      case "delcase": {
          if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
          if (!q) return reply(`Contoh: ${prefix}delcase namacase`);
          try {
              Case.delete(q);
              reply(`✅ Case "${q}" berhasil dihapus.\n\n*Catatan:* Harap restart bot untuk menerapkan perubahan.`);
          } catch (e) {
              reply(e.message);
          }
      }
      break;
      
      case "listcase": {
          if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
          try {
              let listString = Case.list();

              if (listString === "Tidak ada case!") {
                  return reply("📜 *List Case*\n\nBelum ada case custom yang ditambahkan.");
              }

              let commands = listString.split('\n');
              let total = commands.length;

              let formattedList = commands.map((cmd) => {
                  return `- ${prefix}${cmd}`;
              }).join('\n');

              let replyText = `*--- LIST CASE ---*\n\n${formattedList}\n\n*Total: ${total} Case*
              `;
              reply(replyText.trim());

          } catch (e) {
              reply(e.message);
          }
      }
      break;
      
      case "rvo": case "readviewonce": {
if (!m.quoted) return conn.sendMessage(m.chat, { text: "reply pesan viewOnce nya!" }, { quoted: m });
let msg = m.quoted.message || m.quoted.fakeObj.message
    let type = Object.keys(msg)[0]
if (!msg[type].viewOnce && m.quoted.mtype !== "viewOnceMessageV2") return conn.sendMessage(m.chat, { text: "Pesan itu bukan viewonce!" }, { quoted: m });
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : type == 'videoMessage' ? 'video' : 'audio')
    let buffer = Buffer.from([])
    for await (let chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return conn.sendMessage(m.chat, {video: buffer, caption: msg[type].caption || ""}, {quoted: m})
    } else if (/image/.test(type)) {
        return conn.sendMessage(m.chat, {image: buffer, caption: msg[type].caption || ""}, {quoted: m})
    } else if (/audio/.test(type)) {
        return conn.sendMessage(m.chat, {audio: buffer, mimetype: "audio/mpeg", ptt: true}, {quoted: m})
    } 
}
break

case "tourl": {
    if (!/image|video|audio|application/.test(mime))
        return m.reply("kirim atau reply medianya");

    async function uploadToCatbox(buffer) {
        try {
            const typeInfo = await fileType.fromBuffer(buffer);
            const ext = typeInfo?.ext || "bin";
            const mimeType = typeInfo?.mime || "application/octet-stream";
            const blob = new Blob([buffer], { type: mimeType });
            const form = new FormData();
            form.append("reqtype", "fileupload");
            form.append("fileToUpload", blob, "file." + ext);
            const res = await fetch("https://catbox.moe/user/api.php", {
                method: "POST",
                body: form
            });
            return await res.text();
        } catch {
            return null;
        }
    }

    try {
        const mediaPath = await conn.downloadAndSaveMediaMessage(qmsg);
        const buffer = fs.readFileSync(mediaPath);
        const url = await uploadToCatbox(buffer);
        fs.unlinkSync(mediaPath);

        if (!url || !url.startsWith("https://"))
            throw new Error("Gagal mengunggah ke Catbox");

        let thumbnailURL = /image/.test(mime)
            ? url
            : "https://i.ibb.co/7N0M0V9/noimage.jpg";

        await conn.sendMessage(
            m.chat,
            {
                productMessage: {
                    title: "URL Converter",
                    description: "Berhasil mengupload media",
                    thumbnail: { url: thumbnailURL },
                    productId: "URL001",
                    retailerId: "FauziBot",
                    body: `- URL : ${url}\n- 🕒 Exp : Permanent`,
                    footer: "Permanent URL",
                    priceAmount1000: 0,
                    currencyCode: "IDR",
                    buttons: [
                        {
                            name: "cta_copy",
                            buttonParamsJson: JSON.stringify({
                                display_text: "coppy URL",
                                id: "123456789",
                                copy_code: url
                            })
                        }
                    ]
                }
            },
            { quoted: null }
        );

    } catch {
        m.reply("Terjadi kesalahan saat mengupload.");
    }
}
break;

  
  case 'menu': {
 let imagePath = './settings/image/image.jpg';
 let rawBuffer = fs.readFileSync(imagePath); 
 let thumbnailBuffer = await sharp(rawBuffer)
 .resize(400, 400, { fit: 'contain' }) 
 .jpeg({ quality: 80 }) 
 .toBuffer();
 let anj = `hi ${pushName} 🪸, i am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.
`;
 let buttons = [
 {
 buttonId: `${prefix}owner`, 
 buttonText: { 
 displayText: 'owner' 
 }
 }, {
 buttonId: ".ping", 
 buttonText: {
 displayText: "Ping"
 }
 }
 ]
 let buttonMessage = {
 document: { url: "https://wa.me/6282127487538" },
 mimetype: "image/png",
 fileName: "Alifatah - Assistant",
 fileLength: 999999999999999,
 pageCount: 99999,
 jpegThumbnail: thumbnailBuffer, 
 caption: anj,
 footer: '© Fauzialifatah - 2025\n',
 mentions: [m.sender],
 buttons: buttons,
 headerType: 1,
 contextInfo: { 
 forwardingScore: 99999, 
 forwardedNewsletterMessageInfo: {
 newsletterJid: `120363404741298748@newsletter`,
 newsletterName: `newsletter - wabot`
 },
 externalAdReply: { 
 body: `hi ${pushName}`, 
 containsAutoReply: true, 
 mediaType: 1, 
 mediaUrl: "peler", 
 renderLargerThumbnail: true, 
 sourceId: 'Tes', 
 sourceType: 'PDF', 
 previewType: 'PDF', 
 sourceUrl: "https://whatsapp.com/channel/0029Vb6j2u74NViqgNCLev3a", 
 thumbnail: fs.readFileSync('./settings/image/thumbnail.jpg'), 
 title: 'Whatsapp - bot',
 },
 },
 viewOnce: true,
 headerType: 6
 };
 let flowActions = [
 {
 buttonId: 'action',
 buttonText: { displayText: 'Aksi dengan flow' },
 type: 4,
 nativeFlowInfo: {
 name: 'single_select',
 paramsJson: JSON.stringify({
 title: "Hii",
 sections: [
 {
 title: "Fauzialifatah",
 highlight_label: "label",
 rows: [
 {
 header: "header",
 title: "piw",
 description: "hahh",
 id: ".play"
 },
 {
 header: "header",
 title: "title",
 description: "",
 id: ".play"
 }
 ]
 }
 ]
 })
 },
 viewOnce: true
 }
 ];
 buttonMessage.buttons.push(...flowActions);
 return await conn.sendMessage(m.chat, buttonMessage, { quoted: metaai });
 };
 break;

case "rt":
 case "ping": {
 let startTime = Date.now();
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
 let totalMem = os.totalmem();
 let freeMem = os.freemem();
 let usedMem = totalMem - freeMem;
 let memUsage = (usedMem / totalMem) * 100;
 let uptimeServer = formatRuntime(os.uptime() * 1000);
 let serverTime = new Date().toLocaleString("id-ID", {
 timeZone: "Asia/Jakarta",
 hour12: false
 });
 let teks = `
*— Informasi Bot 🤖*
- *Nama Bot :* ${global.namabotz}
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
 reply(teks.trim());
 }
break

case 'addsaldo':  
case 'acc': {
    if (!isOwner) return reply(mess.owner);  
    if (!q.split(",")[0]) return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${command} 628xxx,20000`);  
    if (!q.split(",")[1]) return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${command} 628xxx,20000`);  
    let targetNumber = q.split(",")[0].replace(/\s/g, '') + "@s.whatsapp.net";
    let amount = Number(q.split(",")[1].replace(/\s/g, ''));
    addSaldo(targetNumber, amount, db_saldo);
    let pendapatanList = [];  
    const pendapat = "./settings/dbku/pendapatan.json";
    try {  
        let dataPendapatan = fs.readFileSync(pendapat, "utf8");  
        if (dataPendapatan) {  
            pendapatanList = JSON.parse(dataPendapatan);  
        }  
    } catch (error) {  
        console.error("❌ Error membaca ./settings/dbku/pendapatan.json, membuat file baru.");  
    }  

    let newData = {  
        harga: parseInt(amount),  
        namaBarang: "Penambahan Saldo",
        pembayaran: "Saldo",
        total: parseInt(amount),  
        tanggal: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),  
    };  
    pendapatanList.push(newData);  
    try {  
        fs.writeFileSync(pendapat, JSON.stringify(pendapatanList, null, 2));  
    } catch (error) {  
        console.error("❌ Error saat menyimpan ./settings/dbku/pendapatan.json");  
    }
    conn.sendMessage(m.chat, {
      buttons: [
        { buttonId: `.ceksaldo`, buttonText: { displayText: 'Cek Saldo' }, type: 1 }
      ],
      footer: `© 2025 ${global.namebotz}`,
      headerType: 1,
      viewOnce: true,
      text: `💰 *SALDO USER* 💰\n\n` +  
            `👤 *ID:* @${targetNumber.split("@")[0]}\n` +
            `📞 *Nomor:* ${q.split(",")[0]}\n` +  
            `📅 *Tanggal:* ${new Date().toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" })}\n` +  
            `💵 *Saldo:* Rp${toRupiah(cekSaldo(targetNumber, db_saldo))}\n\n✅ *Saldo berhasil ditambahkan!*`,
      contextInfo: {
        mentionedJid: [targetNumber],
      },
    }, { quoted: m });
    }
    break;

case 'kirimsaldo': {  
    let messageText = `✅ *Deposit Berhasil!*\n\n💰 *Jumlah:* Rp${q.split(",")[1].replace(/\s/g, '')}\n📌 *Saldo Anda telah diperbarui!*\n📝 *Cek saldo dengan mengetik:* .saldo\n\n🙏 Terima kasih!`;  
    let targetNumber = `${q.split(",")[0].replace(/\s/g, '')}@s.whatsapp.net`;  

    conn.sendMessage(targetNumber, {  
        text: `*${messageText}*`,  
        mentions: [m.sender] 
    }, {  
        quoted: null
    }).then(() => {  
        conn.sendMessage(m.chat, {
          buttons: [
            { buttonId: `.ceksaldo`, buttonText: { displayText: 'Cek Saldo' }, type: 1 }
          ],
          footer: `© 2025 ${global.namebotz}`,
          headerType: 1,
          viewOnce: true,
          text: '✅ *Acc Berhasil, Tuan!*',
        }, { quoted: m });
    }).catch((err) => {  
        console.error("Error kirim saldo:", err);
        reply('❌ *Gagal mengirim pesan!* Pastikan nomor target aktif atau bot tidak terblokir olehnya.');  
    });  
}
break;


case 'ceksaldo':
case 'saldo': {
    const userId = m.sender; 
    const saldo = cekSaldo(userId, db_saldo);
    
    conn.sendMessage(m.chat, {
        text: `💰 *SALDO ANDA* 💰\n\n` +  
              `🔹 *ID:* @${userId.split("@")[0]}\n` +  
              `💵 *Saldo Saat Ini:* Rp${toRupiah(saldo)}\n\n` +
              `_Gunakan perintah .listproduk untuk melihat apa yang bisa dibeli._`,
        contextInfo: {
            mentionedJid: [userId], 
        },
    }, { quoted: m });
    }
    break; 
    
case 'minsaldo':  
case 'kurangsaldo': {  
    if (!isOwner) return reply(mess.owner);  

    if (!q.split(",")[0]) return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${command} 628xxx,10000`);  
    if (!q.split(",")[1]) return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${command} 628xxx,10000`);  

    let targetNumber = q.split(",")[0].replace(/\s/g, '') + "@s.whatsapp.net"; 
    let amount = Number(q.split(",")[1].replace(/\s/g, ''));
    const currentSaldo = cekSaldo(targetNumber, db_saldo);
    if (currentSaldo < amount) {
        return reply(`❌ Saldo pengguna @${targetNumber.split("@")[0]} hanya Rp${toRupiah(currentSaldo)}. Tidak bisa dikurangi sebesar Rp${toRupiah(amount)}.`);
    }
    minSaldo(targetNumber, amount, db_saldo);  
    let pengeluaranList = [];  
    const pendapat = "./settings/dbku/pengeluaran.json";
    try {  
        let dataPengeluaran = fs.readFileSync(pendapat, "utf8");
        if (dataPengeluaran) {  
            pengeluaranList = JSON.parse(dataPengeluaran);  
        }  
    } catch (error) {  
        console.error("❌ Error membaca ./settings/dbku/pengeluaran.json, membuat file baru.");  
    }  
    let newData = {  
        harga: parseInt(amount),  
        keterangan: "Pengurangan Saldo (Admin)",
        jenis: "Tarik Saldo",
        total: parseInt(amount),  
        tanggal: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),  
    };  
    pengeluaranList.push(newData);  
    try {
        fs.writeFileSync(pendapat, JSON.stringify(pengeluaranList, null, 2));  
    } catch (error) {  
        console.error("❌ Error saat menyimpan ./settings/dbku/pengeluaran.json");  
    }
    conn.sendMessage(m.chat, {
      buttons: [
        { buttonId: `.ceksaldo`, buttonText: { displayText: 'Cek Saldo' }, type: 1 }
      ],
      footer: `© 2025 ${global.namebotz}`,
      headerType: 1,
      viewOnce: true,
      text: `💸 *PENGURANGAN SALDO* 💸\n\n` +  
            `🔹 *ID:* @${targetNumber.split("@")[0]}\n` +
            `🔹 *Jumlah Dikurangi:* Rp${toRupiah(amount)}\n` +  
            `💵 *Saldo Sisa:* Rp${toRupiah(cekSaldo(targetNumber, db_saldo))}\n\n✅ *Saldo berhasil dikurangi!*`,
      contextInfo: {
        mentionedJid: [targetNumber],
      },
    }, { quoted: m });
    }
    break;

case 'buyown': {
if (cekSaldo(m.sender,db_saldo) < 65000) return conn.sendMessage(m.chat, { text: `Maaf *@${m.sender.split('@')[0]}*, sepertinya saldo kamu kurang dari Rp65.000 Silahkan melakukan deposit terlebih dahulu sebelum *${command}*`, mentions: [m.sender]}, { quoted: m })
reply(`FAUZIALIFATAH`)
}
minSaldo(m.sender, 65000, db_saldo)
break

case 'addproduk': {
    if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
    const parts = q.split(",");
    if (parts.length < 3 || isNaN(parts[1].trim())) {
        return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${prefix}addproduk Premium 1 Bulan,35000,Akses fitur premium selama 1 bulan penuh.`);
    }

    const nama = parts[0].trim();
    const harga = parts[1].trim();
    const deskripsi = parts.slice(2).join(",").trim();

    try {
        const newProduk = addProduk(nama, harga, deskripsi);
        const text = `✅ *PRODUK BARU DITAMBAHKAN*\n\n` +
            `*ID Produk:* ${newProduk.id}\n` +
            `*Nama:* ${newProduk.nama}\n` +
            `*Harga:* Rp${toRupiah(newProduk.harga)}\n` +
            `*Deskripsi:* ${newProduk.deskripsi}\n` +
            `*Ditambahkan:* ${newProduk.tanggalTambah}`;
        reply(text);
    } catch (e) {
        reply(`❌ Gagal menambahkan produk: ${e.message}`);
    }
}
break;

case 'listproduk': {
    const produkList = getListProduk();
    const currentSaldo = cekSaldo(m.sender, db_saldo);
    
    let headerText = `👤 *User:* @${m.sender.split('@')[0]}\n💵 *Saldo:* Rp${toRupiah(currentSaldo)}\n\n*Silahkan pilih produk🛍️*:\n`;

    if (produkList.length === 0) {
        return conn.sendMessage(m.chat, { 
            text: headerText + "\nBelum ada produk yang tersedia saat ini.",
            footer: `© ${global.namebotz || "Bot"} - ${new Date().getFullYear()}`,
            viewOnce: true
        }, { quoted: m });
    }

    const productRows = produkList.map((p, index) => ({
        header: `ID: ${p.id}`,
        title: `${p.nama} (Rp${toRupiah(p.harga)})`,
        description: `${p.deskripsi.substring(0, 50)}...`,
        id: `${prefix}buy ${p.id}`,
    }));

    const sections = [{
        title: `Total ${produkList.length} Produk Tersedia`,
        highlight_label: 'PILIH PRODUK',
        rows: productRows,
    }];
    
    const buttonMessage = {
        text: headerText.trim(),
        footer: `© ${global.namebotz || "Bot"} - ${new Date().getFullYear()}`,
        buttons: [
            {
                buttonId: 'action_list', 
                buttonText: { displayText: '🛒 BUKA DAFTAR PRODUK' },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: 'Daftar Produk',
                        sections: sections,
                    }),
                },
            },
            {
                buttonId: `${prefix}ceksaldo`,
                buttonText: { displayText: 'Cek Saldo' },
                type: 1,
            },
        ],
        headerType: 1,
        viewOnce: true
    };
    
    return await conn.sendMessage(m.chat, buttonMessage, { quoted: metaai });
}
break;

case 'delproduk': {
    if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
    if (!q) return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${prefix}delproduk PROD-XYZ`);

    const id = q.trim();
    try {
        deleteProduk(id);
        reply(`✅ Produk dengan ID *${id}* berhasil dihapus.`);
    } catch (e) {
        reply(e.message);
    }
}
break;

case 'editproduk': {
    if (!isOwner) return reply("Perintah ini hanya untuk Owner.");
    const parts = q.split(",");
    if (parts.length < 3) {
        return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${prefix}editproduk PROD-XYZ,harga,45000\n${prefix}editproduk PROD-XYZ,nama,Premium 2 Bulan`);
    }

    const id = parts[0].trim();
    const field = parts[1].trim().toLowerCase();
    const value = parts.slice(2).join(",").trim();
    let newNama, newHarga, newDeskripsi;
    try {
        const produk = findProduk(id);
        if (!produk) throw new Error(`Produk dengan ID *${id}* tidak ditemukan.`);

        newNama = produk.nama;
        newHarga = produk.harga;
        newDeskripsi = produk.deskripsi;
        
        switch (field) {
            case 'nama':
                newNama = value;
                break;
            case 'harga':
                if (isNaN(value)) return reply("Harga harus berupa angka.");
                newHarga = value;
                break;
            case 'deskripsi':
                newDeskripsi = value;
                break;
            default:
                return reply(`Field *${field}* tidak valid. Field yang tersedia: *nama, harga, deskripsi*.`);
        }

        const updatedProduk = editProduk(id, newNama, newHarga, newDeskripsi);
        const text = `✅ *PRODUK BERHASIL DIEDIT*\n\n` +
            `*ID Produk:* ${updatedProduk.id}\n` +
            `*Nama:* ${updatedProduk.nama}\n` +
            `*Harga:* Rp${toRupiah(updatedProduk.harga)}\n` +
            `*Deskripsi:* ${updatedProduk.deskripsi}\n` +
            `*Terakhir Edit:* ${updatedProduk.tanggalEdit}`;
        reply(text);

    } catch (e) {
        reply(`❌ Gagal mengedit produk: ${e.message}`);
    }
}
break;

case 'buy': {
    if (!q) return reply(`⚠️ *Format Salah!*\n\n🔹 Contoh Penggunaan:\n${prefix}buy ID_PRODUK\n\n_Lihat ID produk dengan ${prefix}listproduk_`);
    const id = q.trim();
    const produk = findProduk(id);
    if (!produk) {
        return reply(`❌ Produk dengan ID *${id}* tidak ditemukan. Cek ${prefix}listproduk.`);
    }
    const requiredSaldo = produk.harga;
    const currentSaldo = cekSaldo(m.sender, db_saldo);
    const command = `${prefix}buy ${id}`;
    if (currentSaldo < requiredSaldo) { 
        return conn.sendMessage(m.chat, { 
            text: `Maaf *@${m.sender.split('@')[0]}*, sepertinya saldo kamu kurang dari *Rp${toRupiah(requiredSaldo)}*. Saldo kamu saat ini: *Rp${toRupiah(currentSaldo)}*. Silahkan melakukan deposit terlebih dahulu sebelum *${command}*`, 
            mentions: [m.sender]
        }, { quoted: m });
    }
    try {
        minSaldo(m.sender, requiredSaldo, db_saldo);
        let benefitMessage = `🎉 *PEMBELIAN BERHASIL!* 🎉\n\n` +
            `*Produk:* ${produk.nama}\n` +
            `*Harga:* Rp${toRupiah(produk.harga)}\n` +
            `*Sisa Saldo:* Rp${toRupiah(cekSaldo(m.sender, db_saldo))}\n\n` +
            `*Deskripsi Produk:* ${produk.deskripsi}\n\n` +
            `_Notifikasi atau akses produk akan dikirimkan oleh owner bot._`;
        reply(benefitMessage);
        conn.sendMessage(global.owner[0] + "@s.whatsapp.net", {
            text: `🔔 *NOTIFIKASI PEMBELIAN*\n\nUser: @${m.sender.split('@')[0]}\nMembeli: ${produk.nama}\nID Produk: ${produk.id}\nHarga: Rp${toRupiah(requiredSaldo)}\n\n*Tindak lanjuti pembelian ini!*`,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error("Error saat proses pembelian:", e);
        reply("❌ Terjadi kesalahan saat memproses pembelian. Coba lagi atau hubungi owner.");
    }

}
break;

  default:
    }
  } catch (err) {
    conn.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
  }
};

