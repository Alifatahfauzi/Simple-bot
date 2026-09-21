/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { conn }) => {
  let owners = global.owner || []

  let contacts = owners
    .filter(v => typeof v === "string" && !v.includes("@lid"))
    .map(v => v.replace(/[^0-9]/g, ""))
    .filter(v => v.length > 5)

  if (!contacts.length) {
    return m.reply("Owner tidak ditemukan di config")
  }

  let list = contacts.map(num => ({
    displayName: global.nameown,
    vcard: `BEGIN:VCARD
VERSION:3.0
N:;${global.nameown};;;
FN:${global.nameown}
TEL;type=CELL;type=VOICE;waid=${num}:${num}
END:VCARD`
  }))

  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: `${list.length} ${global.nameown}`,
        contacts: list
      }
    },
    { quoted: m }
  )
}

handler.help = ["owner"]
handler.tags = ["tools"]
handler.command = /^(owner|creator)$/i

export default handler