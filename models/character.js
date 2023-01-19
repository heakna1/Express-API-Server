const mongoose = require('mongoose')

const Schema = mongoose.Schema

const characterSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		race: {
			type: String,
			required: true,
		},
        stamina: {
			type: Number,
			required: true,
		},
		strength: {
			type: Number,
			required: true,
		}
	},
	{
        timestamps: true
    }
)

// mongosh collection characters
const Character = mongoose.model('Character', characterSchema)

module.exports = Character

// node run server