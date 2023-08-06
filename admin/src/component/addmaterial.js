// import React, { useEffect, useState } from "react";
// import Header from "../directives/header";
// import Footer from "../directives/footer";
// import Sidebar from "../directives/sidebar";
// import toast, { Toaster } from "react-hot-toast";
// import config from "../coreFIles/config";
// import { insertMaterialAction, getcourselistAction } from "../Action/action";
// import JoditEditor from "jodit-react";
// const Addmaterial = () => {
//     const [form, setForm] = useState({
//         course_id : 1,
//         subject:'',
//         year: "",
//         pdf: '',
//         photo : '',
//         content: ''
//     });
//     const [courseList, setcourseList] = useState([]);

//     useEffect(() => {
//         getCourseList();
//     }, []);

//     const inputHandler = async (e) => {
//         const { name, value } = e.target;
//         setForm((old) => {
//             return { ...old, [name]: value };
//         });

//     };

//     const inputHandler1 = async (e) => {
//         setForm((old) => {
//             return { ...old, content: e };
//         });
//     };

//     const onPdfChange = event => {
//         if (event.target.files && event.target.files[0]) {
//             let pdf = event.target.files[0];
//             setForm((old) => {
//                 return { ...old, 'pdf': pdf }
//             })
//         }
//     };    

//     const onphotoChange = event => {
//         if (event.target.files && event.target.files[0]) {
//             let photo = event.target.files[0];
//             setForm((old) => {
//                 return { ...old, 'photo': photo }
//             })
//         }
//     };    

//     const getCourseList = async () => {
//         let res = await getcourselistAction();
//         if (res.success) {
//             setcourseList(res.data)
//         }
//     }    

//     const insertMaterial = async (e) => {
//         e.preventDefault();
//             let res = await insertMaterialAction(form);
//             if (res.success) {
//                 toast.success(res.msg);
//                 setTimeout(() => {
//                     window.location.href = `${config.baseUrl}materials`
//                 }, 2000);
//             } else {
//                 toast.error(res.msg);
//             }
//     };

//     return (
//         <>
//             <div className="wrapper">
//                 {/* <div id="loader"></div> */}
//                 <Header />
//                 <Toaster />
//                 <Sidebar />
//                 <div className="content-wrapper">
//                     <div className="container-full">
//                         {/* Main content */}
//                         <div className="content-header">
//                             <div className="d-flex align-items-center">
//                                 <div className="me-auto">
//                                     <h3 className="page-title mb-5 pb-2">Add Study Material</h3>
//                                 </div>
//                             </div>
//                             <hr />
//                         </div>
//                         {/* Content Header (Page header) */}

//                         {/* Main content */}
//                         <section className="content">
//                             <div className="row">
//                                 <div className="col-lg-12 col-12">
//                                     <div className="box">
//                                         <div className="box-header with-border border-0">
//                                             <h4 className="box-title"></h4>
//                                         </div>
//                                         <div className="row mt-20 mb-50">
//                                             <div className="row">
//                                                 <div className="col-md-2"></div>
//                                                 <div className="col-md-8">

//                                                 <div className="form-group row mb-1">
//                                                         <label className="col-form-label col-md-12">
//                                                             Select Course
//                                                         </label>
//                                                         <div className="col-md-12">
//                                                             <select
//                                                                 className="form-control"
//                                                                 name="course_id"
//                                                                 onChange={inputHandler}
//                                                             >
//                                                                 {courseList.map((item) =>{
//                                                                     return(
//                                                                     <option value={item.id}>{item.name}</option>
//                                                                 )})}
//                                                             </select>
//                                                         </div>
//                                                     </div>

//                                                     <div className="form-group row mb-1">
//                                                         <label className="col-form-label col-md-12">
//                                                             Subject
//                                                         </label>
//                                                         <div className="col-md-12">
//                                                             <input
//                                                                 className="form-control"
//                                                                 type="text"
//                                                                 name="subject"
//                                                                 onChange={inputHandler}
//                                                                 placeholder="Enter subject name"
//                                                             />
//                                                         </div>
//                                                     </div>

