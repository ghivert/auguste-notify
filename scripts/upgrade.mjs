import * as child from 'child_process'
import * as folders from './utils/folders.mjs'

const dirs = await folders.dirs()
const processes = dirs.map(dir => {
  const proc = child.spawn('yarn', ['--cwd', dir, 'upgrade'])
  console.log('Upgrading', dir)
  return proc
})
process.on('SIGINT', () => processes.forEach(proc => proc.kill('SIGINT')))
