import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService{
async createTicket(ticketData){
  // debugger
  const res = await api.post('api/tickets', ticketData)
  logger.log('new ticket', res.data)
  AppState.activeEventTickets.push(new Ticket(res.data))
}

async deleteTicket(ticketId){
const res = await api.delete(`api/tickets/${ticketId}`)
logger.log('deleting ticket', res.data)
let indexToRemove = AppState.activeEventTickets.findIndex(ticket => ticket.id == ticketId)
AppState.activeEventTickets.splice(indexToRemove, 1)
}




}
export const ticketsService = new TicketsService()