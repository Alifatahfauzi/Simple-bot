let handler = async (m) => {
  const lid =
    m.key?.participant ||
    m.participant ||
    m.key?.remoteJid?.endsWith("@lid")
      ? (m.key?.participant || m.participant || m.key?.remoteJid)
      : "-"

  const jid =
    m.key?.participantAlt ||
    m.key?.remoteJidAlt ||
    (
      typeof lid === "string" &&
      lid.endsWith("@lid")
        ? lid.replace("@lid", "@s.whatsapp.net")
        : "-"
    )

  return m.reply(
`*INFORMASI LID & JID*

JID : ${jid}
LID : ${lid}`
  )
}

handler.command = /^(who)$/i
handler.tags = ["tools"]
handler.help = ["who"]

export default handler