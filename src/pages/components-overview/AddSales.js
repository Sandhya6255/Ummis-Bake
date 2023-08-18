import React from 'react';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack
} from '@mui/material';
import { useState } from 'react';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import url from 'routes/url';

// ============================|| ADD - SALES ||============================ //

var  product_lists;
const SalesEntry = () => {
    const [product, setProductlist] = useState([]);

    //load franchise and product
    React.useEffect(() => {
        axios.get(url.productlist)
            .then(res => {
                setProductlist(res.data.results)
            });
    }, []);

    if (product.length > 0) {
        product_lists = product.length > 0 && product.map((item, i) => {
            if (item.name === undefined || item.name === "" || item.name === null) {
                return (
                    <option key={i} disabled>No product created</option>
                )
            }
            else {
                return (
                    <option key={i} value={item.id}>
                        {item.name}
                    </option>
                )
            }
        }, this);
    }

    const handleonChangeProduct = () => {
        // console.log($('option:selected', this))
    };

    //Submit sales details
    const AddNewSale = () => {
        var customername = document.getElementById("customername").value;
        var mobile = document.getElementById("mobile").value;
        var location = document.getElementById("location").value;
        var quantity = document.getElementById("quantity").value;
        var price = document.getElementById("price").value;
        var storepoint = document.getElementById("storepoint").value;

        var data = {
            total_amount: price,
            quantity_sold: quantity,
            customername:customername,
            mobile: mobile,
            location:location,
            storepoint:storepoint,
            product:productname,
            user:franchise
        }

        if (customername != "" && mobile != "" &&  location != "" && companyname != "" && category != "") {
            axios.post(url.addproduct, data )
                .then(() => {
                    $(".modal-body").html("<p class=text-danger>New product added</p>");
                    $(".modal-title").html("")
                    $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
                    $("#redirectC").addClass("btn btn-primary");
                    $("#redirectC").on("click", function () {
                      $("#modalDialog").toggle('hide');
                    //   setCurrentTab("viewproducts");
                    window.location.reload();
                    });
                    $("#modalDialog").toggle('show');
                })
                .catch(function (res) {
                    if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
                      if (res.response.status === 401) {
                        $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
                        $(".modal-title").html("<h5 class=text-danger>Login Failed!</h5>")
                        $(".modal-footerdiv").html("<button id=redirect1>ok</button>");
                        $("#redirect1").addClass("btn btn-primary");
                        $("#redirect1").on("click", function () {
                          $("#modalDialog").toggle('hide');
                        });
                        $("#modalDialog").toggle('show');
                      }
                    }
                    else if (res.code !== '' && res.code === 'ERR_NETWORK' || res.code === 'ECONNABORTED') {
                      $(".modal-body").html("<p class=text-danger>Network Error!</p>");
                      $(".modal-title").html("")
                      $(".modal-footerdiv").html("<button id=redirect2 class=btn-primary>ok</button>");
                      $("#redirect2").addClass("btn btn-block");
                      $("#redirect2").on("click", function () {
                        $("#modalDialog").toggle('hide');
                      });
                      $("#modalDialog").toggle('show');
                    }
                  })
        }
    }

    return (
        <>
            <AuthWrapper>
                <Formik
                    initialValues={{
                        customername: '',
                        mobile: '',
                        quantity: '',
                        location: '',
                        price: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        customername: Yup.string().max(255).required('Customer Name is required'),
                        mobile: Yup.string().max(15).min(8).required('Mobile number is required'),
                        quantity: Yup.number().min(1, "Please enter a valid quantity").required("Quantity is required"),
                        location: Yup.string().max(255).required('location is required'),
                        price: Yup.number().min(1, "Please enter a valid price").required("Price is required"),
                    })}
                    onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
                        try {
                            setStatus({ success: false });
                            setSubmitting(false);
                        } catch (err) {
                            console.error(err);
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <InputLabel htmlFor="customer-details"><b>CUSTOMER DETAILS</b></InputLabel>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="customername-signup">Customer Name*</InputLabel>
                                        <OutlinedInput
                                            id="customername"
                                            type="customername"
                                            value={values.customername}
                                            name="customername"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            fullWidth
                                            error={Boolean(touched.customername && errors.customername)}
                                        />
                                        {touched.customername && errors.customername && (
                                            <FormHelperText error id="helper-text-customername-signup">
                                                {errors.customername}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="mobile-signup">Mobile number*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.mobile && errors.mobile)}
                                            id="mobile"
                                            type="mobile"
                                            value={values.mobile}
                                            name="mobile"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            inputProps={{}}
                                        />
                                        {touched.mobile && errors.mobile && (
                                            <FormHelperText error id="helper-text-mobile-signup">
                                                {errors.mobile}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="location-signup">Location*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.location && errors.location)}
                                            id="location"
                                            value={values.location}
                                            name="location"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            inputProps={{}}
                                        />
                                        {touched.location && errors.location && (
                                            <FormHelperText error id="helper-text-location-signup">
                                                {errors.location}
                                            </FormHelperText>
                                        )}
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
                                        <select className='form-select form-select-sm' id="productselect" defaultValue={''} onChange={handleonChangeProduct}>
                                            <option disabled value={''}>Select one</option>
                                            {product_lists}
                                        </select>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="quantity-signup">Quantity*</InputLabel>
                                        <div className='row mx-0'>
                                            <div className='col-md-6 col-xs-12 col-lg-6'>
                                                <select className='form-select form-select-sm'>
                                                    <option>PCS</option>
                                                    <option>WEIGHT</option>
                                                </select>
                                            </div>
                                            <div className='col-md-6 col-xs-12 col-lg-6'>
                                                <OutlinedInput
                                                    id="quantity"
                                                    type="number"
                                                    // value={values.customername}
                                                    name="quantitycount"
                                                    onBlur={handleBlur}
                                                    // onChange={handleChange}
                                                    placeholder=""
                                                    fullWidth
                                                // error={Boolean(touched.customername && errors.customername)}
                                                />
                                            </div>
                                        </div>

                                        {/* <OutlinedInput
                                        type="number"
                                        fullWidth
                                        error={Boolean(touched.quantity && errors.quantity)}
                                        id="quantity-signup"
                                        value={values.quantity}
                                        name="quantity"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.quantity && errors.quantity && (
                                        <FormHelperText error id="helper-text-quantity-signup">
                                            {errors.quantity}
                                        </FormHelperText>
                                    )} */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="price-signup">Price*</InputLabel>
                                        <div className='row mx-0'>
                                            <div className='col-md-6 col-xs-12 col-lg-6'>
                                                <select className='form-select form-select-sm'>
                                                    <option>CASH</option>
                                                    <option>BANK</option>
                                                </select>
                                            </div>
                                            <div className='col-md-6 col-xs-12 col-lg-6'>
                                                <OutlinedInput
                                                    id="price-count"
                                                    // value={values.customername}
                                                    name="pricecount"
                                                    onBlur={handleBlur}
                                                    // onChange={handleChange}
                                                    placeholder=""
                                                    fullWidth
                                                // error={Boolean(touched.customername && errors.customername)}
                                                />
                                            </div>
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="storepoint-signup">Store point*</InputLabel>
                                        <OutlinedInput
                                            id="storepoint-login"
                                            type="storepoint"
                                            value={values.storepoint}
                                            name="storepoint"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            fullWidth
                                            error={Boolean(touched.storepoint && errors.storepoint)}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} size="medium"
                                     style={{ margin: '0 auto', display: "flex" }} 
                                     type="submit" variant="contained" color="primary" onClick={AddNewSale}>
                                        Submit
                                    </Button>
                                </AnimateButton>
                            </Grid>

                        </form>
                    )}
                </Formik>
            </AuthWrapper>
        </>
    );
};

export default SalesEntry;