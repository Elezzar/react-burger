import { useSelector } from 'react-redux';

import Main from '../../components/Main/Main'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const MainPage = () => {

  const getIngredientsState = state => state.ingredients;
  const ingredientsState = useSelector(getIngredientsState);

  const { loadingIngredients, errorLoadingIngredients, ingredientsLoaded} = ingredientsState;

  return ( 
    <>
      {loadingIngredients && <LoadingSpinner />}
      {errorLoadingIngredients && <p>Ошибка загрузки</p>}
      {ingredientsLoaded && <Main />}
    
    </>
  );
}

export default MainPage;