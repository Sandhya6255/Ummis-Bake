import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import AuthCard from './AuthCard';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh',width:'100%' }}>
    {/* <AuthBackground /> */}
    <AuthCard>
      {children}
    </AuthCard>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
