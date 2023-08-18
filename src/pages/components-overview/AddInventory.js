
import React from 'react';
import $ from 'jquery';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Link
} from '@mui/material';
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import InventoryReport from './InventoryReport';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import url from 'routes/url';

// ============================|| ADD - INVENTORY ||============================ //

var franchise_lists, product_lists;
const AddInventory = () => {
    const [franchise, setFranchiselist] = useState([]);
    const [product, setProductlist] = useState([]);
    const [currentTab, setCurrentTab] = useState("addinventory");

    //load franchise and product
    React.useEffect(() => {
        axios.get(url.franchiselist)
            .then(res => {
                setFranchiselist(res.data.results)
            });
        axios.get(url.productlist)
            .then(res => {
                setProductlist(res.data.results)
            })
    }, []);

    if (franchise.length > 0) {
        franchise_lists = franchise.length > 0 && franchise.map((item, i) => {
            if (item.name === undefined || item.name === "" || item.name === null) {
                return (
                    <option key={i} disabled>No franchise created</option>
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

    const handleonChangeFranchise = () => {
        // console.log($('option:selected', this))
    };

    //Submit inventory details
    const AddNewInventory = () => {
        var franchise = $("#franchiseselect").find('option:selected', this).val();
        var product = $("#productselect").find('option:selected', this).val()
        var available_quantity = document.getElementById("available_quantity").value;

        var data = {
            franchise: franchise,
            product: product,
            available_quantity: available_quantity,
        }
        console.log(data)
        if (franchise != "" && product != "" && available_quantity != "") {
            axios.post(url.addinventory, data)
                .then(() => {
                    $(".modal-body").html("<p class=text-danger>New franchise added</p>");
                    $(".modal-title").html("")
                    $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
                    $("#redirectC").addClass("btn btn-primary");
                    $("#redirectC").on("click", function () {
                        $("#modalDialog").toggle('hide');
                        //   setCurrentTab("viewinventory");
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
                <Tab.Container defaultActiveKey={currentTab} activeKey={currentTab}>
                    <div className="px-0">
                        <Nav variant="tabs" className="text-white b-0" >
                            <Nav.Link eventKey="addinventory" onClick={() => setCurrentTab("addinventory")}>Add new</Nav.Link>
                            <Nav.Link eventKey="viewinventory" onClick={() => setCurrentTab("viewinventory")}>View list</Nav.Link>
                        </Nav>
                    </div>
                    <Tab.Content className='mt-1'>
                        <Tab.Pane eventKey="addinventory">
                            <Formik
                                initialValues={{
                                    quantity: '',
                                    submit: null
                                }}
                                validationSchema={Yup.object().shape({
                                    quantity: Yup.number().min(1, "Please enter a name more than 1 character").required("Quantity is required"),
                                })}
                                onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
                                    try {
                                        setStatus({ success: false });
                                        setSubmitting(false);
                                    } catch (err) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <br />
                                        <InputLabel htmlFor="inventory-details"><b>ADD INVENTORY DETAILS</b></InputLabel>
                                        <br />
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="quantity-signup">Select franchise*</InputLabel>
                                                    <div className="mb-2">
                                                        <select className='form-select form-select-sm' id="franchiseselect" defaultValue={''} onChange={handleonChangeFranchise}>
                                                            <option disabled value={''}>Select one</option>
                                                            {franchise_lists}
                                                        </select>
                                                        <Link variant="h6" to="/addfranchise" component={RouterLink} color="text.primary"
                                                            className="mx-0">
                                                            Add new
                                                        </Link>
                                                    </div>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="quantity-signup">Select product*</InputLabel>
                                                    <div className="mb-2">
                                                        <select className='form-select form-select-sm' id="productselect" defaultValue={''} onChange={handleonChangeProduct}>
                                                            <option disabled value={''}>Select one</option>
                                                            {product_lists}
                                                        </select>
                                                        <Link variant="h6" to="/addproduct" component={RouterLink} color="text.primary"
                                                            className="mx-0">
                                                            Add new
                                                        </Link>
                                                    </div>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="quantity-signup">Quantity*</InputLabel>
                                                    <OutlinedInput
                                                        type="number"
                                                        fullWidth
                                                        error={Boolean(touched.quantity && errors.quantity)}
                                                        id="available_quantity"
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
                                                <Button disableElevation disabled={isSubmitting}
                                                    size="medium" style={{ margin: '0 auto', display: "flex" }}
                                                    type="submit" variant="contained" color="primary" onClick={AddNewInventory}>
                                                    Submit
                                                </Button>
                                            </AnimateButton>
                                        </Grid>

                                    </form>
                                )}
                            </Formik>
                        </Tab.Pane>
                        <Tab.Pane eventKey="viewinventory">
                            <br />
                            <InputLabel htmlFor="inventory-details"><b>INVENTORY LIST</b></InputLabel>
                            <br />
                            <InventoryReport />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </AuthWrapper >
        </>
    );
};

export default AddInventory;