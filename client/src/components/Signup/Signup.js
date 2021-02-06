import React from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import API from "../../utils/API";

export class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    cpassword: ""
  };
  send = async () => {
    const { email, password, cpassword } = this.state;
    if (!email || email.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    try {
      const { data } = await API.signup({ email, password });
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
    const { email, password, cpassword } = this.state;
    return (
      <div className="Signup">
        <h4 className="text-center mb-5">Inscription</h4>
        <Form onSubmit={this.send}> 
        <Form.Group controlId="email" >
          <Form.Label>Nom d'utilisateur : </Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password" >
          <Form.Label>Mot de passe :</Form.Label>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group controlId="cpassword" >
          <Form.Label>Confirmation Mot de passe</Form.Label>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <br></br>
        <Button  block bssize="large" type="submit">
          Inscription
        </Button>
        <br></br>
        <label className="mt-3">Vousavez déja compte ? </label>
        <a className=" m-2" href="/">Connectez-vous</a>
        
        </Form>

      </div>
    );
  }
}