import util from "util"
import { downloadContentFromMessage } from "@whiskeysockets/baileys"

async function streamToBuffer(stream) {
  let buffer = Buffer.alloc(0)

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }

  return buffer
}

function cleanCode(text = "") {
  return String(text)
    .replace(/^```(?:js|javascript)?/i, "")
    .replace(/```$/i, "")
    .trim()
}

function getQuotedDocument(m) {
  const q = m.quoted

  if (!q) return null
  if (q.fileName && q.mimetype) return q

  return (
    q.documentMessage ||
    q.message?.documentMessage ||
    q.msg?.documentMessage ||
    q.fakeObj?.message?.documentMessage ||
    m.msg?.contextInfo?.quotedMessage?.documentMessage ||
    null
  )
}

function getQuotedText(m) {
  return (
    m.quoted?.text ||
    m.quoted?.body ||
    m.quoted?.caption ||
    m.quoted?.contentText ||
    ""
  )
}

async function runCode(code, sandbox) {
  const fn = new Function(
    "sandbox",
    `
    return (async () => {
      with (sandbox) {
        ${code}
      }
    })()
    `
  )

  return await fn(sandbox)
}

let handler = async (m, { conn, q, args, reply }) => {
  let code = ""
  const doc = getQuotedDocument(m)

  await conn.sendMessage(m.chat, {
    react: {
      text: "🐉",
      key: m.key
    }
  })

  if (doc) {
    const isJs =
      /\.js$/i.test(doc.fileName || "") ||
      doc.mimetype === "application/javascript" ||
      doc.mimetype === "text/javascript" ||
      doc.mimetype === "application/x-javascript"

    if (!isJs) {
      return reply("Reply file javascript (.js)")
    }

    try {
      const stream = await downloadContentFromMessage(doc, "document")
      const buffer = await streamToBuffer(stream)
      code = buffer.toString("utf8")
    } catch (e) {
      return reply(util.format(e))
    }
  } else {
    code = cleanCode(q || args.join(" ") || getQuotedText(m))
  }

  if (!code.trim()) {
    return reply("Reply file .js atau masukkan kode")
  }

  try {
    const baseScope = {
      conn,
      m,
      jid: m.chat,
      from: m.chat,
      chat: m.chat,
      sender: m.sender,
      quoted: m.quoted,
      text: q,
      body: m.body,
      args,
      q,
      reply,
      util,
      Buffer,
      console,
      fetch,
      process,
      global,
      globalThis,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval
    }

    const sandbox = new Proxy(baseScope, {
      has() {
        return true
      },

      get(target, prop) {
        if (prop === Symbol.unscopables) return undefined

        if (prop in target) return target[prop]
        if (prop in globalThis) return globalThis[prop]

        return conn
      },

      set(target, prop, value) {
        target[prop] = value
        return true
      }
    })

    let result = await runCode(code, sandbox)

    if (typeof result !== "string") {
      result = util.inspect(result, {
        depth: null
      })
    }

    return reply(result || "undefined")
  } catch (err) {
    return reply(util.format(err))
  }
}

handler.help = ["run"]
handler.tags = ["owner"]
handler.command = /^(run)$/i
handler.owner = true

export default handler