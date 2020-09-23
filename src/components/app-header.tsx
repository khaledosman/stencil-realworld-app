import { Component, h, Prop } from '@stencil/core';
import { TSignOut, IUser } from '../api/auth';

@Component({
  tag: 'app-header',
})
export class Header {
  @Prop() user?: IUser;
  @Prop() signOut: TSignOut;

  render() {
    const { user } = this;
    return (
      <nav class="navbar navbar-light">
        <div class="container">
          <stencil-route-link class="navbar-brand" url="/">
            conduit
          </stencil-route-link>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <stencil-route-link anchorClass="nav-link" url="/" activeClass="active" exact={true}>
                Home
              </stencil-route-link>
            </li>
            {this.user
              ? [
                  <li class="nav-item">
                    <stencil-route-link anchorClass="nav-link" url="/editor">
                      <ion-icon name="compose"></ion-icon>
                      &nbsp;New Post
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <stencil-route-link anchorClass="nav-link" url="/settings">
                      <ion-icon name="gear-a"></ion-icon>
                      &nbsp;Settings
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <stencil-route-link anchorClass="nav-link" url={`/profile/${this.user.username}`}>
                      {user.image && <img class="user-pic" src={user.image} alt="user profile image" />}
                      {user.username}
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <button class="nav-link" onClick={this.signOut}>
                      Sign out
                    </button>
                  </li>,
                ]
              : [
                  <li class="nav-item">
                    <stencil-route-link anchorClass="nav-link" url="/login" activeClass="active">
                      Sign in
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <stencil-route-link anchorClass="nav-link" url="/register" activeClass="active">
                      Sign up
                    </stencil-route-link>
                  </li>,
                ]}
          </ul>
        </div>
      </nav>
    );
  }
}
