import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import { coursesMaterialDataAction } from '../Action/action';
import config from '../coreFIles/config';
import Cookies from 'js-cookie'
import { Link, useParams } from 'react-router-dom';

const Allmaterial = () => {
  const loginData = (!Cookies.get('loginStudyMaterial')) ? [] : JSON.parse(Cookies.get('loginStudyMaterial'));
  const [materialList, setCoursesMaterial] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    getCoursesMaterialDataAPI();
  }, [])

  const getCoursesMaterialDataAPI = async (e) => {
    let res = await coursesMaterialDataAction({ 'id': id });
    if (res.success) {
      setCoursesMaterial(res.data);
    }
  }

  return (
    <>
      <Header />
      <main id="main" data-aos="fade-in">
        {/* ======= Breadcrumbs ======= */}
        <div className="breadcrumbs">
          <div className="container">
            <h2>All Courses Materials</h2>
          </div>
        </div>
        {/* End Breadcrumbs */}
        {/* ======= Courses Section ======= */}
        <section id="courses" className="courses">
          <div className="container" data-aos="fade-up">

            <div className="row" data-aos="zoom-in" data-aos-delay={100}>

              {materialList.length > 0 ?
                materialList.map(item => {
                  return (
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                      <div className="course-item">
                        {item.photo ?
                          <img src={`${config.imageUrl + item.photo}`} className="img-fluid" alt="..." />
                          :
                          <img src="assets/img/course-1.jpg" className="img-fluid" alt="..." />
                        }
                        <div className="course-content">
                          <h3>Subject: {item.subject}</h3>
                          Course: {item.course_name} ({item.year})

                          <span style={{ float: 'right' }}>
                            {loginData?.email ?
                              <>
                                <a href={`${config.imageUrl + item.pdf}`} target='_blank' download>
                                  View Full Source
                                </a>
                              </>
                              :
                              <>
                                <Link to={`${config.baseUrl}login`} >
                                  View Full Source
                                </Link>
                              </>
                            }

                          </span>

                          <p>{item.content}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
                :
                <>
                  <center> <h5> No Data Found!!! </h5> </center>
                </>
              }
            </div>
          </div>
        </section>
        {/* End Courses Section */}
      </main>
      {/* End #main */}
      <Footer />
    </>
  )
}
export default Allmaterial;