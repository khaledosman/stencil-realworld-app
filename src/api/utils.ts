export const endpoint = 'https://conduit.productionready.io/api';

// --------------------
// The example below is how you could type all your possible errors
// for handling them individually in your front-end. In Conduit's case,
// we're only rendering the errors with their corresponding key, so this is
// not necessary
// --------------------
// export type TEmailPswdErrors = 'is invalid';
// export type TUsernameErrors = 'has already been taken';

export interface IAPIErrors {
  // 'email or password': Array<TEmailPswdErrors>;
  // username: Array<TUsernameErrors>;
  [key: string]: string[];
}

export interface IBaseAPIReq {
  errors?: IAPIErrors;
}

export interface IStandardReq {
  path: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  body?: string;
  token?: string;
}

export const standardReq = async ({
  path,
  method,
  body,
  token,
}: IStandardReq) => {
  const reqPath = `${endpoint}/${path}`;
  let headers: { [key: string]: string } = {
    'content-type': 'application/json',
  };
  if (token) {
    headers = { ...headers, authorization: `Token ${token}` };
  }
  try {
    const req = await fetch(reqPath, {
      credentials: 'omit',
      headers,
      method,
      body,
      mode: 'cors',
    });
    const data = await req.json();
    return data;
  } catch (errors) {
    console.error(errors);
    return { errors };
  }
};
