import fetch from "node-fetch"
import { load } from "cheerio"

const BASE = "https://musicaldown.com"
const UA =
  "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"

const getCookie = (res) => {
  const sc = res.headers.raw()?.["set-cookie"] || []
  return sc.map((v) => v.split(";")[0]).join("; ")
}

const scrapeForm = (html, tiktokUrl) => {
  const $ = load(html)
  const form = $("#submit-form")
  if (!form.length) return null

  const action = form.attr("action") || "/id/download"
  const body = new URLSearchParams()

  let urlKey = null
  form.find("input[name]").each((_, el) => {
    const name = $(el).attr("name")
    const type = ($(el).attr("type") || "text").toLowerCase()
    const val = $(el).attr("value") || ""
    if (!name) return
    if (!urlKey && (type === "text" || /url|link|query|search|id/i.test(name))) urlKey = name
    body.set(name, val)
  })

  if (!urlKey) urlKey = "id"
  body.set(urlKey, tiktokUrl)

  return { action: action.startsWith("http") ? action : BASE + action, body }
}

const pickDirect = (html) => {
  const $ = load(html)
  const links = []

  $("a.download[href], a[data-event][href], a[href]").each((_, el) => {
    const href = ($(el).attr("href") || "").trim()
    if (!href.startsWith("http") || href.includes("/id")) return
    const label = (($(el).attr("data-event") || "") + " " + ($(el).text() || "")).toLowerCase()
    links.push({ href, label })
  })

  return (
    links.find((v) => /fastdl\.muscdn\.app\/v3\?token=/i.test(v.href))?.href ||
    links.find((v) => v.label.includes("hd"))?.href ||
    links.find((v) => v.label.includes("download") && !v.label.includes("watermark"))?.href ||
    links[0]?.href ||
    null
  )
}

export const musicaldown = async (tiktokUrl) => {
  const homeRes = await fetch(`${BASE}/id`, { headers: { "user-agent": UA } })
  const cookie = getCookie(homeRes)
  const homeHtml = await homeRes.text()

  const form = scrapeForm(homeHtml, tiktokUrl)
  if (!form) return null

  const res = await fetch(form.action, {
    method: "POST",
    headers: {
      "user-agent": UA,
      "content-type": "application/x-www-form-urlencoded",
      origin: BASE,
      referer: `${BASE}/id`,
      ...(cookie ? { cookie } : {}),
    },
    body: form.body.toString(),
  })

  return pickDirect(await res.text())
}