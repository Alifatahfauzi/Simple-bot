/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  const jid =
    (m.mentionedJid && m.mentionedJid[0]) ||
    (m.quoted && m.quoted.sender) ||
    m.sender

  try {
    const url = await conn.profilePictureUrl(jid, "image")

    return await conn.sendMessage(
      m.chat,
      {
        image: { url },
        caption: "Foto profil"
      },
      { quoted: m }
    )
  } catch {
    return m.reply("Foto profil tidak tersedia atau disembunyikan.")
  }
}

handler.command = /^(getpp)$/i
handler.tags = ["tools"]
handler.help = ["getpp"]

export default handler