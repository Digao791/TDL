import dgram from 'dgram'
import { WebSocketServer } from 'ws';
import {PORT_SOCKET} from '../config/env.js'

const server = dgram.createSocket('udp4')
const wss = new WebSocketServer({port:8080})

server.on('message', (msg) => {
     //Values received
    const values = msg.toString();  
    wss.clients.forEach(client => {
        if(client.readyState == 1){
            client.send(values)
        }
    })
    
})

server.bind(41234, () => {
    console.log("Server connected to port 41234")
})

