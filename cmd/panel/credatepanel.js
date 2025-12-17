import fetch from "node-fetch"
import crypto from "crypto"

let handler = async (m, { conn, args, command }) => {
    let text = args.join(" ")
    if (!text) return m.reply("Contoh: .1gb nama,628xxxx")

    let split = text.split(",")
    if (split.length < 2) return m.reply("Contoh: .1gb nama,628xxxx")

    let baseUsername = split[0].toLowerCase()
    let nomor = split[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"

    let onWa = await conn.onWhatsApp(nomor.split("@")[0])
    if (onWa.length < 1) return m.reply("Nomor target tidak terdaftar di WhatsApp")

    let paket = {
        "1gb": { ram: 1024, disk: 1024, cpu: 40 },
        "2gb": { ram: 2048, disk: 1024, cpu: 60 },
        "3gb": { ram: 3072, disk: 2048, cpu: 80 },
        "4gb": { ram: 4096, disk: 2048, cpu: 100 },
        "5gb": { ram: 5120, disk: 3072, cpu: 120 },
        "6gb": { ram: 6144, disk: 3072, cpu: 140 },
        "7gb": { ram: 7168, disk: 4096, cpu: 160 },
        "8gb": { ram: 8192, disk: 4096, cpu: 180 },
        "9gb": { ram: 9216, disk: 5120, cpu: 200 },
        "10gb": { ram: 10240, disk: 5120, cpu: 220 }
    }

    let spec = paket[command.toLowerCase()]
    if (!spec) return

    let username = baseUsername
    let email = username + "_" + Date.now() + "@mail.com"
    let password = username + crypto.randomBytes(3).toString("hex")
    let name = username.charAt(0).toUpperCase() + username.slice(1) + " shamiru"

    async function createUser(uname, mail, pass, fname) {
        let res = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + global.apikey
            },
            body: JSON.stringify({
                email: mail,
                username: uname,
                first_name: fname,
                last_name: "Server",
                language: "en",
                password: pass
            })
        })
        return await res.json()
    }

    let userJson = await createUser(username, email, password, name)

    if (userJson.errors && userJson.errors[0].meta?.rule === "unique") {
        username = baseUsername + crypto.randomBytes(2).toString("hex")
        email = username + "_" + Date.now() + "@mail.com"
        password = username + crypto.randomBytes(3).toString("hex")
        name = username.charAt(0).toUpperCase() + username.slice(1) + " shamiru"
        userJson = await createUser(username, email, password, name)
    }

    if (userJson.errors) return m.reply(userJson.errors[0].detail)

    let userId = userJson.attributes.id

    let eggReq = await fetch(
        global.domain + `/api/application/nests/${global.nestid}/eggs/${global.egg}`,
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + global.apikey
            }
        }
    )

    let eggJson = await eggReq.json()
    let startupTemplate = eggJson.attributes.startup

    let serverReq = await fetch(global.domain + "/api/application/servers", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + global.apikey
        },
        body: JSON.stringify({
            name: name,
            description: new Date().toLocaleDateString("id-ID"),
            user: userId,
            egg: parseInt(global.egg),
            docker_image: "docker.io/bionicc/nodejs-wabot:latest",
            startup: startupTemplate,
            environment: {
                STARTUP_CMD: startupTemplate
            },
            limits: {
                memory: spec.ram,
                swap: 0,
                disk: spec.disk,
                io: 500,
                cpu: spec.cpu
            },
            feature_limits: {
                databases: 5,
                backups: 5,
                allocations: 5
            },
            deploy: {
                locations: [parseInt(global.loc)],
                dedicated_ip: false,
                port_range: []
            }
        })
    })

    let serverJson = await serverReq.json()
    if (serverJson.errors) return m.reply(serverJson.errors[0].detail)

    let serverId = serverJson.attributes.id
    
await conn.sendMessage(nomor, {
    interactiveMessage: {
        header:
`✅ AKUN PANEL BERHASIL DIBUAT

💾 RAM  : ${spec.ram / 1024} GB
📀 Disk : ${spec.disk / 1024} GB
⚙️ CPU  : ${spec.cpu} %

${global.domain}`,
        footer: global.namebotz,
        buttons: [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "📋 Copy Username",
                    id: String(serverId),
                    copy_code: username
                })
            },
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "📋 Copy Password",
                    id: String(serverId),
                    copy_code: password
                })
            }
        ]
    }
}, { quoted: m })

    await m.reply("Berhasil membuat akun panel")
}

handler.command = [
    "1gb","2gb","3gb","4gb","5gb",
    "6gb","7gb","8gb","9gb","10gb"
]
handler.owner = true
handler.tags = ["panel"]
handler.help = ["1gb","2gb","3gb","4gb","5gb","6gb","7gb","8gb","9gb","10gb"]

export default handler