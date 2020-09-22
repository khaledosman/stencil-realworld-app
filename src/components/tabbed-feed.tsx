import { Component, h, State, Prop, Watch } from '@stencil/core';
import { getArticleList, IArticle } from '../api/articles';
import { IAPIErrors } from '../api/utils';
import { IUser } from '../api/auth';
import { TTabTypes } from './types';
import { IProfile } from '../api/profiles';

const perPage = 10;

const tabLabels = {
  global: 'Global Feed',
  feed: 'Your Feed',
  authored: 'My Articles',
  favorited: 'Favorited Articles',
};

@Component({
  tag: 'tabbed-feed',
})
export class TabbedFeed {
  @Prop() possibleTabs: TTabTypes[] = ['global'];
  @Prop() user?: IUser;
  @Prop() profile?: IProfile;
  @Prop() clearTag?: () => void;
  @Prop() activeTag?: string;
  @Prop() isProfile?: boolean;

  @State() activeTab?: TTabTypes;
  @State() currentPage: number = 0;
  @State() articles: IArticle[] = [];
  @State() articlesCount: number = 0;
  @State() isLoading: boolean = true;
  @State() errors?: IAPIErrors;

  listArticles = async () => {
    const { user } = this;
    this.isLoading = true;
    const offset = this.currentPage > 0 ? `offset=${this.currentPage * perPage}&` : '';
    const tag = this.activeTag && this.activeTab === 'tag' ? `tag=${this.activeTag}&` : '';
    const author = this.activeTab === 'authored' && this.profile ? `author=${this.profile.username}&` : '';
    const favorited = this.activeTab === 'favorited' && this.profile ? `favorited=${this.profile.username}&` : '';
    const params = `limit=${perPage}&${offset}${tag}${author}${favorited}`;

    const articleList = await getArticleList({
      token: user && user.token,
      isFeed: this.activeTab === 'feed',
      params,
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

  @Watch('activeTab')
  fetchArticles() {
    if (this.activeTab !== 'tag') {
      this.clearTag && this.clearTag();
    }
    this.listArticles();
  }

  @Watch('activeTag')
  goToTagTab(newValue) {
    if (newValue && this.activeTab !== 'tag') {
      this.activeTab = 'tag';
    } else if (newValue) {
      this.listArticles();
    }
  }

  toggleTab = e => {
    const name = e.target.getAttribute('data-tab-id');
    if (name) {
      this.activeTab = name;
    }
  };

  goToPage = e => {
    const num = e.target.getAttribute('data-page-num');
    if (num) {
      this.currentPage = parseInt(num);
      this.fetchArticles();
    }
  };

  componentWillLoad() {
    this.activeTab = this.possibleTabs[0];
  }

  componentDidLoad() {
    this.listArticles();
  }

  render() {
    const { activeTab, activeTag } = this;
    const wrapperClass = this.isProfile ? 'articles-toggle' : 'feed-toggle';
    const count = this.articlesCount || 0;
    const pagesArray = Array(Math.ceil(this.articlesCount / perPage)).fill(1);
    return [
      <div class={wrapperClass}>
        <ul class="nav nav-pills outline-active">
          {this.possibleTabs.map(t => (
            <li class="nav-item">
              <button
                onClick={this.toggleTab}
                data-tab-id={t}
                class={`nav-link ${activeTab === t ? 'active disabled' : ''}`}
                type="button"
                aria-label={`Button to toggle your ${t} feed`}
                disabled={activeTab === t}
              >
                {tabLabels[t]}
              </button>
            </li>
          ))}
          {activeTag && (
            <li class="nav-item">
              <span class={`nav-link ${activeTab === 'tag' ? 'active disabled' : ''}`}>
                <ion-icon name="ion-pound"></ion-icon> {activeTag}
              </span>
            </li>
          )}
        </ul>
      </div>,

      this.isLoading ? (
        <loading-spinner />
      ) : (
        [
          <article-list listedArticles={this.articles} errors={this.errors} user={this.user} />,
          count > perPage && (
            <ul class="pagination">
              {pagesArray.map((p, i) => (
                <li
                  // The `p` below is, unfortunately, only to escape typescript's
                  // compiler, else it'll say `p` is declared but never used
                  class={`page-item ${i === this.currentPage && p ? 'active' : ''}`}
                >
                  <button class="page-link" onClick={this.goToPage} data-page-num={i}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          ),
        ]
      ),
    ];
  }
}
