import { useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch } from '../../services/types/types.tsx';


import { fetchIngredients } from '../../services/actions/loadIngredients.ts';
import { updateCurrentUserAction } from '../../services/actions/userAction.ts';

import AppHeader from '../AppHeader/AppHeader.tsx'
import AppRoutes from '../AppRoutes/AppRoutes.tsx';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(updateCurrentUserAction());
  }, [dispatch]);

  return ( 
    <>
      <Router>
        <AppHeader />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;