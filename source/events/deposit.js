
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

import fs from 'fs';
const db_deposit = './settings/dbku/saldo.json';
const createDir = () => {
    const dir = db_deposit.substring(0, db_deposit.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

export const addSaldo = (userId, amount, _dir) => {
    createDir();
    let position = null;
    _dir.forEach((item, index) => { 
        if (item.id === userId) {
            position = index;
        }
    });

    if (position !== null) {
        _dir[position].saldo += amount;
        fs.writeFileSync(db_deposit, JSON.stringify(_dir, null, 3));
    } else {
        const object_add = {
            id: userId,
            saldo: amount
        };
        _dir.push(object_add);
        fs.writeFileSync(db_deposit, JSON.stringify(_dir, null, 3));
    }
};

export const minSaldo = (userId, amount, _dir) => {
    createDir();
    let position = null;
    _dir.forEach((item, index) => { 
        if (item.id === userId) {
            position = index;
        }
    });

    if (position !== null) {
        _dir[position].saldo -= amount;
        fs.writeFileSync(db_deposit, JSON.stringify(_dir, null, 3));
    }
};

export const cekSaldo = (userId, _dir) => {
    let position = null;
    _dir.forEach((item, index) => { 
        if (item.id === userId) {
            position = index;
        }
    });

    if (position !== null) {
        return _dir[position].saldo;
    } else {
        return 0;
    }
};
