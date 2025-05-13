import dgram from 'dgram'
import { WebSocketServer } from 'ws';
import {PORT_SOCKET} from '../config/env.js'
import { useEventBus } from './eventBus.js';


const server = dgram.createSocket('udp4')
const wss = new WebSocketServer({port:8080})
const {emit} = useEventBus()

server.on('message', (msg) => {
     //Values received
    const values = msg.toString();  
    emit('valores', values)
    wss.clients.forEach(client => {
        if(client.readyState == 1){
            client.send(values)
        }
    })

})

server.bind(41234, () => {
    console.log("Server connected to port 41234")
})

