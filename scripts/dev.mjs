import concurrently from 'concurrently'
import chalk from 'chalk'
import * as folders from './utils/folders.mjs'

const COLORS = ['white', 'red', 'green', 'blue']

console.log(chalk.bold.magenta('=> Will launch everything'))
const dirs = await folders.dirs()
const processes = dirs.map((dir, index) => {
  const command = `yarn --cwd ${dir} dev`
  const name = dir
  const prefixColor = COLORS[index]
  return { command, name, prefixColor }
})
await concurrently(processes)
