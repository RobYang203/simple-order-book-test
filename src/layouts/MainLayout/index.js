import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const rootStyle = {
  textAlign: 'center',
  position: 'fixed',
  padding: { base: 0, sm:'5px 150px', md: '5px 250px', lg:'5px 400px'},
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  bg: 'darkBlue.800',
};

const MainLayout = () => {
  return (
    <Box sx={rootStyle}>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
