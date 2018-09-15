import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      _id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          Dia: this.state.Dia,
          HoraLlegada: this.state.HoraLlegada,
          HoraSalida: this.state.HoraSalida,
          idMasajista: this.state._id
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Task Updated'});
          this.setState({_id: '', Dia: '', HoraLlegada: '', HoraSalida:'',idMasajista:''});
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
          this.setState({Dia: '', HoraLlegada: '', HoraSalida: '', idMasajista:''});
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
          Dia: data.Dia,
          HoraLlegada: data.HoraLlegada,
          HoraSalida: data.HoraSalida,
          idMasajista: data.idMasajista,
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

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">MERN Stack</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="Dia" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Dia" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="HoraLlegada" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="HoraLlegada" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="HoraSalida" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Hora Salida" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Hora Salida</th>
                    <th>Hora Salida</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
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
          </div>
        </div>

      </div>
    )
  }
}

export default App;
