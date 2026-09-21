import fs from "fs"
import { tmpdir } from "os"
import Crypto from "crypto"
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg"
import ff from "fluent-ffmpeg"
import webp from "node-webpmux"
import path from "path"

ff.setFfmpegPath(ffmpegPath)

const tmpFile = (ext) =>
  path.join(tmpdir(), `${Crypto.randomBytes(6).toString("hex")}.${ext}`)

const clearTmp = (...files) => {
  for (const file of files) {
    if (file && fs.existsSync(file)) fs.unlinkSync(file)
  }
}

const buildExif = (packname, author, categories = [""]) => {
  const json = {
    "sticker-pack-id": Crypto.randomBytes(32).toString("hex"),
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    emojis: categories
  }

  const exifAttr = Buffer.from([
    0x49, 0x49, 0x2a, 0x00,
    0x08, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x41, 0x57,
    0x07, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x16, 0x00,
    0x00, 0x00
  ])

  const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
  const exif = Buffer.concat([exifAttr, jsonBuff])
  exif.writeUIntLE(jsonBuff.length, 14, 4)

  return exif
}

export async function imageToWebp(media) {
  const input = tmpFile("jpg")
  const output = tmpFile("webp")

  fs.writeFileSync(input, media)

  await new Promise((resolve, reject) => {
    ff(input)
      .on("error", reject)
      .on("end", resolve)
      .outputOptions([
        "-vcodec", "libwebp",
        "-vf", "scale=512:512:force_original_aspect_ratio=decrease:flags=lanczos,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000",
        "-lossless", "1",
        "-compression_level", "6",
        "-qscale", "50",
        "-preset", "picture",
        "-loop", "0",
        "-an",
        "-vsync", "0"
      ])
      .toFormat("webp")
      .save(output)
  })

  const buffer = fs.readFileSync(output)
  clearTmp(input, output)
  return buffer
}

export async function videoToWebp(media) {
  const input = tmpFile("mp4")
  const output = tmpFile("webp")

  fs.writeFileSync(input, media)

  await new Promise((resolve, reject) => {
    ff(input)
      .on("error", reject)
      .on("end", resolve)
      .outputOptions([
        "-vcodec", "libwebp",
        "-vf", "scale=512:512:force_original_aspect_ratio=decrease:flags=lanczos,fps=15,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000",
        "-lossless", "1",
        "-compression_level", "6",
        "-qscale", "50",
        "-preset", "default",
        "-loop", "0",
        "-an",
        "-vsync", "0",
        "-t", "00:00:10"
      ])
      .toFormat("webp")
      .save(output)
  })

  const buffer = fs.readFileSync(output)
  clearTmp(input, output)
  return buffer
}

export async function toPTT(media, ext) {
  const input = tmpFile(ext)
  const output = tmpFile("opus")

  fs.writeFileSync(input, media)

  await new Promise((resolve, reject) => {
    ff(input)
      .on("error", reject)
      .on("end", resolve)
      .audioCodec("libopus")
      .format("opus")
      .save(output)
  })

  const buffer = fs.readFileSync(output)

  clearTmp(input, output)

  return buffer
}

export async function writeExifImg(media, metadata = {}) {
  const wMedia = await imageToWebp(media)
  const img = new webp.Image()
  await img.load(wMedia)
  img.exif = buildExif(metadata.packname, metadata.author, metadata.categories)
  return await img.save(null)
}

export async function writeExifVid(media, metadata = {}) {
  const wMedia = await videoToWebp(media)
  const img = new webp.Image()
  await img.load(wMedia)
  img.exif = buildExif(metadata.packname, metadata.author, metadata.categories)
  return await img.save(null)
}