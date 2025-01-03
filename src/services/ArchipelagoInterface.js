import { Client } from "archipelago.js"
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

    this.APClient.messages.on("message", (content) => {
      const sanitizedContent = content.replace(/,/g, '');
      this.emit('message', sanitizedContent);
    });

    this.APClient.login(Settings.getOptionValue(Permalink.OPTIONS.ARCHIPELAGO_LINK), Settings.getOptionValue(Permalink.OPTIONS.ARCHIPELAGO_NAME))
      .then(() => console.log("Connected to the Archipelago server!"))
      .catch(console.error);
  }

  getName(){
    return Settings.getOptionValue(Permalink.OPTIONS.ARCHIPELAGO_NAME);
  }

  on(event, listener) { 
    if (!this.events[event]) { 
      this.events[event] = []; 
    } 
    this.events[event].push(listener); 
  } 
  
  emit(event, ...args) {
    if (this.events[event]) 
    { this.events[event].forEach(listener => listener(...args)); }
  }
}

export default ArchipelagoInterface;