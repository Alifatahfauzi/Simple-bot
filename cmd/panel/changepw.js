import fetch from "node-fetch"

async function getUser(id) {
    let res = await fetch(
        global.domain + "/api/application/users/" + id,
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + global.capikey
            }
        }
    )

    let json = await res.json().catch(() => null)
    if (!json || !json.attributes) return null
    return json.attributes
}

let handler = async (m, { args }) => {
    let text = args.join(" ")
    if (!text) return m.reply("Format:\n.changepw iduser,passwordbaru")

    let [iduser, password] = text.split(",")
    if (!iduser || !password) {
        return m.reply("Format:\n.changepw iduser,passwordbaru")
    }

    let user = await getUser(iduser)
    if (!user) return m.reply("User panel tidak ditemukan")

    let res = await fetch(
        global.domain + "/api/application/users/" + iduser,
        {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + global.capikey
            },
            body: JSON.stringify({
                email: user.email,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                language: user.language || "en",
                password: password
            })
        }
    )

    let json = await res.json().catch(() => null)
    if (json && json.errors) {
        return m.reply(json.errors[0].detail)
    }

    m.reply(
`✅ Password Berhasil Diganti

🧾 ID User : ${user.id}
👤 Username : ${user.username}
🔐 Password Baru : ${password}

© ${global.namebotz}`
    )
}

handler.command = ["changepw","gantipw"]
handler.owner = true
handler.tags = ["panel"]
handler.help = ["changepw iduser,password"]

export default handler