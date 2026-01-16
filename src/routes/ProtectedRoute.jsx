import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth);

  if (!user) {
    return navigate("/logic");
  }

  return <Outlet />;
};

export default ProtectedRoute;
