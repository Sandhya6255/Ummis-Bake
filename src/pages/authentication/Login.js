// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography,Box,Card } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import logo from '../../assets/images/Logo/LOGO.jpg';

// ================================|| LOGIN ||================================ //

const Login = () => (
  <Box sx={{ justifyContent: 'center'}}>
    <Card sx={{
      padding:{xs:3, md:3},
      maxWidth: { xs: 400, lg: 475},
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }} >
      <Grid container
      alignItems="center"
      justify="center"
      spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" justifyContent="space-center">Login</Typography>
            <img src={logo} alt="ummis" width="200" height="200" />
            {/* <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Don&apos;t have an account?
            </Typography> */}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </Card>
  </Box>

);

export default Login;
