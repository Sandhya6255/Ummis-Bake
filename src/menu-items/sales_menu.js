// assets
import {
    AntDesignOutlined,
    HistoryOutlined ,
    MoneyCollectOutlined,
  } from '@ant-design/icons';
  
  // icons
  const icons = {
    HistoryOutlined,
    AntDesignOutlined,
    MoneyCollectOutlined
  };
  
  // ==============================|| MENU ITEMS - UTILITIES ||============================== //
  
  const sales_menu = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'add-sales',
        title: 'Sales',
        type: 'item',
        url: '/addsales',
        icon: icons.MoneyCollectOutlined,
        breadcrumbs: false
      },
      {
        id: 'sales-reports',
        title: 'Sales Report',
        type: 'item',
        url: '/salesreports',
        icon: icons.HistoryOutlined,
        breadcrumbs: false
      },
    ]
  };
  
  export default sales_menu;
  