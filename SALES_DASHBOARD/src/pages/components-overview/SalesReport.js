import React from 'react';
import $ from 'jquery';
import { InputLabel } from '@mui/material';
import secureLocalStorage from 'react-secure-storage';

//third-party
import axios from 'axios';
import 'datatables.net-responsive';
import "react-phone-number-input/style.css";

//project import
import url from 'routes/url';
import AuthWrapper from 'pages/authentication/AuthWrapper';

export default function SalesReport() {
  $.DataTable = require('datatables.net');
  React.useEffect(() => {
    $.fn.dataTableExt.sErrMode = 'none';
    $.fn.dataTableExt.sErrMode = 'none';
    $.extend($.fn.dataTable.defaults, {
      responsive: true
    });

    let table = $('#tbl_sales').DataTable({
      "fnDrawCallback": function() {
        if ($('#tbl_sales tr').length < 11) {
            // $('.dataTables_paginate').hide();
            $('.dataTables_length').hide();
        }
    },
      ajax: function () {
        $.ajax({
          url: url.sales,
          processing: true,
          serverSide: true,
          type: 'GET',
          'beforeSend': function (request) {
            request.setRequestHeader("Authorization", `Bearer ${secureLocalStorage.getItem('at_')}`);
          }
        }).then(function (json) {
          table.clear();
          console.log(json);
          for (let i = 0; i < json.results.length; i++) {

            var d1 = new Date(json.results[i].sale_date);
            var sale_at = d1.toLocaleString().split('t')[0];

            // var d2 = new Date(json.results[i].updated_at);
            // var updated_at = d2.toLocaleString().split('t')[0];

            table.row.add(
              [
                json.results[i].id,
                json.results[i].customer.name,
                json.results[i].customer.phone_number,
                json.results[i].product.name,
                json.results[i].total_amount,
                json.results[i].total_amount,
                sale_at,
              ]
            );

            axios.defaults.headers.common = {
              'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`,
              "Accept": "application/json"
            }
          }
          table.draw();
        })
          .catch(function (res) {
            // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
            if (res.response.status === 401) {
              $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectq1>ok</button>");
              $("#redirectq1").addClass("btn btn-primary");
              $("#redirectq1").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            else if (res.response.status === 400) {
              $(".modal-body").html("<p class=text-danger>Bad request found</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectsa1>ok</button>");
              $("#redirectsa1").addClass("btn btn-primary");
              $("#redirectsa1").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            // }
            else {
              $(".modal-body").html("<p class=text-danger>Network Error!</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectsa22>ok</button>");
              $("#redirectsa22").addClass("btn btn-primary");
              $("#redirectsa22").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
          })
      },
      // columnDefs: [
      //   {
      //     data: null,
      //     defaultContent: '<div><button class="btn btn-sm btn-primary btnEdit mx-1">Add new</button></div>',
      //     targets: -1,
      //   },
      // ]
    });


    // table.off('click.rowClick').on('click.rowClick', 'button', function (e) {
    //   let data = table.row(e.target.closest('tr')).data();

    //           //edit list
    //           if (e.target.classList.contains("btnEdit") == true) {
    //             // $("#editModal").modal('show');
    //             secureLocalStorage.setItem("ED_", data);
    //             window.location.href = "/editsales";
    //           }
    // });
  }, []);

  const radiohandler = (e) => {
    var inputValue = e.target.id;
    if (inputValue == "custom_range") {
      document.getElementById("date_section").style.display = "block";
    }
    else {
      document.getElementById("date_section").style.display = "none";
    }
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    var dateReceived = new Date(date);
    return (
      [
        dateReceived.getFullYear(),
        padTo2Digits(dateReceived.getMonth() + 1),
        padTo2Digits(dateReceived.getDate()),
      ].join('-')
    );
  }

  return (
    <AuthWrapper>
      <InputLabel htmlFor="product-details"><b>SALES LIST</b></InputLabel>
      <br />
      <div className="table-responsive mb-3">
        <label htmlFor="account" className="form-label">Please select an option</label>
        <div className="row mb-3">
          <div className='col-auto col-xs-12'>
            <input type="radio" id="all" name="sales" value="all" onClick={radiohandler} defaultChecked />
            <span className='mx-1'>All</span>
          </div>
          <div className="col-auto col-xs-12">
            <input type="radio" id="custom_range" name="sales" value="custom_range" onClick={radiohandler} />
            <span className='mx-1'>Custom range</span>
          </div>
          <div className="w-25" id="date_section" style={{ display: 'none' }}>
            <div >
              <label htmlFor="from_date" className="form-label">From Date</label>
              <input id="from_date" name="from_date" className="form-control form-control-sm" type="date" max={formatDate(new Date())} />
          
              <label htmlFor="to_date" className="form-label mt-2">To Date</label>
              <input id="till_date" name="till_date" className="form-control form-control-sm" type="date" max={formatDate(new Date())} />
            </div>
          </div>


          <div className='col-auto col-xs-12'>
            <button type="submit" className='mx-2 btn btn-sm btn-primary'>Get report</button>
          </div>
        </div>
        <table className="table nowrap w-100" id="tbl_sales">
          <thead>
            <tr className='text-left'>
              <th>ID</th>
              <th>Customer name</th>
              <th>Phone No.</th>
              <th>Product</th>
              <th>Total Amount</th>
              <th>Payment type</th>
              <th>Date & Time</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </AuthWrapper>
  )
}