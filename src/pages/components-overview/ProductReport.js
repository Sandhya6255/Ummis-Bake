import React, { useState } from 'react';
import $ from 'jquery';
// import { useNavigate } from 'react-router-dom';

//third-party
// import axios from 'axios';
import 'datatables.net-responsive';
import "react-phone-number-input/style.css";

//project import
import url from 'routes/url';
import secureLocalStorage from 'react-secure-storage';

export default function ProductReport() {
  // const history = useNavigate();
  const [imgUrl, setimageUrl] = useState();
  $.DataTable = require('datatables.net');
  React.useEffect(() => {
    $.fn.dataTableExt.sErrMode = 'none';
    $.fn.dataTableExt.sErrMode = 'none';
    $.extend($.fn.dataTable.defaults, {
      responsive: true
    });

    let table = $('#tbl_products').DataTable({
      ajax: function () {
        $.ajax({
          url: url.productlist,
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


            var img;
            if (json.results[i].product_image === null) {
              img = '--:--';
              setimageUrl("")
            }
            else {
              img = '<img src=' + json.results[i].product_image + ' height="150" width="150" alt="product_image" />';
              setimageUrl(json.results[i].product_image);
            }

            console.log(imgUrl)
            table.row.add(
              [
                // '',
                json.results[i].id,
                json.results[i].name,
                json.results[i].company,
                json.results[i].description,
                json.results[i].price,
                json.results[i].category,
                img,
                created_at,
                updated_at,
                json.results[i].product_image
              ]
            );
          }
          table.draw();
        })
        .catch(function (res) {
          console.log(res)
            if (res.response.status === 401) {
              $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
              $(".modal-title").html("");
              $(".modal-footerdiv").html("<button id=redirect121>ok</button>");
              $("#redirect121").addClass("btn btn-primary");
              $("#redirect121").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            else if (res.response.status === 400) {
              $(".modal-body").html("<p class=text-danger>Bad request found</p>");
              $(".modal-title").html("");
              $(".modal-footerdiv").html("<button id=redirectd11>ok</button>");
              $("#redirectd11").addClass("btn btn-primary");
              $("#redirectd11").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
          else {
            $(".modal-body").html("<p class=text-danger>Network Error!</p>");
            $(".modal-title").html("")
            $(".modal-footerdiv").html("<button id=redirectd12>ok</button>");
            $("#redirectd12").addClass("btn btn-primary");
            $("#redirectd12").on("click", function () {
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

    axios.defaults.headers.common = {
      'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`,
      'Content-Type': 'multipart/form-data'
    }


    //edit list
    table.off('click.rowClick').on('click.rowClick', 'button', function (e) {
      let data = table.row(e.target.closest('tr')).data();
      if (e.target.classList.contains("btnEdit") == true) {
        // $("#editModal").modal('show');
        secureLocalStorage.setItem("ED_", data);
        secureLocalStorage.setItem("IMU_", imgUrl);
        console.log(imgUrl, secureLocalStorage.getItem("IMU_"));
        window.location.href = "/editproduct";
      }
      if (e.target.classList.contains("btnRemove") == true) {
        axios.delete(url.productlist + data[0])
          .then(function () {
            $(".modal-body").html("<p class=text-danger>Product item deleted</p>");
            $(".modal-title").html("")
            $(".modal-footerdiv").html("<button id=redirect7>ok</button>");
            $("#redirect7").addClass("btn btn-primary");
            $("#redirect7").on("click", function () {
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
            console.log(res)
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
                $(".modal-footerdiv").html("<button id=redirectd1>ok</button>");
                $("#redirectd1").addClass("btn btn-primary");
                $("#redirectd1").on("click", function () {
                  $("#modalDialog").toggle('hide');
                });
                $("#modalDialog").toggle('show');
              }
            else {
              $(".modal-body").html("<p class=text-danger>Network Error!</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectd2>ok</button>");
              $("#redirectd2").addClass("btn btn-primary");
              $("#redirectd2").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
          })
      }
    });
  }, []);


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
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        {/* Edit modal */}
        <div className="modal" id="editModal" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Product</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}