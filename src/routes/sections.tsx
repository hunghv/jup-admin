import { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import { CssBaseline } from '@mui/material';
import Dashboard from '../pages/dashboard/Dashboard';
import UserManager from '../pages/users/UserManager';
import ChatPage from '../pages/chats/ChatPage';
import News from '../pages/news/News';
import SignIn from '../pages/authentication/SignIn';
import AccessDenied from '../pages/authentication/AccessDenied';
import ResetPassword from '../pages/authentication/ResetPassword';
import Logout from '../pages/authentication/Logout';
import NotFound from '../layout/not-found/NotFound';
import MainLayout from '../layout/main/MainLayout';
import SignUp from '../pages/authentication/Signup';
import Topbar from '../layout/top-bar/Topbar';
import LeftMenu from '../layout/nav-bar/LeftMenu';
import { Security } from '@mui/icons-material';
import AccountComponent from '../pages/profiles/AccountComponent';
import NotificationComponent from '../pages/profiles/NotificationComponent';
import ProfilePage from '../pages/profiles/ProfilePage';

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
            <LeftMenu />
            <Box
              sx={{
                flexGrow: 1,
                backgroundColor: '#f8f9fa',
                minHeight: '100vh',
              }}
            >
              <Topbar />
              <Box sx={{ p: 3 }}>
                <MainLayout />
              </Box>
            </Box>
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
          element: <ChatPage />,
        },
        {
          path: 'news',
          element: <News />,
        },
        {
          path: 'profile',
          element: <ProfilePage />,
          children: [
            { path: 'account', element: <AccountComponent /> },
            { path: 'notifications', element: <NotificationComponent /> },
            { path: 'security', element: <Security /> },
          ],
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
      path: 'sign-up',
      element: <SignUp />,
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
