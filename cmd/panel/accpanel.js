let handler = async (m, { conn, args }) => {
    let text = args.join(" ")
    if (!text) return m.reply("Contoh penggunaan:\n.panel nama,628xxxx")

    let split = text.split(",")
    if (split.length < 2) return m.reply("Format salah\n.panel nama,628xxxx")

    let nama = split[0].trim().toLowerCase()
    let nomor = split[1].replace(/[^0-9]/g, "")
    let target = nomor + "@s.whatsapp.net"

    await conn.sendMessage(
        m.chat,
        {
            text: `Silakan pilih paket panel untuk *${nama}*`,
            footer: global.namebotz,
            buttons: [
                {
                    buttonId: "panel_select",
                    buttonText: { displayText: "Pilih Paket Panel" },
                    type: 4,
                    nativeFlowInfo: {
                        name: "single_select",
                        paramsJson: JSON.stringify({
                            title: "Pilih paket panel pterodactyl",
                            sections: [
                                {
                                    title: "Paket Panel VPS",
                                    highlight_label: "🔥",
                                    rows: [
                                        {
                                            header: "Panel 1GB",
                                            title: "1GB RAM",
                                            description: "Disk 1GB • CPU 40%",
                                            id: `.1gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 2GB",
                                            title: "2GB RAM",
                                            description: "Disk 1GB • CPU 60%",
                                            id: `.2gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 3GB",
                                            title: "3GB RAM",
                                            description: "Disk 2GB • CPU 80%",
                                            id: `.3gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 4GB",
                                            title: "4GB RAM",
                                            description: "Disk 2GB • CPU 100%",
                                            id: `.4gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 5GB",
                                            title: "5GB RAM",
                                            description: "Disk 3GB • CPU 120%",
                                            id: `.5gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 6GB",
                                            title: "6GB RAM",
                                            description: "Disk 3GB • CPU 140%",
                                            id: `.6gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 7GB",
                                            title: "7GB RAM",
                                            description: "Disk 4GB • CPU 160%",
                                            id: `.7gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 8GB",
                                            title: "8GB RAM",
                                            description: "Disk 4GB • CPU 180%",
                                            id: `.8gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 9GB",
                                            title: "9GB RAM",
                                            description: "Disk 5GB • CPU 200%",
                                            id: `.9gb ${nama},${nomor}`
                                        },
                                        {
                                            header: "Panel 10GB",
                                            title: "10GB RAM",
                                            description: "Disk 5GB • CPU 220%",
                                            id: `.10gb ${nama},${nomor}`
                                        }
                                    ]
                                }
                            ]
                        })
                    }
                }
            ],
            headerType: 1,
            viewOnce: true
        },
        { quoted: m }
    )
}

handler.command = ["panel"]
handler.owner = true
handler.tags = ["panel"]
handler.help = ["panel nama,628xxxx"]

export default handler