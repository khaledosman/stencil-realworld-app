import { Component, h, State } from '@stencil/core';
import '@stencil/router';

import { getUser, IUser } from './api/auth';
import { IAPIErrors } from './api/utils';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  @State() user: IUser;
  @State() errors?: IAPIErrors;

  setUser = (user: IUser) => {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  };

  signOut = () => {
    localStorage.removeItem('user');
    this.user = undefined;
  };

  getUser = async () => {
    if (!this.user || !this.user.token) {
      return;
    }
    const res = await getUser(this.user.token);
    if (res.success) {
      this.user = res.user;
      localStorage.setItem('user', JSON.stringify(res.user));
    } else {
      this.errors = res.errors;
      // When we fail to get a user, this could mean their token has expired, // so, as a guarantee, we sign them out
      this.signOut();
    }
  };

  componentWillLoad() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  // To make sure we have the user's latest info, we fetch their profile
  // when the app loads
  async componentDidLoad() {
    if (this.user && this.user.token) {
      this.getUser();
    }
  }

  render() {
    const { user } = this;
    const isLogged = user && user.id ? true : false;
    return (
      <div>
        <app-header user={user} signOut={this.signOut} />
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="home-page" exact={true} componentProps={{ user }} />
            <stencil-route url="/profile/:username" component="profile-page" exact={true} componentProps={{ user }} />
            <stencil-route url="/article/:slug" component="article-page" exact={true} componentProps={{ user }} />
            {/* Protected routes check if logged, else render 404 */}
            <stencil-route
              url="/settings"
              component={isLogged ? 'settings-page' : 'not-found'}
              exact={true}
              componentProps={{
                setUser: this.setUser,
                user,
              }}
            />
            <stencil-route url={['/editor', '/editor/:slug']} component={isLogged ? 'editor-page' : 'not-found'} exact={true} componentProps={{ user }} />
            {/* Visitor-only routes? check if logged, if so, render 404 */}
            <stencil-route url={['/login', '/register']} component={isLogged ? 'not-found' : 'auth-page'} componentProps={{ setUser: this.setUser }} exact={true} />
            {/* Catch-all 404 route */}
            <stencil-route component="not-found" />
          </stencil-route-switch>
        </stencil-router>
        <app-footer />
      </div>
    );
  }
}
