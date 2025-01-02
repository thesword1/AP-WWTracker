import { Client, ITEMS_HANDLING_FLAGS, SERVER_PACKET_TYPE, ConnectionStatus } from "archipelago.js"
import Settings from './settings';
import Permalink from './permalink';


class ArchipelagoInterface {
  /**
   * @param {string} host
   * @param {Number} port
   * @param {string} slotName
   * @param {string|null} password optional
   */
  

  constructor(param) {
    try{
      Settings.initializeFromPermalink(param);
    } catch{
      console.log('Using settings from Save Data')
    }
    try{
      const {
        settings,
      } = JSON.parse(param);
      Settings.initializeRaw(settings);
    }catch {
      console.log('Using settings from Permalink')
    }
    
    this.APClient = new Client();
    this.events = {};

    const connectionInfo = {
      hostname: 'archipelago.gg',
      port: parseInt(grabPort(Settings.getOptionValue(Permalink.OPTIONS.ARCHIPELAGO_LINK))),
      game: 'The Wind Waker',
      name: Settings.getOptionValue(Permalink.OPTIONS.ARCHIPELAGO_NAME),
      password: null,
      items_handling: ITEMS_HANDLING_FLAGS.REMOTE_ALL,
    };

    this.APClient.connect(connectionInfo).then(() => {

      this.APClient.addListener(SERVER_PACKET_TYPE.PRINT_JSON, this.printJSONHandler); 

      console.log("Connected to the server");
      /*let locations = this.APClient.locations.checked;
      let playerList = this.APClient.players.all;
      let playerId;
      let player;

      for ( in playerList) {
        if (player.name == Settings.getOptionValue(Permalink.OPTIONS.ARCHIPELAGO_NAME)){
          playerId = player.slot;          
        }
        console.log(player);
      }
      console.log(playerId);
      console.log(playerList);
      console.log(this.APClient.locations.name(1,locations[3]));*/
    })
    .catch((error) => {
      console.error("Failed to connect:" + error);
    });
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
  

  printJSONHandler = async (packet, rawMessage) => {
    try {
      this.emit('message', rawMessage);
    } catch (error) {
      console.error('Error parsing packet:', error);
    }


  }


  // Method to simulate receiving a packet
  receivePacket(packet) {
    this.printJSONHandler(packet);
  }

  getName(){
    return Settings.getOptionValue(Permalink.OPTIONS.ARCHIPELAGO_NAME);
  }

  
  /*getCheckedLocations(){
    let parsedArray;
    let rawArray = this.APClient.locations.checked;

    
    return 
  }*/

}


//Grabs Port from Server Address
function grabPort(baseServerAddress) {
  let regex = new RegExp('archipelago\.gg:(.*)');
  let match = regex.exec(baseServerAddress);

  if (match && match[1]){
      return match[1]
  }
  else {
      return null;
  }
}

export default ArchipelagoInterface;