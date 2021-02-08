import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody,
  MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput
} from "mdbreact";
import API from "../../utils/API";
import './Dashboard.css'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      magDepart: "",
      magArrivee: "",
      fruit: "",
      quantite: ""
    };

  }
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidMount() {
    this.getAllMagasins();
  }

  getAllMagasins = async () => {
    try {
      const response = await API.getAllmagasins();
      this.setState({ data: response.data })
    } catch (error) {
      console.error(error);
    }
  };

  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  handleChangeMDepart = (event) => {
    this.setState({ magDepart: event.target.value });
  };
  handleChangeMArrivee = (event) => {
    this.setState({ magArrivee: event.target.value });
  };
  handleChangeFruit = (event) => {
    this.setState({ fruit: event.target.value });
  };
  handleChangeQuantite = (event) => {
    if (event.target.value < 0) {
      return alert("Veuillez saisir une valeur positive")
    }
    this.setState({ quantite: event.target.value });
  };

  transferFruit = async (event) => {
    //event.preventDefault()
    const magasinDepart = this.state.magDepart;
    const magasinArrrivee = this.state.magArrivee;
    const fruit = this.state.fruit;
    const quantite = parseInt(this.state.quantite);
    try {
      const response = await API.transferFruit(magasinDepart, magasinArrrivee, fruit, quantite);
      this.setState({ data: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="">

        < MDBNavbar color="default-color" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">FruitMark</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="#!">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" className="mr-1" />
                    {localStorage.getItem("username")}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem onClick={this.disconnect}>Deconnection</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="1"></MDBCol>
            <MDBCol md="10" className="text-center mt-2">
              <h2>Etat des stocks</h2>

              <form id="subForm" onSubmit={this.transferFruit}>
                <MDBRow className="pt-0">
                  <MDBCol md="3" className="pt-4 pr-0 pl-0">
                    <select onChange={this.handleChangeMDepart} className="browser-default custom-select" required>
                      <option selected hidden disabled value="">Magasin Départ</option>
                      {this.state.data && this.state.data.map((item) => <option value={item.localisation}>{item.localisation}</option>)}
                    </select>
                  </MDBCol>
                  <MDBCol md="3" className="pt-4  pr-0 pl-1">
                    <select onChange={this.handleChangeMArrivee} className="browser-default custom-select" required>
                      <option selected hidden disabled value=""> Magasin Arrivée</option>
                      {this.state.data && this.state.data.map((item) => <option value={item.localisation}>{item.localisation}</option>)}
                    </select>
                  </MDBCol>
                  <MDBCol md="2" className="pt-4 pr-0 pl-1">
                    <select onChange={this.handleChangeFruit} className="browser-default custom-select" required>
                      <option selected hidden disabled value="">Fruit</option>
                      <option value="Orange">Orange</option>
                      <option value="Banane">Banane</option>
                      <option value="Pomme">Pomme</option>
                      <option value="Fraise">Fraise</option>
                      <option value="Cerise">Cerise</option>
                    </select>
                  </MDBCol>
                  <MDBCol md="2" className="">
                    <MDBInput required onChange={this.handleChangeQuantite} label="Quantité" type="number" />
                  </MDBCol>
                  <MDBCol md="2" className="pt-3 pr-0 pl-1">
                    <MDBBtn type="submit" >Transferer</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>


              {!this.state.data &&
                <>
                  <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
              }

              <MDBTable bordered>
                {this.state.data &&
                  <MDBTableHead>
                    <tr>
                      <th>Localisation</th>
                      <th>Stock</th>
                    </tr>
                  </MDBTableHead>

                }

                <MDBTableBody>
                  {this.state.data &&
                    this.state.data.map((item) =>

                      <tr>
                        <td className="m-5 p-5"><br></br>{item.localisation}</td>
                        <td className="p-1">
                          Orange :  {item.stock.Orange}<hr className="m-1"></hr>
                          Banane :  {item.stock.Banane}<hr className="m-1"></hr>
                          Pomme : {item.stock.Pomme}<hr className="m-1"></hr>
                          Fraise :  {item.stock.Fraise}<hr className="m-1"></hr>
                          Cerise :  {item.stock.Cerise}
                        </td>
                      </tr>
                    )
                  }
                </MDBTableBody>
              </MDBTable>
            </MDBCol>
            <MDBCol md="1"></MDBCol>
          </MDBRow>
        </MDBContainer>




      </div>
    );
  }
}