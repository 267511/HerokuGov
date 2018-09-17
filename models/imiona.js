var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imionaSchema = new Schema(
{
	Rok: {
		type: String,
		required: true
	},
	Imię: {
		type: String,
		required: true,
	},
	Liczba: {
		type: String,
		required: true
	},
	Płeć: {
		type: String,
		required: true,
	}
}
);

module.exports = mongoose.model('imiona', imionaSchema, 'imiona');
