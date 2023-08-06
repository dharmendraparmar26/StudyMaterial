import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import config from "../coreFIles/config";
import toast, { Toaster } from "react-hot-toast";
import ReactDatatable from "@ashvin27/react-datatable";
import { deletecourseAction, getcourselistAction, insertCourseAction } from "../Action/action";
import Swal from "sweetalert2";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const CourseManagement = () => {
  const [getcourselist, setCourseList] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", id: "", photo: '', old_photo:'', description: '' });
  const [nameError, setnameError] = useState('');
  const [descriptionError, setdescriptionError] = useState('');
  const [isEdit, setisEdit] = useState(0);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setForm({ 'name': '', 'id': '' });
    setisEdit(0);
  }

  const editCourse = async (data) => {
    setisEdit(1);
    setOpen(true)
    setForm({ 'name': data.name, 'id': data.id, 'description': data.description, 'photo' : '', 'old_photo' : data.photo });
  }

  useEffect(() => {
    getcourse();
  }, []);

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setForm((old) => {
      return { ...old, [name]: value };
    });
  };

  const getcourse = async () => {
    let res = await getcourselistAction();
    if (res.success) {
      setCourseList(res.data);
    }
  };

  const columns = [
    {
      key: "Sno.",
      text: "Sno.",
      cell: (row, index) => index + 1,
    },

    {
      key: "name",
      text: "Name",
      cell: (item) => {
        return `${item.name}`;
      },
    },

    {
      key: "description",
      text: "Description",
      cell: (item) => {
        return (
          <>
          <span>
          {item.description}
          </span>
          </>
        );
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
      key: "action",
      text: "Action",
      cell: (item) => {
        return (
          <>
            <button onClick={() => editCourse(item)} className="btn-sm btn-primary">Edit</button>
            &nbsp;
            <button
              type="button"
              className="btn btn-sm btn-default"
              id="editbtnid"
              onClick={() => deletecategory(item)}
            >
              {" "}
              Delete
            </button>{" "}
            &nbsp;
          </>
        );
      },
    },
  ];

  const configForTable = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "advance",
    button: {
      excel: false,
      print: false,
    },
  };

  const deletecategory = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deletecourseAction({ id: data.id });
        if (res.success) {
          getcourse();
          Swal.fire("Deleted!", res.msg, "success");
        } else {
          Swal.fire("Failed!", res.msg, "error");
        }
      }
    });
  };

  const insertCourse = async (e) => {
    e.preventDefault();

    if (!form.name) {
      setnameError('Please enter course name')
      return;
    }

    if (!form.description) {
      setdescriptionError('Please enter description')
      return;
    }

    form.isEdit = isEdit;
    let res = await insertCourseAction(form);
    if (res.success) {
      setForm({ 'name': '', 'id': '0' });
      setisEdit(0);
      setOpen(false);
      getcourse();
      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
  };

  const onphotoChange = event => {
    if (event.target.files && event.target.files[0]) {
      let photo = event.target.files[0];
      setForm((old) => {
        return { ...old, 'photo': photo }
      })
    }
  };

  return (
    <>
      <div class="wrapper">
        <Toaster />
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-full">
            {/* Main content */}
            <div className="content-header">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <h3 className="page-title mb-5 pb-2">Course Management</h3>
                </div>
              </div>
            </div>
            {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">Course Management</h4>
                      <button className="btn btn-primary" onClick={onOpenModal}>Add+</button>
                    </div>
                    <div className="box-body">
                      <ReactDatatable
                        config={configForTable}
                        records={getcourselist}
                        columns={columns}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Add or edit course model */}
            <Modal open={open} onClose={onCloseModal} center>
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="box-header with-border border-0">
                    <h4 className="box-title">{isEdit ? 'Edit' : 'Add'} Course</h4>
                  </div>
                  <div className="row mt-20 mb-50">
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="col-md-8">
                        <div className="form-group row mb-1">
                          <label className="col-form-label col-md-12">
                            Name
                          </label>
                          <div className="col-md-12">
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={inputHandler}
                              placeholder="Enter course name"
                            />
                          </div>
                          <span className="validationErr">
                            {nameError}
                          </span>
                        </div>

                        <div className="form-group row mb-1">
                          <label className="col-form-label col-md-12">
                            Description
                          </label>
                          <div className="col-md-12">
                            <input
                              className="form-control"
                              type="text"
                              name="description"
                              value={form.description}
                              onChange={inputHandler}
                              placeholder="Enter Description"
                            />
                          </div>
                          <span className="validationErr">
                            {descriptionError}
                          </span>
                        </div>

                          <div className="form-group row mb-1">
                            <label className="col-form-label col-md-12">
                              Photo(Thumbnail)
                            </label>
                            <div className="col-md-12">
                            {isEdit && form.photo == ""?
                              <img height={150} width={200} src={config.imageUrl + form.old_photo} />
                            :""}
                              <input
                                className="form-control"
                                type="file"
                                name="photo"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={onphotoChange}
                              />
                            </div>
                          </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary mt-15"
                            onClick={insertCourse}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default CourseManagement;
