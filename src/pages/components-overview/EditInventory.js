
import React from 'react';
import $ from 'jquery';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    // Button,
    // FormHelperText,
    Grid,
    InputLabel,
    Stack,
    Link
} from '@mui/material';

import { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

// third party
import { useFormik } from "formik";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// project import
import AuthWrapper from 'pages/authentication/AuthWrapper';
import url from 'routes/url';

// ============================|| EDIT - INVENTORY ||============================ //



var franchise_lists, product_lists;
const EditInventory = () => {
    const [franchise, setFranchiselist] = useState([]);
    // const [product, setProductlist] = useState([]);

    axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

    React.useLayoutEffect(() => {
        var datareceived = secureLocalStorage.getItem("ED_");

        console.log(datareceived)
        for (let i = 0; i < datareceived.length; i++) {
            $('#franchiseselect option[value=' + datareceived[4] + ']').attr('selected', 'selected');
            $('#productselect option[value=' + datareceived[8] + ']').attr('selected', 'selected');
            document.getElementById("quantity").value = datareceived[2];
          
            formik.initialValues.quantity = datareceived[2];
            formik.initialValues.franchise_select= datareceived[4];
            formik.initialValues.product_select = datareceived[8];
        }

        //load franchise and product from inventory
        axios.get(url.inventorylist)
            .then(res => {
                console.log(res)
                setFranchiselist(res.data.results);
            });
    }, []);

    if (franchise.length > 0) {
            franchise_lists = franchise.length > 0 && franchise.map((item, i) => {
            if (item.franchise.data.name === undefined || item.franchise.data.name === "" || item.franchise.data.name === null) {
                return (
                    <option key={i} disabled>No franchise created</option>
                )
            }
            else {
                return (
                    <option key={i} value={item.franchise.data.id}>
                        {item.franchise.data.name}
                    </option>
                )
            }
        }, this);
        product_lists = franchise.length > 0 && franchise.map((item, i) => {
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
        franchise_select: yup.string().required("* Select a franchise"),
        product_select: yup.string().required("* Select a product"),
        quantity: yup.number().min(1, "Please enter a quantity more than 1").required("Quantity is required"),
    });

    const formik = useFormik({
        initialValues: {
            franchise_select: "",
            product_select: "",
            quantity: ""
        },
        validationSchema: formSchema,
        onSubmit: () => {
          //logic
          var franchise = $("#franchiseselect").find('option:selected', this).val();
          var product = $("#productselect").find('option:selected', this).val();
          var available_quantity = document.getElementById("quantity").value;
  
          var data = {
              franchise: franchise,
              product: product,
              quantity: available_quantity,
          }

          console.log(data)
  
          if (franchise != "" && product != "" && available_quantity != "") {
              axios.put(url.update_inventory + secureLocalStorage.getItem("ED_")[0] + "/", data)
                  .then((res) => {
                    console.log(res)
                      $(".modal-body").html("<p class=text-danger>Inventory details updated</p>");
                      $(".modal-title").html("");
                      $(".modal-footerdiv").html("");
                      $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
                      $("#redirectC").addClass("btn btn-primary");
                      $("#redirectC").on("click", function () {
                          $("#modalDialog").toggle('hide');
                          //   setCurrentTab("viewinventory");
                          window.location.href = "/addinventory";
                      });
                      $("#modalDialog").toggle('show');
                  })
                  .catch(function (res) {
                    //   if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
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
                    //   }
                    else if (res.response.status === 400) {
                        $(".modal-body").html("<p class=text-danger>Bad request found</p>");
                        $(".modal-title").html("");
                        $(".modal-footerdiv").html("<button id=redirect101>ok</button>");
                        $("#redirect101").addClass("btn btn-primary");
                        $("#redirect101").on("click", function () {
                          $("#modalDialog").toggle('hide');
                        });
                        $("#modalDialog").toggle('show');
                      }
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
                <br />
                <InputLabel htmlFor="inventory-details"><b>EDIT INVENTORY DETAILS</b></InputLabel>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="quantity-signup">Select franchise*</InputLabel>
                            <div className="mb-2">
                                <select id="franchiseselect"
                                    // defaultValue={''} 
                                    // {...defaultValues}
                                    name="franchise_select"
                                    value={formik.values.franchise_select}
                                    // {...register("franchise_select")}
                                    onChange={formik.handleChange}
                                    className={formik.errors.franchise_select !="" ? "errorClass form-select form-select-sm" : "form-select form-select-sm"}
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
                                    className={formik.errors.product_select !="" ? "errorClass form-select form-select-sm" : "form-select form-select-sm"}
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
                            <input id="quantity" type="number" name="quantity"
                                className={formik.errors.quantity!=""  ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
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
                        value="Update" />
                    <Link component={RouterLink} to="/addinventory">Cancel</Link>
                </Grid>
            </form>
        </AuthWrapper>
    );
};

export default EditInventory;