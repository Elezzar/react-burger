// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import { fetchIngredients } from '../../services/actions/loadIngredients.js';
// import { updateCurrentUserAction } from '../../services/actions/userAction.js';

import AppHeader from '../AppHeader/AppHeader.jsx'
import AppRoutes from '../AppRoutes/AppRoutes.jsx';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchIngredients());
  //   dispatch(updateCurrentUserAction());
  // }, [dispatch]);

  return ( 
    <>
      <AppHeader />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;