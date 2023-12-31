// assets
import {
    AntDesignOutlined,
    HistoryOutlined ,
    MoneyCollectOutlined,
    // TeamOutlined,
  } from '@ant-design/icons';
  
  // icons
  const icons = {
    HistoryOutlined,
    AntDesignOutlined,
    MoneyCollectOutlined,
    // TeamOutlined,
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
        url: '/sales',
        icon: icons.MoneyCollectOutlined,
        breadcrumbs: false
      },
      {
        id: 'sales-reports',
        title: 'Sales Report',
        type: 'item',
        url: '/salesreport',
        icon: icons.HistoryOutlined,
        breadcrumbs: false
      },
      // {
      //   id: 'customer-reports',
      //   title: 'Customer Report',
      //   type: 'item',
      //   url: '/customer_report',
      //   icon: icons.TeamOutlined,
      //   breadcrumbs: false
      // },
    ]
  };
  
  export default sales_menu;
  