import { Suspense, useEffect, useState } from 'react';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';

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
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProtectedRoute from '../components/ProtectedRoute';
import { getUserInformation } from '../common/localStorageHelper';
import { ADMIN_ROLE } from '../common';
import { MasterDataProvider } from '../components/MasterDataProvider';

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

function checkFirebaseToken(token: string | null): boolean {
  if (!token) return true;

  try {
    const [, payloadBase64] = token.split('.');

    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    console.error('Token không hợp lệ:', error);
    return true;
  }
}

export function Router() {
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isExpired = checkFirebaseToken(token);
    if (isExpired) {
      navigate('/sign-in');
    }
  }, []);

  useEffect(() => {
    const user = getUserInformation();
    if (!user) {
      navigate('/sign-in');
    }

    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!authenticated && window.location.pathname === '/') {
      navigate('/sign-in', { replace: true });
    }
  }, [authenticated, navigate]);

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
                <MasterDataProvider>
                  <MainLayout />
                </MasterDataProvider>
              </Box>
            </Box>
          </Box>
        </Suspense>
      ),
      children: [
        {
          element: (
            <ProtectedRoute
              isAuthenticated={authenticated}
              requiredRoles={[ADMIN_ROLE]}
            >
              <Dashboard />
            </ProtectedRoute>
          ),
          index: true,
        },
        {
          path: 'user',
          element: (
            <ProtectedRoute
              isAuthenticated={authenticated}
              requiredRoles={[ADMIN_ROLE]}
            >
              <UserManager />
            </ProtectedRoute>
          ),
        },
        {
          path: 'course',
          element: (
            <ProtectedRoute
              isAuthenticated={authenticated}
              requiredRoles={[ADMIN_ROLE]}
            >
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: 'chat',
          element: (
            <ProtectedRoute
              isAuthenticated={authenticated}
              requiredRoles={[ADMIN_ROLE]}
            >
              <ChatPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'news',
          element: (
            <ProtectedRoute
              isAuthenticated={authenticated}
              requiredRoles={[ADMIN_ROLE]}
            >
              <News />
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute
              isAuthenticated={authenticated}
              requiredRoles={[ADMIN_ROLE]}
            >
              <ProfilePage />
            </ProtectedRoute>
          ),
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
