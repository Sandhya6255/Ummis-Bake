import React from 'react';
import $ from 'jquery';

//third-party
import axios from 'axios';
import 'datatables.net-responsive';
import "react-phone-number-input/style.css";

//project import
import url from 'routes/url';
import secureLocalStorage from 'react-secure-storage';

export default function ProductReport() {
  $.DataTable = require('datatables.net');
  React.useEffect(() => {
    $.fn.dataTableExt.sErrMode = 'none';
    $.extend($.fn.dataTable.defaults, {
      responsive: true
    });
    $('#tbl_products').DataTable({
      columnDefs: [
    
        {
          targets: 10,
          visible: false
        }]
    });
    getallreports();
  }, []);

  function getallreports() {
    let table = $('#tbl_products').DataTable({
      columnDefs:[ {
        targets: 10,
        visible: false
      }]
    });

    /* Formatting function for row details - modify as you need */
    function format(d) {
      return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td style="text-align:left">Product image :&nbsp;' + d[5] + '</td>' +
        '</tr>' +
        '</table>'
      );
    }

    // Event listener for opening and closing details
    $('#tbl_products tbody').on('click', 'td.dt-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row(tr);
      // console.log(row.data())
      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
      } else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
      }
    });

    axios.defaults.headers.common = {
      'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`,
      "Accept": "application/json"
    }

    //Get all product lists
    axios.get(url.productlist)
      .then(function (response) {   
        console.log(response)
        if (response.status == 200) {
          table.clear();
          for (let i = 0; i < response.data.results.length; i++) {

            var d1 = new Date(response.data.results[i].created_at);
            var created_at = d1.toLocaleString().split('t')[0];

            var d2 = new Date(response.data.results[i].updated_at);
            var updated_at = d2.toLocaleString().split('t')[0];

            var img;
            if (response.data.results[i].product_image === null) {
              img = '--:--'
            }
            else {
              img = '<img src=' + response.data.results[i].product_image + ' height="150" width="150" alt="product_image" />';
            }        

            var btn = '<div><button class="btn btn-sm btn-primary edit mx-1"'+
            'id=' + response.data.results[i].id +'>Edit</button>' +
              '<button class="btn btn-sm btn-danger delete mx-1" id=' + response.data.results[i].id + '>Delete</button></div>'

            table.row.add(
              [
                // '',
                response.data.results[i].id,
                response.data.results[i].name,
                response.data.results[i].company,
                response.data.results[i].description,
                response.data.results[i].price,
                response.data.results[i].category,
                img,
                created_at,
                updated_at,
                btn,
                response.data.results[i].product_image,
              ]
            );

            //edit list
            $('#tbl_products tbody').on('click', '.edit', function () {
              // let string = JSON.string(data);
              console.log($(this).closest('tr').data())
              secureLocalStorage.setItem("ED_", table.row( $(this) ).data());
              console.log(secureLocalStorage.getItem("ED_"))
              // window.location.href="/editproduct";
            });

            //delete list
            $('#tbl_products tbody').on('click', '.delete', function () {
              axios.delete(url.addproduct + $(this)[0].id)
                .then(function () {
                  // if (response.status == 200) {
                  //   $(".modal-body").html("<p class=text-danger>Product item deleted.</p>");
                  //   $(".modal-title").html("")
                  //   $(".modal-footerdiv").html("<button id=redirectdel>ok</button>");
                  //   $("#redirectdel").addClass("btn btn-primary");
                  //   $("#redirectdel").on("click", function () {
                  //     $("#modalDialog").toggle('hide');
                      table
                        .row($(this).parents('tr'))
                        .remove()
                        .draw();
                      // window.location.reload();
                  //   });
                  //   $("#modalDialog").toggle('show');
                  // }
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
            });
          }
          table.draw();
        }
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

  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table nowrap w-100" id="tbl_products">
          <thead>
            <tr className='text-left'>
              {/* <th></th> */}
              <th>ID</th>
              <th>Product name</th>
              <th>Company name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  )
}