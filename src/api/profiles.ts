import { standardReq, IBaseAPIReq } from './utils';

export interface IProfile {
  username: string;
  following: boolean;
  bio?: string;
  image?: string;
}

interface IProfileInfo extends IBaseAPIReq {
  profile?: IProfile;
}

const handleProfileReturn = ({ profile, errors }: IProfileInfo) => {
  return {
    success: profile && profile.username ? true : false,
    profile,
    errors,
  };
};

export const getProfile = async (username: string, token?: string) => {
  const profileInfo = await standardReq({
    path: `profiles/${username}`,
    method: 'GET',
    token,
  });
  return handleProfileReturn(profileInfo);
};

export const followProfile = async (
  username: string,
  token: string,
  unfollow?: boolean
) => {
  const profileInfo = await standardReq({
    path: `profiles/${username}/follow`,
    method: unfollow ? 'DELETE' : 'POST',
    token,
  });
  return handleProfileReturn(profileInfo);
};
