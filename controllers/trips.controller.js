mongoose = require('mongoose');
const Trip = require('../models/trip.model');

module.exports.create = (req, res, next) => {
    Trip.create(req.body)
        .then(trip => res.status(201).json(trip))
        .catch(err => next(err));
}

module.exports.edit = (req, res, next) => {
    Trip.findByIdAndUpdate(req.params.id, { $set: req.body }, { new : true})
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
    Trip.find()
        .populate('owner')
        .then(trips => res.status(200).json(trips))
        .catch(err => next(err));
}

module.exports.get = (req, res, next) => {
    Trip.find(req.param.id)
        //.populate('trips')
        .then(trip => res.status(200).json(trip))
        .catch(err => next(err));
}
