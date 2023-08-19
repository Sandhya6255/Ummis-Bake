import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Link as RouterLink } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Box,
    Card
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import url from 'routes/url';
import logo from '../../../assets/images/Logo/LOGO.jpg';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const ChangePassword = () => {
    const [showPassword1, setShowPassword1] = React.useState(false);
    const handleClickShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const [showPassword2, setShowPassword2] = React.useState(false);
    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const [showPassword3, setShowPassword3] = React.useState(false);
    const handleClickShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const handleMouseDownPassword3 = (event) => {
        event.preventDefault();
    };

    axios.defaults.headers.common = {'Authorization': `Bearer ${secureLocalStorage.getItem('at_')}`}

    //Submit new password
    const Submitnewpassword = () => {
        var old_password = document.getElementById("old_password").value;
        var new_password = document.getElementById("new_password").value;
        var confirm_new_password = document.getElementById("confirm_new_password").value;

        var data = {
            old_password: old_password,
            new_password: new_password,
            confirm_new_password: confirm_new_password
        }

        if (old_password !== "" && new_password !== "" && confirm_new_password !== "") {
            if(new_password === confirm_new_password)
            {
                axios.post(url.changepassword, data,{headers: {Authentication: 'Bearer {token}'}}
                )
                .then((res) => {
                    if (res.status === 200) {
                        $(".modal-body").html("<p>Password updated</p>");
                        $(".modal-title").html("")
                        $(".modal-footerdiv").html("<button id=redirectA>ok</button>");
                        $("#redirectA").addClass("btn btn-success");
                        $("#redirectA").on("click", function () {
                            $("#modalDialog").toggle('hide');
                        });
                        $("#modalDialog").toggle('show');
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
            else{
                $(".modal-body").html("<p>Password doesn't match</p>");
                $(".modal-title").html("")
                $(".modal-footerdiv").html("<button id=redirectB>ok</button>");
                $("#redirectBA").addClass("btn btn-primary");
                $("#redirectB").on("click", function () {
                    $("#modalDialog").toggle('hide');
                });
                $("#modalDialog").toggle('show');
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{
                padding: { xs: 3, md: 3 },
                maxWidth: { xs: 400, lg: 475 },
                margin: { xs: 2.5, md: 3 },
                '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%'
                }
            }}>
                <div className='text-center'>
                    <img src={logo} alt="ummis" width="200" height="200" />
                    <InputLabel htmlFor="label" className="mt-0">Reset password</InputLabel><br />
                </div>
                <Formik
                    initialValues={{
                        old_password: '',
                        new_password: '',
                        confirm_new_password: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        old_password: Yup.string().max(255).required('This field is required'),
                        new_password: Yup.string().max(255).required('This field is required'),
                        confirm_new_password: Yup.string().max(255).required('This field is required')
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
                                        <InputLabel htmlFor="password-login">Old Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.old_password && errors.old_password)}
                                            id="old_password"
                                            type={showPassword1 ? 'text' : 'password'}
                                            value={values.old_password}
                                            name="old_password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword1}
                                                        onMouseDown={handleMouseDownPassword1}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Enter old password"
                                        />
                                        {touched.old_password && errors.old_password && (
                                            <FormHelperText error id="standard-weight-helper-text-old_password-login">
                                                {errors.old_password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">New Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.new_password && errors.new_password)}
                                            id="new_password"
                                            type={showPassword2 ? 'text' : 'password'}
                                            value={values.new_password}
                                            name="new_password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword2}
                                                        onMouseDown={handleMouseDownPassword2}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Enter new password"
                                        />
                                        {touched.new_password && errors.new_password && (
                                            <FormHelperText error id="standard-weight-helper-text-new_password-login">
                                                {errors.new_password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.confirm_new_password && errors.confirm_new_password)}
                                            id="confirm_new_password"
                                            type={showPassword3 ? 'text' : 'password'}
                                            value={values.confirm_new_password}
                                            name="confirm_new_password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword3}
                                                        onMouseDown={handleMouseDownPassword3}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword3 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Enter confirm password"
                                        />
                                        {touched.confirm_new_password && errors.confirm_new_password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.confirm_new_password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="text-center mb-2">
                                        <Button disableElevation disabled={isSubmitting} size="small"
                                            type="submit" variant="contained" color="primary" className="mx-2"
                                            onClick={Submitnewpassword}>
                                            Submit
                                        </Button>
                                        <Link variant="h6" to="/login" component={RouterLink} color="text.primary" className="mx-0">
                                            Return to login
                                        </Link>
                                    </div>

                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>

            </Card>
        </Box>
    );
};

export default ChangePassword;
