const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Car = require('./Car')

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
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
  cars: [Car.schema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };