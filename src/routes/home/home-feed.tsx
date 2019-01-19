import { Component, State, Prop, Watch } from "@stencil/core";
import { getArticleList, IArticle } from "../../api/articles";
import { IUser } from "../../userTunnel";
import { IAPIErrors } from "../../api/utils";

const perPage = 10;

@Component({
  tag: "home-feed"
})
export class HomeFeed {
  @Prop() user: IUser;
  @Prop() clearTag: () => void;
  @Prop() activeTag?: string;

  @State() activeTab: "global" | "feed" | "tag" = 'global';
  @State() currentPage: number = 0;
  @State() articles: IArticle[] = [];
  @State() articlesCount: number = 0;
  @State() isLoading: boolean = true;
  @State() errors?: IAPIErrors;

  listArticles = async () => {
    const { user } = this;
    this.isLoading = true;
    const offset =
      this.currentPage > 0 ? `offset=${this.currentPage * perPage}&` : "";
    const tag =
      this.activeTag && this.activeTab === "tag"
        ? `tag=${this.activeTag}&`
        : "";
    const params = `limit=${perPage}&${offset}${tag}`;

    const articleList = await getArticleList({
      token: user && user.token,
      isFeed: this.activeTab === "feed",
      params
    });
    const { articles, articlesCount, errors, success } = articleList;
    if (success) {
      this.articles = articles;
      this.articlesCount = articlesCount;
    } else {
      this.errors = errors;
    }
    this.isLoading = false;
  };

  @Watch("activeTab")
  fetchArticles() {
    if (this.activeTab !== 'tag') {
      this.clearTag();
    }
    this.listArticles();
  }

  @Watch("activeTag")
  goToTagTab(newValue) {
    if (newValue && this.activeTab !== 'tag') {
      this.activeTab = "tag";
    } else if (newValue) {
      this.listArticles();
    }
  }

  toggleTab = e => {
    const name = e.target.getAttribute("data-tab-id");
    if (name) {
      this.activeTab = name;
    }
  };

  componentDidLoad() {
    this.listArticles();
  }

  render() {
    const { user, activeTab, activeTag } = this;
    const isLogged = user && user.token ? true : false;
    return [
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          {isLogged && (
            <li class="nav-item">
              <button
                onClick={this.toggleTab}
                data-tab-id="feed"
                class={`nav-link ${activeTab === "feed" ? "active disabled" : ""}`}
                type="button"
                aria-label="Button to toggle your personal feed"
                disabled={activeTab === 'feed'}
              >
                Your Feed
              </button>
            </li>
          )}
          <li class="nav-item">
            <button
              onClick={this.toggleTab}
              data-tab-id="global"
              class={`nav-link ${activeTab === "global" ? "active disabled" : ""}`}
              type="button"
              aria-label="Button to toggle the global feed"
              disabled={activeTab === 'global'}
            >
              Global Feed
            </button>
          </li>
          {activeTag && (
            <li class="nav-item">
              <span
                class={`nav-link ${activeTab === "tag" ? "active disabled" : ""}`}
              >
                <i class="ion-pound" /> {activeTag}
              </span>
            </li>
          )}
        </ul>
      </div>,

      this.isLoading ? (
        <loading-spinner />
      ) : (
        <article-list articles={this.articles} errors={this.errors} />
      )
    ];
  }
}
