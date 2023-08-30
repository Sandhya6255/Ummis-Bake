import React from 'react';
import $ from 'jquery';
import { Link as RouterLink } from 'react-router-dom';

//material ui
import {
  Stack,
  Grid,
  InputLabel,
  Link
} from '@mui/material'
import { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

//third-party
import axios from 'axios';
import 'datatables.net-responsive';
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//project import
import url from 'routes/url';

var franchise_lists, product_lists;
export default function InventoryReport() {
  $.DataTable = require('datatables.net');
  React.useLayoutEffect(() => {
    $.fn.dataTableExt.sErrMode = 'none';
    $.fn.dataTableExt.sErrMode = 'none';
    $.extend($.fn.dataTable.defaults, {
      responsive: true
    });

    axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

    //load franchise and product
    axios.get(url.franchiselist)
      .then(res => {
        setFranchiselist(res.data.results)
      });
    axios.get(url.productlist)
      .then(res => {
        setProductlist(res.data.results)
      });

    let table = $('#tbl_sales').DataTable({
      ajax: function () {
        $.ajax({
          url: url.inventorylist,
          processing: true,
          serverSide: true,
          type: 'GET',
          'beforeSend': function (request) {
            request.setRequestHeader("Authorization", `Bearer ${secureLocalStorage.getItem('at_')}`);
          }
        }).then(function (json) {
          table.clear();
          for (let i = 0; i < json.results.length; i++) {

            var d1 = new Date(json.results[i].created_at);
            var created_at = d1.toLocaleString().split('t')[0];

            var d2 = new Date(json.results[i].updated_at);
            var updated_at = d2.toLocaleString().split('t')[0];

            table.row.add(
              [
                // '',
                json.results[i].id,
                json.results[i].product.name,
                json.results[i].available_quantity,
                json.results[i].total_sold,
                json.results[i].franchise.data.id,
                json.results[i].franchise.data.username,
                created_at,
                updated_at,
                json.results[i].product.id,
              ]
            );
          }
          table.draw();
        })
        .catch(function (res) {
          // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
            if (res.response.status === 401) {
              $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectr1>ok</button>");
              $("#redirectr1").addClass("btn btn-primary");
              $("#redirectr1").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            else if (res.response.status === 400) {
              $(".modal-body").html("<p class=text-danger>Bad request found</p>");
              $(".modal-title").html("");
              $(".modal-footerdiv").html("<button id=redirectr112>ok</button>");
              $("#redirectr112").addClass("btn btn-primary");
              $("#redirectr112").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
          // }
          else  {
            $(".modal-body").html("<p class=text-danger>Network Error!</p>");
            $(".modal-title").html("")
            $(".modal-footerdiv").html("<button id=redirectr2>ok</button>");
            $("#redirectr2").addClass("btn btn-primary");
            $("#redirectr2").on("click", function () {
              $("#modalDialog").toggle('hide');
            });
            $("#modalDialog").toggle('show');
          }
        });
      },
      columnDefs: [
        {
          data: null,
          defaultContent: '<div><button class="btn btn-sm btn-primary btnEdit mx-1">Edit</button><button class="btn btn-sm btn-danger btnRemove">Remove</button></div>',
          targets: -1,
        },
      ]
    });


    table.off('click.rowClick').on('click.rowClick', 'button', function (e) {
      let data = table.row(e.target.closest('tr')).data();

      //edit list
      if (e.target.classList.contains("btnEdit") == true) {
        // $("#editModal").modal('show');
        let data = table.row(e.target.closest('tr')).data();
        secureLocalStorage.setItem("ED_", data);
        window.location.href = "/editinventory";
        // $("#myModal").modal('show');
      }

      //delete list
      if (e.target.classList.contains("btnRemove") == true) {
        axios.delete(url.del_inventory + data[0])
          .then(function () {
            $(".modal-body").html("<p class=text-danger>Inventory details deleted</p>");
            $(".modal-title").html("")
            $(".modal-footerdiv").html("<button id=redirect35>ok</button>");
            $("#redirect35").addClass("btn btn-primary");
            $("#redirect35").on("click", function () {
              $("#modalDialog").toggle('hide');
              table
                .row($(this).parents('tr'))
                .remove()
                .draw();
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
                $(".modal-footerdiv").html("<button id=redirect112>ok</button>");
                $("#redirect112").addClass("btn btn-primary");
                $("#redirect112").on("click", function () {
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
    });
  }, []);

  const [franchise, setFranchiselist] = useState([]);
  const [product, setProductlist] = useState([]);

  if (franchise.length > 0) {
    franchise_lists = franchise.length > 0 && franchise.map((item, i) => {
      if (item.data.username === undefined || item.data.username === "" || item.data.username === null) {
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
  const SignupSchema = yup.object().shape({
    franchise_select: yup.string().required("* Select a franchise"),
    product_select: yup.string().required("* Select a product"),
    quantity: yup.string().required("* Quantity is required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema)
  });

  //Edit inventory details
  const EditInventory = (data1) => {
    console.log(data1, "####################");
    var franchise = $("#franchiseselect").find('option:selected', this).val();
    var product = $("#productselect").find('option:selected', this).val();
    var available_quantity = document.getElementById("quantity").value;

    var data = {
      franchise: franchise,
      product: product,
      available_quantity: available_quantity,
    }

    if (franchise != "" && product != "" && available_quantity != "") {
      axios.put(url.update_inventory + secureLocalStorage.getItem("ED_")[0] + "/", data)
        .then(() => {
          $(".modal-body").html("<p class=text-danger>Inventory details updated</p>");
          $(".modal-title").html("");
          $(".modal-footerdiv").html("");
          $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
          $("#redirectC").addClass("btn btn-primary");
          $("#redirectC").on("click", function () {
            $("#modalDialog").toggle('hide');
            //   setCurrentTab("viewinventory");
            window.location.href = "/addproduct";
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
  };



  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table nowrap w-100" id="tbl_sales">
          <thead>
            <tr className='text-left'>
              {/* <th></th> */}
              <th>ID</th>
              <th>Product</th>
              <th>Available Qty</th>
              <th>Total sold</th>
              <th>Franchise ID</th>
              <th>Franchise username</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <div className='modal fade' id="editmodal" tabIndex="-1">
        <form onSubmit={handleSubmit(EditInventory)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="quantity-signup">Select franchise*</InputLabel>
                <div className="mb-2">
                  <select
                    id="franchiseselectedit"
                    // defaultValue={''} 
                    {...register("franchise_select")}
                    onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })} // Using setValue
                    className={errors.select ? "" : "form-select form-select-sm"}>
                    <option disabled value="">Select one</option>
                    {franchise_lists}
                  </select>
                  {errors.franchise_select && <p className="text-danger">{errors.franchise_select.message}</p>}
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
                    id="productselectedit"
                    // defaultValue={''}
                    {...register("product_select")}
                    onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })} // Using setValue
                    className={errors.select ? "" : "form-select form-select-sm"}>
                    <option disabled value="">Select one</option>
                    {product_lists}
                  </select>
                  {errors.product_select && <p className="text-danger">{errors.product_select.message}</p>}
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
                <input id="quantityedit" type="number"
                  className={errors.quantity ? "" : "form-control form-control-sm"}
                  {...register("quantity", { required: true })}
                // value="1"
                />
                {errors.quantity ? <p className="text-danger">{errors.quantity.message}</p> : ""}
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
      </div>
    </>
  )
}