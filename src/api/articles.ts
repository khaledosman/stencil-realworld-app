import { standardReq, IBaseAPIReq } from './utils';
import { IProfile } from './profiles';

export interface IArticle {
  title: string;
  slug: string;
  body: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  author: IProfile;
}

export interface IGetArticleListProps {
  params?: string;
  token?: string;
  isFeed?: boolean;
}

interface IArticleList extends IBaseAPIReq {
  articles?: IArticle[];
  articlesCount?: 500;
}

export const getArticleList = async ({
  params,
  token,
  isFeed,
}: IGetArticleListProps) => {
  const articleList: IArticleList = await standardReq({
    path: `articles${isFeed ? '/feed' : ''}${params && `?${params}`}`,
    method: 'GET',
    token,
  });
  const { articles, articlesCount, errors } = articleList;
  return {
    success: Array.isArray(articles) ? true : false,
    articles,
    articlesCount,
    errors,
  };
};

// Deleting an article either returns an error or an empty
// object for success.
export const deleteArticle = async (slug: string, token: string) => {
  const articleInfo: IBaseAPIReq = await standardReq({
    path: `articles/${slug}`,
    method: 'DELETE',
    token,
  });
  const { errors } = articleInfo;
  return {
    success: typeof errors === 'undefined',
    errors,
  };
};

interface ISingleArticle extends IBaseAPIReq {
  article?: IArticle;
}

const handleSingleArticleReturn = ({ article, errors }: ISingleArticle) => {
  // Article must exist and have a slug
  return {
    success: article && article.slug ? true : false,
    article,
    errors,
  };
};

export const getSingleArticle = async (slug: string, token?: string) => {
  const articleInfo = await standardReq({
    path: `articles/${slug}`,
    method: 'GET',
    token,
  });
  return handleSingleArticleReturn(articleInfo);
};

export interface IArticleUpdate {
  title: string;
  body: string;
  description: string;
  tagList?: string[];
}

export interface IUpdateArticleProps {
  slug: string;
  token: string;
  article: IArticleUpdate;
}

export const updateArticle = async ({
  slug,
  article,
  token,
}: IUpdateArticleProps) => {
  const articleInfo = await standardReq({
    path: `articles/${slug}`,
    method: 'PUT',
    token,
    body: JSON.stringify({ article }),
  });
  return handleSingleArticleReturn(articleInfo);
};

export const createArticle = async (article: IArticleUpdate, token: string) => {
  const articleInfo = await standardReq({
    path: 'articles',
    method: 'POST',
    token,
    body: JSON.stringify({ article }),
  });

  return handleSingleArticleReturn(articleInfo);
};

export const favoriteArticle = async (
  slug: string,
  token: string,
  isUnfavorite?: boolean
) => {
  const articleInfo = await standardReq({
    path: `articles/${slug}/favorite`,
    method: isUnfavorite ? 'DELETE' : 'POST',
    token,
  });

  return handleSingleArticleReturn(articleInfo);
};
