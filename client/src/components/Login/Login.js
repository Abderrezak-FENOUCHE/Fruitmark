import React from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import API from "../../utils/API";

export class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  send = async () => {
    const { email, password } = this.state;
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", email);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="Login">
        <h4 className="text-center mb-5">Authentification</h4>
        <Form onSubmit={this.send}> 
          <FormGroup controlId="email" >
            <label>Nom d'utilisateur</label>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" >
            <FormLabel>Mot de passe</FormLabel>
            <FormControl
              value={password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <br></br>
          <Button className="btn-success"  block bssize="large" type="submit">
            Connexion
        </Button>
        </Form>

        <br></br>
        <label className="mt-3">Vous n'avez pas encore de compte ?</label>
        <a className=" m-2" href="/signup">Créez en un </a>
      </div>

    );
  }
}