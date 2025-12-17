import fs from 'fs';
const DB_PATH = './settings/dbku/saldo.json';

const createDir = () => {
    const dir = DB_PATH.substring(0, DB_PATH.lastIndexOf('/'));
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
        fs.writeFileSync(DB_PATH, JSON.stringify(_dir, null, 3));
    } else {
        const object_add = {
            id: userId,
            saldo: amount
        };
        _dir.push(object_add);
        fs.writeFileSync(DB_PATH, JSON.stringify(_dir, null, 3));
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
        fs.writeFileSync(DB_PATH, JSON.stringify(_dir, null, 3));
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
