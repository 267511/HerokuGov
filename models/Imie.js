var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImieSchema = new Schema(
{
	Rok: {
		type: Number,
		required: true
	},
	Imię: {
		type: String,
		required: true,
	},
	Liczba: {
		type: Number,
		required: true
	},
	Płeć: {
		type: String,
		required: true,
	}
}
);

module.exports = mongoose.model('Imie', ImieSchema);
