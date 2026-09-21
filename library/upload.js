import fetch from "node-fetch"
import FormData from "form-data"
import FileType from "file-type"

const Uploader = {
  uguu: async (buffer) => {
    try {
      const type = await FileType.fromBuffer(buffer)
      const ext = type?.ext || "bin"
      const form = new FormData()
      form.append("files[]", buffer, `${Date.now()}.${ext}`)
      const res = await fetch("https://uguu.se/upload.php", { method: "POST", body: form })
      const json = await res.json()
      return json.files?.[0]?.url || null
    } catch { return null }
  },

  nekohime: async (buffer) => {
    try {
      const type = await FileType.fromBuffer(buffer)
      const ext = type?.ext || "jpg"
      const form = new FormData()
      form.append("file", buffer, `${Date.now()}.${ext}`)
      
      const res = await fetch("https://cdn.nekohime.site/upload", { 
        method: "POST", 
        body: form,
        headers: form.getHeaders() 
      })
      const json = await res.json()
      return json.files?.[0]?.url || null
    } catch (e) { 
      return null 
    }
  }
}

export default Uploader
