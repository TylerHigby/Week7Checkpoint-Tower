import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  async getTicketsInEvent(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', '-email')
    return tickets
  }


  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')
    if (!ticket) throw new BadRequest(`no ticket Id at: ${ticketId}`)
    if (userId != ticket.accountId) throw new Forbidden('Nice try!')
    await ticket.remove()
    return `ticket removed ${ticket.event.name} for ${ticket.profile.name}`
  }


  async createTicket(ticketBody) {
    const ticket = await dbContext.Tickets.create(ticketBody)
    await ticket.populate('event')
    await ticket.populate('profile', '-email')
    return ticket
  }

}

export const ticketsService = new TicketsService()