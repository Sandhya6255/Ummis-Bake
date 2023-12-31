
// const rootapi = 'http://127.0.0.1:8000/';
const rootapi = 'http://api.ummiscakehouse.in/';
const url = {
    'home':rootapi,
    'login':rootapi+'api/user/login/',
    'changepassword':rootapi+'api/user/change-password/',
    'usertokenrefresh':rootapi+'api/user/token/refresh',
    'sales':rootapi+'api/sales/',//list sales report
    'customer':rootapi+'api/customer/',//list or add customer
    'inventorydetails':rootapi+'api/inventory/franchise/',
    'addsales':rootapi+'api/sales/create/',//add new sales
    'customerlist':rootapi+'api/customer/',//list customer report
    'customerlist_phone':rootapi+'api/customer/phone/',//list customer with phone no.
    'franchiselist':rootapi+'api/franchise/',//list or edit or delete franchise api
    'addfranchise':rootapi+'api/franchise/create/',//add franchise api
    'productlist':rootapi+'api/product/',//list product api
    'addproduct':rootapi+'api/product/',//add or edit or delete product api
    'inventorylist':rootapi+'api/inventory/',//list inventory api
    'addinventory':rootapi+'api/inventory/create/',//add inventory api
    'del_inventory':rootapi+'api/inventory/',//edit or delete inventory api
};

export default url;