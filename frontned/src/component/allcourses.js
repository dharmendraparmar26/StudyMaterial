import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import { Link, NavLink } from 'react-router-dom'
import config from '../coreFIles/config'
import { coursesAction } from '../Action/action';

const Allcourses = () => {

  const [coursesList, setCourses] = useState([]);

  useEffect(() => {
    getCoursesAPI();
  }, [])

  const getCoursesAPI = async (e) => {
    let res = await coursesAction();
    if (res.success) {
      setCourses(res.data);
    }
  }

  return (
    <>
      <Header />
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <div className="breadcrumbs" data-aos="fade-in">
          <div className="container">
            <h2>ALL COURSES</h2>
          </div>
        </div>
        {/* End Breadcrumbs */}
        <section id="popular-courses" className="courses">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Courses</h2>
            </div>
            <div className="row" data-aos="zoom-in" data-aos-delay={100}>
              {coursesList.map(item => {
                return (
                  <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                    <NavLink to={`${config.baseUrl}allmaterial/${item.id}`}>
                      <div className="course-item">
                        {item.photo ?
                          <img src={`${config.imageUrl + item.photo}`} className="img-fluid" alt="..." />
                          :
                          <img src="assets/img/course-1.jpg" className="img-fluid" alt="..." />
                        }
                        <div className="course-content">
                          <h3>{item.name}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                )
              })}

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
export default Allcourses;