// material-ui
import {
    Button,
    // Divider,
    FormHelperText,
    Grid,
    // Link,
    InputLabel,
    OutlinedInput,
    Stack
} from '@mui/material';
// import CameraOutlined from '@ant-design/icons';
// import { useState } from 'react';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// ============================|| FIREBASE - REGISTER ||============================ //

const SalesEntry = () => {
    return (
        <>
            <Formik
                initialValues={{
                    customername: '',
                    mobile: '',
                    quantity: '',
                    location: '',
                    // description: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    // customername: Yup.string().max(255).required('Customer Name is required'),
                    mobile: Yup.string().max(15).min(8).required('Mobile number is required'),
                    quantity: Yup.number().min(1, "Please enter a name more than 1 character").required("Quantity is required"),
                    location: Yup.string().max(255).required('location is required'),
                    // description: Yup.string().max(255).required('Description is required'),
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
                                        id="customername-login"
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
                                        id="mobile-signup"
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
                                        id="location-signup"
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
                                    <select className='form-control'>
                                        <option>Cupcake</option>
                                        <option>plum cake</option>
                                    </select>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="quantity-signup">Quantity*</InputLabel>
                                    <div className='row'>
                                        <div className='col-md-6 col-xs-12 col-lg-6'>
                                            <select className='form-control'>
                                                <option>PCS</option>
                                                <option>WEIGHT</option>
                                            </select>
                                        </div>
                                        <div className='col-md-6 col-xs-12 col-lg-6'>
                                            <OutlinedInput
                                                id="quantity-count"
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
                                            <select className='form-control'>
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
                                <Button disableElevation disabled={isSubmitting} size="medium" style={{ margin: '0 auto', display: "flex" }} type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </AnimateButton>
                        </Grid>

                    </form>
                )}
            </Formik>
        </>
    );
};

export default SalesEntry;