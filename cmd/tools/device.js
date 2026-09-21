/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi
*/

import { getDevice } from "@whiskeysockets/baileys"

let handler = async (m, { reply }) => {

  let id = m.quoted
    ? m.quoted.id
    : m.id

  let device = getDevice(id)

  let teks = `
*乂 D E V I C E - D E T E C T*

▢ Device :
${device}

▢ Message ID :
${id}
`.trim()

  reply(teks)
}

handler.help = ["device"]
handler.tags = ["tools"]
handler.command = /^(device)$/i

export default handler