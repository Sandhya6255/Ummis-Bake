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
import { useState } from 'react';

// third party
import * as yup from 'yup';
import { useFormik } from "formik";
import axios from 'axios';

// project import
import AuthWrapper from 'pages/authentication/AuthWrapper';
import url from 'routes/url';

// ============================|| ADD - SALES ||============================ //

var product_lists;
const SalesEntry = () => {
    const [product, setProductlist] = useState([]);

    //load franchise and product
    React.useEffect(() => {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

        axios.get(url.inventorylist)
            .then(res => {
                setProductlist(res.data.results)
            });
    }, []);

    if (product.length > 0) {
        product_lists = product.length > 0 && product.map((item, i) => {
            if (item.product.name === undefined || item.product.name === "" || item.product.name === null) {
                return (
                    <option key={i} disabled>No product created</option>
                )
            }
            else {
                return (
                    <option key={i} value={item.product.id}>
                        {item.product.name}
                    </option>
                )
            }
        }, this);
    }


    const formSchema = yup.object().shape({
        product_select: yup.string().required("* Select a product"),
        customername: yup.string().max(255).required('* Customer Name is required'),
        mobile: yup.string().max(15).min(8).required('* Mobile number is required'),
        quantity: yup.number().min(1, "Please enter a valid quantity").required("* Quantity is required"),
        location: yup.string().max(255).required('* Location is required'),
        price: yup.number().min(1, "Please enter a valid price").required("* Price is required"),
        storepoint: yup.number().min(1, "Please enter a valid point").required("* Store point is required"),
    });

    const formik = useFormik({
        initialValues: {
            product_select: "",
            customername: '',
            mobile: '',
            quantity: '',
            location: '',
            price: '',
            storepoint: ''
        },
        validationSchema: formSchema,
        onSubmit: () => {
            //Add sales
            var customername = document.getElementById("customername").value;
            var mobile = document.getElementById("mobile").value;
            var location = document.getElementById("location").value;
            var quantity = document.getElementById("quantity").value;
            var price = document.getElementById("price").value;
            var storepoint = document.getElementById("storepoint").value;
            var productname = $("#productselect").find("option:selected", this).val();
            var quantity_type = $("#quantity_type").find("option:selected", this).val();
            var payment_mode = $("#payment_mode").find("option:selected", this).val();


            var data = {
                name: customername,
                total_amount: price,
                quantity_sold: quantity,
                phone_number: mobile,
                location: location,
                storepoint: storepoint,
                product: productname,
                quantity_type: quantity_type,
                payment_mode: payment_mode
            }

            console.log(data);
            axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

            if (customername != "" && mobile != "" && location != "" && storepoint != "" && price != ""
                && quantity != "" && productname != "") {
                axios.post(url.addsales, data)
                    .then((response) => {
                        console.log(response, "response for sales")
                        // if(response.status == 200)
                        {
                            $(".modal-body").html("<p class=text-danger>New sale added</p>");
                            $(".modal-title").html("")
                            $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
                            $("#redirectC").addClass("btn btn-primary");
                            $("#redirectC").on("click", function () {
                                $("#modalDialog").toggle('hide');
                                window.location.reload();
                            });
                            $("#modalDialog").toggle('show');
                        }
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
                            else  if (res.response.status === 400) {
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
                        else  {
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


    return (
        <AuthWrapper>
            <form onSubmit={formik.handleSubmit}>
                <InputLabel htmlFor="customer-details"><b>CUSTOMER DETAILS</b></InputLabel>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                            <InputLabel htmlFor="location-signup">Location*</InputLabel>
                            <input id="location" name="location"
                                className={formik.errors.location != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.location}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.location && formik.errors.location && <p className="text-danger">{formik.errors.location}</p>}
                        </Stack>
                    </Grid>
                </Grid>
                <br />
                <InputLabel htmlFor="sales-details"><b>SALES DETAILS</b></InputLabel>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="quantity-signup">Select product*</InputLabel>
                            <select
                                id="productselect"
                                // {...defaultValues}
                                name="product_select"
                                value={formik.values.product_select}
                                // {...register("franchise_select")}
                                onChange={formik.handleChange}
                                className={formik.errors.product_select != "" ? "errorClass form-select form-select-sm" : "form-select form-select-sm"}
                            >
                                <option disabled value="">Select one</option>
                                {product_lists}
                            </select>
                            {formik.touched.product_select && formik.errors.product_select && <p className='text-danger'>{formik.errors.product_select}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="quantity-signup">Quantity*</InputLabel>
                            <div className='row mx-0'>
                                <div className='col-md-6 col-xs-12 col-lg-6'>
                                    <select className='form-select form-select-sm' id="quantity_type">
                                        <option value="piece">PCS</option>
                                        <option value="weight">WEIGHT</option>
                                    </select>
                                </div>
                                <div className='col-md-6 col-xs-12 col-lg-6'>
                                    <input id="quantity" name="quantity"
                                        className={formik.errors.quantity != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.quantity && formik.errors.quantity && <p className="text-danger">{formik.errors.quantity}</p>}
                                </div>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="price-signup">Price*</InputLabel>
                            <div className='row mx-0'>
                                <div className='col-md-6 col-xs-12 col-lg-6'>
                                    <select className='form-select form-select-sm' id="payment_mode">
                                        <option value="cash">CASH</option>
                                        <option value="bank">BANK</option>
                                    </select>
                                </div>
                                <div className='col-md-6 col-xs-12 col-lg-6'>
                                    <input id="price" name="price"
                                        className={formik.errors.price != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.price && formik.errors.price && <p className="text-danger">{formik.errors.price}</p>}
                                </div>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="storepoint-signup">Store point*</InputLabel>
                            <input id="storepoint" name="storepoint"
                                className={formik.errors.storepoint != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.storepoint}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.storepoint && formik.errors.storepoint && <p className="text-danger">{formik.errors.storepoint}</p>}
                        </Stack>
                    </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                    <input type="submit"
                        className='btn btn-sm btn-primary'
                        style={{ margin: '0 auto', display: "flex" }}
                        value="Update" />
                </Grid>

            </form>
        </AuthWrapper>
    );
};

export default SalesEntry;