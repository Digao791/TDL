import { WebSocketServer } from "ws"

const wss = new WebSocketServer({port:8080})

const unit = [];
let thereAreUnits = false;

wss.on(('connected'), ()=>{
    console.log("Client connected")
})

export function addUnit(msg){

    if(!thereAreUnits){
        console.log("We have a unit")
        thereAreUnits = true;
        start()
    }

    unit.push(msg)
    console.log("add", msg)
    console.log(unit.length)
}

function start(){
    setInterval(() => {
        wss.clients.forEach(client => {
            if(client.readyState == 1){

                const values = (getUnits()).toString()

                client.send(values)
            }
        })
    }, 5000);
}

function getUnits(){
    return unit
}

