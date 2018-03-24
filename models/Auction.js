const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const AuctionSchema = new Schema({
  auctioneer: {
    type: ObjectId,
    ref: 'User'
  },
  car: {
    type: ObjectId,
    ref: 'Car'
  },
  biddings: [{
    bid: Number,
    owner: {
      type: ObjectId,
      ref: 'User'
    }
  }],
  bidders: {
    type: ObjectId,
    ref: 'User'
  },
  startDate: Date,
  desiredPrice: Number,
  city: String,
  active: Boolean,
  winner: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Auction = mongoose.model('Auction', AuctionSchema)

module.exports = { Auction }