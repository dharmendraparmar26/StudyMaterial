import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'

const About = () => {
  return (
    <>
      <Header />
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <div className="breadcrumbs" data-aos="fade-in">
          <div className="container">
            <h2>About Us</h2>
            <p> Welcome to our platform, your one-stop destination for comprehensive study materials and previous year papers catering to the needs of MCA, MBA, MTech, and BTech students. We are passionate about education and committed to empowering students with the tools they need to excel in their academic pursuits.   </p>
          </div>
        </div>
        {/* End Breadcrumbs */}
        {/* ======= About Section ======= */}
       <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="fade-left"
                data-aos-delay={100}
              >
                <img src="assets/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                <h2>What We Offer:</h2>
    <ul>
        <li><b>Extensive Study Materials:</b> Our platform houses a vast collection of study materials, carefully curated and designed by subject matter experts. Whether you're studying MCA, MBA, MTech, or BTech, you will find well-structured, easy-to-understand, and comprehensive materials that cover the entire syllabus.</li>
        <li><b>Previous Year Papers:</b> We understand the importance of practicing with previous year papers to gain insights into the exam pattern and question trends. We provide an extensive database of previous year papers for various courses to help you familiarize yourself with the examination format and boost your confidence.</li>
        <li><b>Topic-wise Resources:</b> To ensure effective learning, our study materials are organized topic-wise, making it convenient for you to navigate and focus on specific areas that require more attention.</li>
        
    </ul>

    
                  
               </div>
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  )
}
export default About;