// material-ui
import {
    Button,
    IconButton,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import ProductReport from './ProductReport';

// ============================|| FIREBASE - REGISTER ||============================ //

const AddProduct = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [currentTab, setCurrentTab] = useState("addproducts");

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    //Submit product de(tails
    const AddNewProduct = () => {
        var productname = document.getElementById("productname").value;
        var companyname = document.getElementById("companyname").value;
        var costperunit = document.getElementById("costperunit").value;
        var category = document.getElementById("category").value;
        var description = document.getElementById("description").value;
    
        var data= {
            productname: productname,
            companyname:companyname,
            costperunit:costperunit,
            category:category,
            description: description
        }
    
        if(productname!=""&&companyname!=""&&costperunit!=""&&category!=""&&description!="")
        {
          axios.post('http://internal-api.ummiscakehouse.com/product/create/',{data})
          .then(res => {
            console.log(res);
            setCurrentTab("viewproducts");
          })
        }
    }

    return (
        <>
            <Tab.Container defaultActiveKey={currentTab} activeKey={currentTab}>
                <div className="px-0">
                    <Nav variant="tabs" className="text-white b-0" >
                        <Nav.Link eventKey="addproducts" onClick={() => setCurrentTab("addproducts")}>Add new</Nav.Link>
                        <Nav.Link eventKey="viewproducts" onClick={() => setCurrentTab("viewproducts")}>View list</Nav.Link>
                    </Nav>
                </div>
                <Tab.Content className='mt-1'>
                    <Tab.Pane eventKey="addproducts">
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
                                    <br />
                                    <InputLabel htmlFor="product-details"><b>ADD PRODUCT DETAILS</b></InputLabel>
                                    <br />
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="productname-signup">Product Name*</InputLabel>
                                                <OutlinedInput
                                                    id="productname"
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
                                                    id="companyname"
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
                                                    id="costperunit"
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
                                                    id="category"
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
                                                    id="description"
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
                                                <Button disableElevation disabled={isSubmitting}
                                                    size="medium" style={{ margin: '0 auto', display: "flex" }}
                                                    type="submit" variant="contained" color="primary" onClick={AddNewProduct}>
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
                    </Tab.Pane>
                    <Tab.Pane eventKey="viewproducts">
                        <br />
                        <InputLabel htmlFor="product-details"><b>PRODUCT LIST</b></InputLabel>
                        <br />
                        <ProductReport />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </>
    );
};

export default AddProduct;