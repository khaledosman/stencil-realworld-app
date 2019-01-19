import { Component, State, Prop } from "@stencil/core";
import { MatchResults } from "@stencil/router";
import marked from "marked";

import {
  IArticle,
  getSingleArticle,
  favoriteArticle
} from "../../api/articles";
import { IAPIErrors } from "../../api/utils";
import { IUser } from "../../userTunnel";
import { IComment, getCommentsList } from "../../api/comments";
import { followProfile } from "../../api/profiles";

@Component({
  tag: "article-page"
})
export class ArticlePage {
  @Prop() user?: IUser;
  @Prop() match: MatchResults;

  @State() following: boolean = false;
  @State() favorited: boolean = false;
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
      if (article.favorited) {
        this.favorited = true;
      }
      if (article.author.following) {
        this.following = true;
      }
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
    if (!this.article || !this.user) {
      return;
    }
    const stateId = isFollow ? "following" : "favorited";
    const identifier = isFollow
      ? this.article.author.username
      : this.article.slug;
    const undo = this[stateId];
    const res = isFollow
      ? await followProfile(identifier, this.user.token, undo)
      : await favoriteArticle(identifier, this.user.token, undo);
    const { success } = res;
    if (success) {
      this[stateId] = !undo;
      if (!isFollow) {
        this.article = {
          ...this.article,
          favoritesCount: this.article.favoritesCount + (undo ? -1 : 1)
        };
      }
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

    // TODO: error-handling
    if (this.errors) {
      return [
        <h1>Something went wrong</h1>,
        <code>{JSON.stringify(this.errors)}</code>
      ];
    }

    if (this.notFound || !this.article) {
      return <not-found />;
    }

    const { article: a, favorited, following, followFavorite } = this;
    const { slug } = this.match.params;
    const metaProps = {
      author: a.author,
      date: a.updatedAt,
      favoritesCount: a.favoritesCount,
      favorited,
      following,
      followFavorite
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
          </div>

          <hr />

          <div class="article-actions">
            <article-meta {...metaProps} />
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <comment-form
                slug={slug}
                user={this.user}
                addComment={this.addComment}
              />

              {this.comments &&
                this.comments.map(c => (
                  <single-comment
                    user={this.user}
                    comment={c}
                    slug={slug}
                    removeComment={this.removeComment}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
