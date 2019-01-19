import { Component, Prop } from "@stencil/core";
import { IUser } from "../userTunnel";
import { TSignOut } from "../api/auth";

@Component({
  tag: "app-header"
})
export class Header {
  @Prop() user?: IUser;
  @Prop() signOut: TSignOut;

  render() {
    const { user } = this;
    return (
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            conduit
          </a>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <stencil-route-link
                anchorClass="nav-link"
                url="/"
                activeClass="active"
                exact={true}
              >
                Home
              </stencil-route-link>
            </li>
            {this.user
              ? [
                  <li class="nav-item">
                    <stencil-route-link anchorClass="nav-link" url="/editor">
                      <i class="ion-compose" />
                      &nbsp;New Post
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <stencil-route-link anchorClass="nav-link" url="/settings">
                      <i class="ion-gear-a" />
                      &nbsp;Settings
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <stencil-route-link
                      anchorClass="nav-link"
                      url={`/profile/${this.user.username}`}
                    >
                      {user.image && <img class="user-pic" src={user.image} />}
                      {user.username}
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <button
                      class="nav-link"
                      onClick={this.signOut}
                    >
                      Sign out
                    </button>
                  </li>,
                ]
              : [
                  <li class="nav-item">
                    <stencil-route-link
                      anchorClass="nav-link"
                      url="/login"
                      activeClass="active"
                    >
                      Sign in
                    </stencil-route-link>
                  </li>,
                  <li class="nav-item">
                    <stencil-route-link
                      anchorClass="nav-link"
                      url="/register"
                      activeClass="active"
                    >
                      Sign up
                    </stencil-route-link>
                  </li>
                ]}
          </ul>
        </div>
      </nav>
    );
  }
}
