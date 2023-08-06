import React, { } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import config from "./coreFIles/config";
import About from "./component/about";
import Home from "./component/index";
import Allmaterial from "./component/allmaterial";
import Signup from "./component/signup";
import Login from "./component/login";
import Allcourses from "./component/allcourses";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={`${config.baseUrl}`} element={<Home />} />
          <Route path={`${config.baseUrl}about`} element={<About />} />
          <Route path={`${config.baseUrl}allcourses`} element={<Allcourses />} />
          <Route path={`${config.baseUrl}allmaterial/:id`} element={<Allmaterial />} />
          <Route path={`${config.baseUrl}signup`} element={<Signup />} />
          <Route path={`${config.baseUrl}login`} element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
