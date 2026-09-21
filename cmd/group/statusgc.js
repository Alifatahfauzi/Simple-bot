let handler = async (m, { conn }) => {
  const chat = global.db.data.chats[m.chat]

  const status = v => v ? "🟢 ON" : "🔴 OFF"

  const text =
`*STATUS GROUP*

▢ Welcome : ${status(chat.welcome)}
▢ Antilink : ${status(chat.antilink)}
▢ Antitagall : ${status(chat.antitagall)}
▢ Antihidetag : ${status(chat.antihidetag)}
▢ Antimedia : ${status(chat.antimedia)}
▢ AntiPromosi : ${status(chat.antipromosi)}
▢ Antiyt : ${status(chat.antiyoutube)}
▢ Antiig : ${status(chat.antiig)}
▢ Antifb : ${status(chat.antifb)}
▢ Antitt : ${status(chat.antitt)}`

  await conn.sendButton(
    m.chat,
    text,
    global.footer,
    [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "Pengaturan Group",
          sections: [
            {
              title: "WELCOME",
              rows: [
                { title: "Welcome ON",  description: "Aktifkan welcome", id: ".welcome on"  },
                { title: "Welcome OFF", description: "Matikan welcome",  id: ".welcome off" }
              ]
            },
            {
              title: "ANTILINK",
              rows: [
                { title: "Antilink ON",  description: "Aktifkan antilink", id: ".antilink on"  },
                { title: "Antilink OFF", description: "Matikan antilink",  id: ".antilink off" }
              ]
            },
            {
              title: "ANTITAGALL",
              rows: [
                { title: "Antitagall ON",  description: "Aktifkan antitagall", id: ".antitagall on"  },
                { title: "Antitagall OFF", description: "Matikan antitagall",  id: ".antitagall off" }
              ]
            },
            {
              title: "ANTIHIDETAG",
              rows: [
                { title: "Antihidetag ON",  description: "Aktifkan antihidetag", id: ".antihidetag on"  },
                { title: "Antihidetag OFF", description: "Matikan antihidetag",  id: ".antihidetag off" }
              ]
            },
            {
              title: "ANTIMEDIA",
              rows: [
                { title: "Antimedia ON",  description: "Aktifkan antimedia", id: ".antimedia on"  },
                { title: "Antimedia OFF", description: "Matikan antimedia",  id: ".antimedia off" }
              ]
            },
            {
              title: "ANTIPROMOSI",
              rows: [
                { title: "Antipromosi ON",  description: "Aktifkan antipromosi", id: ".antipromosi on"  },
                { title: "Antipromosi OFF", description: "Matikan antipromosi",  id: ".antipromosi off" }
              ]
            },
            {
              title: "ANTIYOUTUBE",
              rows: [
                { title: "Antiyt ON",  description: "Aktifkan anti youtube", id: ".antiyoutube on"  },
                { title: "Antiyt OFF", description: "Matikan anti youtube",  id: ".antiyoutube off" }
              ]
            },
            {
              title: "ANTIINSTAGRAM",
              rows: [
                { title: "Antiig ON",  description: "Aktifkan anti instagram", id: ".antiig on"  },
                { title: "Antiig OFF", description: "Matikan anti instagram",  id: ".antiig off" }
              ]
            },
            {
              title: "ANTIFACEBOOK",
              rows: [
                { title: "Antifb ON",  description: "Aktifkan anti facebook", id: ".antifb on"  },
                { title: "Antifb OFF", description: "Matikan anti facebook",  id: ".antifb off" }
              ]
            },
            {
              title: "ANTITIKTOK",
              rows: [
                { title: "Antitt ON",  description: "Aktifkan anti tiktok", id: ".antitt on"  },
                { title: "Antitt OFF", description: "Matikan anti tiktok",  id: ".antitt off" }
              ]
            }
          ]
        })
      }
    ],
    { quoted: m }
  )
}

handler.command = /^(statusgc)$/i
handler.group   = true
handler.admin   = true
handler.tags    = ["group"]
handler.help    = ["statusgc"]

export default handler