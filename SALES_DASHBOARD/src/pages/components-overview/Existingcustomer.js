import React from 'react';
import secureLocalStorage from 'react-secure-storage';
import $ from 'jquery';

//css
import 'assets/css/main.css';

// material-ui
import { InputLabel } from '@mui/material';

// third party
import * as yup from 'yup';
import { useFormik } from "formik";
import axios from 'axios';

// project import
import url from 'routes/url';
import SalesDetails from './SalesDetails';
import redirections from 'routes/redirections';

// ============================|| ADD - SALES ||============================ //

const Existingcustomer = () => {
    // const [array, setArray] = React.useState();

    const formSchema = yup.object().shape({
        mobile: yup.string().max(15).min(8).required('* Mobile number is required'),
    });

    const formik = useFormik({
        initialValues: {
            mobile: '',
        },
        validationSchema: formSchema,
        onSubmit: () => {
            //Add sales

            secureLocalStorage.setItem('CN_', "");
            secureLocalStorage.setItem('CL_', "");
            secureLocalStorage.setItem('CE_', "");
            secureLocalStorage.setItem('CD_', "");
            secureLocalStorage.setItem('CP_', "");

            var mobile = document.getElementById("mobile").value;

            axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

            if (mobile != "") {
                axios.get(url.customerlist_phone + mobile + "/")
                    .then((response) => {
                        console.log(response, "response for customer")
                        document.getElementById("customer_section").style.display = "none";
                        document.getElementById("sales_section").style.display = "block";

                        secureLocalStorage.setItem('CN_', response.data.name);
                        secureLocalStorage.setItem('CL_', response.data.location);
                        secureLocalStorage.setItem('CE_', response.data.email);
                        secureLocalStorage.setItem('CD_', response.data.dob);
                        secureLocalStorage.setItem('CP_', response.data.phone_number);
                    })
                    .catch(function (res) {
                        // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
                        if (res.response.status === 401) {
                            $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
                            $(".modal-title").html("")
                            $(".modal-footerdiv").html("<button id=redirect1>ok</button>");
                            $("#redirect1").addClass("btn btn-primary");
                            $("#redirect1").on("click", function () {
                                $("#modalDialog").toggle('hide');
                            });
                            $("#modalDialog").toggle('show');
                        }
                        else if (res.response.status === 400) {
                            $(".modal-body").html("<p class=text-danger>Bad request found</p>");
                            $(".modal-title").html("")
                            $(".modal-footerdiv").html("<button id=redirects11>ok</button>");
                            $("#redirects11").addClass("btn btn-primary");
                            $("#redirects11").on("click", function () {
                                $("#modalDialog").toggle('hide');
                            });
                            $("#modalDialog").toggle('show');
                        }
                        // }
                        else {
                            $(".modal-body").html("<p class=text-danger>Network Error!</p>");
                            $(".modal-title").html("")
                            $(".modal-footerdiv").html("<button id=redirect2>ok</button>");
                            $("#redirect2").addClass("btn btn-primary");
                            $("#redirect2").on("click", function () {
                                $("#modalDialog").toggle('hide');
                            });
                            $("#modalDialog").toggle('show');
                        }
                    })
            }
        },
    });

    // const AddSales = (event) => {
    //     if (event.target.id == 1) {
    //         setIsNew(true);
    //         // document.getElementById("addnewform").style.display = "block";
    //     }
    //     else {
    //         setIsNew(false);
    //     }
    // }

    const CancelAddnewcustomer = () => {
        window.location.href = redirections.sales;
    }


    return (
        <>
            <div id='addnewform'>
                <div className='row' id="customer_section">
                    <InputLabel htmlFor="customer-details"><b>Search customer</b></InputLabel>
                    <br /><br />
                    <form onSubmit={formik.handleSubmit}>
                        <div className='row'>
                            {/* <InputLabel htmlFor="mobile-signup">Mobile number*</InputLabel> */}
                            <div className='col-md-7 col-xs-12'>
                                <input id="mobile" name="mobile" placeholder="Enter mobile no. with code"
                                    className="form-control form-control-sm"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.mobile && formik.errors.mobile && <p className="text-danger">{formik.errors.mobile}</p>}
                            </div>
                            <div className='col-md-5 col-xs-12'>
                                <input type="submit"
                                    className='btn btn-sm btn-primary mx-2'
                                    // style={{ margin: '0 auto', display: "flex" }}
                                    value="Search" />
                                <button type="button" className='btn btn-sm btn-outline-primary' onClick={CancelAddnewcustomer}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="sales_section" style={{ display: 'none' }}>
                    <SalesDetails />
                </div>
            </div>
        </>
    );
};

export default Existingcustomer;