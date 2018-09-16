const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  startDate:{ type: String, required: true }, 
  HoraLlegada: { type: String, required: true },
  HoraSalida: { type: String, required: true }, 
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Taskcliente', TaskSchema);
