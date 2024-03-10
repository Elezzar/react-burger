import { useAppSelector, RootState } from '../../services/types/types';

import IngredientsFeedListStyles from './IngredientsFeedList.module.css'

type IngredientsFeedListProps = {
  props: string[]
}

const IngredientsFeedList = ({props}: IngredientsFeedListProps) => {
  const ingredientsData = useAppSelector((state: RootState) => state.ingredients.ingredients)
  const ingredients = props

  return (
    <ul className={IngredientsFeedListStyles.container}>
      {ingredients.map((ingredient, index) => {
        if (ingredient && index <= 5) {
          if (index === 5 && ingredients.length > 5) {
            return (
              <li className={IngredientsFeedListStyles.list} style={{ zIndex: index }} key={index}>
                <div className={IngredientsFeedListStyles.box}>
                  <p className={`${IngredientsFeedListStyles.counter} text text_type_digits-default`}>
                    +{ingredients.length - 5}
                  </p>
                </div>
                <img
                  className={IngredientsFeedListStyles.image}
                  src={ingredientsData.find((element) => element._id === ingredient)?.image_mobile}
                  alt={ingredientsData.find((element) => element._id === ingredient)?.name}
                />
              </li>
            );
          }
          return (
            <li className={IngredientsFeedListStyles.list} style={{ zIndex: 10 - index }} key={index}>
              <img
                className={IngredientsFeedListStyles.image}
                src={ingredientsData.find((element) => element._id === ingredient)?.image_mobile}
                alt={ingredientsData.find((element) => element._id === ingredient)?.name}
              />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default IngredientsFeedList;