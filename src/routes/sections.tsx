import { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import { CssBaseline } from '@mui/material';
import Dashboard from '../components/dashboard/Dashboard';
import UserManager from '../components/users/UserManager';
import Chat from '../components/chats/Chat';
import News from '../components/news/News';
import SignIn from '../components/authentication/SignIn';
import AccessDenied from '../components/authentication/AccessDenied';
import ResetPassword from '../components/authentication/ResetPassword';
import Logout from '../components/authentication/Logout';
import NotFound from '../layout/not-found/NotFound';
import MainLayout from '../layout/main/MainLayout';

// const HomePage = lazy(() => import('../pages/HomePage'));

const renderFallback = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flex="1 1 auto"
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: 'AppWorkspace',
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const loginTrigger = useSelector((state: RootState) => state.users);
  //   const [user, setUser] = useState<any>();

  //   useEffect(() => {
  //     const user = getUserInformation();
  //     if (user) {
  //       setUser(user);
  //       setIsAuthenticated(true);
  //     }
  //   }, [loginTrigger]);

  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!isAuthenticated && window.location.pathname === '/') {
  //       navigate('/sign-in', { replace: true });
  //     }
  //   }, [isAuthenticated, navigate]);

  return useRoutes([
    {
      element: (
        <Suspense fallback={renderFallback}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <Topbar></Topbar>
            <Navbar></Navbar> */}
            <MainLayout />
          </Box>
        </Suspense>
      ),
      children: [
        {
          element: <Dashboard />,
          index: true,
        },
        {
          path: 'user',
          element: <UserManager />,
        },
        {
          path: 'course',
          element: <Dashboard />,
        },
        {
          path: 'chat',
          element: <Chat />,
        },
        {
          path: 'news',
          element: <News />,
        },
      ],
    },
    {
      path: 'sign-in',
      element: <SignIn />,
    },
    {
      path: '404',
      element: <NotFound />,
    },
    {
      path: '403',
      element: <AccessDenied />,
    },
    {
      path: 'reset-password',
      element: <ResetPassword />,
    },
    {
      path: 'logout',
      element: <Logout />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
