import { useSelector } from 'react-redux';

import Main from '../../components/Main/Main'

const MainPage = () => {

  const getIngredientsState = state => state.ingredients;
  const ingredientsState = useSelector(getIngredientsState);

  const { loadingIngredients, errorLoadingIngredients, ingredientsLoaded} = ingredientsState;

  return ( 
    <>
      {loadingIngredients && <p>...Загрузка</p>}
      {errorLoadingIngredients && <p>Ошибка загрузки</p>}
      {ingredientsLoaded && <Main />}
    
    </>
  );
}

export default MainPage;