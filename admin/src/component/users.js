import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../directives/header';
import Footer from '../directives/footer';
import Sidebar from '../directives/sidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getUsersListAction, UserBlockAction, UserUnBlockAction } from '../Action/action';
import moment from 'moment';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Users = () => {
    const [form, setForm] = useState({ from_date: '', to_date: '' });
    const [usersList, setusersList] = useState({});
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        getUsersList();
    }, [])

    const getUsersList = async () => {
        setLoader(true)
        let res = await getUsersListAction(form);

        if (res.success) {
            setLoader(false)
            setusersList(res.data)
        }
    }

    const UserBlock = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Block this User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Block it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await await UserBlockAction({ 'id': id });
                if (res.success) {
                    getUsersList();
                    Swal.fire(
                        'Success!',
                        'User blocked successfully!!',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Failed!',
                        res.msg,
                        'error'
                    )
                }
            }
        })
    }

    const UserUnBlock = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Unblock this User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Unblock it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await await UserUnBlockAction({ 'id': id });
                if (res.success) {
                    getUsersList();
                    Swal.fire(
                        'Success!',
                        'User Unblocked successfully!!',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Failed!',
                        res.msg,
                        'error'
                    )
                }
            }
        })
    }

    const copieBtn = async () => {
        toast.success(`Coppied!!`);
    }

    const columns = [
        {
            key: "Sno.",
            text: "Sno.",
            cell: (row, index) => index + 1
        },

        {
            key: "email",
            text: "Email",
            cell: (item) => {
                return (
                    <>
                        {item.email}
                        &nbsp; <CopyToClipboard text={item.email}>
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#8c339d' }}>
                                <i class="fa fa-copy "></i></sapn></CopyToClipboard><br />

                        {item.bnb_address?
                        item.bnb_address.substring(0, 6) + '....' + item.bnb_address.substring(item.bnb_address.length - 6) : ""}
                        &nbsp; <CopyToClipboard text={item.bnb_address}> 
                            <sapn title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: '#8c339d' }}>
                                <i class="fa fa-copy "></i></sapn></CopyToClipboard>
                                &nbsp; (#{item.id})
                    </>

                );
            }
        },
        {
            key: "created_at",
            text: "Joining Date",
            cell: (item) => {
                return (
                    `${moment(item.created_at).format('DD/MM/YYYY')}`
                );
            }
        },
        {
            key: "action",
            text: "Action",
            cell: (item) => {
                return (
                    <>

                        <div class="btn-group mb-5">
                            <button type="button" class="waves-effect waves-light btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Action</button>
                            <div class="dropdown-menu" data-popper-placement="top-start" style={{ position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(0px, -43px)' }}>
                                {item.blocked === 0 ?
                                    <a class="dropdown-item" href='javascript:;' onClick={() => UserBlock(item.id)}><i className='fa fa-ban'></i> Block</a>
                                    : item.blocked === 1 ?
                                        <a class="dropdown-item" href='javascript:;' onClick={() => UserUnBlock(item.id)}><i className='fa fa-unlock'></i> Unblock</a>
                                        :
                                        ''
                                }
                            </div>
                        </div>
                    </>
                );
            }
        },

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
                <Toaster />
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Users List</h3>

                                </div>

                            </div>
                            <hr />
                        </div>

                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-body">

                                            {!loader ?
                                                <ReactDatatable
                                                    config={configForTable}
                                                    records={usersList}
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
                    </div>
                </div>
                <Footer />
            </div>
        </>


    )

}
export default Users;