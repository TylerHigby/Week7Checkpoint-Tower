import { Schema } from "mongoose";

export const EventsSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
}, { timestamps: true, toJSON: { virtuals: true } })

EventsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

EventsSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  count: true
})