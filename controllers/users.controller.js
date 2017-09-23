mongoose = require('mongoose');
const User = require('../models/user.model');
const Trip = require('../models/trip.model');

module.exports.edit = (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new : true})
        .then(user => {
            if (!user) {
                res.status(404).json();
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => next(err));
}

module.exports.getAll = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => next(err));
}

module.exports.get = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => next(err));
}

module.exports.getTrips = (req, res, next) => {
    Trip.find( {$or: [ {'owner._id': req.params.id}, {'applications.assistant._id': req.params.id}]} )
        .populate('owner')
        .populate('applications.assistant')
        .then(trip => res.status(200).json(trip))
        .catch(err => next(err));
}

