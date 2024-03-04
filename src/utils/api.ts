import { TIngredientsResponse,
        TOrderData,
        TRegisterUser,
        TLoginUser  } from "../services/types/types";


        

const urlApi = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status} ${res.ok}`);
  }
}

function request(endpoint: string, options?: RequestInit): Promise<unknown> {
  const url = `${urlApi}/${endpoint}`;
  return fetch(url, options).then(checkResponse);
}

/** получение ингредиентов */ 
const getIngredients = (): Promise<TIngredientsResponse> => {
  return request('ingredients') as Promise<TIngredientsResponse>;
};

/** получение номера заказа */ 
const getOrder = (userIngredientId: string): Promise<TOrderData> => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: userIngredientId,
    }),
  };
  return request('orders', options as RequestInit) as Promise<TOrderData>;
};

/** регистрация пользователя*/ 
const registerUser = <T>(user: TRegisterUser): Promise<T> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  };
  return request('auth/register', options as RequestInit) as Promise<T>;
};

/** вход в учетную запись*/ 
const loginUser = <T>(user: TLoginUser): Promise<T> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  return request('auth/login', options as RequestInit) as Promise<T>;
};

/**выход из учетной записи */
const refreshToken = <T>(data: string | undefined): Promise<T> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": data,
    }),
  };
  return request('auth/token', options as RequestInit) as Promise<T>;
};

const logOut = <T>(refreshToken: string | undefined): Promise<T> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": refreshToken,
    }),
  };
  return request('auth/logout', options as RequestInit) as Promise<T>;
};

/**восстановление пароля */
const recoverPassword = <T>(inputEmail: string): Promise<T> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": inputEmail,
    }),
  };
  return request('password-reset', options as RequestInit) as Promise<T>;
};

/**сброс пароля */
const resetPassword = <T>(inputPassword: string, inputCode: string): Promise<T> => {
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
  return request('password-reset/reset', options as RequestInit) as Promise<T>;
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