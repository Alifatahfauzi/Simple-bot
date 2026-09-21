/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

const replaceVars = async (text, m, conn) => {
  let name = m.pushName || "User"
  let date = new Date().toLocaleDateString("id-ID")
  let day = new Date().toLocaleDateString("id-ID", { weekday: "long" })
  let time = new Date().toLocaleTimeString("id-ID")

  let group = ""
  let desc = ""
  let size = "0"

  if (m.isGroup) {
    let meta = await conn.groupMetadata(m.chat).catch(() => null)
    if (meta) {
      group = meta.subject || ""
      desc = meta.desc || ""
      size = String(meta.participants.length || 0)
    }
  }

  let greeting = (() => {
    let h = new Date().getHours()
    if (h < 10) return "Selamat pagi"
    if (h < 15) return "Selamat siang"
    if (h < 18) return "Selamat sore"
    return "Selamat malam"
  })()

  return text
    .replace(/@name/gi, name)
    .replace(/@date/gi, date)
    .replace(/@day/gi, day)
    .replace(/@desc/gi, desc)
    .replace(/@group/gi, group)
    .replace(/@greeting/gi, greeting)
    .replace(/@size/gi, size)
    .replace(/@time/gi, time)
}