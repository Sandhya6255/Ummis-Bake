import secureLocalStorage from 'react-secure-storage';

// project import
import dashboard from './dashboard';
import sales_menu from './sales_menu';
import admin_menu from './admin_menu';

// ==============================|| MENU ITEMS ||============================== //

var menuItems;
var isadmin = secureLocalStorage.getItem("ap_");
if(isadmin)
{
  menuItems = {
    items: [
      dashboard, 
      admin_menu
    ]
  };
}
else
{
  menuItems = {
    items: [
      sales_menu
    ]
  };
}


export default menuItems;
