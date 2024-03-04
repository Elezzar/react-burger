import { AnyAction } from "redux";
import { registerUser, loginUser, refreshToken, logOut, recoverPassword, resetPassword, urlApi, } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookies";
import { AppThunk, TRegisterUser, TLoginUser, AppDispatch } from "../types/types"


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

// ======= ACTION CREATORS ===============
/** общие типы  */
type TUserData = {
  email: string;
  name: string;
}
type TFetchUserResponse = {
  user: TUserData;
  success: boolean;
};

type TServerResResetPassLogout = {
  success: boolean,
  message: string
}

type TServerResRegisterLogin = {
  success: boolean,
  user: TUserData,
  accessToken: string,
  refreshToken: string
}

type TServerResRefToken = {
  success: boolean,
  accessToken: string,
  refreshToken: string
}


/** типы обновления регистрации пользователя */
type TRegisterData = {
  success: boolean,
  user: TUserData,
  accessToken: string,
  refreshToken: string,
}
type TRegisterRequest = {
  type: typeof FETCH_REGISTER_REQUEST
}
type TRegisterSuccess = {
  type: typeof FETCH_REGISTER_SUCCESS,
  success: boolean,
  email: string,
  name: string,
  accessToken: string,
  refreshToken: string,
}
type TRegisterFailed = {
  type: typeof FETCH_REGISTER_FAILED,
  error: string,
}

/** action creator начала запроса регистрации */
export function fetchRegisterRequest(): TRegisterRequest {
  return { type: FETCH_REGISTER_REQUEST };
};

