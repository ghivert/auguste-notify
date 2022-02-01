import { URL } from 'url'
import { WebSocketServer, WebSocket } from 'ws'
import * as http from 'http'

const ping = (ws: WebSocket) => {
  let alive = true
  ws.on('pong', () => (alive = true))
  const inter = setInterval(() => {
    if (alive) return ws.ping()
    ws.close()
    clearTimeout(inter)
  }, 30 * 1000)
}

export type OnCallback = (ws: WebSocket, message: string) => void
const on = (wss: WebSocketServer, callback: OnCallback) => {
  wss.on('connection', ws => {
    ping(ws)
    ws.on('message', data => {
      const message = data.toString()
      callback(ws, message)
    })
  })
}

export const create = (server: http.Server, callback: OnCallback) => {
  const wss = new WebSocketServer({ noServer: true })
  server.on('upgrade', (request, socket, head) => {
    if (request.url) {
      const url = new URL(request.url, 'https://auguste.app')
      const parts = url.pathname.split('/')
      if (parts.length === 3) {
        const authorization = request.headers.authorization
        const token = authorization?.replace(/^Bearer /, '')
        console.log(token)
        const [_, _username, _socket] = parts
        if (_socket === 'socket') {
          return wss.handleUpgrade(request, socket, head, (ws, request) => {
            wss.emit('connection', ws, request)
          })
        }
      }
    }
    socket.destroy()
  })
  on(wss, callback)
  return wss
}
