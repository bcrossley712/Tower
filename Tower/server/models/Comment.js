import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CommentSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true },
    creatorId: { type: ObjectId, ref: 'Profile', required: true },
    body: { type: String, required: true },
    isAttending: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})