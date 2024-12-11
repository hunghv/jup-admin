import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
function MainLayout() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: '#fafafa',
        minHeight: '100vh',
      }}
    >
      <Toolbar />
      <Outlet />
    </Box>
  );
}

export default MainLayout;
