import { useSelector } from 'react-redux';

import modalStyle from './IngredientDetails.module.css'

const IngredientDetails = () => {

  const ingredientData = useSelector(store => store.ingredient.ingredient);

  return ( 
    <div className={modalStyle.content}>
      <h2 className={`text text_type_main-large ${modalStyle.header}`}>Детали ингредиента</h2>
      <img src={ingredientData.image_large} alt={ingredientData.name} />
      <p className="text text_type_main-medium mb-4 mt-4">{ingredientData.name}</p>
      <ul className={modalStyle.list}>
        <li >
          <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.calories}</p>
        </li>
        <li >
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.proteins}</p>
        </li>
        <li >
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.fat}</p>
        </li>
        <li >
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredientData.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;