//                                                     <div className="form-group row mb-1">
//                                                         <label className="col-form-label col-md-12">
//                                                             Year
//                                                         </label>
//                                                         <div className="col-md-12">
//                                                             <input
//                                                                 className="form-control"
//                                                                 type="number"
//                                                                 name="year"
//                                                                 onChange={inputHandler}
//                                                                 placeholder="Enter year of subject"
//                                                             />
//                                                         </div>
//                                                     </div>

//                                                     <div className="form-group row mb-1">
//                                                         <label className="col-form-label col-md-12">
//                                                             Photo(Thumbnail)
//                                                         </label>
//                                                         <div className="col-md-12">
//                                                             <input
//                                                                 className="form-control"
//                                                                 type="file"
//                                                                 name="photo"
//                                                                 accept="image/png, image/gif, image/jpeg"
//                                                                 onChange={onphotoChange}
//                                                             />
//                                                         </div>
//                                                     </div> 

//                                                     <div className="form-group row mb-1">
//                                                         <label className="col-form-label col-md-12">
//                                                             PDF
//                                                         </label>
//                                                         <div className="col-md-12">
//                                                             <input
//                                                                 className="form-control"
//                                                                 type="file"
//                                                                 name="pdf"
//                                                                 onChange={onPdfChange}
//                                                             />
//                                                         </div>
//                                                     </div>                                                    

//                                                     <div className="form-group row mb-1">
//                                                         <label className="col-form-label col-md-12">
//                                                             Content
//                                                         </label>
//                                                         <div className="col-md-12">
//                                                             <JoditEditor
//                                                                 onChange={inputHandler1}
//                                                                 placeholder="Enter content here.."
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-center">
//                                                         <button
//                                                             type="submit"
//                                                             className="btn btn-primary mt-15"
//                                                             onClick={insertMaterial}
//                                                         > Save </button>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-2"></div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>
//                         {/* /.content */}
//                     </div>
//                 </div>

//                 <Footer />
//             </div>
//         </>
//     );
// };
// export default Addmaterial;


import React, { useEffect, useState } from "react";
import Header from "../directives/header";
import Footer from "../directives/footer";
import Sidebar from "../directives/sidebar";
import toast, { Toaster } from "react-hot-toast";
import config from "../coreFIles/config";
import { insertMaterialAction, getcourselistAction, editMaterialAction, deleteMaterialAction } from "../Action/action";
import JoditEditor from "jodit-react";

