const urlApi = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status} ${res.ok}`);
  }
}

function request(endpoint, options) {
  const url = `${urlApi}/${endpoint}`;
  return fetch(url, options).then(checkResponse);
}

/** получение ингредиентов */ 
const getIngredients = () => {
  return request('ingredients');
};

/** получение номера заказа */ 
const getOrder = (userIngredientId) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: userIngredientId,
    }),
  };
  return request('orders', options);
};

/** регистрация пользователя*/ 
const registerUser = (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  };
  return request('auth/register', options);
};

/** вход в учетную запись*/ 
const loginUser = (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  return request('auth/login', options);
};

/**выход из учетной записи */
const refreshToken = (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": data,
    }),
  };
  return request('auth/token', options);
};

const logOut = (refreshToken) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": refreshToken,
    }),
  };
  return request('auth/logout', options);
};

/**восстановление пароля */
const recoverPassword = (inputEmail) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": inputEmail,
    }),
  };
  return request('password-reset', options);
};

/**сброс пароля */
const resetPassword = (inputPassword, inputCode) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "password": inputPassword,
      "token": inputCode,
    }),
  };
  return request('password-reset/reset', options);
};

export {
  request,
  getIngredients,
  getOrder,
  registerUser,
  loginUser,
  refreshToken,
  logOut,
  recoverPassword,
  resetPassword,
  urlApi
}