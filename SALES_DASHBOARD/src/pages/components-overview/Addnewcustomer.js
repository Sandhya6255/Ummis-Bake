import React from 'react';
import secureLocalStorage from 'react-secure-storage';
import $ from 'jquery';

//css
import 'assets/css/main.css';

// material-ui
import {
    Grid,
    InputLabel,
    Stack
} from '@mui/material';

// third party
import * as yup from 'yup';
import { useFormik } from "formik";
import axios from 'axios';

// project import
import url from 'routes/url';
import SalesDetails from './SalesDetails';
import redirections from 'routes/redirections';
// ============================|| ADD - CUSTOMER ||============================ //

const Addnewcustomer = () => {
    const formSchema = yup.object().shape({
        customername: yup.string().max(255).required('* Customer Name is required'),
        mobile: yup.string().max(15).min(8).required('* Mobile number is required'),
        location: yup.string().max(255).required('* Location is required'),
        email: yup.string().email('Must be a valid email').max(255)
    });

    const formik = useFormik({
        initialValues: {
            customername: '',
            mobile: '',
            location: '',
            email: '',
        },
        validationSchema: formSchema,
        onSubmit: () => {
            //Add customer
            secureLocalStorage.setItem('CN_', "");
            secureLocalStorage.setItem('CL_', "");
            secureLocalStorage.setItem('CE_', "");
            secureLocalStorage.setItem('CD_', "");
            secureLocalStorage.setItem('CP_', "");

            var customername = document.getElementById("customername").value;
            var mobile = document.getElementById("mobile").value;
            var location = document.getElementById("location").value;
            var dob;
            if(document.getElementById("dob").value != "")
            {
                dob = document.getElementById("dob").value;
            }
            else
            {
                dob = null;
            }
           
            var email = document.getElementById("email").value;

            var data = {
                name: customername,
                phone_number: mobile,
                location: location,
                email: email,
                dob: dob
            }

            axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

            if (customername != "" && mobile != "" && location != "") {
                axios.post(url.customer, data)
                    .then((response) => {
                        console.log(response)
                        $(".modal-body").html("<p class=text-danger>New Customer added</p>");
                        $(".modal-title").html("")
                        $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
                        $("#redirectC").addClass("btn btn-primary");
                        $("#redirectC").on("click", function () {
                            $("#modalDialog").toggle('hide');
                            document.getElementById("customer_section").style.display = "none";
                            document.getElementById("sales_section").style.display = "block";

                            secureLocalStorage.setItem('CN_', response.data.name);
                            secureLocalStorage.setItem('CL_', response.data.location);
                            secureLocalStorage.setItem('CE_', response.data.email);
                            secureLocalStorage.setItem('CD_', response.data.dob);
                            secureLocalStorage.setItem('CP_', response.data.phone_number);
                        });
                        $("#modalDialog").toggle('show');
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

    const CancelAddnewcustomer = () => {
        window.location.href = redirections.sales;
    }

    return (
        <div id='addnewform'>
            <div className='row' id="customer_section" >
                <InputLabel htmlFor="customer-details"><b>Add new sale</b></InputLabel>
                <div className='mt-3'>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="customername-signup">Customer Name*</InputLabel>
                                    <input id="customername" name="customername"
                                        className={formik.errors.customername != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                        value={formik.values.customername}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.customername && formik.errors.customername && <p className="text-danger">{formik.errors.customername}</p>}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="mobile-signup">Mobile number*</InputLabel>
                                    <input id="mobile" name="mobile"
                                        className={formik.errors.mobile != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.mobile && formik.errors.mobile && <p className="text-danger">{formik.errors.mobile}</p>}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email</InputLabel>
                                    <input id="email" name="email" type="email"
                                        className={formik.errors.email != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="mobile-signup">Location*</InputLabel>
                                    <input id="location" name="location"
                                        className={formik.errors.location != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.location && formik.errors.location && <p className="text-danger">{formik.errors.location}</p>}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="dob-signup">DOB</InputLabel>
                                    <input id="dob" name="dob" type="date"
                                        className='form-control form-control-sm'
                                        value={formik.values.dob}
                                        onChange={formik.handleChange}
                                    />
                                </Stack>
                            </Grid>
                            <br />
                        </Grid>
                        <div className='text-center'>
                            <input type="submit"
                                className='btn btn-sm btn-primary mt-3'
                                // style={{ margin: '0 auto', display: "flex" }}
                                value="Update" />
                            <button type="button" className='btn btn-sm btn-outline-primary mx-2 mt-3' onClick={CancelAddnewcustomer}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="sales_section" style={{ display: 'none' }}>
                <SalesDetails />
            </div>
        </div>
    );
};

export default Addnewcustomer;