const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
	clientEmail: {
		type: String,
		default: ''
	},
	idMassageU: {
		type: String,
		default: ''		
	},
	mType: {
		type: Number,
		default: ''		
	},
	day: {
		type: Date,
		default: ''		
	},
	startHour: {
		type: String,
		default: ''		
	},
	endHour: {
		type: String,
		default: ''		
	}
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
