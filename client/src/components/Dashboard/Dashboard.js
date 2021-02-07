import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody
} from "mdbreact";
import API from "../../utils/API";
import './Dashboard.css'

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isOpen: false
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
              {!this.state.data &&
              <>
                <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              </>
              }
              <MDBTable bordered>
                    <MDBTableHead>
                      <tr>
                        <th>Localisation</th>
                        <th>Stock</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>

              {this.state.data &&
                this.state.data.map((item) =>
                  
                      <tr>
                        <td className="m-5 p-5">{item.localisation}</td>
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