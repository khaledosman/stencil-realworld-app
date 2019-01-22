import { Component, Prop } from "@stencil/core";
import { IArticle } from "../api/articles";
import { IAPIErrors } from "../api/utils";

// TODO: tags in the article card
@Component({
  tag: "article-list"
})
export class ArticleList {
  @Prop() articles: IArticle[];
  @Prop() errors: IAPIErrors;

  render() {
    // TODO: style error messages
    if (this.errors || !Array.isArray(this.articles)) {
      return [
        <p>There was an error fetching recent articles, details below</p>,
        <code>{JSON.stringify(this.errors)}</code>
      ];
    }

    if (this.articles.length === 0) {
      return <p>No results found</p>;
    }

    return this.articles.map(a => (
      <div class="article-preview">
        <div class="article-meta">
          <stencil-route-link url={`/profile/${a.author.username}`}>
            <img src={a.author.image} />
          </stencil-route-link>
          <div class="info">
            <stencil-route-link
              url={`/profile/${a.author.username}`}
              anchorClass="author"
            >
              {a.author.username}
            </stencil-route-link>
            {/* TODO: figure out if it's updated or created at */}
            <span class="date">
              {new Date(a.updatedAt).toLocaleDateString("en", {
                month: "long",
                day: "2-digit",
                year: "numeric"
              })}
            </span>
          </div>
          {/* TODO: favorite on click */}
          <button
            class={`btn btn-sm pull-xs-right ${
              a.favorited ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            <i class="ion-heart" /> {a.favoritesCount}
          </button>
        </div>
        <stencil-route-link
          url={`/article/${a.slug}`}
          anchorClass="preview-link"
        >
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
