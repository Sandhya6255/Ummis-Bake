import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import $ from 'jquery';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import url from 'routes/url';

// types
import { openDrawer } from 'store/reducers/menu';
import Login from 'pages/authentication/Login';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const [loggedin, Setloggedin] = React.useState(true);
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
  }, [drawerOpen]);


  //Check user loggedin or not
  useEffect(() => {
    var isloggedin = secureLocalStorage.getItem('at_');
    // console.log(isloggedin,"welcomeeeeeeee")
    if (isloggedin == false || isloggedin == null || isloggedin == "") {
      Setloggedin(false);
    }
    else {
      Setloggedin(true);
    }
  }, []);

  React.useEffect(() => {
    if (secureLocalStorage.getItem('rt_') != null || secureLocalStorage.getItem('rt_')) {
      var refreshtoken = secureLocalStorage.getItem('rt_');
      axios.post(url.usertokenrefresh, { refresh: refreshtoken })
        .then(function (response) {
          secureLocalStorage.setItem('at_', response.data.access);
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
            else if (res.response.status === 400) {
              $(".modal-body").html("<p class=text-danger>Bad request found</p>");
              $(".modal-title").html("")
              $(".modal-footerdiv").html("<button id=redirectr1>ok</button>");
              $("#redirectr1").addClass("btn btn-primary");
              $("#redirectr1").on("click", function () {
                $("#modalDialog").toggle('hide');
              });
              $("#modalDialog").toggle('show');
            }
          }
          else {
            $(".modal-body").html("<p class=text-danger>Network Error!</p>");
            $(".modal-title").html("")
            $(".modal-footerdiv").html("<button id=redirect2>ok</button>");
            $("#redirect2").addClass("btn btn-primary");
            $("#redirect2").on("click", function () {
              $("#modalDialog").toggle('hide');
            });
            $("#modalDialog").toggle('show');
          }
        })
    }
  }, [1800000])


  return (
    <>
      {loggedin ?
        <Box sx={{ display: 'flex', width: '100%' }}>
          {loggedin ? <Header open={open} handleDrawerToggle={handleDrawerToggle} /> : null}
          {loggedin ? <Drawer open={open} handleDrawerToggle={handleDrawerToggle} /> : null}
          <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Toolbar />
            <Breadcrumbs navigation={navigation} title />
            {loggedin ? <Outlet /> : <Login />}
          </Box>
        </Box>
        :
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Login />
          </Box>
        </Box>
      }
    </>
  );
};

export default MainLayout;
