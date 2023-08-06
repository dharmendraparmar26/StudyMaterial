import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
const Header = () => {

  const loginData = (!Cookies.get('loginStudyMaterial')) ? [] : JSON.parse(Cookies.get('loginStudyMaterial'));

  const logout = async () => {
    Cookies.remove('loginStudyMaterial');
    window.location.href = config.baseUrl;
  }

  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto"><Link to={`${config.baseUrl}`}>Study Material</Link></h1>
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li><Link to={`${config.baseUrl}`}>Home</Link></li>
              <li><Link to={`${config.baseUrl}about`}>About</Link></li>
              <li><Link to={`${config.baseUrl}allcourses`}>Courses</Link></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>

          {loginData?.email ?
            <>
             &nbsp;&nbsp;&nbsp; Login Student : {loginData?.first_name}

             <Link to="#" onClick={logout} className="get-started-btn">Logout</Link>
            </>
            :
            <>
              <Link to={`${config.baseUrl}login`} className="get-started-btn">Login</Link>
              <Link to={`${config.baseUrl}signup`} className="get-started-btn">Sign Up</Link>
            </>
          }
        </div>
      </header>{/* End Header */}
    </>
  )
}
export default Header;