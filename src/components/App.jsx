import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Routes,
  useNavigate,
  useSearchParams,
  Navigate,
} from 'react-router-dom';
import { Layout } from './Layout';
import { fetchCurrentUser, googleAuthUser } from 'redux/auth/authOperations';
import { getToken } from 'redux/auth/authSelectors';

const RegisterPage = lazy(() => import('pages/Register'));
const LoginPage = lazy(() => import('pages/Logins'));
const WalletPage = lazy(() => import('pages/Wallet'));
const StatsPage = lazy(() => import('pages/Stats'));

const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children, token }) => {
  return !token ? children : <Navigate to="/wallet" />;
};

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(fetchCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const sid = searchParams.get('sid');
    if (!accessToken) return;
    dispatch(googleAuthUser({ accessToken, refreshToken, sid }));
    // navigate('/wallet');
  }, [searchParams, dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PublicRoute token={token}>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute token={token}>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <PrivateRoute token={token}>
              <WalletPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <PrivateRoute token={token}>
              <StatsPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Route>
    </Routes>
  );
};
