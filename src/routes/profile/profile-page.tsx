import { Component, Prop, State, h, Watch } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { IAPIErrors } from '../../api/utils';
import { IProfile, getProfile, followProfile } from '../../api/profiles';
import { IUser } from '../../api/auth';

@Component({
  tag: 'profile-page',
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
    this.isLoading = true;
    const { username } = this.match.params;
    document.title = `${username}'s profile - Stencil Conduit`;
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

  followProfile = async () => {
    const { profile, user } = this;
    if (!profile || !user) {
      return;
    }
    // `profile` is the current profile image
    // We want to invert its `following` property right away while we fetch
    // the followProfile request. Only if this return errors will we revert it
    this.profile = {
      ...profile,
      following: !profile.following,
    };
    const res = await followProfile(profile.username, user.token, profile.following);
    const { success, errors } = res;
    if (!success) {
      console.error(errors);
      this.profile = profile;
    }
  };

  @Watch('match')
  getNewUser() {
    this.fetchProfile();
  }

  componentDidLoad() {
    this.fetchProfile();
  }

  render() {
    if (this.isLoading) {
      return <loading-spinner />;
    }

    if (this.errors) {
      return [<h1>Something went wrong</h1>, <error-display errors={this.errors} />];
    }

    if (this.notFound || !this.profile) {
      return <not-found />;
    }

    const { username, image, bio, following } = this.profile;
    return (
      <main class="profile-page">
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <img src={image} class="user-img" alt="user image" />
                <h4>{username}</h4>
                {bio && <p>{bio}</p>}
                {this.user && this.user.username !== username && (
                  <button class={`btn btn-sm action-btn ${following ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={this.followProfile}>
                    {!following && <ion-icon name="ion-plus-round"></ion-icon>}
                    &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <tabbed-feed class="col-md-9" user={this.user} profile={this.profile} possibleTabs={['authored', 'favorited']} isProfile={true} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}
