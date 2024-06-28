import { CircularProgress } from "@mui/material";
import React, { Suspense, lazy, useEffect } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styled from 'styled-components';
import Navbar from "./components/Navbar/index.js";
import { useAuth } from "./hooks/useAuth.ts";
import { AppStateProvider } from "./state/stateContext.js";
import { ThemeProvider } from "./state/themeContext.js";
import './App.css';

// Lazy load the components
const NotFoundPage = lazy(() => import("./pages/404/index.tsx"));
const Login = lazy(() => import("./pages/auth/login-page.js"));
const Signup = lazy(() => import("./pages/auth/signup-page.tsx"));
const ClientPage = lazy(() => import("./pages/clients/client-page.tsx"));
const ClientListPage = lazy(() => import("./pages/clients/clients-list-page.tsx"));
const CreateClientPage = lazy(() => import("./pages/clients/create-client-page.tsx"));
const Dashboard = lazy(() => import("./pages/homepage.tsx"));
const CreateProductPage = lazy(() => import("./pages/product/create-product-page.tsx"));
const EditProduct = lazy(() => import("./pages/product/edit-product-page.tsx"));
const ProductListPage = lazy(() => import("./pages/product/product-list-page.js"));
const ProductPage = lazy(() => import("./pages/product/product-page.tsx"));
const EditUser = lazy(() => import("./pages/users/edit-user-page.tsx"));
const EditClient = lazy(() => import("./pages/clients/edit-client-page.tsx"));
const Profile = lazy(() => import("./pages/users/profile-page.tsx"));
const UserPage = lazy(() => import("./pages/users/user-page.tsx"));
const UsersListPage = lazy(() => import("./pages/users/users-list-page.tsx"));

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoadingAuthorization } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoadingAuthorization) {
      return;
    }
    if (!user) {
      navigate("/login", { replace: true });
    } else if (!allowedRoles.includes(user?.role)) {
      navigate("/", { replace: true });
    }
  }, [user, navigate, allowedRoles, isLoadingAuthorization]);

  return user && allowedRoles.includes(user?.role) ? <Outlet /> : null;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const fullWidth = location.pathname.startsWith("/client-preventive/") ? "true" : "false";
  const no_breadcrumbs = (location.pathname === "/" || location.pathname === "/login" || location.pathname.startsWith("/client-preventive/")) ? "true" : "false";

  return <StyledLayout no_breadcrumbs={no_breadcrumbs} full_width={fullWidth}>{children}</StyledLayout>;
};

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

function App() {
  return (
    <Router>
      <AppStateProvider>
        <ThemeProvider>
          <Navbar />
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Routes accessible by visitors */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Routes accessible by both customers and admins */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products-list" element={<ProductListPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />
                  <Route path="/users-list" element={<UsersListPage />} />
                  <Route path="/user/:userId" element={<UserPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/clients-list" element={<ClientListPage />} />
                  <Route path="/create-client" element={<CreateClientPage />} />
                  <Route path="/client/:clientId" element={<ClientPage />} />
                </Route>

                {/* Admin-only routes */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/create-product" element={<CreateProductPage />} />
                  <Route path="/edit-product/:productId" element={<EditProduct />} />
                  <Route path="/edit-user/:userId" element={<EditUser />} />
                  <Route path="/edit-client/:clientId" element={<EditClient />} />
                </Route>

                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
          {/* <Footer /> */}
        </ThemeProvider>
      </AppStateProvider>
    </Router>
  );
}

export default App;

export const StyledLayout = styled.div<{
  full_width: string;
  no_breadcrumbs: string;
}>`
  position: relative;
  background: transparent;
  max-width: ${({ full_width }) =>
    full_width === "true" ? "1550px" : "1280px"};
  transform: ${({ no_breadcrumbs }) =>
    no_breadcrumbs === "true" ? `translateY(-120px)` : `translateY(-80px)`};
  margin: 0 auto;
  z-index: 1200;
`;
