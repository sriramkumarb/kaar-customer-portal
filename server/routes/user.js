const express = require('express');

const router = express.Router()

const bodyParser = require('body-parser');

const { User } = require('../db/models/index')

const cors = require('cors')

router.use(cors()) // Use this after the variable declaration

router.use(bodyParser.json());

router.post('/register', function (req, res, next) {

    var user = new User({
        email: req.body.data.email,
        username: req.body.data.username,
        password: req.body.data.password,
        creation_dt: Date.now()
    });

    let promise = user.save();

    promise.then(function (doc) {
        return res.status(201).json(doc);
    })

    promise.catch(function (err) {
        return res.status(501).json({ message: 'Error registering user.' })
    })
})
module.exports = router