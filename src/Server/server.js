import dgram from 'dgram'
import { WebSocketServer } from 'ws'
import {addUnit, getUnits} from '../store/store.js'

const server = dgram.createSocket('udp4')
const wss = new WebSocketServer({port: 8080})

server.on('message', (msg) => {
    const values = msg.toString();
    addUnit(values)
    console.log("Reading", values)

    console.log(typeof(getUnits()))
    wss.clients.forEach(client => {
        if(client.readyState == 1){
            client.send(values)
        }
    })
})

server.bind(41234, () => {
    console.log("Server connected to port 41234")
})

wss.on('connection', (ws) => {
    console.log('Client connected')
})