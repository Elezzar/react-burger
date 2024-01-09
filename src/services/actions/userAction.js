import { registerUser, loginUser, refreshToken, logOut, recoverPassword, resetPassword, urlApi, } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookies";

export const FETCH_REGISTER_REQUEST = 'FETCH_REGISTER_REQUEST';
export const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
export const FETCH_REGISTER_FAILED = 'FETCH_REGISTER_FAILED';
export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILED = 'FETCH_LOGIN_FAILED';
export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILED = 'FETCH_TOKEN_FAILED';
export const FETCH_AUTH_USER_REQUEST = 'FETCH_AUTH_USER_REQUEST';
export const FETCH_AUTH_USER_SUCCESS = 'FETCH_AUTH_USER_SUCCESS';
export const FETCH_AUTH_USER_FAILED = 'FETCH_AUTH_USER_FAILED';
export const FETCH_LOGOUT_REQUEST = 'FETCH_LOGOUT_REQUEST';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_LOGOUT_FAILED = 'FETCH_LOGOUT_FAILED';
export const FETCH_PASSWORD_RECOVER_REQUEST = 'FETCH_PASSWORD_RECOVER_REQUEST';
export const FETCH_PASSWORD_RECOVER_SUCCESS = 'FETCH_PASSWORD_RECOVER_SUCCESS';
export const FETCH_PASSWORD_RECOVER_FAILED = 'FETCH_PASSWORD_RECOVER_FAILED';
export const FETCH_PASSWORD_RESET_REQUEST = 'FETCH_PASSWORD_RESET_REQUEST';
export const FETCH_PASSWORD_RESET_SUCCESS = 'FETCH_PASSWORD_RESET_SUCCESS';
export const FETCH_PASSWORD_RESET_FAILED = 'FETCH_PASSWORD_RESET_FAILED';
export const FETCH_EDIT_USER_REQUEST = 'FETCH_EDIT_USER_REQUEST';
export const FETCH_EDIT_USER_SUCCESS = 'FETCH_EDIT_USER_SUCCESS';
export const FETCH_EDIT_USER_FAILED = 'FETCH_EDIT_USER_FAILED';

// ======= ACTION CREATORS =============================================================================
/** action creator начала запроса регистрации */
export function fetchRegisterRequest() {
  return { type: FETCH_REGISTER_REQUEST };
};

/** action creator удачной регистрации */
export function fetchRegisterSuccess(data) {
  return {
    type: FETCH_REGISTER_SUCCESS,
    success: data.success,
    email: data.user.email,
    name: data.user.name,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };
};

/** action creator ошибки регистрации */
export function fetchRegisterFailed(err) {
  return { type: FETCH_REGISTER_FAILED, error: err.message };
};

/** action creator начала запроса входа */
export function fetchLoginRequest() {
  return { type: FETCH_LOGIN_REQUEST };
};

/** action creator удачного логина */
export function fetchLoginSuccess(data) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    success: data.success,
    email: data.user.email,
    name: data.user.name,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  };
};

/** action creator ошибки входа */
export function fetchLoginFailed(err) {
  return { type: FETCH_LOGIN_FAILED, error: err.message };
};

/** action creator начала обновления токена */
export function fetchTokenRequest() {
  return { type: FETCH_TOKEN_REQUEST };
};

