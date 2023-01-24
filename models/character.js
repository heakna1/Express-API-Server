const mongoose = require('mongoose')

const Schema = mongoose.Schema

const characterSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		race: {
			type: String,
			required: true
		},
        stamina: {
			type: Number,
			required: true,
            min: 1,
            max: 30
		},
		strength: {
			type: Number,
			required: true,
            min: 1,
            max: 30
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