import fetch from "node-fetch"

async function getServers(iduser) {
    let url = global.domain + "/api/application/servers"
    if (iduser) {
        url += "?filter[user_id]=" + iduser
    }

    let res = await fetch(url, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + global.capikey
        }
    })

    let json = await res.json()
    if (!json.data) return []
    return json.data.map(v => v.attributes)
}

let handler = async (m, { args }) => {
    let iduser = args[0] || null
    let servers = await getServers(iduser)

    if (servers.length < 1) return m.reply("Server tidak ditemukan")

    let teks = servers.map(s => {
        return (
`🧾 ID Server : ${s.id}
🖥️ Nama      : ${s.name}
👤 ID User   : ${s.user}
⚙️ Status    : ${s.suspended ? "Suspended" : "Active"}`
        )
    }).join("\n\n")

    m.reply(
`📋 Daftar Server Panel

${teks}

© ${global.namebotz}`
    )
}

handler.command = ["cekidserver","listpanel"]
handler.owner = true
handler.tags = ["panel"]
handler.help = ["cekidserver [iduser]"]

export default handler