import fs from "fs";
import path from "path";

let handler = async (m, { conn }) => {
  const baseDir = "./cmd";
  const folders = fs.existsSync(baseDir) ? fs.readdirSync(baseDir).filter((x) => fs.statSync(path.join(baseDir, x)).isDirectory()) : [];

  const pickFirstCommand = (fileText) => {
    const t = String(fileText || "");

    const arrMatch = t.match(/handler\.command\s*=\s*\[([\s\S]*?)\]/);
    if (arrMatch && arrMatch[1]) {
      const first = arrMatch[1].match(/["'`]\s*([^"'`]+?)\s*["'`]/);
      return first ? first[1].trim() : null;
    }

    const singleMatch = t.match(/handler\.command\s*=\s*["'`]\s*([^"'`]+?)\s*["'`]/);
    if (singleMatch && singleMatch[1]) return singleMatch[1].trim();

    return null;
  };

  const groups = [];

  for (const folder of folders) {
    const dir = path.join(baseDir, folder);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js") && fs.statSync(path.join(dir, f)).isFile());

    const cmds = [];

    for (const f of files) {
      const full = path.join(dir, f);
      const txt = fs.readFileSync(full, "utf8");
      const c = pickFirstCommand(txt);
      if (c) cmds.push(c);
    }

    if (cmds.length) groups.push({ folder, cmds });
  }

  const lines = [];
  lines.push("Daftar Menu");
  lines.push("");

  if (!groups.length) {
    lines.push("Tidak ada fitur yang terdeteksi di folder cmd");
  } else {
    for (const g of groups) {
      lines.push(`「 ${g.folder} 」`);
      for (const c of g.cmds) lines.push(`- ${c}`);
      lines.push("");
    }
  }

  await conn.sendMessage(
    m.chat,
    {
      text: lines.join("\n").trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363404741298748@newsletter",
          newsletterName: "⤷ follow our channel"
        },
        externalAdReply: {
          title: "Simple About",
          body: `𖥻 ׁ ׅ ${global.namebotz} ! ׁ ׅ 🪷`,
          thumbnail: fs.readFileSync("./settings/image/image.jpg"),
          sourceUrl: "https://ziihost.store",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    },
    { quoted: null }
  );
};

handler.command = ["menu", "help"];
handler.help = ["menu", "help"];
handler.tags = ["main"];

export default handler;