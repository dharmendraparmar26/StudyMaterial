import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import config from '../coreFIles/config';
const Footer = () => {
  return (
    <>
      {/* ======= Footer ======= */}
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 footer-contact">
                <h3>Study Material</h3>
                <p>
               
                  <strong>Phone:</strong> +919009608232,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+919589871973<br />
                  <strong>Email:</strong> nitconquer2020@gmail.com,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;himanithakur0909@gmail.com <br />
                </p>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><i className="bx bx-chevron-right" /> <Link to={`${config.baseUrl}`}>Home</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to={`${config.baseUrl}about`}>About us</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to={`${config.baseUrl}course`}>Courses</Link></li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><i className="bx bx-chevron-right" /> <Link to={`${config.baseUrl}login`}>Login</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to={`${config.baseUrl}signup`}>Sign Up</Link></li>
                  <li><i className="bx bx-chevron-right" /> <Link to={`${config.baseUrl}contactUs`}>Contact Us</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
        <div className="container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              © Copyright <strong><span>Study Material</span></strong>. All Rights Reserved
            </div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
            <a target='_blank' href="https://www.facebook.com/himani.thakur.56232938?mibextid=ZbWKwL" className="facebook"><i className="bx bxl-facebook" /></a>
            <a target='_blank' href="https://www.instagram.com/8s_himani/" className="instagram"><i className="bx bxl-instagram" /></a>
            <a target='_blank' href="https://www.linkedin.com/in/tech-dcoderr" className="linkedin"><i className="bx bxl-linkedin" /></a>
          </div>
        </div>
      </footer>
      {/* <div id="preloader" /> */}
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
    </>
  )
}
export default Footer;