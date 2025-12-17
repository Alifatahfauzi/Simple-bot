let handler = async (m, { conn, text, args, prefix }) => {
    // k0nt01 tinggal eval => m.chat biar dapat newsletter lalu tempelkan ke sini agar bot share ke saluran kalian 
  const newsletterList = [
    "120363421657033758@newsletter",
    "120363314571321104@newsletter",
    "120363401569123262@newsletter",
    "120363419887861540@newsletter",
    "120363329570774649@newsletter"
  ];

  const input = (text && text.trim()) || args.join(' ').trim();

  if (!input || !input.includes("|")) {
    return conn.sendMessage(m.chat, {
      text: 'Format salah! Gunakan format:\n\n*.sharecode URL_GAMBAR|URL_TUJUAN|TEKS_TOMBOL*'
    }, { quoted: m });
  }

  const parts = input.split("|").map(x => x.trim());
  if (parts.length < 3 || parts.some(x => !x)) {
    return conn.sendMessage(m.chat, {
      text: `${prefix}sharecode url-image|link|teks-button`
    }, { quoted: m });
  }

  const [imageUrl, targetUrl, buttonText] = parts;

  const titleText = "> INFORMASI UPDATE \n> CLICK BUTTON\n";
  const footerText = "Created by: fauzialifatah";
  
  await conn.sendMessage(m.chat, { react: { text: '🔄', key: m.key } });

  try {
    const interactiveMessage = {
      interactiveMessage: {
        title: titleText,
        footer: footerText,
        image: { url: imageUrl },
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: buttonText,
              url: targetUrl
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "saluran🎉",
              url: `https://whatsapp.com/channel/0029Vb6j2u74NViqgNCLev3a`
            })
          }
        ]
      }
    };

    for (const id of newsletterList) {
      await conn.sendMessage(id, interactiveMessage);
      console.log(`✅ Dikirim ke: ${id}`);
      await new Promise(res => setTimeout(res, 1500));
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    await conn.sendMessage(m.chat, {
      text: `✅ Berhasil mengirim pesan ke ${newsletterList.length} saluran:\n${newsletterList.join("\n")}`
    });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, {
      text: `❌ Terjadi kesalahan saat mengirim ke saluran: ${e.message}`
    });
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.help = ['sharecode'];
handler.tags = ['owner'];
handler.command = ["sharecode"];

export default handler;