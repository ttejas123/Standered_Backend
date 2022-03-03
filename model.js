const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: {
		type: String
	},
	img: {
		type: String
	},
	summary: {
		type: String
	}
})

schema.index({name: 'text'});
module.exports = mongoose.model("projectSchema", schema);