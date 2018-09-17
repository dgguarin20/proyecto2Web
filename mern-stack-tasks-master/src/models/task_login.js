const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  correo: { type: String, required: true }, 
  clave: { type: String, required: true }
});

module.exports = mongoose.model('Tasklogin', TaskSchema);
