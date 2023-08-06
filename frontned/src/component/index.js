import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import { Link, NavLink } from 'react-router-dom'
import config from '../coreFIles/config'
import { statisticsAction, coursesAction } from '../Action/action';

const Index = () => {

  const [statistics, setStatistics] = useState({});
  const [coursesList, setCourses] = useState([]);

  useEffect(() => {
    getStatisticsAPI();
    getCoursesAPI();
  }, [])

  const getStatisticsAPI = async (e) => {
    let res = await statisticsAction();
    if (res.success) {
      setStatistics(res.data);
    }
  }

  const getCoursesAPI = async (e) => {
    let res = await coursesAction();
    if (res.success) {
      setCourses(res.data);
    }
  }

  return (

    <>
      <div>
        <Header />
        {/* ======= Hero Section ======= */}
        <section id="hero" className="d-flex justify-content-center align-items-center">
          <div className="container position-relative" data-aos="zoom-in" data-aos-delay={100}>
            <h1>Learning Today,<br />Leading Tomorrow</h1>
            <h2>One who struggles is better than one who never strives.</h2>
            <Link to={`${config.baseUrl}login`} className="btn-get-started">Get Started</Link>
          </div>
        </section>{/* End Hero */}
        <main id="main">
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

          {/* ======= Counts Section ======= */}
          <section id="counts" className="counts section-bg">
            <div className="container">
              <div className="row counters">
                <div className="col-lg-4 col-6 text-center">
                  {statistics?.totalStudents ? statistics?.totalStudents : 0}
                  <p>Students</p>
                </div>
                <div className="col-lg-4 col-6 text-center">
                  {statistics?.totalCourse ? statistics?.totalCourse : 0}
                  <p>Courses</p>
                </div>
                <div className="col-lg-4 col-6 text-center">
                  {statistics?.totalStudyMaterial ? statistics?.totalStudyMaterial : 0}
                  <p>Study Material</p>
                </div>
              </div>
            </div>
          </section>{/* End Counts Section */}
          {/* ======= Why Us Section ======= */}
          {/* End Why Us Section */}

          {/* ======= Popular Courses Section ======= */}
          <section id="popular-courses" className="courses">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2>Courses</h2>
                <p>Popular Courses </p>
                <Link to={`${config.baseUrl}allcourses`} >
                  <span style={{ float: 'right' }}>View All</span>
                </Link>
              </div>
              <div className="row" data-aos="zoom-in" data-aos-delay={100}>
                {coursesList.map((item, i) => {
                  return (
                    i < 3 ?
                      <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                        <NavLink to={`${config.baseUrl}allmaterial`}>
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
                      : ""
                  )
                })}

              </div>
            </div>
          </section>{/* End Popular Courses Section */}
        </main>{/* End #main */}
        <Footer />
      </div>
    </>
  )
}
export default Index;