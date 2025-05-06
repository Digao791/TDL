import dgram from 'dgram'
import { addUnit } from '../store/store.js';

const server = dgram.createSocket('udp4')

server.on('message', (msg) => {

     //Values received
    const values = msg.toString();  
    addUnit(values)
    
})

server.bind(41234, () => {
    console.log("Server connected to port 41234")
})
