require('dotenv').config()

const millefeuille = require('@frenchpastries/millefeuille')
const client = require('@frenchpastries/customer')
const assemble = require('@frenchpastries/assemble')
const arrange = require('@frenchpastries/arrange')

const { parseAuthorization } = require('./middlewares/authentication')

const serviceInfos = {
  interface: {
    type: client.constants.REST,
  },
}

const bakeryMiddleware = client.register({
  hostname: process.env.REGISTRY_HOST,
  port: process.env.REGISTRY_PORT,
  serviceInfos,
})

const interceptFavicon = handler => async request => {
  if (request.url.pathname === '/favicon.ico') {
    return { statusCode: 404 }
  } else {
    return handler(request)
  }
}

const allRoutes = assemble.routes([
  assemble.notFound(() => ({ statusCode: 404 })),
])

const origin =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7070'
    : 'https://auguste.app'

const withAuth = parseAuthorization(allRoutes)
const withFavicon = interceptFavicon(withAuth)
const withCors = arrange.cors.origin(withFavicon, origin)
const withBakery = bakeryMiddleware(withCors)

millefeuille.create(withBakery)
