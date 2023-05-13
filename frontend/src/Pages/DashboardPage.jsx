import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import {logout} from '../redux/slicers'
import axios from "axios";
import "chart.js/auto";

function DashboardPage(props) {
  const islogin = useSelector((state) => state.counter.islogin);
  const token = useSelector((state) => state.counter.token);

  const [data , setdata] = useState([2,1]) ; 
  let navigate = useNavigate();

  useEffect(() => {
    if (!islogin) {
      return navigate("/login");
    }
    else{
      getEmailChart() ; 
    }
  }, []);
  const dispatch = useDispatch();
  const logout2 = () => {
    dispatch(logout()) ; 
    return navigate('/login') ; 
  };

  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: 'Example Dataset',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //     },
  //   ],
  // };

  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };
  const options = {
    // Other chart options
    redraw: false, // Prevents unnecessary re-rendering
  };
  
  const state = {
    labels: ["mail opened", "Mail not open"],
    datasets: [
      {
        label: "",
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#003350", "#35014F"],
        data: data,
      },
    ],
    
  };

  const getEmailChart = async () => {
    try {
      console.log("sdgfd" , token)
      const headers = {
        
        Authorization : `Bearer ${token}`
      };
      const response = await axios.get('http://127.0.0.1:8000/api/email-chart/' , {headers});
      const { emails_opened_today, emails_not_opened_today } = response.data;
      setdata([emails_opened_today, emails_not_opened_today])
  
      // Process the data as per your requirement
      console.log('Emails Opened Today:', emails_opened_today);
      console.log('Emails Not Opened Today:', emails_not_opened_today);
    } catch (error) {
      console.error('Error fetching email chart data:', error);
    }
  };
  

  return (
    <div class = " d-flex flex-column border justify-content-center" style={{height : '100vh'}}>
      <div class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-5">
        <div class="container">
          <a class="navbar-brand" href="#">
            Zippee
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <button class="nav-link" onClick={logout2}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="d-flex  justify-content-center mt-5">
        <div style={{height : '400px' , width : '400px'}}>
          <Pie
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              redraw: false,
            }}
          />
          <h4 class ="mt-5 text-center">Todays mail analysis </h4>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
