import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const rootStyle = {
  textAlign: 'center',
  position: 'fixed',
  top: 0,
  bottom: 50,
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
