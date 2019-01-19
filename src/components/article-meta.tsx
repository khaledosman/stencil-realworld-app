import { Component, Prop } from "@stencil/core";
import { IProfile } from "../api/profiles";

@Component({
  tag: "article-meta"
})
export class ArticleMeta {
  @Prop() author: IProfile;
  @Prop() date: string;
  @Prop() favoritesCount: number;

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
        {/* Author's follower count */}
        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round" />
          &nbsp; Follow {username} <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart" />
          &nbsp; Favorite Post{" "}
          <span class="counter">({this.favoritesCount})</span>
        </button>
      </div>
    );
  }
}
