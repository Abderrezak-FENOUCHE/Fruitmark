import React from "react";
//import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import API from "../../utils/API";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    
    };
  }
  send = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || email.length === 0) {
      return alert("veuillez saisir un mail valide")
    }
    if (!password || password.length === 0) {
      return alert("veuillez saisir un mot de passe valide")
    }
    try {
      const { data } = await API.login(email, password);
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", email);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChangeE = (event) => {
    this.setState({email: event.target.value});
  };
  handleChangeP = (event) => {
    this.setState({password: event.target.value});

  };
  
  render() {
    return (
      <div className="Login">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <form onSubmit={this.send}>
                <p className="h5 text-center mb-4">Authentification</p>
                <div className="grey-text">
                  <MDBInput label="Tapez votre email" icon="envelope" group type="email" validate error="wrong" 
                    onChange = {this.handleChangeE} success="right" />
                  <MDBInput label="Tapez votre mot de passe" icon="lock" group type="password" 
                    onChange = {this.handleChangeP} validate />
                </div>
                <div className="text-center">
                  <MDBBtn  type="submit">Valider</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
          <br></br>
        <label className="mt-3">Vous n'avez pas encore de compte ?</label>
        <a className=" m-2" href="/signup">Créez en un </a>
        </MDBContainer>

        
      </div>

    );
  }
}