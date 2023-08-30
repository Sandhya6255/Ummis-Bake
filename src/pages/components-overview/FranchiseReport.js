import React from 'react';
import $ from 'jquery';

//third-party
import axios from 'axios';
import 'datatables.net-responsive';
import "react-phone-number-input/style.css";
import secureLocalStorage from 'react-secure-storage';

//project import
import url from 'routes/url';

export default function FranchiseReport() {
  $.DataTable = require('datatables.net');
  React.useEffect(() => {
    $.fn.dataTableExt.sErrMode = 'none';
    $.fn.dataTableExt.sErrMode = 'none';
    $.extend($.fn.dataTable.defaults, {
      responsive: true
    });

    let table = $('#tbl_franchise').DataTable({
      ajax: function () {
        $.ajax({
          url: url.franchiselist,
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
            var isactive;

            var d1 = new Date(json.results[i].data.created_at);
            var created_at = d1.toLocaleString().split('t')[0];

            var d2 = new Date(json.results[i].data.updated_at);
            var updated_at = d2.toLocaleString().split('t')[0];

            var d3 = new Date(json.results[i].data.date_established);
            var date_established = d3.toLocaleString().split('t')[0];

            if (json.results[i].data.is_active === true) {
              isactive = '<span class="badge-success rounded-pill text-white p-1">Active</span>';
            }
            else {
              isactive = '<span class="badge-danger rounded-pill text-white p-1">Not Active</span>';
            }

            table.row.add(
              [
                json.results[i].data.id,
                json.results[i].data.name,
                json.results[i].data.description,
                json.results[i].data.location,
                json.results[i].data.pin,
                json.results[i].data.username,
                json.results[i].data.contact_email,
                json.results[i].data.phone_number,
                date_established,
                isactive,
                created_at,
                updated_at,
                json.results[i].data.is_active
              ]
            );

            table.off('click.rowClick').on('click.rowClick', 'button', function (e) {
              let data = table.row(e.target.closest('tr')).data();
              //edit list
              if (e.target.classList.contains("btnEdit") == true) {
                secureLocalStorage.setItem("ED_", data);
                window.location.href = "/editfranchise";
              }

              //delete list
              if (e.target.classList.contains("btnRemove") == true) {
                axios.delete(url.franchiselist + data[0])
                  .then(function (res) {
                    console.log(res)
                    $(".modal-body").html("<p class=text-danger>Franchise details deleted</p>");
                    $(".modal-title").html("")
                    $(".modal-footerdiv").html("<button id=redirect33>ok</button>");
                    $("#redirect33").addClass("btn btn-primary");
                    $("#redirect33").on("click", function () {
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
                    // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
                    if (res.response.status === 401) {
                      $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
                      $(".modal-title").html("")
                      $(".modal-footerdiv").html("<button id=redirect31>ok</button>");
                      $("#redirect31").addClass("btn btn-primary");
                      $("#redirect31").on("click", function () {
                        $("#modalDialog").toggle('hide');
                      });
                      $("#modalDialog").toggle('show');
                    }
                    else if (res.response.status === 400) {
                      $(".modal-body").html("<p class=text-danger>Bad request found</p>");
                      $(".modal-title").html("");
                      $(".modal-footerdiv").html("<button id=redirect1ff>ok</button>");
                      $("#redirect1ff").addClass("btn btn-primary");
                      $("#redirect1ff").on("click", function () {
                        $("#modalDialog").toggle('hide');
                      });
                      $("#modalDialog").toggle('show');
                    }
                    // }
                    else {
                      $(".modal-body").html("<p class=text-danger>Network Error!</p>");
                      $(".modal-title").html("")
                      $(".modal-footerdiv").html("<button id=redirect24>ok</button>");
                      $("#redirect24").addClass("btn btn-primary");
                      $("#redirect24").on("click", function () {
                        $("#modalDialog").toggle('hide');
                      });
                      $("#modalDialog").toggle('show');
                    }
                  })
              }
            });
          }
          table.draw();
        })
          .catch(function (res) {
            // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
            if (res.response.status === 401) {
              $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirect1f>ok</button>");
              $("#redirect1f").addClass("btn btn-primary");
              $("#redirect1f").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            if (res.response.status === 400) {
              $(".modal-body").html("<p class=text-danger>Bad request found</p>");
              $(".modal-title").html("");
              $(".modal-footerdiv").html("<button id=redirectf1>ok</button>");
              $("#redirectf1").addClass("btn btn-primary");
              $("#redirectf1").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
            // }
            else {
              $(".modal-body").html("<p class=text-danger>Network Error!</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectf2>ok</button>");
              $("#redirectf2").addClass("btn btn-primary");
              $("#redirectf2").on("click", function () {
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

  }, []);

  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table nowrap w-100" id="tbl_franchise">
          <thead>
            <tr className='text-left'>
              {/* <th></th> */}
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>PIN</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Date established</th>
              <th>Isactive?</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  )
}