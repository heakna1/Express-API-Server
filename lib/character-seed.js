const express = require('express')

const Character = require('../models/character')

const router = express.Router()

const startCharacters = [
	{
		firstName: 'Carene',
		race: 'High Elf',
		stamina: 15,
		strength: 12
	},
	{
		firstName: 'Brandr',
		race: 'Nord',
		stamina: 18,
		strength: 22
	},
	{
		firstName: 'Zabhyla',
		race: 'Khajit',
		stamina: 25,
		strength: 18
	},
]

router.get('/characters', (req, res, next) => {
	Character.deleteMany({})
        .then(() => {
            Character.create(startCharacters)
                .then((characters) => res.status(200).json({ characters: characters }))
        })
        .catch(next)
})

module.exports = router