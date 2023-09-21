import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{

async getEvents(){
const res = await api.get('api/events')
logger.log('getting events',res.data)
AppState.events = res.data.map(event => new TowerEvent(event))
}

async getEventById(eventId){
  const res = await api.get(`api/events/${eventId}`)
  logger.log('got an event!', res.data)
  AppState.activeEvent = new TowerEvent(res.data)
}




}

export const eventsService = new EventsService()