/** action creator удачной регистрации */
export function fetchRegisterSuccess(data: TRegisterData): TRegisterSuccess {
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
export function fetchRegisterFailed(err: Error): TRegisterFailed {
  return { type: FETCH_REGISTER_FAILED, error: err.message };
};


/** типы обновления данных пользователя */
type TLoginRequest = {
  type: typeof FETCH_LOGIN_REQUEST,
}
type TLoginSuccess = {
  type: typeof FETCH_LOGIN_SUCCESS,
  success: boolean,
  email: string,
  name: string,
  accessToken: string,
  refreshToken: string,
}
type TLoginFailed = {
  type: typeof FETCH_LOGIN_FAILED,
  error: string,
}
type TLoginData = {
  success: boolean,
  user: TUserData;
  accessToken: string,
  refreshToken: string,
}

/** action creator начала запроса входа */
export function fetchLoginRequest(): TLoginRequest {
  return { type: FETCH_LOGIN_REQUEST };
};

/** action creator удачного логина */
export function fetchLoginSuccess(data: TLoginData): TLoginSuccess {
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
export function fetchLoginFailed(err: Error): TLoginFailed {
  return { type: FETCH_LOGIN_FAILED, error: err.message };
};


/** типы обновления токена */
type TFetchToken = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
}
type TTokenRequest = {
  type: typeof FETCH_TOKEN_REQUEST,
}
type TTokenSuccess = {
  type: typeof FETCH_TOKEN_SUCCESS,
  accessToken: string,
  refreshToken: string,
}
type TTokenFailed = {
  type: typeof FETCH_TOKEN_FAILED,
  error: string,
}

/** action creator начала обновления токена */
export function fetchTokenRequest(): TTokenRequest {
  return { type: FETCH_TOKEN_REQUEST };
};

/** action creator удачного обновления токена */
export function fetchTokenSuccess(data: TFetchToken): TTokenSuccess {
  return {
    type: FETCH_TOKEN_SUCCESS,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

/** action creator ошибки обновления токена */
export function fetchTokenFailed(err: Error): TTokenFailed {
  return { type: FETCH_TOKEN_FAILED, error: err.message };
};


/** типы обновления данных пользователя */
type TAuthUserRequest = {
  type: typeof FETCH_AUTH_USER_REQUEST,
}
type TAuthUserSuccess = {
  type: typeof FETCH_AUTH_USER_SUCCESS,
  email: string,
  name: string,
  success: boolean,
  isAuthChecked: boolean,
}
type TAuthUserFailed = {
  type: typeof FETCH_AUTH_USER_FAILED,
  error: string,
}

type TAuthUserRequestAction = () => TAuthUserRequest;
type TAuthUserSuccessAction = (response: TFetchUserResponse) => TAuthUserSuccess;
type TAuthUserFailedAction = (error: Error) => TAuthUserFailed;

export type TActionCreatorsUpdateUser = {
  request: TAuthUserRequestAction,
  success: TAuthUserSuccessAction,
  failure: TAuthUserFailedAction,
}

/** action creator начала обновления данных пользователя */
export function fetchAuthUserRequest(): TAuthUserRequest {
  return { type: FETCH_AUTH_USER_REQUEST };
};

/** action creator удачного обновления данных пользователя */
export function fetchAuthUserSuccess(data: TFetchUserResponse): TAuthUserSuccess {
  return {
    type: FETCH_AUTH_USER_SUCCESS,
    email: data.user.email,
    name: data.user.name,
    success: data.success,
    isAuthChecked: data.success,
  };
};

/** action creator ошибки обновления данных пользователя */
export function fetchAuthUserFailed(error: Error): TAuthUserFailed {
  return { type: FETCH_AUTH_USER_FAILED, error: error.message };
};


/** типы LogOut */
type TLogOutRequest = {
  type: typeof FETCH_LOGOUT_REQUEST,
}
type TLogOutSuccess = {
  type: typeof FETCH_LOGOUT_SUCCESS,
  accessToken: string,
  refreshToken: string,
  success: boolean,
}
type TLogOutFailed = {
  type: typeof FETCH_LOGOUT_FAILED,
  error: string,
}

/** action creator начала LogOut */
export function fetchLogOutRequest(): TLogOutRequest {
  return { type: FETCH_LOGOUT_REQUEST };
};

/** action creator удачи LogOut */
export function fetchLogOutSuccess(data: TServerResResetPassLogout): TLogOutSuccess {
  return {
    type: FETCH_LOGOUT_SUCCESS,
    accessToken: "",
    refreshToken: "",
    success: data.success,
  };
};

/** action creator ошибки LogOut */
export function fetchLogOutFailed(error: Error): TLogOutFailed {
  return { 
    type: FETCH_LOGOUT_FAILED, 
    error: error.message 
  };
};


/** типы восстановления пароля */
type TPasswordRecoverRequest = {
  type: typeof FETCH_PASSWORD_RECOVER_REQUEST,
}
type TPasswordRecoverSuccess = {
  type: typeof FETCH_PASSWORD_RECOVER_SUCCESS,
  success: boolean,
  isPassRecover: boolean,
}
type TPasswordRecoverFailed = {
  type: typeof FETCH_PASSWORD_RECOVER_FAILED,
  error: string,
}

/** action creator начала восстановления пароля */
export function fetchPasswordRecoverRequest(): TPasswordRecoverRequest {
  return { type: FETCH_PASSWORD_RECOVER_REQUEST };
};

/** action creator удачного восстановления пароля */
export function fetchPasswordRecoverSuccess(data: TServerResResetPassLogout): TPasswordRecoverSuccess {
  return {
    type: FETCH_PASSWORD_RECOVER_SUCCESS,
    success: data.success,
    isPassRecover: data.success,
  };
};

/** action creator ошибки восстановления пароля */
export function fetchPasswordRecoverFailed(error: Error): TPasswordRecoverFailed {
  return { type: FETCH_PASSWORD_RECOVER_FAILED, error: error.message };
};

/** типы сброса пароля */
type TPasswordResetRequest = {
  type: typeof FETCH_PASSWORD_RESET_REQUEST,
}
type TPasswordResetSuccess = {
  type: typeof FETCH_PASSWORD_RESET_SUCCESS,
  success: boolean,
  reset: boolean,
}
type TPasswordResetFailed = {
  type: typeof FETCH_PASSWORD_RESET_FAILED,
  error: string,
}

/** action creator начала сброса пароля */
export function fetchPasswordResetRequest(): TPasswordResetRequest {
  return { type: FETCH_PASSWORD_RESET_REQUEST };
};

/** action creator удачного сброса пароля */
export function fetchPasswordResetSuccess(data: TServerResResetPassLogout): TPasswordResetSuccess {
  return {
    type: FETCH_PASSWORD_RESET_SUCCESS,
    success: data.success,
    reset: data.success
  };
};

/** action creator ошибки сброса пароля */
export function fetchPasswordResetFailed(error: Error): TPasswordResetFailed {
  return { type: FETCH_PASSWORD_RESET_FAILED, error: error.message };
};


/** типы изменения данных пользователя */
type TEditUserRequest = {
  type: typeof FETCH_EDIT_USER_REQUEST,
}
type TEditUserSuccess = {
  type: typeof FETCH_EDIT_USER_SUCCESS,
  email: string,
  name: string,
  success: boolean,
}
type TEditUserFailed = {
  type: typeof FETCH_EDIT_USER_FAILED,
  error: string,
}

type TEditUserRequestAction = () => TEditUserRequest;
type TEditUserSuccessAction = (response: TFetchUserResponse) => TEditUserSuccess;
type TEditUserFailedAction = (error: Error) => TEditUserFailed;

type TActionCreatorsEditUser = {
  request: TEditUserRequestAction,
  success: TEditUserSuccessAction,
  failure: TEditUserFailedAction,
}

/** action creator начала изменения данных пользователя */
export function fetchEditUserRequest(): TEditUserRequest {
  return { type: FETCH_EDIT_USER_REQUEST };
};

/** action creator удачного изменения данных пользователя */
export function fetchEditUserSuccess(response: TFetchUserResponse): TEditUserSuccess {
  return {
    type: FETCH_EDIT_USER_SUCCESS,
    email: response.user.email,
    name: response.user.name,
    success: response.success
  };
};


/** сборка всех типов action creators */
export type TLoginActions = TLoginRequest | TLoginSuccess | TLoginFailed;
export type TUpdateCurrentUserActions = TAuthUserRequest | TAuthUserSuccess | TAuthUserFailed;
export type TEditUserActions = TEditUserRequest | TEditUserSuccess | TEditUserFailed;
export type TTokenActions = TTokenRequest | TTokenSuccess | TTokenFailed;
export type TLogOutActions = TLogOutRequest | TLogOutSuccess | TLogOutFailed;
export type TPasswordRecoverActions = TPasswordRecoverRequest | TPasswordRecoverSuccess | TPasswordRecoverFailed;
export type TPasswordResetActions = TPasswordResetRequest | TPasswordResetSuccess | TPasswordResetFailed;
export type TRegisterActions = TRegisterRequest | TRegisterSuccess | TRegisterFailed;

export type TUserActions = TLoginActions | TUpdateCurrentUserActions | TEditUserActions | TTokenActions |
  TLogOutActions | TPasswordRecoverActions | TPasswordResetActions | TRegisterActions;

  
/** action creator ошибки изменения данных пользователя */
export function fetchEditUserFailed(error: Error): TEditUserFailed {
  return { type: FETCH_EDIT_USER_FAILED, error: error.message };
};

export function registerUserAction(user: TRegisterUser): AppThunk  {
  return async function (dispatch) {
    dispatch(fetchRegisterRequest());
    try {
      const response = await registerUser<TServerResRegisterLogin>(user);
      const data = await response;
      setCookie("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      dispatch(fetchRegisterSuccess(data));
    } catch (error) {
      if (error instanceof Error && error.message as string) {
        dispatch(fetchRegisterFailed(error));
        console.log('Ошибка, не получилось зарегистрировать пользователя', error);
    }
  }
}};

/** action логина пользователя */
export function loginUserAction(user: TLoginUser): AppThunk {
  return async function (dispatch) {
    dispatch(fetchLoginRequest());
    
    try {
      const response = await loginUser<TServerResRegisterLogin>(user);
      const data = await response;
      setCookie("refreshToken", data.refreshToken);
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });

      const action = fetchLoginSuccess(data);
      dispatch(fetchLoginSuccess(data));
    } 
    catch (error) {
      if (error instanceof Error && error.message as string) {
      dispatch(fetchLoginFailed(error));
      console.error('Ошибка, не получилось войти', error);
    }
  }
}};

/** action обновления токена пользователя */
export function updateUserToken(token: string | undefined): AppThunk {
  return async function (dispatch) {
    dispatch(fetchTokenRequest());

    try {
      const response = await refreshToken<TServerResRefToken>(token);
      const data = await response;
      setCookie("accessToken", data.accessToken.split("Bearer ")[1], { expires: 1200 });
      setCookie("refreshToken", data.refreshToken);
      dispatch(fetchTokenSuccess(data));
    } 
    catch (error) {
      if (error instanceof Error && error.message as string) {
      dispatch(fetchTokenFailed(error));
      console.error('Ошибка, не получилось обновить токен', error);
    }
  }
}};

/** action LogOut пользователя */
export function logOutAction(refreshToken: string | undefined): AppThunk {
  return async function (dispatch) {
    dispatch(fetchLogOutRequest());
  
    try {
      const response = await logOut<TServerResResetPassLogout>(refreshToken);
      setCookie("accessToken", "");
      setCookie("refreshToken", ""); 
      dispatch(fetchLogOutSuccess(response));
    } 
    catch (error) {
      if (error instanceof Error && error.message as string) {
      dispatch(fetchLogOutFailed(error));
      console.error('Ошибка, выйти из профиля не получилось', error);
    }
  }
}};
  
  /** action восстановления пароля */
export function recoverPasswordAction(email: string): AppThunk {
  return async function (dispatch) {
    dispatch(fetchPasswordRecoverRequest());

    try {
      const response = await recoverPassword<TServerResResetPassLogout>(email);
      const data = await response;
      dispatch(fetchPasswordRecoverSuccess(data));
    } 
    catch (error) {
      if (error instanceof Error && error.message as string) {
      dispatch(fetchPasswordRecoverFailed(error));
      console.error('Ошибка, не получилось восстановить пароль', error);
    }
  }
}};
  
  /** action сброса пароля */
export function resetPasswordAction(inputPassword: string, inputCode: string): AppThunk {
  return async function (dispatch) {
    dispatch(fetchPasswordResetRequest());
  
    try {
      const response = await resetPassword<TServerResResetPassLogout>(inputPassword, inputCode);
      const data = await response;
      dispatch(fetchPasswordResetSuccess(data));
    } 
    catch (error) {
      if (error instanceof Error && error.message as string) {
      dispatch(fetchPasswordResetFailed(error));
      console.error('Ошибка, не получилось сбросить пароль', error);
    }
  }
}};


  const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
  };

  //функция запроса на сервер и обновления токена в случае ошибки

  type TFetchOptions = {
    method: string;
    headers: {
      "Content-Type": string;
      authorization: string;
    };
  };
  type TFetchOptionsWithBody = TFetchOptions & {
    body: string;
  };

  export const fetchWithRefresh = async (
    dispatch: AppDispatch, 
    url: string, 
    options: TFetchOptions | TFetchOptionsWithBody, 
    actionCreators: TActionCreatorsEditUser | TActionCreatorsUpdateUser ) => {
        
    const { request, success, failure } = actionCreators;
    dispatch(request());

    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const response = await fetch(url, options);
        const res = await checkResponse(response);
        dispatch(success(res));
      } catch (error) {
        if (error instanceof Error && ['jwt expired', 'jwt malformed'].includes(error.message as string)) {
          dispatch(updateUserToken(getCookie('refreshToken')));//запись токена в cookies
          const response = await fetch(url, options); //повторная авторизация
          const res = await checkResponse(response);
          dispatch(success(res));
        } else {
          dispatch(failure(error as Error));
        }
      }
    }
  };
  

  /** action редактирования профиля */
  export function editUserAction(user: { email: string, name: string, password: string }): AppThunk {
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
  export function updateCurrentUserAction(): AppThunk {
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
