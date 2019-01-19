import { Component, State } from "@stencil/core";
import "@stencil/router";

import AuthTunnel, { IUser } from "./userTunnel";
import {
  getUser,
} from "./api/auth";
import { IAPIErrors } from "./api/utils";

@Component({
  tag: "app-root"
})
export class AppRoot {
  @State() user: IUser;
  // TODO: typechecking errors
  @State() errors?: IAPIErrors;

  setUser = (user: IUser) => {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  };

  signOut = () => {
    localStorage.removeItem("user");
    this.user = undefined;
    // TODO: redirect to home
    // A "navigate" function would be perfect here
  };

  // TODO: get user on load
  getUser = async () => {
    if (!this.user || !this.user.token) {
      return;
    }
    const res = await getUser(this.user.token);
    if (res.success) {
      this.user = res.user;
      localStorage.setItem("user", JSON.stringify(res.user));
    } else {
      this.errors = res.errors;
      // When we fail to get a user, this could mean their token has expired, // so, as a guarantee, we sign them out
      this.signOut();
    }
  };

  // updateUser = async (newUser: IUserUpdate) => {
  //   if (!this.user || !this.user.token) {
  //     return;
  //   }
  //   const res = await updateUser(newUser, this.user.token);
  //   this.changeUserState(res, true);
  // };

  componentWillLoad() {
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  async componentDidLoad() {
    if (this.user && this.user.token) {
      this.getUser();
    }
  }

  render() {
    const isLogged = this.user && this.user.id ? true : false;
    return (
      <div>
        <app-header user={this.user} signOut={this.signOut} />
        <AuthTunnel.Provider
          state={{
            user: this.user
          }}
        >
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="home-page" exact={true} />
              <stencil-route
                url={["/profile/:userId", "/profile/:userId/favorites"]}
                component="profile-page"
                exact={true}
              />
              <stencil-route
                url="/article/:articleSlug"
                component="article-page"
                exact={true}
              />
              {/* Protected routes check if logged, else render 404 */}
              <stencil-route
                url="/settings"
                component={isLogged ? "settings-page" : "not-found"}
                exact={true}
                componentProps={{
                  setUser: this.setUser,
                  user: this.user,
                }}
              />
              <stencil-route
                url={["/editor", "/editor/:articleSlug"]}
                component={isLogged ? "editor-page" : "not-found"}
                exact={true}
              />
              {/* Visitor-only routes? check if logged, if so, render 404 */}
              <stencil-route
                url={["/login", "/register"]}
                component={isLogged ? "not-found" : "auth-page"}
                componentProps={{ setUser: this.setUser }}
                exact={true}
              />
              {/* Catch-all 404 route */}
              <stencil-route component="not-found" />
            </stencil-route-switch>
          </stencil-router>
        </AuthTunnel.Provider>
        <app-footer />
      </div>
    );
  }
}
