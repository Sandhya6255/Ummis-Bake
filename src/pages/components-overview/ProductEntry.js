// material-ui
import {
    Button,
    IconButton,
    // Divider,
    FormHelperText,
    Grid,
    // Link,
    InputLabel,
    OutlinedInput,
    Stack,
    // Typography
} from '@mui/material';
// import CameraOutlined from '@ant-design/icons';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState } from 'react';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// ============================|| FIREBASE - REGISTER ||============================ //

const ProductEntry = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };
    return (
        <>
            <Formik
                initialValues={{
                    productname: '',
                    companyname: '',
                    costperunit: '',
                    category: '',
                    description: '',
                    image: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    productname: Yup.string().max(255).required('Product Name is required'),
                    companyname: Yup.string().max(255).required('Company Name is required'),
                    costperunit: Yup.number().min(1, "Please enter a name more than 1 character").required("Cost is required"),
                    category: Yup.string().max(255).required('Category is required'),
                    description: Yup.string().max(255).required('Description is required'),
                    image: Yup.object().shape().required('File required')
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
                        <InputLabel htmlFor="product-details"><b>ADD PRODUCT DETAILS</b></InputLabel>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="productname-signup">Product Name*</InputLabel>
                                    <OutlinedInput
                                        id="productname-login"
                                        type="productname"
                                        value={values.productname}
                                        name="productname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        fullWidth
                                        error={Boolean(touched.productname && errors.productname)}
                                    />
                                    {touched.productname && errors.productname && (
                                        <FormHelperText error id="helper-text-productname-signup">
                                            {errors.productname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="companyname-signup">Company Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.companyname && errors.companyname)}
                                        id="companyname-signup"
                                        type="companyname"
                                        value={values.companyname}
                                        name="companyname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.companyname && errors.companyname && (
                                        <FormHelperText error id="helper-text-companyname-signup">
                                            {errors.companyname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="costperunit-signup">Cost per unit</InputLabel>
                                    <OutlinedInput
                                        type="number"
                                        fullWidth
                                        error={Boolean(touched.costperunit && errors.costperunit)}
                                        id="costperunit-signup"
                                        value={values.costperunit}
                                        name="costperunit"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.costperunit && errors.costperunit && (
                                        <FormHelperText error id="helper-text-costperunit-signup">
                                            {errors.costperunit}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="category-signup">Type or Category*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.category && errors.category)}
                                        id="category-signup"
                                        value={values.category}
                                        name="category"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.category && errors.category && (
                                        <FormHelperText error id="helper-text-category-signup">
                                            {errors.category}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="description-signup">Description*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                        id="description-login"
                                        type="description"
                                        value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder=""
                                        inputProps={{}}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-description-signup">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
                            {/* {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )} */}
                            <Grid item xs={12} md={6}>
                                {/* <Stack direction="row" alignItems="center" spacing={2}> */}
                                {/* <Button variant="outlined" component="span" size="medium" endIcon={<CameraAltIcon />}>                   
                                </Button>
                                <input
                                    id="upload-image"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                                {imageUrl && <img src={imageUrl} alt="" height="300" />}
                               
                                </Stack> */}
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <InputLabel htmlFor="image-signup">Upload image*</InputLabel>
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="label"
                                    >
                                        <input hidden accept="image/*" type="file" 
                                        //  error={Boolean(touched.image && errors.image)}
                                        onChange={handleFileUpload} />
                                        <CameraAltIcon />
                                    </IconButton>
                                    {imageUrl && <img src={imageUrl} alt="" height="300" />}
                                    {touched.image && errors.image && (
                                        <FormHelperText error id="helper-text-image-signup">
                                            {errors.image}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} size="medium" style={{ margin: '0 auto', display: "flex" }} type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default ProductEntry;