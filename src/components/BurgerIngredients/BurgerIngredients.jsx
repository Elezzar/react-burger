import ingredientStyles from './BurgerIngredients.module.css'

import Tabs from '../Tabs/Tabs.jsx'
import IngredientItems from '../IngredientItems/IngredientItems.jsx'

import PropTypes from 'prop-types';
import BurgerPropTypes from '../../utils/BurgerPropTypes.jsx';

const BurgerIngredients = (props) => {
  const bunsList = props.ingredientData.filter((bun) => bun.type === 'bun')
  const saucesList = props.ingredientData.filter((sauce) => sauce.type === 'sauce')
  const mainsList = props.ingredientData.filter((main) => main.type === 'main')

  return (  
    <section className={`${ingredientStyles.section}`}>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <Tabs />
      <ul className={`mt-10 ${ingredientStyles.list}`}>
        <li className={ingredientStyles.item}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <IngredientItems ingredientData={bunsList}/>
        </li>
        <li>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <IngredientItems ingredientData={saucesList}/>
        </li>
        <li>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <IngredientItems ingredientData={mainsList}/>
        </li>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredientData: PropTypes.arrayOf(BurgerPropTypes).isRequired
}

export default BurgerIngredients;