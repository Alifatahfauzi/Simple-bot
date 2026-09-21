const decorate = (conn) => {

  // react message
  conn.react = async (m, emoji) => {
    return await conn.sendMessage(m.chat, {
      react: {
        text: emoji,
        key: m.key
      }
    })
  }

  // kirim sticker dari buffer/url/path
  conn.sendImageAsSticker = async (jid, buffer, quoted, options = {}) => {
    return await conn.sendMessage(jid, {
      sticker: buffer
    }, { quoted, ...options })
  }

  conn.sendVideoAsSticker = async (jid, buffer, quoted, options = {}) => {
    return await conn.sendMessage(jid, {
      sticker: buffer
    }, { quoted, ...options })
  }

  return conn
}

export default decorate