import { canLevelUp } from "../../library/system/levelling.js"

let handler = m => m

handler.before = async function (m, { conn, command }) {
  try {
    if (!m?.sender) return true
    if (m.fromMe || m.key?.fromMe) return true
    if (!command) return true

    const user = global.db.data.users[m.sender]
    const before = user.level * 1

    while (canLevelUp(user.level, user.exp, global.multiplier)) {
      user.level++
    }

    if (user.level <= 2) {
      user.role = "Newbie"
    } else if (user.level <= 4) {
      user.role = "Beginner Grade 1"
    } else if (user.level <= 6) {
      user.role = "Beginner Grade 2"
    } else if (user.level <= 8) {
      user.role = "Beginner Grade 3"
    } else if (user.level <= 10) {
      user.role = "Beginner Grade 4"
    } else if (user.level <= 12) {
      user.role = "Private Grade 1"
    } else if (user.level <= 14) {
      user.role = "Private Grade 2"
    } else if (user.level <= 16) {
      user.role = "Private Grade 3"
    } else if (user.level <= 18) {
      user.role = "Private Grade 4"
    } else if (user.level <= 20) {
      user.role = "Private Grade 5"
    } else if (user.level <= 22) {
      user.role = "Corporal Grade 1"
    } else if (user.level <= 24) {
      user.role = "Corporal Grade 2"
    } else if (user.level <= 26) {
      user.role = "Corporal Grade 3"
    } else if (user.level <= 28) {
      user.role = "Corporal Grade 4"
    } else if (user.level <= 30) {
      user.role = "Corporal Grade 5"
    } else if (user.level <= 32) {
      user.role = "Sergeant Grade 1"
    } else if (user.level <= 34) {
      user.role = "Sergeant Grade 2"
    } else if (user.level <= 36) {
      user.role = "Sergeant Grade 3"
    } else if (user.level <= 38) {
      user.role = "Sergeant Grade 4"
    } else if (user.level <= 40) {
      user.role = "Sergeant Grade 5"
    } else if (user.level <= 42) {
      user.role = "Staff Grade 1"
    } else if (user.level <= 44) {
      user.role = "Staff Grade 2"
    } else if (user.level <= 46) {
      user.role = "Staff Grade 3"
    } else if (user.level <= 48) {
      user.role = "Staff Grade 4"
    } else if (user.level <= 50) {
      user.role = "Staff Grade 5"
    } else if (user.level <= 52) {
      user.role = "Sergeant Grade 1"
    } else if (user.level <= 54) {
      user.role = "Sergeant Grade 2"
    } else if (user.level <= 56) {
      user.role = "Sergeant Grade 3"
    } else if (user.level <= 58) {
      user.role = "Sergeant Grade 4"
    } else if (user.level <= 60) {
      user.role = "Sergeant Grade 5"
    } else if (user.level <= 62) {
      user.role = "2nd Lt. Grade 1"
    } else if (user.level <= 64) {
      user.role = "2nd Lt. Grade 2"
    } else if (user.level <= 66) {
      user.role = "2nd Lt. Grade 3"
    } else if (user.level <= 68) {
      user.role = "2nd Lt. Grade 4"
    } else if (user.level <= 70) {
      user.role = "2nd Lt. Grade 5"
    } else if (user.level <= 72) {
      user.role = "1st Lt. Grade 1"
    } else if (user.level <= 74) {
      user.role = "1st Lt. Grade 2"
    } else if (user.level <= 76) {
      user.role = "1st Lt. Grade 3"
    } else if (user.level <= 78) {
      user.role = "1st Lt. Grade 4"
    } else if (user.level <= 80) {
      user.role = "1st Lt. Grade 5"
    } else if (user.level <= 82) {
      user.role = "Major Grade 1"
    } else if (user.level <= 84) {
      user.role = "Major Grade 2"
    } else if (user.level <= 86) {
      user.role = "Major Grade 3"
    } else if (user.level <= 88) {
      user.role = "Major Grade 4"
    } else if (user.level <= 90) {
      user.role = "Major Grade 5"
    } else if (user.level <= 92) {
      user.role = "Colonel Grade 1"
    } else if (user.level <= 94) {
      user.role = "Colonel Grade 2"
    } else if (user.level <= 96) {
      user.role = "Colonel Grade 3"
    } else if (user.level <= 98) {
      user.role = "Colonel Grade 4"
    } else if (user.level <= 100) {
      user.role = "Colonel Grade 5"
    } else if (user.level <= 102) {
      user.role = "Brigadier Early"
    } else if (user.level <= 104) {
      user.role = "Brigadier Silver"
    } else if (user.level <= 106) {
      user.role = "Brigadier Gold"
    } else if (user.level <= 108) {
      user.role = "Brigadier Platinum"
    } else if (user.level <= 110) {
      user.role = "Brigadier Diamond"
    } else if (user.level <= 112) {
      user.role = "Major General Early"
    } else if (user.level <= 114) {
      user.role = "Major General Silver"
    } else if (user.level <= 116) {
      user.role = "Major General Gold"
    } else if (user.level <= 118) {
      user.role = "Major General Platinum"
    } else if (user.level <= 120) {
      user.role = "Major General Diamond"
    } else if (user.level <= 122) {
      user.role = "Lt. General Early"
    } else if (user.level <= 124) {
      user.role = "Lt. General Silver"
    } else if (user.level <= 126) {
      user.role = "Lt. General Gold"
    } else if (user.level <= 128) {
      user.role = "Lt. General Platinum"
    } else if (user.level <= 130) {
      user.role = "Lt. General Diamond"
    } else if (user.level <= 132) {
      user.role = "General Early"
    } else if (user.level <= 134) {
      user.role = "General Silver"
    } else if (user.level <= 136) {
      user.role = "General Gold"
    } else if (user.level <= 138) {
      user.role = "General Platinum"
    } else if (user.level <= 140) {
      user.role = "General Diamond"
    } else if (user.level <= 142) {
      user.role = "Commander Early"
    } else if (user.level <= 144) {
      user.role = "Commander Intermediate"
    } else if (user.level <= 146) {
      user.role = "Commander Elite"
    } else if (user.level <= 148) {
      user.role = "The Commander Hero"
    } else if (user.level <= 500) {
      user.role = "Legends"
    } else if (user.level <= 1000) {
      user.role = "Legends Master"
    } else if (user.level <= 2000) {
      user.role = "Legends Grandmaster"
    } else if (user.level <= 3000) {
      user.role = "Legends Supreme"
    } else if (user.level <= 4000) {
      user.role = "Legends Glory"
    } else if (user.level <= 5000) {
      user.role = "Legends Immortal"
    } else if (user.level <= 6000) {
      user.role = "Legends Eternal"
    } else if (user.level <= 7000) {
      user.role = "Legends Mythic"
    } else if (user.level <= 8000) {
      user.role = "Legends Divine"
    } else if (user.level <= 9000) {
      user.role = "Legends Emperor"
    } else if (user.level <= 10000) {
      user.role = "Legends Absolute"
    } else {
      user.role = "Legends Infinity"
    }

    if (before !== user.level) {

      const teks = `
乂 *L E V E L - U P*

> User : ${m.pushName || "User"}
> Level : ${before} → ${user.level}
> Role : ${user.role}

Selamat kamu telah naik level 🎉
`.trim()

      await conn.sendMessage(
        m.chat,
        {
          text: teks
        },
        {
          quoted: m
        }
      )
    }

    return true
  } catch (e) {
    return true
  }
}

export default handler