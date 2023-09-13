import React from 'react';
// import $ from 'jquery';

//css
import 'assets/css/main.css';

// material-ui
import {
    InputLabel,
} from '@mui/material';
import { useState } from 'react';

// third party
// import * as yup from 'yup';
// import { useFormik } from "formik";
// import axios from 'axios';

// project import
import AuthWrapper from 'pages/authentication/AuthWrapper';
// import url from 'routes/url';
import Addnewcustomer from './Addnewcustomer';
import Existingcustomer from './Existingcustomer';

// ============================|| ADD - SALES ||============================ //

const SalesDashboard = () => {
    const [isNew, setIsNew] = useState(true);

  
    const AddSales = (event) => {
        document.getElementById("mainsection").style.display = "none";
        document.getElementById("subdiv").style.display = "block";
        if (event.target.id == 1) {
            setIsNew(true);
        }
        else {
            setIsNew(false);
        }
    }


    return (
        <AuthWrapper>
            <div className="mb-3 mt-5">
                <InputLabel htmlFor="customer-details"><b>UMMI&apos;S SALES</b></InputLabel>
            </div>

            <div className="row justify-content-center" id="mainsection">
                        <div className="col-md-6 col-xs-12 mb-2">
                            <button className='btn btn-primary p-5' style={{ 'width': "100%" }} id="1"
                                onClick={AddSales}>Add new customer? </button>
                        </div>
                        <div className="col-md-6 col-xs-12 mb-2">
                            <button className='btn btn-secondary p-5' style={{ 'width': "100%" }} id="2"
                                onClick={AddSales}>Existing customer? </button>
                        </div>
                    </div>




            <div id="subdiv" style={{display:'none'}}>
            {isNew ?
               <Addnewcustomer /> :
               <Existingcustomer />
            }
            </div>

        </AuthWrapper>
    );
};

export default SalesDashboard;