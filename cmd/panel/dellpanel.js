import fetch from "node-fetch"

async function getServer(id) {
    let res = await fetch(
        global.domain + "/api/application/servers/" + id,
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + global.capikey
            }
        }
    )
    let json = await res.json()
    return json.attributes
}

async function getUserServers(userId) {
    let res = await fetch(
        global.domain + "/api/application/servers?filter[user_id]=" + userId,
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + global.capikey
            }
        }
    )
    let json = await res.json()
    return json.data || []
}

async function deleteUser(userId) {
    await fetch(
        global.domain + "/api/application/users/" + userId,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + global.capikey
            }
        }
    )
}

let handler = async (m, { args }) => {
    let id = args[0]
    if (!id) return m.reply("Format:\n.delpanel idserver")

    let server
    try {
        server = await getServer(id)
    } catch {
        return m.reply("Server tidak ditemukan")
    }

    let userId = server.user

    let del = await fetch(
        global.domain + "/api/application/servers/" + id + "?force=true",
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + global.capikey
            }
        }
    )

    if (del.status !== 204) {
        let err = await del.json().catch(() => null)
        if (err && err.errors) {
            return m.reply(err.errors[0].detail || "Gagal menghapus panel")
        }
        return m.reply("Gagal menghapus panel")
    }

    let serversLeft = await getUserServers(userId)

    let teks =
`✅ Panel Berhasil Dihapus
🧾 ID Server : ${id}`

    if (serversLeft.length === 0) {
        await deleteUser(userId)
        teks += `

👤 User ID ${userId} otomatis dihapus
karena tidak memiliki panel lagi`
    } else {
        teks += `

👤 User ID ${userId} masih memiliki ${serversLeft.length} panel`
    }

    teks += `

© ${global.namebotz}`

    m.reply(teks)
}

handler.command = ["delpanel","delserver"]
handler.owner = true
handler.tags = ["panel"]
handler.help = ["delpanel idserver"]

export default handler