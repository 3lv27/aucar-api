const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CarSchema = new Schema({
    make: {
        type: [String],
        enum: ['Audi', 'BMW', 'Citroen', 'Ford', 'Honda', 'Mercedes-Benz', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Seat', 'Toyota', 'Volkswagen', 'Volvo']
      },
    model: String,
    year: Date,
    km: Number,
    vehicleType: {
        type: [String],
        enum: ['Car', 'SUV', 'Van', 'MiniVan', 'Pickup']
      },
    doors: Number,
    seats: Number,
    features: {
        gear: {
            type: [String],
            enum: ['Manual', 'Automatic']
        },
        gpg: Boolean,
        bluetooth: Boolean,
        sunRoof: Boolean,
        heatedSeats: Boolean,
        leaderSeats: Boolean,
        convertible: Boolean     
    },
    horsePower: Number,
    engineType: {
        type: [String],
        enum: ['Diesel', 'Gasoline', 'Hybrid', 'Electric']
      },
    color: String,
    description: String,
    pictures: [String],
    owner: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Car = mongoose.model('Car', CarSchema)

module.exports = { Car }