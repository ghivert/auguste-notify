import 'dotenv/config'
import * as millefeuille from '@frenchpastries/millefeuille'
import { routes, any, notFound, get, context } from '@frenchpastries/assemble'
import * as handlers from './handlers'
import * as wss from './wss'
// import * as arrange from '@frenchpastries/arrange'

const handler = routes([
  context('/:id', [
    get('/', handlers.user.home),
    get('/sign-in', handlers.auth.signIn),
    get('/connection', handlers.user.connection),
    any('/hook', handlers.user.hook),
  ]),
  notFound(async () => ({ statusCode: 404 })),
])

const main = async () => {
  const server = millefeuille.create(handler)
  const wsServer = wss.create(server, (ws, message) => {})
  console.log(wsServer)
  console.log('Server started')
}

main()
