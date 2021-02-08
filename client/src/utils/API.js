import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const apiUrl = "http://localhost:5000";

export default {
  login: function(email, password) {
    return axios.post(
      `${apiUrl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${apiUrl}/user/signup`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  },

  getAllmagasins : ()=>{
    return axios.get(`${apiUrl}/magasins`,{headers: headers});
  },
  transferFruit: function(magasinDepart, magasinArrrivee, fruit, quantite) {  
    return axios.post(
      `${apiUrl}/magasins/transferFruit`,
      {
        magasinDepart,
        magasinArrrivee,
        fruit,
        quantite
      },
      {
        headers: headers
      }
    );
  },
};