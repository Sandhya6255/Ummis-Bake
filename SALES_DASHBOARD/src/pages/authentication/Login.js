// material-ui
import {Box,Card,InputLabel } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import logo from '../../assets/images/Logo/LOGO.jpg';

// ================================|| LOGIN ||================================ //

const Login = () => (
  <Box sx={{ display:'flex', justifyContent: 'center'}}>
    <Card sx={{
      padding:{xs:3, md:3},
      maxWidth: { xs: 400, lg: 475},
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}>
      <div className='text-center'>
        <img src={logo} alt="ummis" width="200" height="200" />
        <InputLabel htmlFor="label" className="mt-0">Sign in to your account</InputLabel><br />
      </div>
      <AuthLogin />
    </Card>
  </Box>
);

export default Login;
