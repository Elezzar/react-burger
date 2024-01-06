import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

import IngredientPageStyles from './IngredientPage.module.css'

const IngredientPage = () => {
  return ( 
    <main className={IngredientPageStyles.main}>
      <IngredientDetails />
    </main>
  );
}

export default IngredientPage;