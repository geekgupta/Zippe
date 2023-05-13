import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
