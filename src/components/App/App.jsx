import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../AppHeader/AppHeader.jsx'
import Main from '../Main/Main.jsx'

import { fetchIngredients } from "../../services/actions/loadIngredients.js";

const App = () => {

  const dispatch = useDispatch();

  const getIngredientsState = state => state.ingredients;
  const ingredientsState = useSelector(getIngredientsState);

  const { loadingIngredients, errorLoadingIngredients, ingredientsLoaded} = ingredientsState;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch])

  return ( 
    <>
      <AppHeader />
      {loadingIngredients && <p>...Загрузка</p>}
      {errorLoadingIngredients && <p>Ошибка загрузки</p>}
      {ingredientsLoaded && <Main />}
    </>
  );
}

export default App;