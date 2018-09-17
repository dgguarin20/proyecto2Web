import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import moment from 'moment';
import './css/react-datepicker.css';
import './style.css';

class Signin extends Component {

    constructor(props) {
      super(props);
      this.state = {
        nombre : '',
        apellido :'',
        correo : '',
        clave : '',
        _id: '',
        shown: true,
        tasksignin: [],
        users :[],
        userC :'',
        usercl: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.toggle = this.toggle.bind(this);
      this.addTask = this.addTask.bind(this);
      this.compareLogin = this.compareLogin.bind(this);
    }
  
    handleChange(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
        
      });
    }

        
      toggle() {
          this.setState({
              shown: !this.state.shown
      });
      }


    addTask(e) {
     
      if(this.state._id) {
        fetch(`/api/signin/${this.state._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            correo: this.state.correo,
            clave: this.state.clave
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            window.M.toast({html: 'Task Updated'});
            this.setState({_id: '', nombre: '', apellido: '', correo:'',clave:''});
            this.fetchTasks();
          });
      } else {
        fetch('/api/signin', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            window.M.toast({html: 'Task Saved'});
            this.setState({nombre: '', apellido: '', correo: '', clave:''});
            this.fetchTasks();
          })
          
          .catch(err => console.error(err));
      }
  
    }
  
    componentDidMount() {
      this.fetchTasks();
    }
  
    fetchTasks() {
      fetch('/api/signin')
        .then(res => res.json())
        .then(data => {
          this.setState({tasksignin: data});
          console.log(this.state.tasks);
        });
    }
    compareLogin()
    {
      const {
        userC,
        usercl
      } = this.state;

      fetch('/api/login', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
		    correo: userC,
				clave: usercl 
      }), 
          
     }).then(res => res.json())
     .then(json => {
       if(json.success) {
       this.setState({
         userC: '',
         userCl: '',
       });
       alert(userC);
       alert("si")
      }
       else{
         alert(usercl);
         alert(userC);
       }
      })
    }

    render() {
      var shown = {
              display: this.state.shown ? "block" : "none"
          };
          
          var hidden = {
              display: this.state.shown ? "none" : "block"
      }
      
      return (
        <div >
          {/* NAVIGATION */}
          <nav className="light-blue">
            <div className="container">
              <div className="nav-wrapper" style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                <a href="#" className="brand-logo" style={{flex:1,justifyContent: "center",alignItems: "center"}}>Reservas de citas Spa el Campicito</a>
              </div>
            </div>
          </nav>
          <div className= "mensaje" style={{flex:1,justifyContent: "center",alignItems: "center"}}><h3 style={{textAlignVertical: "center",textAlign: "center",}}>Nuestro Masajes</h3></div>
          <br></br>
          <br></br>
          <div className= "row" style={{textAlignVertical: "center",textAlign: "center",}}>
            <div className = "col s4" >
            <div className = "row">
                <h5>Chocoloterapia</h5>
            </div>
            <div className = "row">
              <img src={require('./css/piedra.jpg')} width="300" height="200" style = {{borderColor:'white', borderWidth: 10,}}/>
            </div>
            </div>
            <div className = "col s4" style={{textAlignVertical: "center",textAlign: "center",}}>
            <div className = "row">
                <h5>Chocoloterapia</h5>
            </div>
            <div className = "row">
              <img src={require('./css/piedra.jpg')} width="300" height="200" />
            </div>
            
            </div>
            <div className = "col s4" style={{textAlignVertical: "center",textAlign: "center",}} >
            <div className = "row">
                <h5>Chocoloterapia</h5>
            </div>
            <div className = "row">
              <img src={require('./css/piedra.jpg')} width="300" height="200" />
            </div>
            </div>
            </div>
            <div className= "row" style={{textAlignVertical: "center",textAlign: "center",}}>
            <div className = "col s4" >
            <div className = "row">
                <h5>Chocoloterapia</h5>
            </div>
            <div className = "row">
              <img src={require('./css/piedra.jpg')} width="300" height="200" />
            </div>
            </div>
            <div className = "col s4" style={{textAlignVertical: "center",textAlign: "center",}}>
            <div className = "row">
                <h5>Chocoloterapia</h5>
            </div>
            <div className = "row">
              <img src={require('./css/piedra.jpg')} width="300" height="200" />
            </div>
            </div>
            <div className = "col s4" style={{textAlignVertical: "center",textAlign: "center",}} >
            <div className = "row">
                <h5>Chocoloterapia</h5>
            </div>
            <div className = "row">
              <img src={require('./css/piedra.jpg')} width="300" height="200" />
            </div>
            </div>
            </div>
          <div className="container" style={{textAlignVertical: "center",textAlign: "center",maxWidth: "500px"}}>
            <div className="row" style={{textAlignVertical: "center",textAlign: "center",}}>
            <div className="col s12"  style={{textAlignVertical: "center",textAlign: "center",} }>
                <div className="card">
                  <div className="card-content">
                    
                      <div className="row">
                        <h4>Correo</h4>
                        <div className="input-field col s12">
                          <input name="userC" onChange={this.handleChange} value={this.state.userC} type="text" placeholder="Task correo" autoFocus/>
                        </div>
                      </div>
                      <div className="row">
                       <h4>Clave</h4>
                        <div className="input-field col s12">
                          <textarea name="usercl" onChange={this.handleChange} value={this.state.usercl} cols="30" rows="10" placeholder="Task Clave" className="materialize-textarea"></textarea>
                        </div>
                      </div>
                     
                      <button onClick = {() => this.compareLogin()} type="submit" className="btn light-blue ">
                        Iniciar Sesion 
                      </button>
                      <br></br>
                      <br></br>
                      <button onClick={() =>this.toggle()} className="btn light-blue ">
                        <span style={shown}>Registrar</span>   
                        <span style={hidden}>Login</span>   
                      </button> 
                    
                  </div>
                </div>
              </div> 
              <div className="col s12" style = {hidden}>
                <div className="card">
                  <div className="card-content">

                      <div className="row">
                      <h4>Nombre</h4>
                        <div className="input-field col s12">
                          <input name="nombre" onChange={this.handleChange} value={this.state.nombre} type="text" placeholder="Task nombre" autoFocus/>
                        </div>
                      </div>
                      <div className="row">
                      <h4>Apellido</h4>
                        <div className="input-field col s12">
                          <textarea name= "apellido" onChange={this.handleChange} value={this.state.apellido} cols="30" rows="10" placeholder="Task apellido" className="materialize-textarea"></textarea>
                        </div>
                        <div className="row">
                        <h4>Correo</h4>
                        <div className="input-field col s12">
                          <textarea name= "correo" onChange={this.handleChange} value={this.state.correo} cols="30" rows="10" placeholder="Task correo" className="materialize-textarea"></textarea>
                        </div>
                        </div>
                        <div className="row">
                        <h4>Clave</h4>
                        <div className="input-field col s12">
                          <textarea name= "clave" onChange={this.handleChange} value={this.state.clave} cols="30" rows="10" placeholder="Task clave" className="materialize-textarea"></textarea>
                        </div>
                        </div>
                      </div>
  
                      <button type="submit" onClick={()=> this.addTask()} className="btn light-blue ">
                        Registrarse
                      </button>
                      <br></br>
                      <br></br>
                      <button onClick={() =>this.toggle()} className="btn light-blue ">
                        <span style={shown}>Registrar</span>   
                        <span style={hidden}>Login</span>   
                      </button> 
                  </div>
                </div>
              </div>  
              <br></br>

             < br></br>    
  

            </div>
          </div>
        </div>
      )
    }
  }

export default Signin;