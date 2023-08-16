// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack
} from '@mui/material';
import { Tab, Nav } from 'react-bootstrap';
import { useState } from 'react';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import InventoryReport from './InventoryReport';

// ============================|| FIREBASE - REGISTER ||============================ //

const AddInventory = () => {

    const [currentTab, setCurrentTab] = useState("addinventory");

    //Submit inventory details
    const AddNewInventory = () => {
        var franchise = document.getElementById("franchiseselect").value;
        var product = document.getElementById("productselect").value;
        var available_quantity = document.getElementById("available_quantity").value;
    
        var data= {
          franchise: franchise,
          product:product,
          available_quantity:quantity,
        }
    
        if(franchise!=""&&product!=""&&available_quantity!="")
        {
          axios.post('http://internal-api.ummiscakehouse.com/inventory/create/',{data})
          .then(res => {
            console.log(res);
            setCurrentTab("viewinventory");
          })
        }
    }

    return (
        <>            
        <Tab.Container defaultActiveKey={currentTab} activeKey={currentTab}>
            <div className="px-0">
                <Nav variant="tabs" className="text-white b-0" >
                    <Nav.Link eventKey="addinventory" onClick={() => setCurrentTab("addinventory")}>Add new</Nav.Link>
                    <Nav.Link eventKey="viewinventory" onClick={() => setCurrentTab("viewinventory")}>View list</Nav.Link>
                </Nav>
            </div>
            <Tab.Content className='mt-1'>
                <Tab.Pane eventKey="addinventory">
                    <Formik
                        initialValues={{
                            quantity: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            quantity: Yup.number().min(1, "Please enter a name more than 1 character").required("Quantity is required"),
                        })}
                        onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
                            try {
                                setStatus({ success: false });
                                setSubmitting(false);
                            } catch (err) {
                                console.error(err);
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <br />
                                <InputLabel htmlFor="inventory-details"><b>ADD INVENTORY DETAILS</b></InputLabel>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="quantity-signup">Select franchise*</InputLabel>
                                            <select className='form-control' id="franchiseselect">
                                                <option>Adam, chenganoor</option>
                                                <option>Suresh, edappali</option>
                                            </select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="quantity-signup">Select product*</InputLabel>
                                            <select className='form-control' id="productselect">
                                                <option>Cupcake</option>
                                                <option>Plumcake</option>
                                            </select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="quantity-signup">Quantity*</InputLabel>
                                            <OutlinedInput
                                                type="number"
                                                fullWidth
                                                error={Boolean(touched.quantity && errors.quantity)}
                                                id="available_quantity"
                                                value={values.quantity}
                                                name="quantity"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder=""
                                                inputProps={{}}
                                            />
                                            {touched.quantity && errors.quantity && (
                                                <FormHelperText error id="helper-text-quantity-signup">
                                                    {errors.quantity}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button disableElevation disabled={isSubmitting} 
                                        size="medium" style={{ margin: '0 auto', display: "flex" }} 
                                        type="submit" variant="contained" color="primary" onClick={AddNewInventory}>
                                            Submit
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                            </form>
                        )}
                    </Formik>
                </Tab.Pane>
                <Tab.Pane eventKey="viewinventory">
                    <br />
                    <InputLabel htmlFor="inventory-details"><b>INVENTORY LIST</b></InputLabel>
                    <br />
                    <InventoryReport />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
        </>
    );
};

export default AddInventory;