const Addmaterial = () => {
    const [form, setForm] = useState({
        course_id : 1,
        subject:'',
        year: "",
        pdf: '',
        photo : '',
        content: ''
    });
    const [courseList, setcourseList] = useState([]);

    useEffect(() => {
        getCourseList();
    }, []);

    const inputHandler = async (e) => {
        const { name, value } = e.target;
        setForm((old) => {
            return { ...old, [name]: value };
        });
    };

    const inputHandler1 = async (e) => {
        setForm((old) => {
            return { ...old, content: e };
        });
    };

    const onPdfChange = event => {
        if (event.target.files && event.target.files[0]) {
            let pdf = event.target.files[0];
            setForm((old) => {
                return { ...old, 'pdf': pdf }
            });
        }
    };

    const onphotoChange = event => {
        if (event.target.files && event.target.files[0]) {
            let photo = event.target.files[0];
            setForm((old) => {
                return { ...old, 'photo': photo }
            });
        }
    };

    const getCourseList = async () => {
        let res = await getcourselistAction();
        if (res.success) {
            setcourseList(res.data)
        }
    };

    const insertMaterial = async (e) => {
        e.preventDefault();
        let res = await insertMaterialAction(form);
        if (res.success) {
            toast.success(res.msg);
            setTimeout(() => {
                window.location.href = `${config.baseUrl}materials`;
            }, 2000);
        } else {
            toast.error(res.msg);
        }
    };

    const editMaterial = async (materialId, updatedForm) => {
        try {
            // Make an API call to update the material with the given ID
            // Implement the editMaterialAction function in ../Action/action.js
            // Example:
            // const res = await editMaterialAction(materialId, updatedForm);

            // If the API call is successful, show a success toast and update the courseList
            // with the edited material
            // Example:
            // if (res.success) {
            //     toast.success(res.msg);
            //     setcourseList(courseList.map(item => item.id === materialId ? res.data : item));
            // } else {
            //     toast.error(res.msg);
            // }

        } catch (error) {
            console.error("Error editing material:", error);
            // Show an error toast if something goes wrong
            toast.error("Error editing material. Please try again later.");
        }
    };

    const deleteMaterial = async (materialId) => {
        try {
            // Make an API call to delete the material with the given ID
            // Implement the deleteMaterialAction function in ../Action/action.js
            // Example:
            // const res = await deleteMaterialAction(materialId);

            // If the API call is successful, show a success toast and update the courseList
            // with the remaining materials
            // Example:
            // if (res.success) {
            //     toast.success(res.msg);
            //     setcourseList(courseList.filter(item => item.id !== materialId));
            // } else {
            //     toast.error(res.msg);
            // }

        } catch (error) {
            console.error("Error deleting material:", error);
            // Show an error toast if something goes wrong
            toast.error("Error deleting material. Please try again later.");
        }
    };

    return (
        <>
            <div className="wrapper">
                {/* <div id="loader"></div> */}
                <Header />
                <Toaster />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        {/* Main content */}
                        <div className="content-header">
                            <div className="d-flex align-items-center">
                                <div className="me-auto">
                                    <h3 className="page-title mb-5 pb-2">Add Study Material</h3>
                                </div>
                            </div>
                            <hr />
                        </div>
                        {/* Content Header (Page header) */}

                        {/* Main content */}
                        <section className="content">
                            <div className="row">
                                <div className="col-lg-12 col-12">
                                    <div className="box">
                                        <div className="box-header with-border border-0">
                                            <h4 className="box-title"></h4>
                                        </div>
                                        <div className="row mt-20 mb-50">
                                            <div className="row">
                                                <div className="col-md-2"></div>
                                                <div className="col-md-8">

                                                <div className="form-group row mb-1">
                                                        <label className="col-form-label col-md-12">
                                                            Select Course
                                                        </label>
                                                        <div className="col-md-12">
                                                            <select
                                                                className="form-control"
                                                                name="course_id"
                                                                onChange={inputHandler}
                                                            >
                                                                {courseList.map((item) =>{
                                                                    return(
                                                                    <option value={item.id}>{item.name}</option>
                                                                )})}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group row mb-1">
                                                        <label className="col-form-label col-md-12">
                                                            Subject
                                                        </label>
                                                        <div className="col-md-12">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="subject"
                                                                onChange={inputHandler}
                                                                placeholder="Enter subject name"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row mb-1">
                                                        <label className="col-form-label col-md-12">
                                                            Year
                                                        </label>
                                                        <div className="col-md-12">
                                                            <input
                                                                className="form-control"
                                                                type="number"
                                                                name="year"
                                                                onChange={inputHandler}
                                                                placeholder="Enter year of subject"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row mb-1">
                                                        <label className="col-form-label col-md-12">
                                                            Photo(Thumbnail)
                                                        </label>
                                                        <div className="col-md-12">
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                name="photo"
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={onphotoChange}
                                                            />
                                                        </div>
                                                    </div> 

                                                    <div className="form-group row mb-1">
                                                        <label className="col-form-label col-md-12">
                                                            PDF
                                                        </label>
                                                        <div className="col-md-12">
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                name="pdf"
                                                                onChange={onPdfChange}
                                                            />
                                                        </div>
                                                    </div>                                                    

                                                    <div className="form-group row mb-1">
                                                        <label className="col-form-label col-md-12">
                                                            Content
                                                        </label>
                                                        <div className="col-md-12">
                                                            <JoditEditor
                                                                onChange={inputHandler1}
                                                                placeholder="Enter content here.."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary mt-15"
                                                            onClick={insertMaterial}
                                                        > Save </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* /.content */}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Addmaterial;

