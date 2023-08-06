import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import Sidebar from '../directives/sidebar'
import Swal from 'sweetalert2';
import ReactDatatable from '@ashvin27/react-datatable'
import { getMaterialsListAction } from '../Action/action';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';

const Materials = () => {
    const [getMaterials, setMaterials] = useState({});
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        getMaterialsList();
    }, []);

    const getMaterialsList = async () => {
        let res = await getMaterialsListAction();
        if (res.success) {
            setMaterials(res.data)
            setLoader(false)
        }
    }

    const columns = [
        {
            key: "Sno.",
            text: "Sno.",
            cell: (row, index) => index + 1
        },
        {
            key: "name",
            text: "Course Name",
            cell: (item) => {
                return <>
                    {item.course_name}
                </>;
            },
        },
        {
            key: "subject",
            text: "Subject",
            cell: (item) => {
                return <>
                    {item.subject}
                </>;
            },
        },        
        {
            key: "year",
            text: "Year",
            cell: (item) => {
                return <>
                    {item.year}
                </>;
            },
        },
        {
            key: "content",
            text: "Content",
            cell: (item) => {
                return (
                    <td nowrap="nowrap">
                        <span>
                            <p dangerouslySetInnerHTML={{ __html: item.content.toString().substring(0, 80) + '...' }}></p>
                        </span>
                    </td>
                )
            },
        },
        {
            key: "pdf",
            text: "Image",
            cell: (item) => {
                return (
                    <td nowrap="nowrap">
                        <a href={config.imageUrl+item.photo} target='_blank' >
                        <img height={100} width={100} src={config.imageUrl+item.photo} />
                        </a>
                    </td>
                )
            },
        },        
        {
            key: "pdf",
            text: "PDF",
            cell: (item) => {
                return (
                    <td nowrap="nowrap">
                        <a href={config.imageUrl+item.pdf} target='_blank' >
                        <button className='btn-sm btn-primary'>View</button>
                        </a>
                    </td>
                )
            },
        },
        {
            key: "date",
            text: "Date",
            cell: (item) => {
                return (
                    `${moment(item.date).format('DD/MM/YYYY hh:mm:ss')}`
                );
            }
        },
        // {
        //     key: "action",
        //     text: "Action",
        //     cell: (item) => {
        //         return (
        //             <>
        //                 <a className='btn btn-sm btn-primary' href={`${config.baseUrl}updateannocement/${item.id}`} id="editbtnid">Edit</a> &nbsp;
        //             </>
        //         );
        //     }
        // },
    ];

    const configForTable = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        button: {
            excel: false,
            print: false

        }
    }

    return (
        <>
            <div class="wrapper">
                {/* <div id="loader"></div> */}
                <Toaster />
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        {/* Main content */}
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Study Materials List</h3>

                                </div>

                            </div>
                            <hr />
                        </div>

                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">

                                    <div className="box">
                                        <div className="box-header with-border">

                                            <a href={`${config.baseUrl}addMaterial`} className='btn btn-sm btn-primary add_btn'>Add</a>
                                        </div>
                                        <div className="box-body">

                                            {!loader ?
                                                <ReactDatatable
                                                    config={configForTable}
                                                    records={getMaterials}
                                                    columns={columns}
                                                />
                                                :
                                                <>
                                                    <br />
                                                    <br />
                                                    <center><h4><i className='fa fa-spinner fa-spin'></i> &nbsp; Please wait</h4></center>
                                                    <br />
                                                    <br />
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                        {/* /.content */}
                        {/* /.content */}
                    </div>
                </div>

                <Footer />
            </div>
        </>


    )

}
export default Materials;