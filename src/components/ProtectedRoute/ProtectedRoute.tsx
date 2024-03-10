import { ReactNode } from "react";
import { Navigate, useLocation, Location } from "react-router-dom";

import { useAppSelector, RootState } from "../../services/types/types.tsx";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";

type ProtectedProps = {
  requiresUnauth?: boolean;
  children: ReactNode;
}

type UnAuthUserProps = {
  children: ReactNode;
}

const Protected = ({ requiresUnauth = false, children }: ProtectedProps) => {
  const authCheckedSuccess = useAppSelector((state: RootState) => state.user.isAuthChecked);
  const userName = useAppSelector((state: RootState) => state.user.name);
  const location: Location = useLocation();

  if (!authCheckedSuccess) {
    return <LoadingSpinner />
  }

  if (requiresUnauth && userName) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} replace />;
  }

  if (!requiresUnauth && !userName) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const OnlyAuthProtected = Protected;

export const OnlyUnauthProtected = ({ children }: UnAuthUserProps) => (
    <Protected requiresUnauth={true} children={children} />
  );


// export const OnlyAuthProtected = ({ children }) => (
//   <Protected children={children} />
// );
  
// export const OnlyUnauthProtected = ({ children }) => (
//   <Protected requiresUnauth={true} children={children} />
// );
