import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './css/react-datepicker.css';


class App extends Component {

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

  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          startDate: this.state.startDate,
          HoraLlegada: this.state.HoraLlegada,
          HoraSalida: this.state.HoraSalida,
          idMasajista: this.state.idMasajista
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Task Updated'});
          this.setState({_id: '', startDate: '', HoraLlegada: '', HoraSalida:'',idMasajista:''});
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
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
          this.setState({startDate: '', HoraLlegada: '', HoraSalida: '', idMasajista:''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

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

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          startDate: data.startDate,
          HoraLlegada: data.HoraLlegada,
          HoraSalida: data.HoraSalida,
          idMasajista: data.HoraSalida,
          _id: data._id
        });
      });
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
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Pagina para </a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className= "row">
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeD}
                      />
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="HoraLlegada" onChange={this.handleChange} value={this.state.HoraLlegada} type="text" placeholder="Task HoraLlegada" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="HoraSalida" onChange={this.handleChange} value={this.state.HoraSalida} cols="30" rows="10" placeholder="Task HoraSalida" className="materialize-textarea"></textarea>
                      </div>
                      <div className="row">
                      <div className="input-field col s12">
                        <textarea name= "idMasajista" onChange={this.handleChange} value={this.state.idMasajista} cols="30" rows="10" placeholder="Task idMasajista" className="materialize-textarea"></textarea>
                      </div>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>  
            <br></br>
            <button onClick={() =>this.toggle()} className="btn light-blue darken-4">
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
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
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
                          <td>{task.nombre}</td>
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

export default App;
