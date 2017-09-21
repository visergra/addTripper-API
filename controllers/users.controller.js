mongoose = require('mongoose');
const User = require('../models/user.model');


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

