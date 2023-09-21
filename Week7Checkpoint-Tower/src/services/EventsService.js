import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async editEvent(eventId, updates) {
    const originalEvent = await dbContext.Events.findById(eventId)
    if (!originalEvent) throw new Error(`unable to find event at ${eventId}`)
    await originalEvent.save()
    return originalEvent
  }
  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
    if (!event) {
      throw new BadRequest(`no event at id: ${eventId}`)
    }
    return event
  }
  async getEvents(query) {
    const events = await dbContext.Events.find(query).sort('-createdAt').populate('creator ticketCount')
    return events
  }
  async createEvent(eventBody) {
    const event = await dbContext.Events.create(eventBody)
    await event.populate('creator ticketCount')
    return event
  }


  async archiveEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    if (event.creatorId != userId) throw new Forbidden("That isn't your event to delete!")
    event.isCanceled = !event.isCanceled
    await event.save()
    return event
  }



}

export const eventsService = new EventsService()