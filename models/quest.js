// require mongoose
const mongoose = require('mongoose')
const statsSchema = require('./stats')

// Getting the Schema from Mongoose
const Schema = mongoose.Schema

// Creating a new quest Schema
const questSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		stats: [statsSchema]
	},
	{
		timestamps: true,
	}
)

// Creating a Mongoose Model called Quest
// Collection will be called quests
const Quest = mongoose.model('Quest', questSchema)

// Exporting Quest model to use elsewhere
module.exports = Quest