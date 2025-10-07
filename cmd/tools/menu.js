import "../../settings/config.js";

let handler = async (m, { conn, runtime, pushName, prefix }) => {
    const user = global.db.users[m.sender];
    const text = `*Halo ${pushName}🪸!* \nSaya adalah asisten ${global.namebotz} otomatis, siap membantu Anda dengan informasi dan jawaban yang Anda cari
    
▢ runtime: ${runtime(process.uptime())}
▢ role: ${user.role}
▢ limit: ${user.limit === Infinity ? '∞' : user.limit}
▢ total command: ${user.command}

command:
 ▢ ${prefix}eval
 ▢ ${prefix}runtime
`;
    const footer = `${global.footer}`;
    const image1 = `https://files.catbox.moe/y9rs67.jpg`;
    const image2 = `https://files.catbox.moe/y9rs67.jpg`;
    const btnklick = "Assisten";

    const buttonData = [
        {
            title: `${global.nameown}`,
            description: `${global.namebotz}`,
            id: '.rt'
        }
    ];
    await conn.sendButton(m.chat, text, footer, btnklick, image1, image2, buttonData, m);
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ["menu"];
handler.limit = 1;

export default handler;
