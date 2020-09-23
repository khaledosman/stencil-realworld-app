import { Component, h, Prop, State } from '@stencil/core';
import { IArticle, favoriteArticle } from '../api/articles';
import { IAPIErrors } from '../api/utils';
import { IUser } from '../api/auth';

@Component({
  tag: 'article-list',
})
export class ArticleList {
  @Prop() user?: IUser;
  @Prop() listedArticles: IArticle[];
  @Prop() errors: IAPIErrors;

  @State() articles: IArticle[];

  favoriteArticle = async e => {
    const button = e.currentTarget;
    if (!button) {
      return;
    }

    const slug = button.getAttribute('data-article-slug');
    const favorited = button.getAttribute('data-article-favorited') === '1';
    const index = parseInt(button.getAttribute('data-article-index'));
    const token = this.user && this.user.token;
    const { articles } = this;
    if (!slug || !token || typeof index !== 'number') {
      return;
    }

    // We figure out how the new article is going to look like
    const newArticle = {
      ...articles[index],
      favorited: !favorited,
      favoritesCount: articles[index].favoritesCount + (favorited ? -1 : 1),
    };

    // Then make a copy of the articles array
    const newList = [...articles];
    newList[index] = newArticle;
    this.articles = newList;

    // And only then do we run the server request to keep things snappy
    const res = await favoriteArticle(slug, token, favorited);
    if (!res.success) {
      // If the request isn't sucessful, we return to the previous articles list
      this.articles = articles;
      console.error(res.errors);
    }
  };

  componentWillLoad() {
    this.articles = this.listedArticles;
  }

  render() {
    if (this.errors || !Array.isArray(this.articles)) {
      return [<p>There was an error fetching recent articles, details below</p>, <error-display errors={this.errors} />];
    }

    if (this.articles.length === 0) {
      return <p>No results found</p>;
    }

    return this.articles.map((a, i) => (
      <div class="article-preview">
        <div class="article-meta">
          <stencil-route-link url={`/profile/${a.author.username}`}>
            <img src={a.author.image} alt="author image" />
          </stencil-route-link>
          <div class="info">
            <stencil-route-link url={`/profile/${a.author.username}`} anchorClass="author">
              {a.author.username}
            </stencil-route-link>
            <span class="date">
              {new Date(a.updatedAt).toLocaleDateString('en', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
          <button
            class={`btn btn-sm pull-xs-right ${a.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
            data-article-slug={a.slug}
            data-article-favorited={a.favorited ? '1' : '0'}
            data-article-index={i}
            disabled={!this.user}
            onClick={this.favoriteArticle}
          >
            <ion-icon name="heart"></ion-icon> {a.favoritesCount}
          </button>
        </div>
        <stencil-route-link url={`/article/${a.slug}`} anchorClass="preview-link">
          <h1>{a.title}</h1>
          <p>{a.description}</p>
          <span>Read more...</span>
          {a.tagList && (
            <ul class="tag-list">
              {a.tagList.map(t => (
                <li class="tag-default tag-pill tag-outline">{t}</li>
              ))}
            </ul>
          )}
        </stencil-route-link>
      </div>
    ));
  }
}
