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
    Trip.find({ $and: [{ '_id': req.param.id}, {$or: [{'owner._id': req.body.assistant}, {'applications.assistant._id': req.body.assistant }]}]})
        .then(trip => {
            if (!trip) {
                Trip.findByIdAndUpdate(req.params.id, {
                        $addTosSet: req.body
                    }, {
                        new: true
                    })
                    .then(trip => {
                        if (!trip) {
                            res.status(404).json({ message: 'The trip does not exist' });
                        } else {
                            res.status(200).json(trip)
                        }
                    })
                    .catch(err => next(err));
            } else {
                res.status(404).json({ message: 'The assistant is already registered or is the owner' });
            }
        })
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
    Trip.find(req.param.id)
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