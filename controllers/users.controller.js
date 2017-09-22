mongoose = require('mongoose');
const User = require('../models/user.model');
const Trip = require('../models/trip.model');

module.exports.edit = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new : true})
        .then(user => {
            if (!trip) {
                res.status(404).json();
            } else {
                res.status(200).json(trip)
            }
        })
        .catch(err => next(err));
}

module.exports.getAll = (req, res, next) => {
    User.find()
        //.populate('trips')
        .then(users => res.status(200).json(users))
        .catch(err => next(err));
}

module.exports.get = (req, res, next) => {
    User.find(req.param.id)
        //.populate('trips')
        .then(user => res.status(200).json(user))
        .catch(err => next(err));
}

module.exports.getTrips = (req, res, next) => {
    Trip.find( {$or: [ {'owner._id': req.param.id}, {'applications.assistant._id': req.param.id}]} )
        .populate('owner')
        .populate('applications.assistant')
        .then(trip => res.status(200).json(trip))
        .catch(err => next(err));
}

