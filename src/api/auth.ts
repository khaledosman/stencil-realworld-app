import { standardReq, IBaseAPIReq } from './utils';

export interface IUser {
  id: number;
  email: string;
  username: string;
  updatedAt: string;
  createdAt: string;
  token: string;
  bio?: string;
  image?: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials extends ISignInCredentials {
  name: string;
}

interface IUserInfo extends IBaseAPIReq {
  user?: IUser;
}

export interface IHandleUserReturn extends IUserInfo {
  success: boolean;
}

export type TSignIn = (credentials: ISignInCredentials) => void;
export type TSignOut = () => void;

const handleUserReturn = ({ user, errors }: IUserInfo) => {
  // The anonimousReq for user paths and methods will either
  // return an object with "user" or with "errors", no matter what
  return {
    success: user && user.username ? true : false,
    user,
    errors,
  };
};

export const logUser = async (user: ISignInCredentials) => {
  const userInfo = await standardReq({
    path: 'users/login',
    body: JSON.stringify({ user }),
    method: 'POST',
  });
  return handleUserReturn(userInfo);
};

export const registerUser = async (user: IRegisterCredentials) => {
  const userInfo = await standardReq({
    path: 'users',
    body: JSON.stringify({ user }),
    method: 'POST',
  });
  return handleUserReturn(userInfo);
};

export const getUser = async (token: string) => {
  const userInfo = await standardReq({
    path: 'user',
    method: 'GET',
    token,
  });
  return handleUserReturn(userInfo);
};

export interface IUserUpdate {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  password?: string;
}

export const updateUser = async (user: IUserUpdate, token: string) => {
  const userInfo = await standardReq({
    path: 'user',
    method: 'PUT',
    token,
    body: JSON.stringify({ user }),
  });
  return handleUserReturn(userInfo);
};
