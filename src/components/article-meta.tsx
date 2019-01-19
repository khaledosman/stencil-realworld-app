import { Component, Prop } from "@stencil/core";
import { IProfile } from "../api/profiles";

@Component({
  tag: "article-meta"
})
export class ArticleMeta {
  @Prop() author: IProfile;
  @Prop() date: string;
  @Prop() favoritesCount: number;
  @Prop() favorited: boolean;
  @Prop() following: boolean;
  @Prop() followFavorite: (isFollow: boolean) => void;

  followAuthor = () => this.followFavorite(true);

  favoriteArticle = () => this.followFavorite(false);

  render() {
    const { username, image } = this.author;
    return (
      <div class="article-meta">
        <stencil-route-link url={`/profile/${username}`}>
          <img src={image} />
        </stencil-route-link>
        <div class="info">
          <stencil-route-link url={`/profile/${username}`} anchorClass="author">
            {username}
          </stencil-route-link>
          <span class="date">
            {new Date(this.date).toLocaleDateString("en", {
              month: "long",
              day: "2-digit",
              year: "numeric"
            })}
          </span>
        </div>
        <button
          class={`btn btn-sm ${
            this.following ? "btn-outline-secondary" : "btn-secondary"
          }`}
          aria-label={`Click to follow ${username}`}
          onClick={this.followAuthor}
        >
          {this.following && <i class="ion-plus-round" />}
          &nbsp; {this.following ? 'Follow' : 'Unfollow'} {username}
        </button>
        &nbsp;&nbsp;
        <button
          class={`btn btn-sm ${
            this.favorited ? "btn-primary" : "btn-outline-primary"
          }`}
          aria-label={`Click to favorite this article`}
          onClick={this.favoriteArticle}
        >
          <i class="ion-heart" />
          &nbsp; Favorite Article{" "}
          <span class="counter">({this.favoritesCount})</span>
        </button>
      </div>
    );
  }
}
