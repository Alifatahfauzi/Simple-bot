
/*

© Credate by fauzialifatah - simple bot
https://whatsapp.com/channel/0029Vb6j2u74NViqgNCLev3a

*/

import fs from 'fs';

export const qtext = {
  key: {
    remoteJid: 'status@broadcast',
    fromMe: false,
    participant: '0@s.whatsapp.net'
  },
  message: {
    newsletterAdminInviteMessage: {
      newsletterJid: '123@newsletter',
      caption: `Alifatah wabot !`,
      inviteExpiration: 0
    }
  }
};

export const metaai = {
  key: {
    remoteJid: "status@broadcast",
    fromMe: false,
    id: 'FAKE_META_ID_001',
    participant: '13135550002@s.whatsapp.net'
  },
  message: {
    contactMessage: {
      displayName: 'Alifatah wabot !',
      vcard: `BEGIN:VCARD
VERSION:3.0
N:XzVortex;;;;
FN:XzVortex🚀
TEL;waid=13135550002:+1 313 555 0002
END:VCARD`
    }
  }
};