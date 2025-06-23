// Values of the Coding Scheme Part
// First value of the MIL-STD-2525
const Coding_Scheme = Object.freeze({
    Warfighting : 'S',
    Intelligence : 'I',
    StabilityOperations : 'O',
    EmergencyManagement : 'E',
    Weather : 'WO',
    TacticalGroup : 'G'
})

// Values of the Affiliation Type
// Second value of the MIL-STD-2525
const Affiliation = Object.freeze({
    FRIEND : 'F',
    HOSTILE: 'H',
    NEUTRAL: 'N',
    UNKNOW : 'U',
    ASSUMEDFRIEND : 'A',
    JOKER : 'J',
    FAKER : 'K',
    PENDING: 'P',
    SUSPECT: 'S',
    EXERCISEPENDING: 'G',
    EXERCISEUNKNOWN: 'W',
    EXERCISEFRIEND: 'D',
    EXERCISENEUTRAL: 'L',
    EXERCISEASSUMEDFRIEND: 'M',
    NONESPECIFIED: 'O'
})
// Values of the Battle Dimension
// Third Value of the MIL-STD-2525
// Values depends on the Coding Scheme
const Battle_Dimension = Object.freeze({
    Air: 'A',
    Ground: 'G',
    Surface: 'S',
    Subsurface: 'U',
    Land: 'G',
    Space: 'P'
})
// Values of the Status
// Forth value of the MIL-STD-2525
const Status = Object.freeze({
    Anticipated: 'A',
    Planned: 'A',
    FullyCapable : 'P',
    Damaged: 'D',
    Destroyed: 'X',
    FullToCapacity: 'F'
})

function parseMessage(message){
    let symbolIdentificationCode = 'S'

    //Is it OwnUnit ?
    if(message.name.includes("OwnUnit")) return "SFS-O---------G"

    //Find the Identity
    Object.keys(Affiliation).some(value => {
        if(message.type == "UNIT"){ symbolIdentificationCode = symbolIdentificationCode.concat(Affiliation.FRIEND.toString()); return true;}
        if(value == message.identity){
            symbolIdentificationCode = symbolIdentificationCode.concat(Affiliation[value].toString())
            return true;
        }
    })

    // Find the Message Type
    Object.keys(Battle_Dimension).some(value => {
        if (message.name.toString().includes(value)){
            symbolIdentificationCode = symbolIdentificationCode.concat(Battle_Dimension[value].toString())
            return true;
        }
    })
  
    symbolIdentificationCode = symbolIdentificationCode.concat("-")

    symbolIdentificationCode = symbolIdentificationCode.concat('--------')

    return symbolIdentificationCode
}
export function getCodeMessageFrom(data){

    let final_sidc = parseMessage(data)

    return final_sidc
}