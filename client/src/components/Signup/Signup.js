import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import API from "../../utils/API";

export class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      cpassword: ""
    };
  }
  state = {
    email: "",
    password: "",
    cpassword: ""
  }
  send = async (event) => {
    event.preventDefault();
    const { email, password, cpassword } = this.state;
    if (!email || email.length === 0) return alert("veuillez saisir un mail valide");
    if (!password || password.length === 0 || password !== cpassword) return alert("veuillez saisir un mot de passe valide avec confirmation");
    try {
      const { data } = await API.signup({ email, password });
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
  handleChangeCP = (event) => {
    this.setState({cpassword: event.target.value});
  };
  render() {
    return (
      <div className="Signup">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <form onSubmit={this.send}>
                <p className="h5 text-center mb-4">Inscription</p>
                <div className="grey-text">
                  <MDBInput label="Email" icon="envelope" group type="email" validate error="wrong"
                    value={this.state.email} onChange={this.handleChangeE.bind(this)} success="right" />
                  <MDBInput label="Mot de passe" icon="lock" group type="password" validate
                    value={this.state.password} onChange={this.handleChangeP.bind(this)} />

                  <MDBInput label="Confirmation de mot de passe" icon="exclamation-triangle" group type="password" validate
                    value={this.state.cpassword} onChange={this.handleChangeCP.bind(this)} error="wrong" success="right" />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" type="submit">Valider</MDBBtn>
                </div>
                <label className="mt-3">Vous avez déja un compte ?</label>
                <a className="m-2" href="/">Connectez-vous</a>
              </form>

            </MDBCol>
          </MDBRow>
        </MDBContainer>

      </div>
    );
  }
}