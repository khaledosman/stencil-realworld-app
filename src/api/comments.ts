import { IProfile } from './profiles';
import { IBaseAPIReq, standardReq } from './utils';

export interface IComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: IProfile;
}

interface ICommentList extends IBaseAPIReq {
  comments?: IComment[];
}

interface ISingleComment extends IBaseAPIReq {
  comment?: IComment;
}

// We COULD authenticate comment lists, but the only
// value that would change would be the `following` prop
// in authors' profiles, which doesn't show up for the user,
// so I preferred not using it
export const getCommentsList = async (slug: string) => {
  const commentList: ICommentList = await standardReq({
    path: `articles/${slug}/comments`,
    method: 'GET',
  });
  const { comments, errors } = commentList;
  return {
    success: Array.isArray(comments) ? true : false,
    comments,
    errors,
  };
};

// Deleting an comment either returns an error or an empty
// object for success.
export const deleteComment = async (
  slug: string,
  id: number,
  token: string
) => {
  const commentInfo: IBaseAPIReq = await standardReq({
    path: `articles/${slug}/comments/${id}`,
    method: 'DELETE',
    token,
  });
  const { errors } = commentInfo;
  return {
    success: typeof errors === 'undefined',
    errors,
  };
};

export const createComment = async (
  slug: string,
  body: string,
  token: string
) => {
  const commentInfo: ISingleComment = await standardReq({
    path: `articles/${slug}/comments`,
    method: 'POST',
    token,
    body: JSON.stringify({ comment: { body } }),
  });

  const { comment, errors } = commentInfo;
  return {
    success: comment && comment.id ? true : false,
    comment,
    errors,
  };
};
