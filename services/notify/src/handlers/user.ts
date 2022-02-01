import { IncomingRequest } from '@frenchpastries/millefeuille'
import { response } from '@frenchpastries/millefeuille/response'

export const home = async (_request: IncomingRequest) => {
  return response('OK')
}

export const hook = async (_request: IncomingRequest) => {
  return response('OK')
}

export const connection = async (_request: IncomingRequest) => {
  return response('Switch to WS protocol')
}
