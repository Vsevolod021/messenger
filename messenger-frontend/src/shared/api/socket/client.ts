import { io, Socket } from 'socket.io-client'
import { WS_URL } from '@/shared/config'

// FixMe. Сделать через store
let socket: Socket | null = null

export function connectToSocketServer(token: string) {
  if (socket) {
    return socket
  }

  socket = io(WS_URL, {
    auth: {
      token,
    },
  })
  return socket
}

export function disconnectFromSocketServer() {
  if (!socket) {
    return
  }

  socket.disconnect()
  socket = null
}

export function getSocket(): Socket {
  if (!socket) {
    throw new Error('WebSocket is not connected')
  }

  return socket
}
