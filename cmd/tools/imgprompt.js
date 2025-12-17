import fs from "fs";
import fileType from "file-type";

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

const handler = async (m, plug) => {
  const { conn, reply, reaction, fetchJson } = plug;

  if (!m.quoted) {
    return reply("Reply gambar dengan caption .imgprompt");
  }

  const qmsg = m.quoted;
  const mime = (qmsg.msg || qmsg).mimetype || "";
  if (!/image/.test(mime)) {
    return reply("Yang direply harus gambar.");
  }

  if (!global.velynApiKey) {
    return reply("API key Velyn belum di-set di config.js.");
  }

  await reaction(m.chat, "⏳");

  try {
    const mediaPath = await conn.downloadAndSaveMediaMessage(qmsg);
    const buffer = fs.readFileSync(mediaPath);
    const url = await uploadToCatbox(buffer);
    fs.unlinkSync(mediaPath);

    if (!url || !url.startsWith("https://")) {
      return reply("Gagal mengupload gambar ke Catbox.");
    }

    const params = new URLSearchParams({
      apikey: global.velynApiKey,
      url
    });

    const apiUrl = "https://velyn.mom/api/tools/prompt?" + params.toString();
    const result = await fetchJson(apiUrl);

    if (!result || result.status !== 200 || !result.data || !result.data.prompt) {
      return reply("Gagal mengambil prompt dari API.");
    }

    const data = result.data;
    const text =
      "🖼️ IMAGE TO PROMPT\n\n" +
      "URL: " + (data.url || url) + "\n" +
      "Model: " + (data.model || "-") + "\n\n" +
      "Prompt:\n" + data.prompt + "\n\n" +
      "Powered by Fauzialifatah";

    return reply(text.trim());
  } catch (e) {
    return reply("Terjadi kesalahan: " + e.message);
  }
};

handler.command = ["imgprompt"];
handler.help = ["imgprompt"];
handler.tags = ["tools"];
handler.owner = false;

export default handler;