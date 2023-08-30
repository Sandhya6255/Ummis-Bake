
import React from 'react';
import $ from 'jquery';

// material-ui
import {
    Grid,
    InputLabel,
    Stack,
    Link
} from '@mui/material';

import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project import
import InventoryReport from './InventoryReport';
import AuthWrapper from 'pages/authentication/AuthWrapper';
import url from 'routes/url';

// ============================|| ADD - INVENTORY ||============================ //

var franchise_lists, product_lists;
const AddInventory = () => {
    const [franchise, setFranchiselist] = useState([]);
    const [product, setProductlist] = useState([]);
    const [currentTab, setCurrentTab] = useState("addinventory");

    axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

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
            if (item.data.name === undefined || item.data.name === "" || item.data.name === null) {
                return (
                    <option key={i} disabled>No franchise created</option>
                )
            }
            else {
                return (
                    <option key={i} value={item.data.id}>
                        {item.data.name}
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

    const formSchema = yup.object().shape({
        franchise_select: yup.string().required("* Select a franchise"),
        product_select: yup.string().required("* Select a product"),
        quantity: yup.number().min(1, "Please enter a quantity more than 1").required("Quantity is required"),
    });

    const formik = useFormik({
        initialValues: {
            franchise_select: '',
            product_select: '',
            quantity: '',
        },
        validationSchema: formSchema,
        onSubmit: () => {
            //Add inventory details
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
                        $(".modal-body").html("<p class=text-danger>New inventory added</p>");
                        $(".modal-title").html("");
                        $(".modal-footerdiv").html("");
                        $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
                        $("#redirectC").addClass("btn btn-primary");
                        $("#redirectC").on("click", function () {
                            $("#modalDialog").toggle('hide');
                            //         //   setCurrentTab("viewinventory");
                            //         $("#modal").modal('show');
                            window.location.reload();
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
                            $(".modal-title").html("");
                            $(".modal-footerdiv").html("<button id=redirect111>ok</button>");
                            $("#redirect111").addClass("btn btn-primary");
                            $("#redirect111").on("click", function () {
                                $("#modalDialog").toggle('hide');
                            });
                            $("#modalDialog").toggle('show');
                        }
                        // }
                        // else if (res.code !== '' && res.code === 'ERR_NETWORK' || res.code === 'ECONNABORTED') {
                        $(".modal-body").html("<p class=text-danger>Network Error!</p>");
                        $(".modal-title").html("")
                        $(".modal-footerdiv").html("<button id=redirect2>ok</button>");
                        $("#redirect2").addClass("btn btn-primary");
                        $("#redirect2").on("click", function () {
                            $("#modalDialog").toggle('hide');
                        });
                        $("#modalDialog").toggle('show');
                        // }
                    })
            }
        },
    });

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
                            <form onSubmit={formik.handleSubmit}>
                                <br />
                                <InputLabel htmlFor="inventory-details"><b>ADD INVENTORY DETAILS</b></InputLabel>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="quantity-signup">Select franchise*</InputLabel>
                                            <div className="mb-2">
                                                <select
                                                    id="franchiseselect"
                                                    // {...defaultValues}
                                                    name="franchise_select"
                                                    value={formik.values.franchise_select}
                                                    // {...register("franchise_select")}
                                                    onChange={formik.handleChange}
                                                    className={formik.errors.franchise_select != "" ? "errorClass form-select form-select-sm" : "form-select form-select-sm"}
                                                >
                                                    <option disabled value="">Select one</option>
                                                    {franchise_lists}
                                                </select>
                                                {formik.touched.franchise_select && formik.errors.franchise_select && <p className='text-danger'>{formik.errors.franchise_select}</p>}
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
                                            <input id="available_quantity" name="quantity"
                                                className={formik.errors.quantity != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                                value={formik.values.quantity}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.quantity && formik.errors.quantity && <p className="text-danger">{formik.errors.quantity}</p>}
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <input type="submit"
                                        className='btn btn-sm btn-primary'
                                        style={{ margin: '0 auto', display: "flex" }}
                                        value="Submit" />
                                </Grid>

                            </form>
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