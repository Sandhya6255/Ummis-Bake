import React from 'react';
import $ from 'jquery';
import { InputLabel } from '@mui/material';
import secureLocalStorage from 'react-secure-storage';

//third-party
import 'datatables.net-responsive';
import "react-phone-number-input/style.css";

//project import
import url from 'routes/url';
import AuthWrapper from 'pages/authentication/AuthWrapper';

export default function CustomerReport() {
  $.DataTable = require('datatables.net');
  React.useEffect(() => {
    $.fn.dataTableExt.sErrMode = 'none';
    $.fn.dataTableExt.sErrMode = 'none';
    $.extend($.fn.dataTable.defaults, {
      responsive: true
    });

    let table = $('#tbl_customer').DataTable({
      ajax: function () {
        $.ajax({
          url: url.customer,
          processing: true,
          serverSide: true,
          type: 'GET',
          'beforeSend': function (request) {
            request.setRequestHeader("Authorization", `Bearer ${secureLocalStorage.getItem('at_')}`);
          }
        }).then(function (json) {
          table.clear();
          console.log(json, "json");
          for (let i = 0; i < json.results.length; i++) {

            var d1 = new Date(json.results[i].created_at);
            var sale_at = d1.toLocaleString().split('t')[0];

            var d2 = new Date(json.results[i].updated_at);
            var updated_at = d2.toLocaleString().split('t')[0];

            // var qtype;
            // if (json.results[i].quantity_type == "piece") {
            //   qtype = json.results[i].quantity_sold + "pcs";
            // }
            // else {
            //   qtype = json.results[i].quantity_sold + "kg";
            // }


            var location;
            if (json.results[i].pin == "") {
              location =  "--:--";
            }
            else {
              location = json.results[i].pin;
            }

            table.row.add(
              [
                json.results[i].id,
                json.results[i].name,
                json.results[i].phone_number,
                // json.results[i].product.name,
                // qtype,
                location,
                json.results[i].points,
                // json.results[i].payment_mode,
                // json.results[i].total_amount,
                sale_at,
                updated_at,
                // json.results[i].product.id,
                // json.results[i].quantity_sold,
                // json.results[i].quantity_type
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
              $(".modal-footerdiv").html("<button id=redirectc1>ok</button>");
              $("#redirectc1").addClass("btn btn-primary");
              $("#redirectc1").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            else if (res.response.status === 400) {
              $(".modal-body").html("<p class=text-danger>Bad request found</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectcs1>ok</button>");
              $("#redirectcs1").addClass("btn btn-primary");
              $("#redirectcs1").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            // }
            else {
              $(".modal-body").html("<p class=text-danger>Network Error!</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectc22>ok</button>");
              $("#redirectc22").addClass("btn btn-primary");
              $("#redirectc22").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
          });
      },
      columnDefs: [
        {
          data: null,
          defaultContent: '<div><button class="btn btn-sm btn-primary btnEdit mx-1">Add new</button></div>',
          targets: -1,
        },
      ]
    });
    table.off('click.rowClick').on('click.rowClick', 'button', function (e) {
      if (e.target.classList.contains("btnEdit") == true) {
        let data = table.row(e.target.closest('tr')).data();
        secureLocalStorage.setItem("EDS_", data);
        window.location.href = "/editsales";
      }
    });
    

  }, []);


  return (
    <AuthWrapper>
      <InputLabel htmlFor="product-details"><b>CUSTOMER LIST</b></InputLabel>
      <br />
      <div className="table-responsive mb-3">
        <table className="table nowrap w-100" id="tbl_customer">
          <thead>
            <tr className='text-left'>
              <th>ID</th>
              <th>Customer name</th>
              <th>Phone No.</th>
              {/* <th>Product sold</th>
              <th>Quantity sold</th> */}
              <th>Location</th>
              <th>Store point</th>
              {/* <th>Payment method</th> */}
              {/* <th>Price</th> */}
              <th>Sold at</th>
              <th>Updated at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </AuthWrapper>
  )
}