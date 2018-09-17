const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  nombre:{ type: String, required: true }, 
  apellido: { type: String, required: true },
  correo: { type: String, required: true }, 
  clave: { type: String, required: true }
});

module.exports = mongoose.model('Tasksignin', TaskSchema);
