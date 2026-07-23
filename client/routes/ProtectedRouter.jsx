import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRouter() {
  const location = useLocation();
  const { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (location.pathname.startsWith('/owners') && user?.role !== 'OWNER') {
    return <Navigate to="/cleaners/mypage" replace />;
  }
  if (location.pathname.startsWith('/cleaners') && user?.role !== 'CLEANER') {
    return <Navigate to="/owners/mypage" replace />;
  }

  return <Outlet />;
}
