import React from 'react';
import secureLocalStorage from 'react-secure-storage';
import $ from 'jquery';

//css
import 'assets/css/main.css';

// material-ui
import {
    Grid,
    InputLabel,
    Stack
} from '@mui/material';
import { useState } from 'react';

// third party
import * as yup from 'yup';
import { useFormik } from "formik";
import axios from 'axios';
// import { CloseCircleOutlined } from '@ant-design/icons';

// project import
import url from 'routes/url';
import redirections from 'routes/redirections';

// ============================|| ADD - SALES ||============================ //

var product_lists;    var  counter=1;
const SalesDetails = () => {
    const [product, setProductlist] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [count,setCount] = useState(1);
    //load franchise and product
    React.useEffect(() => {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

        axios.get(url.inventorylist)
            .then(res => {
                setProductlist(res.data.results)
            });
    }, []);

    if (product.length > 0) {
        product_lists = product.length > 0 && product.map((item, i) => {
            if (item.product.name === undefined || item.product.name === "" || item.product.name === null) {
                return (
                    <option key={i} disabled>No product created</option>
                )
            }
            else {
                return (
                    <option key={i} id={item.product.id} value={item.product.price}>
                        {item.product.name}
                    </option>
                )
            }
        }, this);
    }

    const formSchema = yup.object().shape({
        product_select: yup.string().required("* Select a product"),
        quantity: yup.number().min(1, "Please enter a valid quantity").required("* Quantity is required"),
    });

    const formik = useFormik({
        initialValues: {
            product_select: "",
            quantity: '',
        },
        validationSchema: formSchema,
        onSubmit: () => {
            //Add sales
            // document.getElementById("customer_section").style.display = "none";
            // document.getElementById("sales_section").style.display = "block";

    
    // formik.initi.product_select = '';
        
        var select = "",quantity="",amount = "",action="";

      var quantityamount = document.getElementById('quantity'+counter).value;
      
      var price = $("#productselect"+counter).find("option:selected", this).val();

console.log("#####################result for counter##",counter,"##############################")
      console.log(quantityamount,"price:",price)
      document.getElementById('amount'+counter).innerHTML = quantityamount * price;
    //   $("table tbody td:nth-child(3)").html(quantityamount * price)
      var total = quantityamount * price;
      setTotalAmount(total);
      counter++;
      setCount(counter);

      select = $("table tbody td:first-child").html();
      quantity = $("table tbody td:nth-child(2)").html();
      amount = $("table tbody td:nth-child(3)").html();
      action = $("table tbody td:nth-child(4)").html();

      console.log(quantity)
      console.log(amount)
      console.log("appendinggggg")
      formik.initialValues.quantity = '';
            var newRow = $('<tr><td>' + select + '</td>'+
            '<td>' + quantity + '</td>'+
            '<td>' + amount + '</td>'+
            '<td>' + action + '</td></tr>');
            $('table.addProducts').append(newRow);
      

            // select = $("table tbody td:first-child").html("");
            // quantity = $("table tbody td:nth-child(2)").html("");
            // amount = $("table tbody td:nth-child(3)").html("");
            // action = $("table tbody td:nth-child(4)").html("");
            // $("#productselect").find("option:selected", this).val("");
            // var price = document.getElementById("price").value;
            // var productname = $("#productselect").find("option:selected", this).val();
            // var payment_mode = $("#payment_mode").find("option:selected", this).val();
            // var mobile = secureLocalStorage.getItem("CP_");
         
            // var data = {
            //     total_amount: price,
            //     quantity_sold: quantity,
            //     phone_number: mobile,
            //     product: productname,
            //     quantity_type: quantity_type,
            //     payment_mode: payment_mode
            // }

            // console.log(data);
            // axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

            // if (customername != "" && mobile != "" && location != "" && storepoint != "" && price != ""
            //     && quantity != "" && productname != "") {
            //     axios.post(url.addsales, data)
            //         .then((response) => {
            //             console.log(response, "response for sales")
            //             // if(response.status == 200)
            //             {
            //                 $(".modal-body").html("<p class=text-danger>New sale added</p>");
            //                 $(".modal-title").html("")
            //                 $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
            //                 $("#redirectC").addClass("btn btn-primary");
            //                 $("#redirectC").on("click", function () {
            //                     $("#modalDialog").toggle('hide');
            //                     window.location.reload();
            //                 });
            //                 $("#modalDialog").toggle('show');
            //             }
            //         })
            //         .catch(function (res) {
            //             // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
            //             if (res.response.status === 401) {
            //                 $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
            //                 $(".modal-title").html("")
            //                 $(".modal-footerdiv").html("<button id=redirect1>ok</button>");
            //                 $("#redirect1").addClass("btn btn-primary");
            //                 $("#redirect1").on("click", function () {
            //                     $("#modalDialog").toggle('hide');
            //                 });
            //                 $("#modalDialog").toggle('show');
            //             }
            //             else if (res.response.status === 400) {
            //                 $(".modal-body").html("<p class=text-danger>Bad request found</p>");
            //                 $(".modal-title").html("")
            //                 $(".modal-footerdiv").html("<button id=redirects11>ok</button>");
            //                 $("#redirects11").addClass("btn btn-primary");
            //                 $("#redirects11").on("click", function () {
            //                     $("#modalDialog").toggle('hide');
            //                 });
            //                 $("#modalDialog").toggle('show');
            //             }
            //             // }
            //             else {
            //                 $(".modal-body").html("<p class=text-danger>Network Error!</p>");
            //                 $(".modal-title").html("")
            //                 $(".modal-footerdiv").html("<button id=redirect2>ok</button>");
            //                 $("#redirect2").addClass("btn btn-primary");
            //                 $("#redirect2").on("click", function () {
            //                     $("#modalDialog").toggle('hide');
            //                 });
            //                 $("#modalDialog").toggle('show');
            //             }
            //         })
            // }
        },
        setFieldValue: (values) => {
            delete values.field;
         },
    });



    const Changesection = () => {
        // document.getElementById("customer_section").style.display = "block";
        // document.getElementById("sales_section").style.display = "none";
        window.location.href = redirections.sales;
    }
 
    // Delete row on delete button click
    $(document).on("click", ".deleteButton", function () {
        if ($('.deleteButton').length > 1) {
        $(this).parents("tr").remove();
        counter++;
        setCount(counter);
        }
        // document.getElementById("addNew").disabled = false;
    });


    return (
        <>
            <div id="container">
                {/* <div className='row'> */}
                <div className='mb-2'>
                    <InputLabel htmlFor="sales-details" className="mb-2"><b>CUSTOMER DETAILS</b></InputLabel>
                    {/* {customer_details} */}
                    Customer name : <span id="customer_name" className='mx-auto'>
                        {secureLocalStorage.getItem("CN_") != "" ? secureLocalStorage.getItem("CN_") : "--"}
                    </span><br />
                    Mobile : <span id="phone_number" className='mx-auto'>
                        {secureLocalStorage.getItem("CP_") != "" ? secureLocalStorage.getItem("CP_") : "--"}
                    </span><br />
                    Location : <span id="location" className='mx-auto'>
                        {secureLocalStorage.getItem("CL_") != "" ? secureLocalStorage.getItem("CL_") : "--"}
                    </span><br />
                    Email : <span id="email" className='mx-auto'>
                        {secureLocalStorage.getItem("CE_") != "" ? secureLocalStorage.getItem("CE_") : "--"}
                    </span><br />
                    DOB : <span id="dob" className='mx-auto'>
                        {secureLocalStorage.getItem("CD_") != "" ? secureLocalStorage.getItem("CD_") : "--"}
                    </span><br />

                </div>
                <hr />
                <div className='mt-2'>
                    <InputLabel htmlFor="sales-details" className="mb-2"><b>ADD ITEMS</b></InputLabel>
                    <div id="salesnewsection">
                    <form onSubmit={formik.handleSubmit}>
                        <table className="addProducts table table-borderless table-responsive">
                            <thead>
                                <tr>
                                    <th>Select product*</th>
                                    <th>Quantity*</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select
                                            id={"productselect"+count}
                                            // {...defaultValues}
                                            name="product_select"
                                            value={formik.values.product_select}
                                            // // {...register("franchise_select")}
                                            onChange={formik.handleChange}
                                            className="form-select form-select-sm "
                                        >
                                            <option disabled value="">Select one</option>
                                            {product_lists}
                                        </select>
                                        {formik.touched.product_select && formik.errors.product_select && <p className="text-danger">{formik.errors.product_select}</p>}
                                        </td>
                                    <td>
                                        <input id={"quantity"+count} name="quantity" type="number"
                                            className="form-control form-control-sm"
                                            value={formik.values.quantity}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.quantity && formik.errors.quantity && <p className="text-danger">{formik.errors.quantity}</p>}
                                    </td>
                                    <td style={{width:'10%'}}>
                                        <span id={'amount'+count} name="amount">
                                            0.00
                                        </span>
                                    </td>
                                    <td style={{width:'10%'}} id="deletebtn">
                                        {/* <button className='mb-1 btn-sm btn deleteButton'>
                                        <CloseCircleOutlined className="text-danger" /></button> */}
                                        <a className="text-danger deleteButton" style={{cursor:'pointer'}}>Remove</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="submit" className="btn btn-sm" id="addNew" value="Add new+" />
                    </form>
                    </div>
                    <hr />


                    <Grid container spacing={3} id="price_section">
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className='row mx-0'>
                                    <div className='col-md-8 col-xs-12 col-lg-8'>
                                        <InputLabel htmlFor="price-signup">Payment method*</InputLabel>
                                        <select className='form-select form-select-sm' id="payment_mode">
                                            <option value="cash">CASH</option>
                                            <option value="bank">BANK</option>
                                        </select>
                                    </div>
                                    <div className='col-md-4 col-xs-12 col-lg-4'>
                                        <InputLabel htmlFor="price-signup">Total amount</InputLabel>
                                        <span id="price" name="price" style={{ fontSize: '20px' }}>
                                            {totalAmount}
                                        </span>
                                    </div>
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
                {/* </div> */}
            </div>

            <br />
            <div className='text-center'>
                <input type="submit"
                    className='btn btn-sm btn-primary'
                    // style={{ margin: '0 auto', display: "flex" }}
                    value="Submit" />
                <button type="button" className='btn btn-sm btn-outline-primary mx-2' onClick={Changesection}>
                    Back
                </button>
            </div>
        </>
    );
};

export default SalesDetails;