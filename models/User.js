const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  businessData: {
      businessName: String,
      tradeName: String,
      address: String,
      city: String,
      phoneNumber: String,
      cif: String
  },
  userType: {
    type: [String],
    enum: ['Buyer', 'Seller']
  },
  cars: [{
    type: ObjectId,
    ref: 'Car'
  }]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('User', UserSchema)

module.exports = { User }