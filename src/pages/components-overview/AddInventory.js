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

const AddInventory = () => {
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
                        <InputLabel htmlFor="inventory-details"><b>ADD INVENTORY DETAILS</b></InputLabel>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="quantity-signup">Select franchise*</InputLabel>
                                    <select className='form-control'>
                                        <option>Adam, chenganoor</option>
                                        <option>Suresh, edappali</option>
                                    </select>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="quantity-signup">Select product*</InputLabel>
                                    <select className='form-control'>
                                        <option>Cupcake</option>
                                        <option>Plumcake</option>
                                    </select>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="quantity-signup">Quantity*</InputLabel>
                                    <OutlinedInput
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
                                    )}
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

export default AddInventory;