import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Button,
    IconButton,
    // FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Link
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState } from 'react';
// import { Tab, Nav } from 'react-bootstrap';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AuthWrapper from 'pages/authentication/AuthWrapper';
import url from 'routes/url';
import secureLocalStorage from 'react-secure-storage';

// ============================|| ADD - PRODUCT ||============================ //
var imgreader,productid;
const EditProduct = () => {
    const [imageUrl, setImageUrl] = useState();

    React.useEffect(() => {
        console.log(secureLocalStorage.getItem("ED_"))
        var datareceived = secureLocalStorage.getItem("ED_");
        console.log(datareceived)
        for (let i = 0; i < datareceived.length; i++) {
           productid = datareceived[0];
            if (datareceived[10] != null) {
                setImageUrl(datareceived[10]);
            }
            else {
                setImageUrl("");
            }
            document.getElementById("productname").value = datareceived[1];
            document.getElementById("companyname").value = datareceived[2];
            document.getElementById("costperunit").value = datareceived[4];
            document.getElementById("category").value = datareceived[5];
            document.getElementById("description").value = datareceived[3];
        }

        toDataURL(datareceived[10])
            .then(dataUrl => {
            console.log('RESULT:', dataUrl)
            })
    }, []);

    const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
    imgreader = reader.result;
  }))


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        console.log(reader, "reader");

        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
        imgreader = reader.result;

        console.log(imgreader, "imgreader");
    };
    axios.defaults.headers.common = {'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`}

    //Submit product details
    const EditProduct = () => {
        var productname = document.getElementById("productname").value;
        var companyname = document.getElementById("companyname").value;
        var costperunit = document.getElementById("costperunit").value;
        var category = document.getElementById("category").value;
        var description = document.getElementById("description").value;

        var data = {
            name: productname,
            price: costperunit,
            category: category,
            company: companyname,
            description: description,
            product_image: imgreader
        }
        axios.defaults.headers.common = {'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`}

        if (productname != "" && costperunit != "" && description != "" && companyname != "" && category != "") {
            axios.put(url.addproduct+productid+"/", data)
                .then(() => {
                    $(".modal-body").html("<p class=text-danger>Product details updated.</p>");
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
                        productname: '',
                        companyname: '',
                        costperunit: '',
                        category: '',
                        description: '',
                        // image: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        productname: Yup.string().max(255).required('Product Name is required'),
                        companyname: Yup.string().max(255).required('Company Name is required'),
                        costperunit: Yup.number().min(1, "Please enter a name more than 1 character").required("Cost is required"),
                        category: Yup.string().max(255).required('Category is required'),
                        description: Yup.string().max(255).required('Description is required'),
                        // image: Yup.object().shape().required('File required')
                    })}
                //     onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
                //         try {
                //             setStatus({ success: false });
                //             setSubmitting(false);
                //         } catch (err) {
                //             console.error(err);
                //             setStatus({ success: false });
                //             setErrors({ submit: err.message });
                //             setSubmitting(false);
                //         }
                //     }
                // }
                >
                    {({ handleBlur, handleChange, handleSubmit, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <br />
                            <InputLabel htmlFor="product-details"><b>EDIT PRODUCT DETAILS</b></InputLabel>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="productname-signup">Product Name*</InputLabel>
                                        <OutlinedInput
                                            id="productname"
                                            type="productname"
                                            // value={values.productname}
                                            name="productname"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            fullWidth
                                            // error={Boolean(touched.productname && errors.productname)}
                                        />
                                        {/* {touched.productname && errors.productname && (
                                            <FormHelperText error id="helper-text-productname-signup">
                                                {errors.productname}
                                            </FormHelperText>
                                        )} */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="companyname-signup">Company Name*</InputLabel>
                                        {/* <input
                                            id="companyname"
                                            type="companyname"
                                            // value={values.companyname}
                                            name="companyname"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            className={Boolean(touched.companyname && errors.companyname)}
                                        /> */}
                                        <OutlinedInput
                                            fullWidth
                                            // error={Boolean(touched.companyname && errors.companyname)}
                                            id="companyname"
                                            type="companyname"
                                            // value={values.companyname}
                                            name="companyname"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            inputProps={{}}
                                        />
                                        {/* {touched.companyname && errors.companyname && (
                                            <FormHelperText error id="helper-text-companyname-signup">
                                                {errors.companyname}
                                            </FormHelperText>
                                        )} */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="costperunit-signup">Cost per unit</InputLabel>
                                        <OutlinedInput
                                            type="number"
                                            fullWidth
                                            // error={Boolean(touched.costperunit && errors.costperunit)}
                                            id="costperunit"
                                            value={values.costperunit}
                                            name="costperunit"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            inputProps={{}}
                                        />
                                        {/* {touched.costperunit && errors.costperunit && (
                                            <FormHelperText error id="helper-text-costperunit-signup">
                                                {errors.costperunit}
                                            </FormHelperText>
                                        )} */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="category-signup">Type or Category*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            // error={Boolean(touched.category && errors.category)}
                                            id="category"
                                            value={values.category}
                                            name="category"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            inputProps={{}}
                                        />
                                        {/* {touched.category && errors.category && (
                                            <FormHelperText error id="helper-text-category-signup">
                                                {errors.category}
                                            </FormHelperText>
                                        )} */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="description-signup">Description*</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            // error={Boolean(touched.description && errors.description)}
                                            id="description"
                                            type="description"
                                            value={values.description}
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder=""
                                            inputProps={{}}
                                        />
                                        {/* {touched.description && errors.description && (
                                            <FormHelperText error id="helper-text-description-signup">
                                                {errors.description}
                                            </FormHelperText>
                                        )} */}
                                    </Stack>
                                </Grid>


                                <Grid item xs={12}>
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
                                            <input hidden accept="image/*" type="file" id="product_image"
                                                //  error={Boolean(touched.image && errors.image)}
                                                onChange={handleFileUpload} />
                                            <CameraAltIcon />
                                        </IconButton>
                                        {imageUrl && <img src={imageUrl} alt="" height="200" width="200" />}
                                        {/* {touched.image && errors.image && (
                                            <FormHelperText error id="helper-text-image-signup">
                                                {errors.image}
                                            </FormHelperText>
                                        )} */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button disableElevation
                                            size="medium" style={{ margin: '0 auto' }}
                                            type="submit" variant="contained" color="primary" onClick={EditProduct}>
                                            Update
                                        </Button>
                                        <Link component={RouterLink} to="/addproduct">Cancel</Link>
                                    </Stack>
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
            </AuthWrapper>
        </>
    );
};

export default EditProduct;