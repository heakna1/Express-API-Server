const express =require('express')

const Character = require('../models/character')

const router = express.Router()

//INDEX
// GET /characters
router.get('/players', (req, res, next) => {
    Character.find()
        .then(characters => {
            return characters.map(character => character)
        })
        .then(characters => {
            res.status(200).json({ characters: characters })
        })
        .catch(next)
})

// SHOW
// GET /characters/:id
router.get('/players/:id', (req, res, next) => {
    Character.findById(req.params.id)
        .then(character => {
            res.status(200).json({ character: character })
        })
        .catch(next)
})

// CREATE
// POST /characters
router.post('/players', (req, res, next) => {
    // req.body
    // character: {}
    Character.create(req.body.character)
        .then(character => {
            // top lvl of this object is character
            res.status(201).json({ character: character })
        })
        .catch(next)
})

router.delete("/players", (req, res, next) => {
    Character.deleteMany(req.body.character)
        .then(character => {
            res.status(200).json({ character: character })
        })
        .catch(next)
})

module.exports = router