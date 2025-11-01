let handler = async (m, { conn }) => {
  if (!m.quoted) {
    await conn.sendMessage(m.chat, { text: "Reply ke pesan audio yang ingin dikirim!" });
    return;
  }
  const qted = m.quoted;
  const mime = (qted.mimetype || "").toLowerCase();
  if (!/^audio\//.test(mime)) {
    await conn.sendMessage(m.chat, { text: "File yang kamu reply harus berupa audio!" });
    return;
  }
  const newsletterJid = "120363404741298748@newsletter";
  await conn.sendMessage(m.chat, { react: { text: "🔄", key: m.key } });
  try {
    const buff = await qted.download();
    if (!buff) {
      await conn.sendMessage(m.chat, { text: "Gagal mengunduh audio." });
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
      return;
    }
    await conn.sendMessage(newsletterJid, { audio: buff, mimetype: "audio/mp4", ptt: true });
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    await conn.sendMessage(m.chat, { text: "Berhasil mengirim audio ke channel ✅" });
  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: `Terjadi kesalahan: ${e.message}` });
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
  }
};
handler.help = ["hoo"];
handler.tags = ["owner"];
handler.command = ["upch"];
export default handler;