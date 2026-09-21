import fs from "fs"
import axios from "axios"
import sharp from "sharp"
import crypto from "crypto"
import { generateWAMessageFromContent } from "@whiskeysockets/baileys"

class ButtonV2 {
  #client

  constructor(client) {
    if (!client) throw new Error("Socket is required")
    this.#client = client
    this._title = ""
    this._subtitle = ""
    this._body = ""
    this._footer = ""
    this._contextInfo = {}
    this._extraPayload = {}
    this._image = undefined
    this._data = undefined
    this._buttons = []
    this._currentSelectionIndex = -1
    this._currentSectionIndex = -1
  }

  setTitle(title)       { this._title = title;       return this }
  setSubtitle(subtitle) { this._subtitle = subtitle; return this }
  setBody(body)         { this._body = body;         return this }
  setFooter(footer)     { this._footer = footer;     return this }

  setContextInfo(obj) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj))
      throw new TypeError("ContextInfo must be a plain object")
    this._contextInfo = obj
    return this
  }

  addPayload(obj) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj))
      throw new TypeError("Payload must be a plain object")
    Object.assign(this._extraPayload, obj)
    return this
  }

  setThumbnail(path) {
    if (!path) throw new Error("Url, path, or buffer needed")
    this._image = path
    return this
  }

  setMedia(obj) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj))
      throw new TypeError("Media must be a plain object")
    this._data = obj
    return this
  }

  addButton(displayText = "", buttonId = crypto.randomUUID()) {
    this._buttons.push({ buttonId, buttonText: { displayText }, type: 1 })
    return this
  }

  addRawButton(obj) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj))
      throw new TypeError("Button must be a plain object")
    this._buttons.push(obj)
    return this
  }

  // --- Single select (list) button helpers ---

  addSelection(displayText = "", buttonId = crypto.randomUUID(), title = "", options = {}) {
    this._buttons.push({
      buttonText: { displayText },
      buttonId,
      type: 1,
      nativeFlowInfo: {
        name: "single_select",
        paramsJson: JSON.stringify({ title, sections: [], ...options })
      }
    })
    this._currentSelectionIndex = this._buttons.length - 1
    this._currentSectionIndex = -1
    return this
  }

  makeSection(title = "", highlight_label = "") {
    if (this._currentSelectionIndex === -1)
      throw new Error("You need to create a selection first (call addSelection)")

    const btn = this._buttons[this._currentSelectionIndex]
    const params = JSON.parse(btn.nativeFlowInfo.paramsJson)
    params.sections.push({ title, highlight_label, rows: [] })
    btn.nativeFlowInfo.paramsJson = JSON.stringify(params)
    this._currentSectionIndex = params.sections.length - 1
    return this
  }

  makeRow(header = "", title = "", description = "", id = "") {
    if (this._currentSelectionIndex === -1 || this._currentSectionIndex === -1)
      throw new Error("You need to create a selection and a section first (call addSelection then makeSection)")

    const btn = this._buttons[this._currentSelectionIndex]
    const params = JSON.parse(btn.nativeFlowInfo.paramsJson)
    params.sections[this._currentSectionIndex].rows.push({ header, title, description, id })
    btn.nativeFlowInfo.paramsJson = JSON.stringify(params)
    return this
  }

  async resize(buffer, x, y, fit = 'cover') {
    return await sharp(buffer)
      .resize(x, y, {
        fit,
        position: 'center',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
  }

  async build(jid, options = {}) {
    let _thumbnail = null
    
    if (this._image) {
      let buffer
      if (Buffer.isBuffer(this._image)) {
        buffer = this._image
      } else if (typeof this._image === "string" && (this._image.startsWith("http://") || this._image.startsWith("https://"))) {
        buffer = (await axios.get(this._image, { responseType: "arraybuffer" })).data
      } else {
        // Mengambil gambar dari local path
        buffer = await fs.promises.readFile(this._image)
      }
        
      _thumbnail = await this.resize(buffer, 300, 300)
    }

    return generateWAMessageFromContent(
      jid,
      {
        ...this._extraPayload,
        buttonsMessage: {
          contentText: this._body,
          footerText: this._footer,

          ...(this._data
            ? this._data
            : {
                headerType: 6,
                locationMessage: {
                  degreesLatitude: 0,
                  degreesLongitude: 0,
                  name: this._title,
                  address: this._subtitle,
                  jpegThumbnail: _thumbnail
                }
              }),

          contextInfo: {
            ...(options.quoted
              ? {
                  stanzaId: options.quoted.key.id,
                  participant: options.quoted.sender,
                  remoteJid: options.quoted.chat,
                  quotedMessage: options.quoted.message
                }
              : {}),

            ...this._contextInfo
          },

          buttons: [...this._buttons]
        }
      },
      options
    )
  }

  async send(jid, { ...options } = {}) {
    const msg = await this.build(jid, options)

    await this.#client.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
      additionalNodes: [
        {
          tag: "biz",
          attrs: {},
          content: [
            {
              tag: "interactive",
              attrs: { type: "native_flow", v: "1" },
              content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" } }]
            }
          ]
        }
      ],
      ...options
    })

    return msg
  }
}

global.ButtonV2 = ButtonV2

export default ButtonV2
