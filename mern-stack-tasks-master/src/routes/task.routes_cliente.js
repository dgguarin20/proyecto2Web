const express = require('express');
const router = express.Router();

const Taskcliente = require('../models/task_cliente');
const taski = require('../model/task')

router.get('/', async (req, res) => {
    const tasks = await Taskcliente.find();
    res.json(tasks);
  });

  router.post('/', async (req, res) => {
    const { startDate, HoraLlegada, HoraSalida, nombre } = req.body;
    const task = new Taskcliente({startDate, HoraLlegada, HoraSalida, nombre});
    await task.save();
    res.json({status: 'Task Saved'});
  });

  router.put('/', async (req, res) => {
    const startDate = req.body;
    taski.find({
      startDate: startDate
    },(err,users) =>{
      return users;
    }
    );
  });
  



  module.exports = router;
