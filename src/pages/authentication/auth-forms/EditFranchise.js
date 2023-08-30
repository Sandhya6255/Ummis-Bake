import React from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import $ from 'jquery';

// material-ui
import {
    Grid,
    InputLabel,
    Stack,
    Typography,
    Link,
    FormControlLabel,
    Checkbox
} from '@mui/material';

// third party
import { useFormik } from 'formik';
import * as yup from "yup";

// project import
import url from 'routes/url';

// assets
import AuthWrapper from '../AuthWrapper';
import secureLocalStorage from 'react-secure-storage';

// ============================|| EDIT - FRANCHISE ||============================ //

var franchiseid;
const EditFranchise = () => {
    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        var datareceived = secureLocalStorage.getItem("ED_");
        franchiseid = datareceived[0];
        document.getElementById("name").value = datareceived[1];
        document.getElementById("description").value = datareceived[2];
        document.getElementById("address").value = datareceived[3];
        document.getElementById("email").value = datareceived[6];
        //    document.getElementById("password").value;
        //    document.getElementById("date_joined").value;
        document.getElementById("username").value = datareceived[5];
        document.getElementById("pin").value = datareceived[4];
        document.getElementById("phone").value = datareceived[7];


        formik.initialValues.name = datareceived[1];
        formik.initialValues.description = datareceived[2];
        formik.initialValues.email = datareceived[6];
        formik.initialValues.address = datareceived[3];
        formik.initialValues.username = datareceived[5];
        formik.initialValues.pin = datareceived[4];
        formik.initialValues.phonenumber = datareceived[7];

        var date_established = datareceived[8].split(", ")
        formik.initialValues.date_established = date_established[0];
        document.getElementById("date_joined").value = formatDate(date_established[0]);
        if (datareceived[12] == true) {
            setChecked(true);
        }
        else {
            setChecked(false);
        }
    }, []);


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

    const formSchema = yup.object().shape({
        name: yup.string().max(255).required('Name is required'),
        description: yup.string().max(255).required('Description is required'),
        address: yup.string().required('Address is required'),
        email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
        phonenumber: yup.string().max(20).required('Phone number is required'),
        username: yup.string().email('Must be a valid email').max(255).required('User email is required'),
        pin: yup.string().min(1, "PIN should be 6-digit").max(6).required("Pin is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            email: '',
            address: '',
            username: '',
            pin: '',
            phonenumber: '',
        },
        validationSchema: formSchema,
        onSubmit: () => {
            //Edit franchise details
            var name = document.getElementById("name").value;
            var description = document.getElementById("description").value;
            var address = document.getElementById("address").value;
            var email = document.getElementById("email").value;
            var date_established = document.getElementById("date_joined").value;
            var username = document.getElementById("username").value;
            var pin = document.getElementById("pin").value;
            var phonenumber = document.getElementById("phone").value;

            var data = {
                name: name,
                description: description,
                contact_email: email,
                date_established: date_established,
                location: address,
                pin: pin,
                phone_number: phonenumber,
                username: username,
                is_active: checked
            }

            if (name != "" && description != "" && address != "" && email != ""
                && date_established != "" && location != "" && pin != "" && phonenumber != "" && username != "") {

                axios.defaults.headers.common = { 'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}` }

                axios.put(url.user_update + franchiseid + "/", data)
                    .then(() => {
                        $(".modal-body").html("<p class=text-danger>Franchise details updated</p>");
                        $(".modal-title").html("")
                        $(".modal-footerdiv").html("<button id=redirectC1>ok</button>");
                        $("#redirectC1").addClass("btn btn-primary");
                        $("#redirectC1").on("click", function () {
                            $("#modalDialog").toggle('hide');
                            window.location.href = "/addfranchise";
                        });
                        $("#modalDialog").toggle('show');
                    })
                    .catch(function (res) {
                        console.log(res)
                        // if (res.code !== '' && res.code === 'ERR_BAD_REQUEST') {
                        if (res.response.status === 401) {
                            $(".modal-body").html("<p class=text-danger>" + res.response.status + " : Unauthorized access</p>");
                            $(".modal-title").html("")
                            $(".modal-footerdiv").html("<button id=redirect11>ok</button>");
                            $("#redirect11").addClass("btn btn-primary");
                            $("#redirect11").on("click", function () {
                                $("#modalDialog").toggle('hide');
                            });
                            $("#modalDialog").toggle('show');
                        }
                        else if (res.response.status === 400) {
                            $(".modal-body").html("<p class=text-danger>Bad request found</p>");
                            $(".modal-title").html("");
                            $(".modal-footerdiv").html("<button id=redirect1>ok</button>");
                            $("#redirect1").addClass("btn btn-primary");
                            $("#redirect1").on("click", function () {
                                $("#modalDialog").toggle('hide');
                            });
                            $("#modalDialog").toggle('show');
                        }
                        // }
                        else {
                            $(".modal-body").html("<p class=text-danger>Network Error!</p>");
                            $(".modal-title").html("")
                            $(".modal-footerdiv").html("<button id=redirectu2>ok</button>");
                            $("#redirectu2").addClass("btn btn-primary");
                            $("#redirectu2").on("click", function () {
                                $("#modalDialog").toggle('hide');
                            });
                            $("#modalDialog").toggle('show');
                        }
                    })
            }
        },
    });


    return (
        <AuthWrapper>
            <form onSubmit={formik.handleSubmit}>
                <br />
                <InputLabel htmlFor="inventory-details"><b>EDIT FRANCHISE DETAILS</b></InputLabel>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="name-signup">Name*</InputLabel>
                            <input id="name" name="name"
                                className={formik.errors.name != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && <p className="text-danger">{formik.errors.name}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="description-signup">Description*</InputLabel>
                            <input id="description" name="description"
                                className={formik.errors.description != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.description && formik.errors.description && <p className="text-danger">{formik.errors.description}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="datejoined-signup">Date Joined</InputLabel>
                            <input id="date_joined" name="date_joined" className="form-control form-control-sm" type="date" defaultValue={formatDate(
                                new Date().setDate(new Date().getDate() - 60)
                            )} max={formatDate(new Date())} />
                            {formik.touched.date_joined && formik.errors.date_joined && <p className="text-danger">{formik.errors.date_joined}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="username-signup">Username*</InputLabel>
                            <input id="username" name="username"
                                className={formik.errors.username != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.username && formik.errors.username && <p className="text-danger">{formik.errors.username}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="address-signup">Address</InputLabel>
                            <input id="address" name="address"
                                className={formik.errors.address != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.address && formik.errors.address && <p className="text-danger">{formik.errors.address}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="pin-signup">PIN</InputLabel>
                            <input id="pin" name="pin"
                                className={formik.errors.pin != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.pin}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.pin && formik.errors.pin && <p className="text-danger">{formik.errors.pin}</p>}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                            <input id="email" name="email" type="email"
                                className={formik.errors.email != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                        </Stack>
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password-signup">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                // error={Boolean(touched.password && errors.password)}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                // value={values.password}
                                name="password"
                                // onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="******"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="helper-text-password-signup">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </Stack>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                        {level?.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="Phone-signup">Phone number</InputLabel>
                            <input id="phone" name="phone" type="tel"
                                className={formik.errors.phone != "" ? "errorClass form-control form-control-sm" : "form-control form-control-sm"}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.phone && formik.errors.phone && <p className="text-danger">{formik.errors.phone}</p>}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="isactive"
                                        id="isactive"
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label={<Typography variant="h6">Activate?</Typography>}
                            />
                        </Stack>
                    </Grid>
                    {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
                    {/* {errors.submit && (
                        <Grid item xs={12}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                    )} */}
                    <Grid item xs={12}>
                        {/* <AnimateButton>
                            <Button disableElevation disabled={isSubmitting} size="medium"
                                style={{ margin: '0 auto', display: "flex" }} type="submit"
                                variant="contained" color="primary" onClick={AddNewFranchise}>
                                Submit
                            </Button>
                        </AnimateButton> */}
                        <input type="submit"
                            className='btn btn-sm btn-primary'
                            style={{ margin: '0 auto', display: "flex" }}
                            value="Update" />
                        <Link component={RouterLink} to="/addfranchise">Cancel</Link>


                    </Grid>
                    {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
                </Grid>
            </form>
        </AuthWrapper>
    );
};

export default EditFranchise;
