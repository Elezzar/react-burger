import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import ingredientStyles from './BurgerIngredients.module.css'

import Tabs from '../Tabs/Tabs.jsx'
import IngredientItems from '../IngredientItems/IngredientItems.jsx'

const BurgerIngredients = () => {

  const getData = state => state.ingredients.ingredients;
  const data = useSelector(getData);

  const bunsList = useMemo(() => {
    return data.filter(item => item.type === 'bun');
  }, [data]);
  
  const saucesList = useMemo(() => {
    return data.filter(item => item.type === 'sauce');
  }, [data]);
  
  const mainsList = useMemo(() => {
    return data.filter(item => item.type === 'main');
  }, [data]) 

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [current, setCurrent] = useState('bun');

  const handleScroll = () => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const bunRect = bunRef.current.getBoundingClientRect();
    const sauceRect = sauceRef.current.getBoundingClientRect();
    const mainRect = mainRef.current.getBoundingClientRect();
    
    if (containerRect.top > bunRect.top) {
      setCurrent('bun');
    } 
    if (containerRect.top > sauceRect.top) {
      setCurrent('sauсe');
    }
    if (containerRect.top > mainRect.top) {
      setCurrent('main');
    }
  }

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