import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
const drawerWidth = 240;

function MainLayout() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 8,
        ml: 24,
      }}
    >
      <Outlet />
    </Box>
  );
}

export default MainLayout;
