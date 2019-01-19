import { Component, Prop, State } from "@stencil/core";
import { MatchResults } from "@stencil/router";
import { IAPIErrors } from "../../api/utils";
import { IProfile, getProfile } from "../../api/profiles";
import { IUser } from "../../userTunnel";

@Component({
  tag: "profile-page"
})
export class ProfilePage {
  @Prop() match: MatchResults;
  @Prop() user?: IUser;

  @State() following: boolean = false;
  @State() isLoading: boolean = true;
  @State() notFound: boolean = false;
  @State() errors?: IAPIErrors;
  @State() profile?: IProfile;

  fetchProfile = async () => {
    const { username } = this.match.params;
    console.log(username);
    if (!username) {
      this.notFound = true;
      this.isLoading = false;
    }
    const token = this.user ? this.user.token : undefined;
    const articleInfo = await getProfile(username, token);
    const { success, errors, profile } = articleInfo;
    if (success) {
      this.profile = profile;
    } else {
      this.errors = errors;
    }
    this.isLoading = false;
  };

  componentDidLoad() {
    this.fetchProfile();
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

    if (this.notFound || !this.profile) {
      console.log(`roaldno`)
      return <not-found />;
    }

    const { username, image, bio, following } = this.profile;
    return (
      <main class="profile-page">
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <img src={image} class="user-img" />
                <h4>{username}</h4>
                {bio && <p>{bio}</p>}
                <button class={`btn btn-sm action-btn ${following ? 'btn-secondary' : 'btn-outline-secondary'}`}>
                  <i class="ion-plus-round" />
                  &nbsp; Follow {username}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a class="nav-link active" href="">
                      My Profiles
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="">
                      Favorited Profiles
                    </a>
                  </li>
                </ul>
              </div>

              <div class="article-preview">
                <div class="article-meta">
                  <a href="">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </a>
                  <div class="info">
                    <a href="" class="author">
                      Eric Simons
                    </a>
                    <span class="date">January 20th</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart" /> 29
                  </button>
                </div>
                <a href="" class="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div class="article-preview">
                <div class="article-meta">
                  <a href="">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                  </a>
                  <div class="info">
                    <a href="" class="author">
                      Albert Pai
                    </a>
                    <span class="date">January 20th</span>
                  </div>
                  <button class="btn btn-outline-primary btn-sm pull-xs-right">
                    <i class="ion-heart" /> 32
                  </button>
                </div>
                <a href="" class="preview-link">
                  <h1>
                    The song you won't ever stop singing. No matter how hard you
                    try.
                  </h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                  <ul class="tag-list">
                    <li class="tag-default tag-pill tag-outline">Music</li>
                    <li class="tag-default tag-pill tag-outline">Song</li>
                  </ul>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
