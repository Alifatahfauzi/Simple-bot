/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args, reply }) => {
  if (args.length < 3) {
    return reply("contoh:\n.translate en id I love you")
  }

  let source = args[0]
  let target = args[1]
  let text = args.slice(2).join(" ")

  let url = `https://api.siputzx.my.id/api/tools/translate?text=${encodeURIComponent(text)}&source=${encodeURIComponent(source)}&target=${encodeURIComponent(target)}`

  let res = await fetch(url).catch(() => null)
  if (!res || !res.ok) return reply("gagal mengambil data api")

  let json = await res.json().catch(() => null)
  if (!json) return reply("respon api tidak valid")

  let result = json.data

  if (typeof result === "object" && result !== null) {
    result =
      result.translatedText ||
      result.translation ||
      result.result ||
      result.text ||
      Object.values(result)[0]
  }

  if (!result) return reply("hasil translate tidak ditemukan")

  return reply(
    `*T R A N S L A T E*\n\n` +
    `*Source:* ${source}\n` +
    `*Target:* ${target}\n` +
    `*Text:* ${text}\n` +
    `*Result:* ${result}`
  )
}

handler.help = ["translate <source> <target> <text>"]
handler.tags = ["tools"]
handler.command = /^(translate|tr)$/i

export default handler