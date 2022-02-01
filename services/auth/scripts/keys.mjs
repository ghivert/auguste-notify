import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs/promises'
import * as util from 'util'
import chalk from 'chalk'

const generateKeyPair = () => {
  const options = {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  }
  return util.promisify(crypto.generateKeyPair)('rsa', options)
}

const keysDirectoryAbsent = async keysPath => {
  try {
    await fs.access(keysPath)
    return false
  } catch (error) {
    return true
  }
}

console.log(chalk.green('--> Looking to know if keys should be generated.'))
const keysPath = path.resolve(path.dirname(''), 'keys')
const absent = await keysDirectoryAbsent(keysPath)
if (absent) {
  await fs.mkdir(keysPath, { recursive: true })
  const { publicKey, privateKey } = await generateKeyPair()
  await fs.writeFile(path.resolve(keysPath, 'public_key.pem'), publicKey)
  await fs.writeFile(path.resolve(keysPath, 'private_key.pem'), privateKey)
  console.log(chalk.green('-----> Public and private RSA keys generated.'))
} else {
  console.log(chalk.yellow('-----> Keys already present, skipping...'))
}
