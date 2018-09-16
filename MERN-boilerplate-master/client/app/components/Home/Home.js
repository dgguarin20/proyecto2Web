import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/storage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Appointment from '../Appointment/Appointment';



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: ''
    };
    this.logOut = this.logOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token){
       const { token } = obj;
      fetch('/api/account/verify?token=' +token)
      .then(res => res.json())
      .then(json =>{
        if(json.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      })
    }
    else {
      this.setState({
        isLoading: false
      });
    }
  }
  signUp(signUpToken){
    this.setState({
      token: signUpToken
    });
  }  
  signIn(logInToken){
    this.setState({
      token: logInToken
    });
  }
  logOut(){
    this.setState({
      isLoading: true
    });

    const obj = getFromStorage('the_main_app');
    if (obj && obj.token){
       const { token } = obj;
      fetch('/api/account/logout?token=' +token)
      .then(res => res.json())
      .then(json =>{
        if(json.success) {
          this.setState({
            token: '',
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      })
    }
    else {
      this.setState({
        isLoading: false
      });
    }
  }
  render() {
    const {
      isLoading,
      token
    } = this.state;
    if(isLoading){
      return (
        <div>
        <p>...Loading...</p>
        </div>);
    }
    if(!token){
      return (
        <div>
          <div>
            <h1>Bienvenido</h1>
          </div>
          <div>
            <div className="container">  
              <div className="row">
                <SignUp signUp={this.signUp}/>
                <SignIn signIn={this.signIn}/>
              </div>
            </div>
          </div>
        </div>
        );
    }
    return (
      <div>
      <p>Salir</p>
      <button type="button" className="btn btn-danger" onClick={this.logOut}>Salir</button>
      <Appointment/>
      </div>
    );
  }
}

export default Home;
