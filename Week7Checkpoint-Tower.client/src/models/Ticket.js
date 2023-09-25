import { TowerEvent } from "../models/Event.js"

export class Ticket{
  constructor(data){
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.event = data.event ? new TowerEvent(data.event) : null
    this.profile = data.profile
    // this.ownerName = data.profile.name
    // this.ownerImg = data.profile.picture
  }
}