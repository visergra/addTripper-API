const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    start_datetime: {
        type: Date,
        required: [true, 'The start date is required']
    },
    finish_datetime: {
        type: Date,
        required: [true, 'The finish date is required']
    },
    location: {
        type: {
            type: String,
            required: [true, 'The location is required']
        },
        coordinates: [Number]
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'Trip needs a owner']
    },
    open_registration: {
        type: Boolean
     },
     max_assistants: {
        type: Number
     },
     estimated_budget: {
        type: Number
     },
     applications: [
         { status: { type: String, enum: ['OPEN', 'Approved', 'Rejected'], required: true , default: 'Open'},
         assistant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
     ],
}, {
    timestamps: true
});

tripSchema.index({ location: '2dsphere' });

const User = mongoose.model('Trip', tripSchema);
module.exports = User;
