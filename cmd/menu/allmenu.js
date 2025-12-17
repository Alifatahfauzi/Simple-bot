let handler = async (m, plug) => {
    const { conn, reply, args, prefix, pushName, sender } = plug;
    
    const category = args[0] ? args[0].toLowerCase() : null;
    const footerText = `© ᴄʀᴇᴅᴀᴛᴇ ʙʏ ғᴀᴜᴢɪᴀʟɪғᴀᴛᴀʜ.`;
    
    let headerContent;
    switch (category) {
        case 'asupan':  
            headerContent = `Hii @${sender.split("@")[0]}\n\n${global.asupan || '*Error:* Menu asupan tidak ditemukan.'}`;
            break;
        default:
            headerContent = "𝗌𝖾ᥣαꭑα𝗍 ᑯα𝗍α𐓣𝗀 ᑯ𝗂 ᑲⱺ𝗍 ωɦα𝗍𝗌αρρ 𝗄αꭑ𝗂, ᑯ𝗂 𝗌𝗂𐓣𝗂 ᑲⱺ𝗍 ωɦα𝗍𝗌αρρ 𝗌α𝗒α ꭑ𝖾𐓣𝗀𝗀υ𐓣α𝗄α𐓣 αρ𝗂, 𝗒α𐓣𝗀 ᑯ𝗂ꭑα𐓣α 𝗌𝖾ᥣυ𝗋υ ρ𝗋ⱺ𝗌𝖾𝗌 ᑲⱺ𝗍 ꭑ𝖾ᥣαᥣυ𝗂 ᑯα𝗋𝗂 ꭑ𝖾ꭑᑲα𝖼α ρ𝖾𝗌α𐓣 ᑯα𐓣 ꭑ𝖾ꭑᑲα𝖼α ρ𝖾𝗌α𐓣 ᑯα𐓣 ꭑ𝖾𐓣𝗃αᥣαᥣυ𝗂 ᑯα𝗋𝗂 ꭑ𝖾ꭑᑲα𝖼α ρ𝖾𝗌α𐓣 ᑯα𐓣 ꭑ𝖾𐓣𝗃αᥣα𐓣𝗄α𐓣 ρ𝗋𝗂𐓣𝗍αɦ, ɦ𝗂𐓣𝗀𝗀α ρ𝗋ⱺ𝗌𝖾𝗌 𝖿𝗂𝗍υ𝗋⋆.𐙚 ̊\n";
            break;
    }
    const staticSections = [
        {
            title: "Owner",
            rows: [
                {
                    title: global.nameown,
                    description: "love you",
                    id: "row_owner_static"
                }
            ]
        },
        {
            title: "Partner",
            rows: [
                {
                    title: "🗿",
                    description: "i-love",
                    id: "row_partner_static"
                }
            ]
        }
    ];

    const interactiveMessage = {
        header: headerContent,

        title: "┆ ₊𖥔 ℓo͟v͟ꫀ ყoυ ! ۪ ׄ໑୧ ׅ𖥔ׄ┆\n✎ *ⱺω𐓣𝖾𝗋:* 𝖿αυƶ𝗂αᥣ𝗂𝖿α𝗍αɦ\n ✎ *𝗌υρρⱺ𝗋𝗍:* .penyedia\n",
        
        footer: footerText,
        image: { url: "https://files.catbox.moe/lllfqj.jpg" },
        buttons: [
            {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                    title: "Tapp Haree!!!",
                    sections: staticSections,
                    has_multiple_buttons: true
                })
            },
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "copy code",
                    id: "123456789",
                    copy_code: "ABC123XYZ"
                })
            }
        ]
    };

    try {
        await conn.sendMessage(m.chat, { interactiveMessage: interactiveMessage }, { quoted: m });
    } catch (e) {
        console.error("Error sending interactive menu:", e);
        reply("Gagal menampilkan menu interaktif. Coba periksa log atau perbarui Baileys Anda.");
    }
};

handler.command = ['menu', 'asupan', 'maker']; 
handler.help = ['menu'];
handler.tags = ['system'];
handler.owner = false;

export default handler;