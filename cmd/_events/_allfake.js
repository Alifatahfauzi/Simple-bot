let handler = (m) => m

handler.before = async function (m) {
  if (!m.message) return true

  let text = m.body || m.text || ""

  m.fakeObj = {
    key: {
      fromMe: false,
      participant: m.sender,
      remoteJid: "status@broadcast"
    },
    message: {
      conversation: text
    }
  }

  return true
}

export default handler