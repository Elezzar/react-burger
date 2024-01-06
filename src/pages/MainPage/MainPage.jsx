import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../../components/Main/Main'

import { fetchIngredients } from "../../services/actions/loadIngredients";

const MainPage = () => {
  const dispatch = useDispatch();

  const getIngredientsState = state => state.ingredients;
  const ingredientsState = useSelector(getIngredientsState);

  const { loadingIngredients, errorLoadingIngredients, ingredientsLoaded} = ingredientsState;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch])

  return ( 
    <>
      {loadingIngredients && <p>...Загрузка</p>}
      {errorLoadingIngredients && <p>Ошибка загрузки</p>}
      {ingredientsLoaded && <Main />}
    
    </>
  );
}

export default MainPage;