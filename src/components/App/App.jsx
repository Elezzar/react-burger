import React from "react";

import AppHeader from '../AppHeader/AppHeader.jsx'
import Main from '../Main/Main.jsx'

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx'

const UrlIngredients = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    const getIngredients = async () => {
      return await fetch(UrlIngredients)
        .then((res) => {
          if(res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => setIngredients(data.data))
        .catch((err) => console.log(err));
    }

    getIngredients();
  },)
  
  return ( 
    <>
      <AppHeader />
      <Main>
        <BurgerIngredients ingredientData={ingredients}/>
        <BurgerConstructor ingredientData={ingredients}/>
      </Main>

    </>
  );
}

export default App;