import { RootState, useAppSelector } from '../../services/types/types.tsx';

import Main from '../../components/Main/Main.tsx'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.tsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';

const MainPage = () => {

  const getIngredientsState = (state: RootState) => state.ingredients;
  const ingredientsState = useAppSelector(getIngredientsState);

  const { loadIngredients, errorLoadingIngredients, ingredientsLoaded} = ingredientsState;

  return ( 
    <>
      {loadIngredients && <LoadingSpinner />}
      {errorLoadingIngredients && <NotFoundPage />}
      {ingredientsLoaded && <Main />}
    
    </>
  );
}

export default MainPage;