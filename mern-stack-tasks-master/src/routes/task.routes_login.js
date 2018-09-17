const express = require('express');
const User = require('../models/task_signin');
const router = express.Router();

const TaskLogin = require('../models/task_login');

router.get('/', async (req, res) => {
    const tasks = await TaskLogin.find();
    res.json(tasks);
  });

  router.post('/', async (req, res) => {
    const { correo, clave } = req.body;
    
    User.find({
      correo: correo
    },(err,users)=>{
      if (users.length<1){
        console.log(users.length)
    		return res.send({
          success: false,
    		});
        }
      const user = users[0];
      if(user.clave != clave)
      { console.log(user)
        return res.send({
          success: false,
    		});
      }

      return res.send({
      success: true}
      );
    }
    )
   
  });

  module.exports = router;
