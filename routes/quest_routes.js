// require Express
const express = require('express')
const { requireToken } = require("../config/auth")
const { handle404 } = require('../lib/custom-errors')

// require the Model we just created
const Quest = require('../models/quest')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /quests
router.get('/quests', requireToken, (req, res, next) => {
	Quest.find()
		.then((quests) => {
			return quests.map((quest) => quest)
		})
		.then((quests) => res.status(200).json({ quests: quests }))
		.catch(next)
})

// SHOW
// GET /quests/
router.get('/quests/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Quest.findById(req.params.id)
		.then(handle404)
		.then((quest) => res.status(200).json({ quest: quest }))
		.catch(next)
})

// CREATE
// POST /quests
router.post('/quests', (req, res, next) => {
	Quest.create(req.body.quest)
		.then((quest) => {
			res.status(201).json({ quest: quest })
		})
		.catch(next)
})

// UPDATE
// PATCH /quests/5a7db6c74d55bc51bdf39793
router.patch('/quests/:id', (req, res, next) => {
	Quest.findById(req.params.id)
		.then(handle404)
		.then((quest) => {
			return quest.updateOne(req.body.quest)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /quests
router.delete('/quests/:id', (req, res, next) => {
	Quest.findById(req.params.id)
		.then(handle404)
		.then((quest) => {
			quest.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// exporting the router to use elsewhere
module.exports = router