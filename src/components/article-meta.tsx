import { Component, h, Prop } from '@stencil/core';
import { IUser } from '../api/auth';
import { deleteArticle, IArticle } from '../api/articles';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'article-meta',
})
export class ArticleMeta {
  @Prop() history: RouterHistory;
  @Prop() user?: IUser;
  @Prop() article: IArticle;
  @Prop() followFavorite: (isFollow: boolean) => void;

  followAuthor = () => this.followFavorite(true);

  favoriteArticle = () => this.followFavorite(false);

  deleteArticle = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(this.article.slug, this.user && this.user.token);
      this.history.push(`/profile/${this.user.username}`);
    }
  };

  render() {
    const {
      author: { username, image, following },
      updatedAt,
      slug,
      favorited,
      favoritesCount,
    } = this.article;
    const isOwner = this.user && username === this.user.username;
    return (
      <div class="article-meta">
        <stencil-route-link url={`/profile/${username}`}>
          <img src={image} alt="author image" />
        </stencil-route-link>
        <div class="info">
          <stencil-route-link url={`/profile/${username}`} anchorClass="author">
            {username}
          </stencil-route-link>
          <span class="date">
            {new Date(updatedAt).toLocaleDateString('en', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>
        {isOwner
          ? [
              <stencil-route-link anchorClass="btn btn-outline-secondary btn-sm" url={`/editor/${slug}`}>
                <ion-icon name="ion-edit"></ion-icon> Edit Article
              </stencil-route-link>,
              <button class="btn btn-outline-danger btn-sm" aria-label={`Click to delete this article`} onClick={this.deleteArticle}>
                <ion-icon name="ion-trash-a"></ion-icon> Delete Article
              </button>,
            ]
          : this.user && [
              <button class={`btn btn-sm ${following ? 'btn-outline-secondary' : 'btn-secondary'}`} aria-label={`Click to follow ${username}`} onClick={this.followAuthor}>
                {!following && <ion-icon name="ion-plus-round"></ion-icon>}
                &nbsp; {!following ? 'Follow' : 'Unfollow'} {username}
              </button>,
              <button class={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'}`} aria-label={`Click to favorite this article`} onClick={this.favoriteArticle}>
                <ion-icon name="heart"></ion-icon>
                &nbsp; {favorited ? 'Unfavorite' : 'Favorite'} Article <span class="counter">({favoritesCount})</span>
              </button>,
            ]}
      </div>
    );
  }
}
