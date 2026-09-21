import chalk from "chalk"

export const conlog = (m, command, plugin, plug) => {
  const { isGroup, sender, pushName, chat } = plug

  const user = pushName || "User"
  const number = sender.split("@")[0]

  const typeLabel = isGroup ? chalk.bgMagenta.white.bold(" GRP ") : chalk.bgGreen.white.bold(" PRV ")

  const cmdFmt  = chalk.cyanBright.bold(command)
  const userFmt = chalk.yellow(`${user} (${number})`)
  const locFmt  = isGroup ? chalk.gray(` ➮ ${chat}`) : ""

  console.log(`${typeLabel} ${cmdFmt} ${chalk.white("~>")} ${userFmt}${locFmt}`)
}
