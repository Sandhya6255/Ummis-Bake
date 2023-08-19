import React from 'react';
import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  // FormControlLabel,
  // Checkbox
} from '@mui/material';
import { Tab, Nav } from 'react-bootstrap';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import FranchiseReport from 'pages/components-overview/FranchiseReport';
import url from 'routes/url';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AuthWrapper from '../AuthWrapper';
import secureLocalStorage from 'react-secure-storage';

// ============================|| FIREBASE - REGISTER ||============================ //

const AddFranchise = () => {
  // const [checked, setChecked] = React.useState(false);

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const [currentTab, setCurrentTab] = useState("addfranchise");


  //Submit user details
  const AddNewFranchise = () => {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var date_established = document.getElementById("date_joined").value;
    var username = document.getElementById("username").value;
    var pin = document.getElementById("pin").value;
    var phonenumber = document.getElementById("phone").value;


    var data = {
      name: name,
      description: description,
      contact_email: email,
      password: password,
      date_established: date_established,
      location: address,
      pin: pin,
      phone_number: phonenumber,
      username: username
    }

    console.log(data,"data");

    if (name != "" && description != "" && address != "" && email != "" && password != ""
      && date_established != "" && location != "" && pin != "" && phonenumber != "" && username != "") {
    
    axios.defaults.headers.common = {'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`}
  
    axios.post(url.addfranchise, data )
        .then(() => {
          $(".modal-body").html("<p class=text-danger>New franchise added</p>");
          $(".modal-title").html("")
          $(".modal-footerdiv").html("<button id=redirectC>ok</button>");
          $("#redirectC").addClass("btn btn-primary");
          $("#redirectC").on("click", function () {
              // $("#modalDialog").toggle('hide');
              //   setCurrentTab("viewinventory");
              window.location.reload();
              setCurrentTab("viewfranchise");
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
            if (res.response.status === 400) {
              $(".modal-body").html("<p class=text-danger>Bad request found</p>");
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
    <>
      <AuthWrapper>
        <Tab.Container defaultActiveKey={currentTab} activeKey={currentTab}>
          <div className="px-0">
            <Nav variant="tabs" className="text-white b-0" >
              <Nav.Link eventKey="addfranchise" onClick={() => setCurrentTab("addfranchise")}>Add new</Nav.Link>
              <Nav.Link eventKey="viewfranchise" onClick={() => setCurrentTab("viewfranchise")}>View list</Nav.Link>
            </Nav>
          </div>
          <Tab.Content className='mt-1'>
            <Tab.Pane eventKey="addfranchise">
              <Formik
                initialValues={{
                  name: '',
                  description: '',
                  email: '',
                  address: '',
                  password: '',
                  username: '',
                  pin: '',
                  phonenumber: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().max(255).required('Name is required'),
                  description: Yup.string().max(255).required('Description is required'),
                  address: Yup.string().required('Address is required'),
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  password: Yup.string().max(255).required('Password is required'),
                  phonenumber: Yup.string().max(20).required('Phone number is required'),
                  username: Yup.string().email('Must be a valid email').max(255).required('User email is required'),
                  pin: Yup.string().min(1,"PIN should be 6-digit").max(6).required("Pin is required"),
                })}
                // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                //   try {
                //     setStatus({ success: false });
                //     setSubmitting(false);
                //   } catch (err) {
                //     setStatus({ success: false });
                //     setErrors({ submit: err.message });
                //     setSubmitting(false);
                //   }
                // }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <br />
                    <InputLabel htmlFor="inventory-details"><b>ADD FRANCHISE DETAILS</b></InputLabel>
                    <br />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name-signup">Name*</InputLabel>
                          <OutlinedInput
                            id="name"
                            type="name"
                            value={values.name}
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            fullWidth
                            error={Boolean(touched.name && errors.name)}
                          />
                          {touched.name && errors.name && (
                            <FormHelperText error id="helper-text-name-signup">
                              {errors.name}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="description-signup">Description*</InputLabel>
                          <OutlinedInput
                            fullWidth
                            error={Boolean(touched.description && errors.description)}
                            id="description"
                            type="description"
                            value={values.description}
                            name="description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            inputProps={{}}
                          />
                          {touched.description && errors.description && (
                            <FormHelperText error id="helper-text-description-signup">
                              {errors.description}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="datejoined-signup">Date Joined</InputLabel>
                          <input id="date_joined" className="form-control form-control-sm" type="date" defaultValue={formatDate(
                            new Date().setDate(new Date().getDate() - 60)
                          )} max={formatDate(new Date())} />
                          {touched.datejoined && errors.datejoined && (
                            <FormHelperText error id="helper-text-datejoined-signup">
                              {errors.datejoined}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="username-signup">Username*</InputLabel>
                          <OutlinedInput
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            id="username"
                            type="username"
                            value={values.username}
                            name="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            inputProps={{}}
                          />
                          {touched.username && errors.username && (
                            <FormHelperText error id="helper-text-username-signup">
                              {errors.username}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="address-signup">Address</InputLabel>
                          <OutlinedInput
                            fullWidth
                            error={Boolean(touched.address && errors.address)}
                            id="address"
                            value={values.address}
                            name="address"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            inputProps={{}}
                          />
                          {touched.address && errors.address && (
                            <FormHelperText error id="helper-text-address-signup">
                              {errors.address}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="pin-signup">PIN</InputLabel>
                          <OutlinedInput
                            fullWidth
                            type="number"
                            error={Boolean(touched.pin && errors.pin)}
                            id="pin"
                            value={values.pin}
                            name="pin"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            inputProps={{}}
                          />
                          {touched.pin && errors.pin && (
                            <FormHelperText error id="helper-text-pin-signup">
                              {errors.pin}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                          <OutlinedInput
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            id="email"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            inputProps={{}}
                          />
                          {touched.email && errors.email && (
                            <FormHelperText error id="helper-text-email-signup">
                              {errors.email}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="password-signup">Password</InputLabel>
                          <OutlinedInput
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="Phone-signup">Phone number</InputLabel>
                          <OutlinedInput
                            fullWidth
                            error={Boolean(touched.Phone && errors.Phone)}
                            id="phone"
                            value={values.Phone}
                            name="Phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            inputProps={{}}
                          />
                          {touched.Phone && errors.Phone && (
                            <FormHelperText error id="helper-text-Phone-signup">
                              {errors.Phone}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                                size="small"
                                id="isactivecheckbox"
                              />
                            }
                            label={<Typography variant="h6">Isactive</Typography>}
                          />
                        </Stack>
                      </Grid> */}
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
                      {errors.submit && (
                        <Grid item xs={12}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <AnimateButton>
                          <Button disableElevation disabled={isSubmitting} size="medium"
                            style={{ margin: '0 auto', display: "flex" }} type="submit"
                            variant="contained" color="primary" onClick={AddNewFranchise}>
                            Submit
                          </Button>
                        </AnimateButton>
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
                )}
              </Formik>
            </Tab.Pane>
            <Tab.Pane eventKey="viewfranchise">
              <br />
              <InputLabel htmlFor="inventory-details"><b>FRANCHISE LIST</b></InputLabel>
              <br />
              <FranchiseReport />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </AuthWrapper>
    </>
  );
};

export default AddFranchise;
