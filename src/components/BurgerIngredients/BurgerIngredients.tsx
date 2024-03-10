import { useMemo, useRef, useState } from "react";

import { TIngredient, useAppSelector, RootState } from "../../services/types/types.tsx";

import ingredientStyles from './BurgerIngredients.module.css'

import Tabs from '../Tabs/Tabs.tsx'
import IngredientItems from '../IngredientItems/IngredientItems.tsx'

const BurgerIngredients = () => {

  const getData = (state: RootState) => state.ingredients.ingredients;
  const data: TIngredient[] = useAppSelector(getData);

  const bunsList = useMemo(() => {
    return data.filter((item: TIngredient) => item.type === 'bun');
  }, [data]);
  
  const saucesList = useMemo(() => {
    return data.filter((item: TIngredient) => item.type === 'sauce');
  }, [data]);
  
  const mainsList = useMemo(() => {
    return data.filter((item: TIngredient) => item.type === 'main');
  }, [data]) 

  const containerRef = useRef<HTMLUListElement>(null);
  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null); 
  const mainRef = useRef<HTMLLIElement>(null);
  const [current, setCurrent] = useState<'bun' | 'sauce' | 'main'>('bun');

  const handleScroll = () => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const bunRect = bunRef.current?.getBoundingClientRect();
    const sauceRect = sauceRef.current?.getBoundingClientRect();
    const mainRect = mainRef.current?.getBoundingClientRect();
    
    if (containerRect && bunRect && sauceRect && mainRect) {
      if (containerRect.top >= bunRect.top) {
        setCurrent('bun');
      }
      if (containerRect.top >= sauceRect.top) {
        setCurrent('sauce');
      }
      if (containerRect.top >= mainRect.top) {
        setCurrent('main');
      }
    }
  };

  return (  
    <section className={`${ingredientStyles.section}`}>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current}/>
      <ul className={`mt-10 ${ingredientStyles.list}`} ref={containerRef} onScroll={handleScroll}>
        <li className={ingredientStyles.item} ref={bunRef}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <IngredientItems ingredientData={bunsList}/>
        </li>
        <li className={ingredientStyles.sauсe} ref={sauceRef}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <IngredientItems ingredientData={saucesList}/>
        </li>
        <li ref={mainRef}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <IngredientItems ingredientData={mainsList}/>
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;