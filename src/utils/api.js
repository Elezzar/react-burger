const urlApi = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status, res.ok}`);
  }
}

const getIngredients = () => {
  return fetch(`${urlApi}/ingredients`)
  .then((res) => checkResponse(res))
  
}

const getOrder = (userIngredientId) => {
  return fetch(`${urlApi}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      "ingredients": userIngredientId,
    })
  })
  .then((res) => checkResponse(res))
}

export {
  urlApi,
  checkResponse,
  getIngredients,
  getOrder
}