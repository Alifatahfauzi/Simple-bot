import "./settings/config.js"; 
import {
  makeWASocket,
  useMultiFileAuthState,
  jidDecode,
  DisconnectReason,
  downloadContentFromMessage,
  areJidsSameUser
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import { PassThrough } from "stream";
import readline from "readline";
import pino from "pino";
import chalk from "chalk";
import fs from "fs-extra";
import NodeCache from "node-cache";
import ffmpeg from "fluent-ffmpeg";
import fileType from "file-type";
import axios from "axios";
import * as jimp from "jimp";
import { spawn } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import { smsg } from "./source/myfunc.js";
const ff = ffmpeg;

global.mode = true;
global.sessionName = "session";

const asciiArt = () => {
  console.log(chalk.redBright(`
  
░█▀▀░ ░▀█▀░ ░█░█░ ░█▀▀░ ░█░
░█▀░░ ░█▀█░ ░█░█░ ░▄▀░░ ░█░
░█░░░ ░▀░▀░ ░▀▀▀░ ░▀▀▀░ ░▀░
  
`));
};

let rl = null;
const getRl = () => {
  if (!rl || rl.closed) {
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  }
  return rl;
};
const question = (text) => new Promise((resolve) => getRl().question(text, resolve));

const msgRetryCounterCache = new NodeCache();

const getBuffer = async (url, options = {}) => {
  try {
    const res = await axios({
      method: "get",
      url,
      headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
      responseType: "arraybuffer",
      ...options
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

const resize = async (imagePathOrUrl, width, height) => {
  let imageBuffer;
  if (/^https?:\/\//.test(imagePathOrUrl)) {
    const response = await axios.get(imagePathOrUrl, { responseType: "arraybuffer" });
    imageBuffer = response.data;
  } else {
    imageBuffer = await fs.readFile(imagePathOrUrl);
  }
  const read = await jimp.read(imageBuffer);
  return await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
};

let handleMessage;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const caserelog = path.resolve(__dirname, "./source/message.js");

async function relogfile() {
  try {
    const cacheBust = Date.now();
    const modulePath = pathToFileURL(caserelog).href;
    const module = await import(`${modulePath}?v=${cacheBust}`);
    if (typeof module.default !== "function") {
      throw new Error("Reload gagal: 'message.js' tidak mengekspor 'default' sebagai fungsi.");
    }
    handleMessage = module.default;
    console.log(chalk.greenBright(`message.js berhasil di-reload!`));
  } catch (err) {
    console.error(chalk.red(`Gagal me-reload'message.js`));
    console.error(err);
  }
}

async function startServer() {
  const child = async () => {
    process.on("unhandledRejection", (err) => console.error(err));
    process.on("uncaughtException", (err) => console.error(err));

    await relogfile();
    fs.watchFile(caserelog, relogfile);

    const { state, saveCreds } = await useMultiFileAuthState("./" + sessionName);
    const conn = makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: ["Linux", "Chrome", "20.0.00"],
      auth: state,
      msgRetryCounterCache,
      connectTimeoutMs: 60000,
      emitOwnEvents: true,
      fireInitQueries: true,
      generateHighQualityLinkPreview: true,
      syncFullHistory: true,
      markOnlineOnConnect: true
    });
    global.conn = conn;
    conn.ev.on("creds.update", saveCreds);

    if (!conn.authState.creds.registered) {
      asciiArt();
      const phoneNumber = global.pairingPhoneNumber;
      const customCode = global.customPairingCode;
      if (!phoneNumber || !customCode || customCode.length !== 8) {
          console.error(chalk.redBright("Pairing Code di config.js tidak valid."));
          console.error(chalk.redBright(`Nomor: ${phoneNumber || 'Kosong'}, Code: ${customCode || 'Kosong'} (harus 8 digit).`));
          process.exit(1);
          return;
      }
      console.log(chalk.cyan("╭──────────────────────────────────────···"));
      console.log(`📱 ${chalk.redBright("Nomor yang akan di-pair")}: ${chalk.cyan(phoneNumber)}`);
      console.log(chalk.cyan("├──────────────────────────────────────···"));
      await new Promise(resolve => setTimeout(resolve, 3000));
      const codeResult = await conn.requestPairingCode(phoneNumber, customCode);
      const displayCode = codeResult?.match(/.{1,4}/g)?.join("-") || codeResult;
      console.log(`  ${chalk.yellow("Pairing code:")} Masukkan kode ${chalk.cyan.bold(displayCode)}.`);
      console.log(chalk.cyan("╰──────────────────────────────────────···"));
      
      if (rl && !rl.closed) rl.close();
    }

	conn.ev.on("messages.upsert", async (chatUpdate) => {
      try {
        let m = chatUpdate.messages[0];
        if (!m?.message) return;
        m.message = Object.keys(m.message)[0] === "ephemeralMessage" ? m.message.ephemeralMessage.message : m.message;
        if (m.key.remoteJid === "status@broadcast") return;
        if (!conn.public && !m.key.fromMe && chatUpdate.type === "notify") return;
        if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
        m = smsg(conn, m);
        if (handleMessage) {
          await handleMessage(conn, m, chatUpdate);
        } else {
          console.error(chalk.red("Handle message tidak terdefinisi. Periksa error di 'message.js'."));
        }
      } catch (err) {
        if (err.message && err.message.includes("Bad MAC")) {
          console.log(chalk.yellow("[INFO] Menerima error Bad MAC, pesan diabaikan (normal)."));
        } else {
          console.error(chalk.red("[ERROR MESSAGE]"), err);
        }
      }
    });

    conn.decodeJid = (jid) => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
      } else return jid;
    };

    conn.public = mode;
    conn.serializeM = (m) => smsg(conn, m);

conn.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;

        console.log("Koneksi terputus:", reason);

        const errorList = [
            DisconnectReason.connectionLost,
            DisconnectReason.connectionReplaced,
            DisconnectReason.restartRequired,
            DisconnectReason.timedOut,
            405,
            408,
            410,
            500,
            503
        ];

        if (errorList.includes(reason)) {
            console.log("Mencoba menyambung ulang tanpa menghapus session...");
            await startServer();
            return;
        }

        console.log("Menyambung ulang secara paksa...");
        const { spawn } = await import("child_process");
        spawn(process.argv[0], [process.argv[1]], {
            stdio: "inherit",
            detached: true
        }).unref();
        process.exit(0);
    }

    if (connection === "open") {
        await loadConnect(conn);
        console.log("Bot berhasil tersambung.");
    }
});
    
conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
  try {
    const quoted = message.msg ? message.msg : message;
    const mime = (message.msg || message).mimetype || "";
    const messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];

    const Randoms = Date.now();
    const name = filename || `file_${Randoms}`;

    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    const type = await fileType.fromBuffer(buffer);
    const ext = type?.ext || "bin";

    const finalName = attachExtension ? `${name}.${ext}` : name;

    fs.writeFileSync(finalName, buffer);

    return finalName;
  } catch (err) {
    console.error("Error saat download media:", err);
    return null;
  }
};

    conn.sendText = (jid, teks, quoted = "", options = {}) => conn.sendMessage(jid, { text: teks, ...options }, { quoted, ...options });

    conn.sendImage = async (jid, path, caption = "", quoted = "", options = {}) => {
      const buffer = Buffer.isBuffer(path)
        ? path
        : /^https?:\/\//.test(path)
        ? await getBuffer(path)
        : fs.existsSync(path)
        ? fs.readFileSync(path)
        : Buffer.alloc(0);
      return await conn.sendMessage(jid, { image: buffer, caption, ...options }, { quoted });
    };

    conn.sendAudio = async (jid, buff, options = {}) => {
        async function downloadAudio(input) {
            if (Buffer.isBuffer(input)) return input;
            if (typeof input === 'string' && (input.startsWith('http') || input.startsWith('https'))) {
                const response = await axios.get(input, { 
                    responseType: 'arraybuffer',
                    timeout: 30000
                });
                return Buffer.from(response.data);
            } else if (typeof input === 'string') {
                return fs.readFileSync(input);
            } else {
                throw new Error('Input harus Buffer, URL, atau path file');
            }
        }
        
        const audioBuffer = await downloadAudio(buff);
        const opusBuffer = await new Promise((resolve, reject) => {
            const inStream = new PassThrough();
            const outStream = new PassThrough();
            const chunks = [];
            inStream.end(audioBuffer);
            ff(inStream)
                .noVideo()
                .audioCodec('libopus')
                .format('ogg')
                .audioBitrate('48k')
                .audioChannels(1)
                .audioFrequency(48000)
                .outputOptions([
                    '-vn',
                    '-b:a 64k',
                    '-ac 2',
                    '-ar 48000',
                    '-map_metadata', '-1',
                    '-application', 'voip'
                ])
                .on('error', reject)
                .on('end', () => resolve(Buffer.concat(chunks)))
                .pipe(outStream, { end: true });
            outStream.on('data', c => chunks.push(c));
        });
        
        const waveform = await new Promise((resolve, reject) => {
            const inputStream = new PassThrough();
            inputStream.end(audioBuffer);
            const chunks = [];
            const bars = 64;
            ff(inputStream)
                .audioChannels(1)
                .audioFrequency(16000)
                .format('s16le')
                .on('error', reject)
                .on('end', () => {
                    const rawData = Buffer.concat(chunks);
                    const samples = rawData.length / 2;
                    const amplitudes = [];
                    
                    for (let i = 0; i < samples; i++) {
                        amplitudes.push(Math.abs(rawData.readInt16LE(i * 2)) / 32768);
                    }
                    
                    const blockSize = Math.floor(amplitudes.length / bars);
                    const avg = [];
                    for (let i = 0; i < bars; i++) {
                        const block = amplitudes.slice(i * blockSize, (i + 1) * blockSize);
                        avg.push(block.reduce((a, b) => a + b, 0) / block.length);
                    }
                
                    const max = Math.max(...avg);
                    const normalized = avg.map(v => Math.floor((v / max) * 100));
                    resolve(Buffer.from(new Uint8Array(normalized)).toString('base64'));
                })
                .pipe()
                .on('data', chunk => chunks.push(chunk));
        });
        
        return await conn.sendMessage(jid, {
            audio: opusBuffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: options.ptt !== undefined ? options.ptt : true,
            waveform: waveform
        }, {
            quoted: options.quoted,
            ephemeralExpiration: options.ephemeralExpiration,
            contextInfo: options.contextInfo
        });
    };

    conn.sendVideo = async (jid, path, caption = "", quoted = "", gif = false, options = {}) => {
      const buffer = Buffer.isBuffer(path)
        ? path
        : /^https_?:\/\//.test(path)
        ? await getBuffer(path)
        : fs.existsSync(path)
        ? fs.readFileSync(path)
        : Buffer.alloc(0);
      return await conn.sendMessage(jid, { video: buffer, caption, gifPlayback: gif, ...options }, { quoted });
    };

    return conn;
  };
  await child();
}

startServer();

fs.watchFile(__filename, () => {
  console.log(chalk.redBright(`📦 File ${__filename} berubah, restart bot...`));
  spawn(process.argv[0], [__filename], { stdio: "inherit" });
  process.exit();
});
