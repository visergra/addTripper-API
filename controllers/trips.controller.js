mongoose = require('mongoose');
const Trip = require('../models/trip.model');

module.exports.create = (req, res, next) => {
    Trip.create(req.body)
        .then(trip => res.status(201).json(trip))
        .catch(err => next(err));
}

module.exports.edit = (req, res, next) => {
    Trip.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        .then(trip => {
            if (!trip) {
                res.status(404).json();
            } else {
                res.status(200).json(trip)
            }
        })
        .catch(err => next(err));
}

module.exports.register = (req, res, next) => {
    let criteria = { "_id": req.params.id, "owner":{ "$ne": req.body.assistant}, "applications.assistant": { "$ne": req.body.assistant}}
    Trip.findOneAndUpdate(criteria,{ "$addToSet": {"applications": { "assistant": req.body.assistant, "status": 'OPEN' }}}, { new: true })                           
    .populate('owner')
    .populate('applications.assistant')
    .then(trip => {
        if (!trip) {
            res.status(404).json({message: 'The user is already assistant or owner'});
        } else {
            res.status(200).json(trip)
        }
    })
        .catch(err => next(err));
}

module.exports.approve = (req, res, next) => {
    let criteria = { "_id": req.params.id, "applications.assistant": req.body.assistant}

    Trip.update(criteria, {'$set': { 'applications.$.status': 'APPROVED' }})
        .populate('owner')
        .populate('applications.assistant')
        .then(trip => { res.status(200).json(trip) })
        .catch(err => next(err));
}

module.exports.reject = (req, res, next) => {
    let criteria = { "_id": req.params.id, "applications.assistant": req.body.assistant}

    Trip.update(criteria, {'$set': { 'applications.$.status': 'REJECTED' }})
        .populate('owner')
        .populate('applications.assistant')
        .then(trip => { res.status(200).json(trip) })
        .catch(err => next(err));
}

module.exports.getAll = (req, res, next) => {
    Trip.find()
        .populate('owner')
        .populate('applications.assistant')
        .then(trips => res.status(200).json(trips))
        .catch(err => next(err));
}

module.exports.get = (req, res, next) => {
    Trip.find(req.params.id)
        .populate('owner')
        .populate('applications.assistant')
        .then(trip => res.status(200).json(trip))
        .catch(err => next(err));
}

module.exports.remove = (req, res, next) => {
    Trip.remove({
            _id: req.params.id
        })
        .then(removed => {
            if (removed.result.n > 0) {
                res.status(200).json();
            } else {
                res.status(404).json();
            }
        })
        .catch(err => next(err));
}