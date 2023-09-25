import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async editEvent(eventId, updates, userId) {
    const originalEvent = await dbContext.Events.findById(eventId)
    const event = await this.getEventById(eventId)
    // FIXME throw an error if the event is cancelled
    if (event.isCanceled == true) throw new Forbidden('That event has been cancelled.')
    // FIXME throw an error if user is not creator of event (look @ line 35)
    if (event.creatorId != userId) throw new Forbidden("That isn't your event to edit!")
    if (!originalEvent) throw new Error(`unable to find event at ${eventId}`)
    // FIXME add properties to edit reference edit on zookeeper node
    originalEvent.name = updates.name || originalEvent.name
    originalEvent.description = updates.description || originalEvent.description
    originalEvent.coverImg = updates.coverImg || originalEvent.coverImg
    originalEvent.location = updates.location || originalEvent.location
    originalEvent.capacity = updates.capacity || originalEvent.capacity
    originalEvent.startDate = updates.startDate || originalEvent.startDate
    // originalEvent.isCanceled = updates.isCanceled != undefined ? updates.isCanceled : originalEvent.isCanceled
    originalEvent.type = updates.type || originalEvent.type

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