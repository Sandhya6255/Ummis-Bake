import React from "react";
// import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions";

import { columns, data } from "../data";
import axios from 'axios';
import url from "routes/url";
import secureLocalStorage from "react-secure-storage";

export default function Sample() {
const tableData = {
        columns,
        data
      };
React.useEffect(()=>
{
    axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

    axios.get(url.productlist)
    .then(res => {
        console.log(res)
        // setProductlist(res.data.results)
    });
},[])


  console.log(tableData.data);


  return (
    <div className="main">
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          sortIcon={<SortIcon />}
          defaultSortAsc={true}
          pagination
          highlightOnHover
          dense
        />
      </DataTableExtensions>
    </div>
  );
}

