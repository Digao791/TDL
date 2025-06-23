const port = import.meta.env.VITE_PORT_SOCKET

const socket = new WebSocket(`ws://localhost:${port}`)
export default socket