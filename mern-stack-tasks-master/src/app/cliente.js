import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './css/react-datepicker.css';
import './style.css';

class cliente extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      HoraLlegada: '',
      HoraSalida:'',
      idMasajista:'',
      _id: '',
      shown: true,
      tasks: [],
      taskclient: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeD = this.handleChangeD.bind(this);
    this.toggle = this.toggle.bind(this);
    this.lookdate = this.lookdate(this);
    this.addTask = this.addTask.bind(this);
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
    this.fetchTasksC();
	}
		
  handleChangeD(date) {
    this.setState({
      startDate: date
    });
  }
  lookdate(){
    const fecha = e.target;

  }
  

  deleteTask(id) {
    if(confirm('Are you sure you want to delete it?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Task deleted'});
          this.fetchTasks();
        });
    }
  }



  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
  }
  
  fetchTasksC() {
    fetch('/api/cliente')
      .then(res => res.json())
      .then(data => {
        this.setState({taskclient: data});
        console.log(this.state.taskclient);
      });
  }

  render() {
    var shown = {
			display: this.state.shown ? "block" : "none"
		};
		
		var hidden = {
			display: this.state.shown ? "none" : "block"
    }
    
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue ">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">CampitoSpa Masajista </a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  
                    <div className= "row">
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeD}
                      />
                    </div>
                   
                    <button onClick={()=>this.lookdate()}  type="submit" className="btn light-blue ">
                      Send 
                    </button>
                
                </div>
              </div>
            </div>  
            <br></br>
            <button onClick={() =>this.toggle()} className="btn light-blue ">
                <span style={shown}>Citas</span>   
                <span style={hidden}>horario</span>   
            </button> 
           < br></br>    
            <div className="col s7" style={shown}>
        
              <table>
                <thead>
                  <tr>
                    <th>dia</th>
                    <th>Hora Llegada</th>
                    <th>Hora Salida</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.startDate}</td>
                          <td>{task.HoraLlegada}</td>
                          <td>{task.HoraSalida}</td>
                          <td>
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue ">
                              <i className="material-icons">delete</i> 
                            </button>
 
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="col s7" style={hidden}>
        
              <table>
                <thead>
                  <tr>
                    <th>dia</th>
                    <th>Hora Llegada</th>
                    <th>Hora Salida</th>
                    <th>nombre Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.taskclient.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.startDate}</td>
                          <td>{task.HoraLlegada}</td>
                          <td>{task.HoraSalida}</td>
                          <td>{idMasajista}</td>
                          <td>

                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default cliente;
