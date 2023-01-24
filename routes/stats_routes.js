const express = require('express')
const router = express.Router()

// require quest model
const Quest = require('../models/quest')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require("../config/auth")

// CREATE
// POST /stats/
router.post('/stats', requireToken ,(req, res, next) => {
	const questId = req.body.stats.questId

    const stats = req.body.stats
    //adding an owner field
    stats.owner = req.user._id

    //find Quest I want to add the stats to
    //once found, "push" stats into Mongoose Array
    //send status of 201 created if success
    //next if failure
	Quest.findById(questId)
		.then(handle404)
		.then((quest) => {
			quest.stats.push(stats)

            //have to save the doc when modified
			return quest.save()
		})

		.then(quest => {
            res.status(201).json({ quest: quest})
        })
		.catch(next)
})

//UPDATE
//PATCH/stats/:id
router.patch("/stats/:statsId", (req, res, next) => {
    const questId = req.body.stats.questId

    const statsBody = req.body.stats

    Quest.findById(questId)
        .then(handle404)
        .then(quest => {
            const stats = quest.stats.id(req.params.statsId)

            stats.set(statsBody)

            return quest.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

//DELETE
//DELETE/stats/:statsId
router.delete("/stats/:statsId", (req, res, next) => {
    const questId = req.body.stats.questId

    Quest.findById(questId)
    .then(handle404)
    .then(quest => {
        //finding correct stats to remove
        //.remove() we delete it
        quest.stats.id(req.params.statsId).remove()

        quest.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router