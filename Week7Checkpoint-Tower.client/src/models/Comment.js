export class Comment{
  constructor(data){
    this.id = data.id
    this.creatorId = data.creatorId
    this.creatorName = data.creator.name
    this.creatorImg = data.creator.picture
    this.eventId = data.eventId
    this.body = data.body
    this.isAttending = data.isAttending
  }
}