import { Navigate } from "react-router-dom";
export type PrivateRouteProps = {
    outlet: JSX.Element;
  };
  
  export default function PrivateRoute({outlet}: PrivateRouteProps) {
    let token = localStorage.getItem("token");
    if(token) {
      return outlet;
    } else {
      return <Navigate to="/login"/>;
    }
  };
  