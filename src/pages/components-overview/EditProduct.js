import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import $ from 'jquery';

// material-ui
import {
    IconButton,
    Grid,
    InputLabel,
    Stack,
    Link
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState } from 'react';
// import { Tab, Nav } from 'react-bootstrap';

// third party
import { useFormik } from "formik";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// project import
import AuthWrapper from 'pages/authentication/AuthWrapper';
import url from 'routes/url';
import secureLocalStorage from 'react-secure-storage';
// import Preview from './Preview';
// ============================|| EDIT - PRODUCT ||============================ //

var productid;
const EditProduct = () => {
    const [imageUrl, setImageUrl] = useState();
    const [filedata, setFiledata] = useState("");

    React.useEffect(() => {
        var datareceived = secureLocalStorage.getItem("ED_");
        // console.log("image", datareceived)
        for (let i = 0; i < datareceived.length; i++) {
            productid = datareceived[0];
            document.getElementById("productname").value = datareceived[1];
            document.getElementById("companyname").value = datareceived[2];
            document.getElementById("costperunit").value = datareceived[4];
            document.getElementById("category").value = datareceived[5];
            document.getElementById("description").value = datareceived[3];
            // document.getElementById("fileupload").value = datareceived[3];

        //     const reader = new FileReader();
        // reader.readAsDataURL(datareceived[9]);

        // reader.onloadend = () => {
        //     setImageUrl(reader.result);
        // };
          
            formik.initialValues.productname = datareceived[1];
            formik.initialValues.companyname = datareceived[2];
            formik.initialValues.costperunit = datareceived[4];
            formik.initialValues.description = datareceived[3];
            formik.initialValues.category = datareceived[5];
            setImageUrl(datareceived[9]);
            // setFiledata(datareceived[9]);
        }
    }, []);


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFiledata(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
    };

    // const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

    // function isValidFileType(fileName, fileType) {
    //     return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    // }

    // function getAllowedExt(type) {
    //     return validFileExtensions[type].map((e) => `.${e}`).toString()
    // }

    // const MAX_FILE_SIZE = 102400;

    const formSchema = yup.object().shape({
        productname: yup.string().required("* product name is required"),
        companyname: yup.string().required("* Company name is required"),
        description: yup.string().required("* Description is required"),
        category: yup.string().required("* Category is required"),
        costperunit: yup.string().required("* Price is required"),
        // fileupload: yup
        //     .mixed()
        //     .required("Required")
        //     .test("is-valid-type", "Not a valid image type",
        //         value => isValidFileType(value && value.name.toLowerCase(), "image"))
        //     .test("is-valid-size", "Max allowed size is 100KB",
        //         value => value && value.size <= MAX_FILE_SIZE)
    });

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors }
    // } = useFormik({
    //     mode: "",
    //     resolver: yupResolver(formSchema)
    // });

    const formik = useFormik({
        initialValues: {
            productname: "",
            companyname: "",
            description: "",
            category: "",
            costperunit: "",
            // fileupload: ""
        },
        validationSchema: formSchema,
        onSubmit: () => {
            //Edit product details
            var productname = document.getElementById("productname").value;
            var companyname = document.getElementById("companyname").value;
            var costperunit = document.getElementById("costperunit").value;
            var category = document.getElementById("category").value;
            var description = document.getElementById("description").value;

            var formData1 = new FormData();
            formData1.append("name", productname);
            formData1.append("price", costperunit);
            formData1.append("company", companyname);
            formData1.append("category", category);
            formData1.append("description", description);
            // formData1.append("product_image", filedata);

            if(filedata!="")
            {
                formData1.append("product_image", filedata);
            }
            else{
                formData1.append("product_image", "");
            }

            axios.defaults.headers.common = { 
                'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`,
                'Content-Type': 'multipart/form-data' 
            }

            if (productname != "" && costperunit != "" && description != "" && companyname != "" && category != "") {
                axios.put(url.productlist + productid + "/", formData1)
                    .then(() => {
                        $(".modal-body").html("<p class=text-danger>Product details updated.</p>");
                        $(".modal-title").html("");
                        $(".modal-footerdiv").html("<button id=redirect13>ok</button>");
                        $("#redirect13").addClass("btn btn-primary");
                        $("#redirect13").on("click", function () {
                            $("#modalDialog").toggle('hide');
                            //   setCurrentTab("viewproducts");
                            window.location.href="/addproduct";
                        });
                        $("#modalDialog").toggle('show');
                    })
                    .catch(function (res) {
                        console.log(res)
                        // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
                            if (res.response.status === 401) {
                                $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
                                $(".modal-title").html("");
                                $(".modal-footerdiv").html("<button id=redirect1>ok</button>");
                                $("#redirect1").addClass("btn btn-primary");
                                $("#redirect1").on("click", function () {
                                    $("#modalDialog").toggle('hide');
                                });
                                $("#modalDialog").toggle('show');
                            }
                            else if (res.response.status === 400) {
                                $(".modal-body").html("<p class=text-danger>Bad request found</p>");
                                $(".modal-title").html("");
                                $(".modal-footerdiv").html("<button id=redirectw1>ok</button>");
                                $("#redirectw1").addClass("btn btn-primary");
                                $("#redirectw1").on("click", function () {
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
        }
    })


    return (
        <AuthWrapper>
            <form onSubmit={formik.handleSubmit}>
                <br />
                <InputLabel htmlFor="product-details"><b>EDIT PRODUCT DETAILS</b></InputLabel>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="productname-signup">Product Name*</InputLabel>
                            <input id="productname"
                                name="productname"
                                className={formik.errors.productname != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.productname}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.productname && formik.errors.productname && <p className="text-danger">{formik.errors.productname}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="companyname-signup">Company Name*</InputLabel>
                            <input id="companyname" name="companyname"
                                className={formik.errors.companyname != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.companyname}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.companyname && formik.errors.companyname && <p className="text-danger">{formik.errors.companyname}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="costperunit-signup">Cost per unit</InputLabel>
                            <input id="costperunit" type="number"
                                name="costperunit"
                                className={formik.errors.costperunit != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.costperunit}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.costperunit && formik.errors.costperunit && <p className="text-danger">{formik.errors.costperunit}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="category-signup">Type or Category*</InputLabel>
                            <input id="category"
                                name="category"
                                className={formik.errors.category != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.category}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.category && formik.errors.category && <p className="text-danger">{formik.errors.category}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="description-signup">Description*</InputLabel>
                            <input id="description"
                                name="description"
                                className={formik.errors.description != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.description && formik.errors.description && <p className="text-danger">{formik.errors.description}</p>}
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <InputLabel htmlFor="image-signup">Upload image*</InputLabel>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                            >
                                <input hidden accept="/*"
                                    type="file"
                                    name="fileupload"
                                    className="form-control form-control-sm"
                                    // value={formik.values.fileupload}
                                    id="product_image"
                                    //  error={Boolean(touched.image && errors.image)}
                                    onChange={handleFileUpload} />
                                <CameraAltIcon />
                            </IconButton>
                            {imageUrl && <img src={imageUrl} alt="" height="200" width="200" />}
                           
                           {/* {formik.values.fileupload ? (
         <Preview className={{ margin: 'auto' }} width={50} height={"auto"} file={formik.values.fileupload} />
       ) : null} */}
                          
                            {/* {formik.touched.fileupload && formik.errors.fileupload && <p className="text-danger">{formik.errors.fileupload}</p>} */}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <input type="submit"
                                className='btn btn-sm btn-primary'
                                style={{ margin: '0 auto', display: "flex" }}
                                value="Update" />
                            <Link component={RouterLink} to="/addproduct">Cancel</Link>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </AuthWrapper>
    );
};

export default EditProduct;