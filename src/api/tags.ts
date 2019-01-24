import { IBaseAPIReq, standardReq } from './utils';

interface ITagList extends IBaseAPIReq {
  tags?: string[];
}

export const getTags = async () => {
  const tagList: ITagList = await standardReq({
    path: 'tags',
    method: 'GET',
  });

  const { tags, errors } = tagList;
  return {
    success: Array.isArray(tags) ? true : false,
    tags,
    errors,
  };
};
