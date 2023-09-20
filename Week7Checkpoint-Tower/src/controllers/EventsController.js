import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get("", this.getEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/comments', this.getCommentsInEvent)
      .get('/:eventId/tickets', this.getTicketsInEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .delete('/:eventId', this.archiveEvent)
  }
  async getTicketsInEvent(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsInEvent(req.params.eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }


  async getCommentsInEvent(req, res, next) {
    try {
      const comments = await commentsService.getCommentsInEvent(req.params.eventId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }


  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEvents(req, res, next) {
    try {
      const events = await eventsService.getEvents(req.query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      let eventBody = req.body
      eventBody.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(eventBody)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async archiveEvent(req, res, next) {
    try {
      const event = await eventsService.archiveEvent(req.params.eventId, req.userInfo.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }



}