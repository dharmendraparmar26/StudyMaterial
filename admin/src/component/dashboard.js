import React, { useEffect, useState } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import { getDashboardStatisticsAction } from '../Action/action';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalStudyMaterial : 0,
    totalCourses : 0
  });

  useEffect(() => {
    getDashboardStatistics();
  }, []);

  const getDashboardStatistics = async () => {
    let res = await getDashboardStatisticsAction();
    if (res.success) {
      let data = res.data;
      setStatistics((old) => {
        return {
          ...old,
          'totalUsers': data.totalUsers,
          'totalStudyMaterial': data.totalStudyMaterial,
          'totalCourses': data.totalCourses
        }
      })
    }
  }

  return (

    <>
      <div class="wrapper">
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Dashboard</h3>
                </div>
              </div>
            </div>
            <section className="content pt-0">
              <div className="row">
                <div className="col-xl-12 col-12">
                  <div className="row">
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="dashboard box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Users</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalUsers}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="dashboard box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4>Total Study Material</h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalStudyMaterial}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="box">
                        <div className="dashboard box-body">
                          <div className="no-line-chart d-flex align-items-end justify-content-between">
                            <div>
                              <p className="mb-0"><h4> Total Courses </h4></p>
                              <p className="mb-0">
                                <h5>{statistics.totalCourses}</h5>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
export default Dashboard;