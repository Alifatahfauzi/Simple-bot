
 /*

 * Thank you dev and friends
 * Fauzialifatah ( me )
 * Arifzyn 
 * Kiur
 
 */

import "./settings/config.js";
import {
  makeWASocket,
  useMultiFileAuthState,
  jidDecode,
  getContentType,
  DisconnectReason,
  Browsers,
  downloadContentFromMessage,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import path from "path";
import pino from "pino";
import readline from "readline";
import chalk from "chalk";
import fs from "fs-extra";
import NodeCache from "node-cache";
import fileType from 'file-type';
const { fileTypeFromBuffer } = fileType;
import axios from "axios";
import { runPlugins } from './handler.js';
import handleMessage from './source/message.js';
import { fileURLToPath } from 'url';
import { smsg } from "./source/myfunc.js";
import "./source/myfunc.js";

global.mode = true;
global.sessionName = "session";
const pairingCode = process.argv.includes("pair");

if (!pairingCode) {
  console.log(chalk.redBright("command work ( node index.js pair"));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const msgRetryCounterCache = new NodeCache();

const getBuffer = async (url, options) => {
    try {
        options = options || {};
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (e) {
        console.log(`Error : ${e}`);
    }
};

async function startServer() {
  const child = async () => {
    process.on("unhandledRejection", (err) => console.error(err));
    const { state, saveCreds } = await useMultiFileAuthState("./" + sessionName);
    const conn = makeWASocket({
      printQRInTerminal: !pairingCode,
      logger: pino({
        level: "silent",
      }),
      browser: ["Linux", "Chrome", "20.0.00"],
      auth: state,
      msgRetryCounterCache,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 0,
      keepAliveIntervalMs: 10000,
      emitOwnEvents: true,
      fireInitQueries: true,
      generateHighQualityLinkPreview: true,
      syncFullHistory: true,
      markOnlineOnConnect: true,
    });
    
    global.conn = conn;

    conn.ev.on("creds.update", saveCreds);

    if (!conn.authState.creds.registered) {
      console.log(chalk.cyan("╭──────────────────────────────────────···"));
      console.log(`📨 ${chalk.redBright("Please type your WhatsApp number")}:`);
      console.log(chalk.cyan("├──────────────────────────────────────···"));
      let phoneNumber = await question(`   ${chalk.cyan("- Number")}: `);
      console.log(chalk.cyan("╰──────────────────────────────────────···"));
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

      setTimeout(async () => {
        let code = await conn.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(chalk.cyan("╭──────────────────────────────────────···"));
        console.log(` 💻 ${chalk.redBright("Your Pairing Code")}:`);
        console.log(chalk.cyan("├──────────────────────────────────────···"));
        console.log(`   ${chalk.cyan("- Code")}: ${code}`);
        console.log(chalk.cyan("╰──────────────────────────────────────···"));
      }, 3000);
      rl.close();
    }

    conn.ev.on("messages.upsert", async (chatUpdate) => {
      try {
        let m = chatUpdate.messages[0];
        if (!m.message) return;
        m.message =
          Object.keys(m.message)[0] === "ephemeralMessage"
            ? m.message.ephemeralMessage.message
            : m.message;
        if (m.key && m.key.remoteJid === "status@broadcast") return;
        if (!conn.public && !m.key.fromMe && chatUpdate.type === "notify")
          return;
        if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
        m = smsg(conn, m);
        handleMessage(conn, m, chatUpdate);
      } catch (err) {
        console.error(chalk.red('[ERROR] Gagal memproses pesan:'), err);
      }
    });

    conn.decodeJid = (jid) => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (
          (decode.user && decode.server && decode.user + "@" + decode.server) ||
          jid
        );
      } else return jid;
    };

    conn.public = mode;
    conn.serializeM = (m) => smsg(conn, m);

    conn.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        console.log('Koneksi terputus dengan alasan:', DisconnectReason[reason]);
        if (reason === DisconnectReason.loggedOut) {
          console.log("❌ Sesi invalid, hapus folder session dan scan ulang");
          process.exit();
        } else {
          console.log("⚠️ Koneksi terputus, mencoba reconnect...");
          child();
        }
      } else if (connection === "open") {
        console.log(chalk.black(chalk.bgWhite("✅ Berhasil Terhubung....")));
        await loadConnect(conn);
      }
    });
    
    conn.sendButton = async (jid, text, footer, btnklick, image1, image2, buttons, quoted, options) => {
    const message = {
        footer: footer,
        headerType: 1,
        viewOnce: true,
        image: { url: image1 },
        caption: text,
        buttons: [
            {
                buttonId: 'action',
                buttonText: { displayText: 'Pilih Opsi' },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: btnklick,
                        sections: [
                            {
                                title: 'MENU UTAMA',
                                rows: buttons.map(btn => ({
                                    title: btn.title,
                                    description: btn.description || '',
                                    id: btn.id
                                }))
                            }
                        ]
                    })
                }
            }
        ],
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            mentionedJid: [quoted.sender],
            forwardedNewsletterMessageInfo: {
                newsletterName: '— SH.Fauzialifatah',
                newsletterJid: '120363367787013309@newsletter'
            },
            externalAdReply: {
                title: global.namebotz,
                body: global.nameown,
                thumbnailUrl: image1,
                sourceUrl: global.YouTube,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        },
        ...options
    };

    return await conn.sendMessage(jid, message, { quoted });
    };

    conn.downloadAndSaveMediaMessage = async (
      message,
      filename,
      attachExtension = true
    ) => {
      let quoted = message.msg ? message.msg : message;
      let mime = (message.msg || message).mimetype || "";
      let messageType = message.mtype
        ? message.mtype.replace(/Message/gi, "")
        : mime.split("/")[0];
      const stream = await downloadContentFromMessage(quoted, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      let type = await fileTypeFromBuffer(buffer);
      let trueFileName = attachExtension ? filename + "." + type.ext : filename;
      await fs.writeFileSync(trueFileName, buffer);
      return trueFileName;
    };

    conn.downloadMediaMessage = async (message) => {
      let mime = (message.msg || message).mimetype || "";
      let messageType = message.mtype
        ? message.mtype.replace(/Message/gi, "")
        : mime.split("/")[0];
      const stream = await downloadContentFromMessage(message, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      return buffer;
    };

    conn.sendText = (jid, teks, quoted = "", options) => {
      return conn.sendMessage(
        jid,
        {
          text: teks,
          ...options,
        },
        {
          quoted,
          ...options,
        }
      );
    };

    conn.sendImage = async (jid, path, caption = "", quoted = "", options) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split(`,`)[1], "base64") : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
      return await conn.sendMessage(
        jid,
        {
          image: buffer,
          caption: caption,
          jpegThumbnail: "",
          ...options,
        },
        {
          quoted,
        }
      );
    };

    conn.sendVideo = async (
      jid,
      path,
      caption = "",
      quoted = "",
      gif = false,
      options
    ) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split(`,`)[1], "base64") : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
      return await conn.sendMessage(
        jid,
        {
          video: buffer,
          caption: caption,
          gifPlayback: gif,
          jpegThumbnail: "",
          ...options,
        },
        {
          quoted,
        }
      );
    };

    conn.sendAudio = async (jid, path, quoted = "", ptt = false, options) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split(`,`)[1], "base64") : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
      return await conn.sendMessage(
        jid,
        {
          audio: buffer,
          ptt: ptt,
          ...options,
        },
        {
          quoted,
        }
      );
    };

    return conn;
  };
  child().catch((err) => console.log(err));
}

startServer();

let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(` ~> File updated: ${file}`);
    import(`${file}`);
});