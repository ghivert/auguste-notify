import * as fs from 'fs/promises'
import * as path from 'path'

export const dirs = async () => {
  const root = path.resolve(process.cwd(), 'services')
  const services = await fs.readdir(root, { withFileTypes: true })
  const folders = services.map(({ name }) => path.resolve(root, name))
  const paths = await Promise.all(
    folders.map(async dir => {
      const pjson = path.resolve(dir, 'package.json')
      return await fs
        .access(pjson)
        .then(() => [dir])
        .catch(() => [])
    })
  )
  return paths.flat()
}
