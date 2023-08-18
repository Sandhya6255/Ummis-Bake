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
    console.log("welcomeeeeeeeeeeeeeeeeeeeee")
    if(isloggedin == false || isloggedin == null)
    {
      Setloggedin(false);
    }
    else
    {
      Setloggedin(true);
    }
  }, []);


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
