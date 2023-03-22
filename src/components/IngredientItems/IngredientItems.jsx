import itemsStiles from './IngredientItems.module.css'

import IngredientItem from '../IngredientItem/IngredientItem.jsx'

import PropTypes from 'prop-types';
import BurgerPropTypes from '../../utils/BurgerPropTypes.jsx';

const IngredientItems = (props) => {
  const ingredientsList = props.ingredientData

  return (  
    <ul className={`pt-6 pl-4 ${itemsStiles.items}`}>
      {ingredientsList.map(function(ingredient) {
        return (
          <IngredientItem 
          data={ingredient}
          key={ingredient._id}
          />
        )
      })}
    </ul>
  );
}

IngredientItems.propTypes = {
  ingredientData: PropTypes.arrayOf(BurgerPropTypes).isRequired
}

export default IngredientItems;