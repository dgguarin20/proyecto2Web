import React, { Component } from 'react';
import AppointmentMPerson from './AppointmentMPerson';
class Appointment extends Component {
	constructor(props){
		super(props);

		this.state ={
			clientId:'',
			clientEmail: '',
			idMassageU: '',
			mType: '',
			day: '',
			startHour: '',
			endHour: '',
			createAppointmentError:''
		};
		this.handleChangeIdM = this.handleChangeIdM.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
		this.onTextChangeDay = this.onTextChangeDay.bind(this);
		this.onTextChangeStart = this.onTextChangeStart.bind(this);
		this.onTextChangeEnd = this.onTextChangeEnd.bind(this);
		this.addAppointment = this.addAppointment.bind(this);
	}
	// componentDidMount() {
	// 	const obj = getFromStorage('the_main_app');
 //    	if (obj && obj.token){
 //    		const { token } = obj;


//-----------------------------------------------------------------
	addAppointment(){
		let{
			idMassageU,
			mType,
			day,
			startHour,
			endHour
		}=this.state;
		let email = "correo3@pruebaa";
		console.log(email);
		console.log(idMassageU);
		console.log(mType);
		console.log(day);
		console.log(startHour);
		console.log(endHour);
	fetch('/api/appointment/create',
		{ 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				clientEmail: email,
				idMassageU: idMassageU,
				mType: mType,
				day: day,
				startHour: startHour,
				endHour: endHour 
			}),
	}).then(res => res.json())
	.then(json => {
		if(json.success) {
			this.setState({
				clientEmail: email,
				idMassageU: '',
				mType: '',
				day: '',
				startHour: '',
				endHour: '',
				created: false

			});
			console.log('Cita agendada');
		}
		else {
			this.setState({
				createAppointmentError: json.message
			});
		}
	})
 }



	onTextChangeStart(event){
		this.setState({startHour: event.target.value});
	}
	onTextChangeEnd(event){
		this.setState({endHour: event.target.value});
	}
	onTextChangeDay(event){
		this.setState({day: event.target.value});
	}

	handleChangeType(event) {
		this.setState({mType: event.target.value});
	}
  	handleChangeIdM(event) {
    	this.setState({idMassageU: event.target.value});
  	}



	render(){
		const {
   		day,
   		idMassageU,
   		mType,
   		startHour,
   		endHour,
   		created
   	} = this.state; 
		return(
			<div>
				<h2>Agende su cita</h2>
				<div id='dia'>
					<p>Selecciona el dia de tu visita</p>
					<input 
					type="text" 
					value={day}
					onChange={this.onTextChangeDay}
					/>
				</div>
				<div id='HorraLlegada'>
					<p>Selecciona tu hora de llegada</p>
					<input 
					type="text" 
					value={startHour}
					onChange={this.onTextChangeStart} 
					/>
				</div>
				<div id='HorraSalida'>
					<p>Selecciona tu hora de salida</p>
					<input 
					type="text" 
					value={endHour} 
					onChange={this.onTextChangeEnd}
					/>			
				</div>
				<div className="container">
					<AppointmentMPerson/>
				</div>
				<br/>
				<hr/>
				<button type="button" className="btn btn-info" onClick={this.addAppointment}>Aceptar</button>
			</div>

			);
	}

}
export default Appointment;