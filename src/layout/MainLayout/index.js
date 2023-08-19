import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';

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

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const [loggedin,Setloggedin] = React.useState(true);
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
    var isloggedin = secureLocalStorage.getItem('ap_');
    console.log(isloggedin,"welcomeeeeeeee")
    if(isloggedin == false || isloggedin == null)
    {
      Setloggedin(false);
    }
    else
    {
      Setloggedin(true);
    }
  }, []);

  React.useEffect(()=>
  {
    if(secureLocalStorage.getItem('at_') == null)
    {
      var refreshtoken = secureLocalStorage.getItem('rt_');
      axios.post(url.usertokenrefresh,{refresh:refreshtoken})
      .then(function (response) {
        secureLocalStorage.setItem('at_',response.access)
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
  })


  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {loggedin?<Header open={open} handleDrawerToggle={handleDrawerToggle} />:null}
      {loggedin?<Drawer open={open} handleDrawerToggle={handleDrawerToggle} />:null}
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
