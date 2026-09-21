export default {
  name: 'ping',
  command: ['ping'],
  tags: ['main'],
  run: async (conn, m) => {
    await conn.sendMessage(m.chat, { text: 'Pong! Bot merespon dengan cepat.' }, { quoted: m })
  }
}