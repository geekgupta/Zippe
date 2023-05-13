import React, { useState } from 'react';
import "./login.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { authenticated } from '../redux/slicers';


const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate() ;  

  const dispatch = useDispatch() ; 


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const postData = async () => {
    const config = {
      headers: {
          "Content-Type": "application/json",
      }
      };
    const data = {
      'email' : email,
      'password':password,
      'phone' :phone 
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup',  data   , config);
      console.log(response.data);
      dispatch(authenticated()) ; 
      alert("SUbmit submited")
      return navigate("/");

      // Handle the response data
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic with email and password
    postData();
    console.log('Login form submitted');

  };


  const handleGoBack = () => {
    navigate.goBack(); // Navigates back in the browser history
  };


  return (
    <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Sign Up Form</h2>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5">

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic2 img-thumbnail rounded-circle my-3"
                width="150px" alt="profile"/>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="Email id" name = "email" value={email}
                onChange={handleEmailChange} />
            </div>
            <div class="mb-3">
              <input type="tel" class="form-control" id="mobile" 
                placeholder="Mobile no" name = "email"  value={phone} onChange={handlePhoneChange}/>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="password" value={password}
                onChange={handlePasswordChange} />
            </div>
            
            <div class="text-center"><button class="btn btn-color px-5 mb-5 w-100" onClick={handleSubmit}>Sign Up</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">
               <button onClick={handleGoBack}  class="text-dark fw-bold ">Go Back</button>

            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
  );
};

export default SignUpPage;
