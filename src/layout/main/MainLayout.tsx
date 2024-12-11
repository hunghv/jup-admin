import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <Box sx= {{ background: '#fafafa'}}>
      <Outlet />
    </Box>
  );
}

export default MainLayout;
