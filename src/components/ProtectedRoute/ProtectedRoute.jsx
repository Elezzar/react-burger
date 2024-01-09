import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from 'prop-types';

// import LoadingIndicator from './LoadingIndicator'; // сделать компонент индикатора загрузки

const Protected = ({ requiresUnauth = false, children }) => {
  const authCheckedSuccess = useSelector(store => store.user.isAuthChecked);
  const userName = useSelector(store => store.user.name);
  const location = useLocation();

  // console.log(requiresUnauth)
  // console.log(authCheckedSuccess)
  // console.log(userName)

  if (!authCheckedSuccess) {
    return <p>Загрузка...</p>
    // return <LoadingIndicator />; // Заменить заглушку текста на индикатор загрузки
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

export const OnlyAuthProtected = ({ children }) => (
  <Protected children={children} />
);
  
export const OnlyUnauthProtected = ({ children }) => (
  <Protected requiresUnauth={true} children={children} />
);

Protected.propTypes = {
  requiresUnauth: PropTypes.bool,
  children: PropTypes.node.isRequired
};

OnlyAuthProtected.propTypes = {
  children: PropTypes.node.isRequired
};

OnlyUnauthProtected.propTypes = {
  children: PropTypes.node.isRequired
};