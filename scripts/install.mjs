import * as child from 'child_process'
import * as folders from './utils/folders.mjs'
import * as fs from 'fs/promises'
import * as path from 'path'

const dirs = await folders.dirs()
const processes = await Promise.all(
  dirs.map(async dir => {
    const proc = child.spawn('yarn', ['--cwd', dir])
    console.log('Installing', dir)
    const env = path.resolve(
      path.dirname(''),
      'services/docker/envs',
      dir.split('/').reverse()[0] + '.env'
    )
    const exists = await fs
      .access(env)
      .then(() => true)
      .catch(() => false)
    if (exists) await fs.copyFile(env, path.resolve(dir, '.env'))
    return proc
  })
)
process.on('SIGINT', () => processes.forEach(proc => proc.kill('SIGINT')))
