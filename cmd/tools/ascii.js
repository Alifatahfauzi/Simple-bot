/* 
 - Credate by fauzialifatah 
 - wa.me/6282199509537
 - github: https://github.com/Alifatahfauzi

*/

let handler = async (m, { args, reply }) => {
  if (!args.length) return reply("Masukkan teks atau angka ASCII")

  let input = args.join(" ")

  if (/^[0-9,\s]+$/.test(input)) {
    let numbers = input
      .split(/[,\s]+/)
      .map(x => parseInt(x))
      .filter(x => !isNaN(x))

    if (!numbers.length) return reply("Format ASCII tidak valid")

    let result = String.fromCharCode(...numbers)
    return reply(`Decode:\n${result}`)
  }

  let result = [...input].map(c => c.charCodeAt(0))
  return reply(`Encode:\n${result.join(", ")}`)
}

handler.help = ["ascii"]
handler.tags = ["tools"]
handler.command = /^(ascii)$/i

export default handler