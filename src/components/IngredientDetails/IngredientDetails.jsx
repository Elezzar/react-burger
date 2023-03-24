import PropTypes from "prop-types";

import modalStyle from './IngredientDetails.module.css'

import BurgerPropTypes from "../../utils/BurgerPropTypes.jsx";

const IngredientDetails = ({ingredient}) => {
  return ( 
    <div className={modalStyle.content}>
      <h2 className={`text text_type_main-large ${modalStyle.header}`}>Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mb-4 mt-4">{ingredient.name}</p>
      <ul className={modalStyle.list}>
        <li >
          <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li >
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li >
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li >
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: BurgerPropTypes.isRequired
}

export default IngredientDetails;