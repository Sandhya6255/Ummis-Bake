import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import jwt_decode from "jwt-decode";
import secureLocalStorage from 'react-secure-storage';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import url from 'routes/url';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Submit login
  const Submitlogin = () => {
    var username = document.getElementById("email-login").value;
    var password = document.getElementById("password-login").value;

    var data = {
      username: username,
      password: password
    }

    if (username != "" && password != "") {
      axios.post(url.login, data)
        .then((res) => {
          if (res.status === 200) {
            secureLocalStorage.setItem('rt_', res.data.refresh);
            secureLocalStorage.setItem('at_', res.data.access);
            var token = res.data.refresh;
            var decoded = jwt_decode(token);
            console.log(decoded)
            secureLocalStorage.setItem('ex_', decoded.exp);
            secureLocalStorage.setItem('ui_', decoded.user_id);
            secureLocalStorage.setItem('ap_', decoded.admin);
            if (decoded.admin == true) {
              secureLocalStorage.setItem('un_', "Admin");
              window.location.href = "/dashboard/default";
            }
            else {
              secureLocalStorage.setItem('un_', "Franchise");
              window.location.href = "/addsales";
            }
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
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: false });
          setSubmitting(false);
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container
            spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Keep me sign in</Typography>}
                />
                <Link variant="h6" component={RouterLink} to="/changepassword" color="text.primary">
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large"
                  type="submit" variant="contained" color="primary" onClick={Submitlogin}>
                  Login
                </Button>
              </AnimateButton>
            </Grid>
            {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
