import { Component, h, State, Prop } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';
import marked from 'marked';

import { IArticle, getSingleArticle, favoriteArticle } from '../../api/articles';
import { IAPIErrors } from '../../api/utils';
import { IComment, getCommentsList } from '../../api/comments';
import { followProfile } from '../../api/profiles';
import { IUser } from '../../api/auth';

@Component({
  tag: 'article-page',
})
export class ArticlePage {
  @Prop() user?: IUser;
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @State() isLoading: boolean = true;
  @State() notFound: boolean = false;
  @State() errors?: IAPIErrors;
  @State() article?: IArticle;
  @State() comments?: IComment[] = [];

  // TODO (optional): if coming from a link in the feed, avoid
  // extra requests by fetching only the comments and pulling
  // the rest of the article data from a global state
  fetchArticle = async (slug: string, token?: string) => {
    const articleInfo = await getSingleArticle(slug, token);
    const { success, errors, article } = articleInfo;
    if (success) {
      this.article = article;
      document.title = `${article.title} - Stencil Conduit`;
    } else {
      this.errors = errors;
    }
    this.isLoading = false;
  };

  fetchComments = async (slug: string) => {
    const res = await getCommentsList(slug);
    const { success, errors, comments } = res;
    if (success) {
      this.comments = comments;
    } else {
      this.errors = errors;
    }
  };

  addComment = (comment: IComment) => {
    this.comments = [comment, ...this.comments];
  };

  removeComment = (id: number) => {
    this.comments = this.comments.filter(c => c.id !== id);
  };

  // Function that toggles if the article is favorited and if
  // the author is followed
  followFavorite = async (isFollow: boolean) => {
    const { article, user } = this;
    if (!article || !user) {
      return;
    }
    this.article = isFollow
      ? {
          ...article,
          author: { ...article.author, following: !article.author.following },
        }
      : {
          ...article,
          favorited: !article.favorited,
          favoritesCount: article.favoritesCount + (article.favorited ? -1 : 1),
        };
    const res = isFollow ? await followProfile(user.username, this.user.token, article.author.following) : await favoriteArticle(article.slug, this.user.token, article.favorited);
    const { success } = res;
    if (!success) {
      this.article = article;
    }
  };

  componentDidLoad() {
    const { slug } = this.match.params;
    if (!slug) {
      this.notFound = true;
      this.isLoading = false;
    }
    const token = this.user ? this.user.token : undefined;

    this.fetchArticle(slug, token);
    this.fetchComments(slug);
  }

  render() {
    if (this.isLoading) {
      return <loading-spinner />;
    }

    if (this.errors) {
      return [<h1>Something went wrong</h1>, <error-display errors={this.errors} />];
    }

    if (this.notFound || !this.article) {
      return <not-found />;
    }

    const { article: a, followFavorite, history, user } = this;
    const { slug } = this.match.params;
    const metaProps = {
      history,
      user,
      article: a,
      followFavorite,
    };
    return (
      <main class="article-page">
        <div class="banner">
          <div class="container">
            <h1>{a.title}</h1>
            <article-meta {...metaProps} />
          </div>
        </div>

        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12" innerHTML={marked(a.body)} />
            {this.article.tagList && (
              <ul class="tag-list">
                {this.article.tagList.map(t => (
                  <li class="tag-default tag-pill tag-outline">{t}</li>
                ))}
              </ul>
            )}
          </div>

          <hr />

          <div class="article-actions">
            <article-meta {...metaProps} />
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              {user ? (
                <comment-form slug={slug} user={this.user} addComment={this.addComment} />
              ) : (
                <p>
                  <stencil-route-link url="/login">Sign in</stencil-route-link> or <stencil-route-link url="/register">sign up</stencil-route-link> to comment.
                </p>
              )}

              {this.comments && this.comments.map(c => <single-comment user={this.user} comment={c} slug={slug} removeComment={this.removeComment} />)}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