/** action creator удачного обновления токена */
export function fetchTokenSuccess(data) {
  return {
    type: FETCH_TOKEN_SUCCESS,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

/** action creator ошибки обновления токена */
export function fetchTokenFailed(err) {
  return { type: FETCH_TOKEN_FAILED, error: err.message };
};

/** action creator начала обновления данных пользователя */
export function fetchAuthUserRequest() {
  return { type: FETCH_AUTH_USER_REQUEST };
};

/** action creator удачного обновления данных пользователя */
export function fetchAuthUserSuccess(data) {
  return {
    type: FETCH_AUTH_USER_SUCCESS,
    email: data.user.email,
    name: data.user.name,
    success: data.success,
    isAuthChecked: data.success,
  };
};

/** action creator ошибки обновления данных пользователя */
export function fetchAuthUserFailed(error) {
  return { type: FETCH_AUTH_USER_FAILED, error: error.message };
};

/** action creator начала LogOut */
export function fetchLogOutRequest() {
  return { type: FETCH_LOGOUT_REQUEST };
};

/** action creator удачи LogOut */
export function fetchLogOutSuccess() {
  return {
    type: FETCH_LOGOUT_SUCCESS,
    accessToken: "",
    refreshToken: ""
  };
};

/** action creator ошибки LogOut */
export function fetchLogOutFailed(error) {
  return { type: FETCH_LOGOUT_FAILED, error: error.message };
};

/** action creator начала восстановления пароля */
export function fetchPasswordRecoverRequest() {
  return { type: FETCH_PASSWORD_RECOVER_REQUEST };
};

/** action creator удачного восстановления пароля */
export function fetchPasswordRecoverSuccess(data) {
  return {
    type: FETCH_PASSWORD_RECOVER_SUCCESS,
    success: data.success,
    isPassRecover: data.success,
  };
};

/** action creator ошибки восстановления пароля */
export function fetchPasswordRecoverFailed(error) {
  return { type: FETCH_PASSWORD_RECOVER_FAILED, error: error.message };
};

/** action creator начала сброса пароля */
export function fetchPasswordResetRequest() {
  return { type: FETCH_PASSWORD_RESET_REQUEST };
};

/** action creator удачного сброса пароля */
export function fetchPasswordResetSuccess(data) {
  return {
    type: FETCH_PASSWORD_RESET_SUCCESS,
    success: data.success,
    reset: data.success
  };
};

/** action creator ошибки сброса пароля */
export function fetchPasswordResetFailed(error) {
  return { type: FETCH_PASSWORD_RESET_FAILED, error: error.message };
};

/** action creator начала изменения данных пользователя */
export function fetchEditUserRequest() {
  return { type: FETCH_EDIT_USER_REQUEST };
};

/** action creator удачного изменения данных пользователя */
export function fetchEditUserSuccess(response) {
  return {
    type: FETCH_EDIT_USER_SUCCESS,
    email: response.user.email,
    name: response.user.name,
    success: response.success
  };
};

/** action creator ошибки изменения данных пользователя */
export function fetchEditUserFailed(error) {
  return { type: FETCH_EDIT_USER_FAILED, error: error.message };
};

export function registerUserAction(user) {
  return async function (dispatch) {
    dispatch(fetchRegisterRequest());
    try {
      const response = await registerUser(user);
      const data = await response;
      setCookie("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      dispatch(fetchRegisterSuccess(data));
    } catch (error) {
      dispatch(fetchRegisterFailed(error));
      console.log('Ошибка, не получилось зарегистрировать пользователя', error);
    }
  }
};

/** action логина пользователя */
export function loginUserAction(user) {
  console.log(user)
  return async function (dispatch) {
    dispatch(fetchLoginRequest());
    
    try {
      const response = await loginUser(user);
      const data = await response;
      setCookie("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      dispatch(fetchLoginSuccess(data));
      console.log('userLogin', response); //убрать после сдачи
    } 
    catch (error) {
      dispatch(fetchLoginFailed(error));
      console.error('Ошибка, не получилось войти', error);
    }
  }
};

/** action обновления токена пользователя */
export function updateUserToken(token) {
  return async function (dispatch) {
    dispatch(fetchTokenRequest());

    try {
      const response = await refreshToken(token);
      const data = await response;
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      setCookie("refreshToken", data.refreshToken);
      dispatch(fetchTokenSuccess(data));
    } 
    catch (error) {
      dispatch(fetchTokenFailed(error));
      console.error('Ошибка, не получилось обновить токен', error);
    }
  }
};

/** action LogOut пользователя */
export function logOutAction(refreshToken) {
  return async function (dispatch) {
    dispatch(fetchLogOutRequest());
  
    try {
      const response = await logOut(refreshToken);
      setCookie("accessToken", "");
      setCookie("refreshToken", ""); 
      dispatch(fetchLogOutSuccess());
      console.log('logOut', response); //убрать при сдаче
    } 
    catch (error) {
      dispatch(fetchLogOutFailed(error));
      console.error('Ошибка, выйти из профиля не получилось', error);
    }
  }
};
  
  /** action восстановления пароля */
export function recoverPasswordAction(email) {
  return async function (dispatch) {
    dispatch(fetchPasswordRecoverRequest());

    try {
      const response = await recoverPassword(email);
      const data = await response;
      dispatch(fetchPasswordRecoverSuccess(data));
      console.log('passwordRecover', response.message); //убрать при сдаче
    } 
    catch (error) {
      dispatch(fetchPasswordRecoverFailed(error));
      console.error('Ошибка, не получилось восстановить пароль', error);
    }
  }
};
  
  /** action сброса пароля */
export function resetPasswordAction(inputPassword, inputCode) {
  return async function (dispatch) {
    dispatch(fetchPasswordResetRequest());
  
    try {
      const response = await resetPassword(inputPassword, inputCode);
      const data = await response;
      dispatch(fetchPasswordResetSuccess(data));
      console.log('resetPassword', response.message);
    } 
    catch (error) {
      dispatch(fetchPasswordResetFailed(error));
      console.error('Ошибка, не получилось сбросить пароль', error);
    }
  }
};


  const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
  };

  //функция запроса на сервер и обновления токена в случае ошибки
  export const fetchWithRefresh = async (dispatch, url, options, actionCreators) => {
        
    const { request, success, failure } = actionCreators;
    dispatch(request());

    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const response = await fetch(url, options);
        const res = await checkResponse(response);
        dispatch(success(res));
      } catch (error) {
        if (['jwt expired', 'jwt malformed'].includes(error.message)) {
          dispatch(updateUserToken(getCookie('refreshToken')));//запись токена в cookies
          const response = await fetch(url, options); //повторная авторизация
          const res = await checkResponse(response);
          dispatch(success(res));
        } else {
          dispatch(failure(error));
        }
      }
    }
  };
  

  /** action редактирования профиля */
  export function editUserAction(user) {
    return async function (dispatch) {
      return fetchWithRefresh(dispatch, `${urlApi}/auth/user`,
        {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + getCookie('accessToken'),
          },
          body: JSON.stringify(user),
        },
        {
          request: fetchEditUserRequest,
          success: fetchEditUserSuccess,
          failure: fetchEditUserFailed,
        }
      );
    }
  }
  
  /**action обновления данных профиля */
  export function updateCurrentUserAction() {
    return async function (dispatch) {
      return fetchWithRefresh(dispatch, `${urlApi}/auth/user`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + getCookie('accessToken'),
          },
        },
        {
          request: fetchAuthUserRequest,
          success: fetchAuthUserSuccess,
          failure: fetchAuthUserFailed,
        }
      );
    }
  }; 
