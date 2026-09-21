let handler = async (m, { conn }) => {

  const id = conn.decodeJid(conn.user.id)
  const settings = global.db.data.settings[id]

  const status = v => v ? "🟢 ON" : "🔴 OFF"

  const text =
`*乂 S E T T I N G - B O T*

▢ Self : ${status(settings.self)}
▢ Maintenance : ${status(settings.maintenance)}
▢ Autoread : ${status(settings.autoread)}
▢ Autotyping : ${status(settings.autotyping)}`

  await conn.sendButton(
    m.chat,
    text,
    global.footer,
    [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "Pengaturan Bot",
          sections: [
            {
              title: "SELF MODE",
              rows: [
                {
                  title: "Self ON",
                  description: "Aktifkan self mode",
                  id: ".self"
                },
                {
                  title: "Self OFF",
                  description: "Matikan self mode",
                  id: ".public"
                }
              ]
            },
            {
              title: "MAINTENANCE",
              rows: [
                {
                  title: "Maintenance ON",
                  description: "Aktifkan maintenance",
                  id: ".maintenance on"
                },
                {
                  title: "Maintenance OFF",
                  description: "Matikan maintenance",
                  id: ".maintenance off"
                }
              ]
            },
            {
              title: "AUTOREAD",
              rows: [
                {
                  title: "Autoread ON",
                  description: "Aktifkan autoread",
                  id: ".autoread on"
                },
                {
                  title: "Autoread OFF",
                  description: "Matikan autoread",
                  id: ".autoread off"
                }
              ]
            },
            {
              title: "AUTOTYPING",
              rows: [
                {
                  title: "Autotyping ON",
                  description: "Aktifkan autotyping",
                  id: ".autotyping on"
                },
                {
                  title: "Autotyping OFF",
                  description: "Matikan autotyping",
                  id: ".autotyping off"
                }
              ]
            }
          ]
        })
      }
    ],
    {
      image: global.thumbnail,
      quoted: m
    }
  )
}

handler.command = /^(statusbot)$/i
handler.private = true
handler.owner = true
handler.tags = ["owner"]
handler.help = ["statusbot"]

export default handler