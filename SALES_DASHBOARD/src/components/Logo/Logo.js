// material-ui
// import { useTheme } from '@mui/material/styles';
import logo from '../../assets/images/Logo/LOGO.jpg';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img src={logo} alt="ummis" width="210" height="200" style={{marginLeft:"12px",marginRight:"12px",marginBottom:"0px"}} />
    </>
  );
};

export default Logo;
