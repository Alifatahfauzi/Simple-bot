import baileys from "@whiskeysockets/baileys";

const {
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = baileys;

let handler = async (m, { conn, user }) => {
    let menu1 = `Hallo`;
    let menu2 = `hii`;
    let Randomimagebyvynnox = 'https://files.catbox.moe/254wej.jpg';
    let pan = `-Fauzialifatah`;

    let msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: pan },
                        carouselMessage: {
                            cards: [
                                {
                                    header: baileys.proto.Message.InteractiveMessage.Header.create({
                                        ...(await prepareWAMessageMedia(
                                            { image: { url: Randomimagebyvynnox } },
                                            { upload: conn.waUploadToServer },
                                        )),
                                        title: ``,
                                        gifPlayback: true,
                                        subtitle: global.ownername,
                                        hasMediaAttachment: false,
                                    }),
                                    body: {
                                        text: menu1,
                                    },
                                    nativeFlowMessage: {
                                        messageParamsJson: JSON.stringify({
                                            bottom_sheet: {
                                                in_thread_buttons_limit: 2,
                                                divider_indices: [1, 2, 3, 4, 5, 999],
                                                list_title: "Fauzialifatah",
                                                button_title: "Fauzialifatah"
                                            },
                                            tap_target_configuration: {
                                                title: " Alifatah - Anomali ",
                                                description: "Omg",
                                                canonical_url: "https://t.me/FauziAlifatah",
                                                domain: "ziihost.store",
                                                button_index: 0
                                            }
                                        }),
                                        buttons: [
                                            {
                                                name: "single_select",
                                                buttonParamsJson: JSON.stringify({
                                                    has_multiple_buttons: true
                                                })
                                            },
                                            {
                                                name: "single_select",
                                                buttonParamsJson: JSON.stringify({
                                                    title: "Hello World",
                                                    sections: [
                                                        {
                                                            title: "title",
                                                            highlight_label: "label",
                                                            rows: [
                                                                {
                                                                    title: "@stvnnvs",
                                                                    description: "love you",
                                                                    id: "row_2"
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    has_multiple_buttons: true
                                                })
                                            },
                                            {
                                                name: "cta_copy",
                                                buttonParamsJson: JSON.stringify({
                                                    display_text: "copy code",
                                                    id: "123456789",
                                                    copy_code: "ABC123XYZ"
                                                })
                                            },
                                        ],
                                    },
                                },
                                {
                                    header: baileys.proto.Message.InteractiveMessage.Header.create({
                                        ...(await prepareWAMessageMedia(
                                            { image: { url: Randomimagebyvynnox } },
                                            { upload: conn.waUploadToServer },
                                        )),
                                        title: ``,
                                        gifPlayback: true,
                                        subtitle: global.ownername,
                                        hasMediaAttachment: false,
                                    }),
                                    body: {
                                        text: menu2,
                                    },
                                    nativeFlowMessage: {
                                        buttons: [
                                            {
                                                name: "cta_copy",
                                                buttonParamsJson: JSON.stringify({
                                                    display_text: "copy code",
                                                    id: "123456789",
                                                    copy_code: "ABC123XYZ"
                                                })
                                            },
                                            {
                                                name: 'galaxy_message',
                                                buttonParamsJson: JSON.stringify({
                                                    icon: 'DOCUMENT',
                                                    flow_cta: 'Alamak kontol😹',
                                                    flow_message_version: '3',
                                                }),
                                            },
                                        ],
                                    },
                                },
                            ],
                            messageVersion: 1,
                        },
                    },
                },
            },
        },
        {
            quoted: null
        }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = ["carousel"];
handler.help = ["carousel"];
handler.tags = ["main"];

export default handler;