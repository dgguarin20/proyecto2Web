const express = require('express');

const router = express.Router();

const TaskSignin = require('../models/task_signin');

router.get('/', async (req, res) => {
    const tasks = await TaskSignin.find();
    res.json(tasks);
  });

  router.post('/', async (req, res) => {

 
    const {nombre, apellido, correo, clave } = req.body;
    const task = new TaskSignin({nombre, apellido, correo, clave});
    await task.save();
    res.json({status: 'Task Saved'});
  });

  module.exports = router;
