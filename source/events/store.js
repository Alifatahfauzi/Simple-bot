
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

import fs from "fs-extra";
import { makeid } from "../../source/myfunc.js";
const db_fauzi = "./settings/dbku/produk.json";

const loadProduk = () => {
    try {
        let data = fs.readFileSync(db_fauzi, "utf8");
        return JSON.parse(data);
    } catch (e) {
        if (e.code === 'ENOENT') {
            fs.writeFileSync(db_fauzi, JSON.stringify([]));
            return [];
        }
        console.error("Error loading produk.json:", e);
        return [];
    }
};
const saveProduk = (produkList) => {
    fs.writeFileSync(db_fauzi, JSON.stringify(produkList, null, 2));
};

export const addProduk = (nama, harga, deskripsi) => {
    const produkList = loadProduk();
    const id = "PROD-" + makeid(5);
    const newProduk = {
        id: id,
        nama: nama,
        harga: parseInt(harga),
        deskripsi: deskripsi,
        tanggalTambah: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    };
    produkList.push(newProduk);
    saveProduk(produkList);
    return newProduk;
};
export const getListProduk = () => {
    return loadProduk();
};
export const deleteProduk = (id) => {
    let produkList = loadProduk();
    const initialLength = produkList.length;
    produkList = produkList.filter(p => p.id.toLowerCase() !== id.toLowerCase());
    if (produkList.length === initialLength) {
        throw new Error(`❌ Produk dengan ID *${id}* tidak ditemukan.`);
    }
    saveProduk(produkList);
};
export const editProduk = (id, newNama, newHarga, newDeskripsi) => {
    let produkList = loadProduk();
    const index = produkList.findIndex(p => p.id.toLowerCase() === id.toLowerCase());

    if (index === -1) {
        throw new Error(`❌ Produk dengan ID *${id}* tidak ditemukan.`);
    }
    produkList[index].nama = newNama || produkList[index].nama;
    produkList[index].harga = newHarga ? parseInt(newHarga) : produkList[index].harga;
    produkList[index].deskripsi = newDeskripsi || produkList[index].deskripsi;
    produkList[index].tanggalEdit = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    saveProduk(produkList);
    return produkList[index];
};

export const findProduk = (id) => {
    const produkList = loadProduk();
    return produkList.find(p => p.id.toLowerCase() === id.toLowerCase());
};
