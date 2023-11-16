import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import mainStyles from './Main.module.css'

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'

const Main = () => {

  return (  
    <DndProvider backend={HTML5Backend}>
      <main className={mainStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export default Main;