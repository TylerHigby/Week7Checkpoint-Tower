import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { TowerEvent } from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService{

async getEvents(){
const res = await api.get('api/events')
logger.log('getting events',res.data)
AppState.events = res.data.map(event => new TowerEvent(event))
}

async createEvent(eventData){
  const res = await api.post('api/events',eventData)
  logger.log('created event', res.data)
  const newEvent = new TowerEvent(res.data)
  AppState.events.unshift(newEvent)
  return newEvent
}


async getEventById(eventId){
  const res = await api.get(`api/events/${eventId}`)
  logger.log('got an event!', res.data)
  AppState.activeEvent = new TowerEvent(res.data)
}

async getCommentsByEventId(eventId){
  const res = await api.get(`api/events/${eventId}/comments`)
  logger.log('getting comments', res.data)
  AppState.activeEventComments = res.data.map(comment => new Comment(comment))
}

async getTicketsByEventId(eventId){
  const res = await api.get(`api/events/${eventId}/tickets`)
  logger.log('getting tickets', res.data)
  AppState.activeEventTickets = res.data.map(ticket => new Ticket(ticket) )
}

}

export const eventsService = new EventsService()