import { Component, Prop, h, State, Watch } from '@stencil/core';
import { IHandleUserReturn, logUser, registerUser, IUser } from '../../api/auth';
import { IAPIErrors } from '../../api/utils';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'auth-page',
})
export class AuthPage {
  @Prop() setUser: (user: IUser) => void;
  @Prop() match: MatchResults;

  @State() name: string;
  @State() email: string;
  @State() password: string;
  @State() disabled: boolean = false;
  @State() errors?: IAPIErrors;

  changeUserState = async (res: IHandleUserReturn) => {
    if (res.success && res.user) {
      this.setUser(res.user);
    } else {
      this.errors = res.errors;
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.disabled = true;
    const isRegister = this.match.url.match(/\/register/i);
    const { name, email, password } = this;

    if (!email || !password || (!name && isRegister)) {
      return;
    }

    if (isRegister) {
      const res = await registerUser({ name, email, password });
      this.changeUserState(res);
    } else {
      const res = await logUser({ email, password });
      this.changeUserState(res);
    }
    this.disabled = false;
  };

  handleChange = e => {
    const name = e.target.getAttribute('data-auth-id');
    const value = e.target.value;
    if (name && value) {
      this[name] = value;
    }
  };

  setPageTitle = () => {
    const isRegister = this.match.url.match(/\/register/i);
    document.title = `${isRegister ? 'Sign Up' : 'Sign In'} - Stencil Conduit`;
  };

  @Watch('match')
  updateTitle() {
    this.setPageTitle();
  }

  componentDidLoad() {
    this.setPageTitle();
  }

  render() {
    const isRegister = this.match.url.match(/\/register/i);
    const title = `Sign ${isRegister ? 'up' : 'in'}`;
    return (
      <main class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">{title}</h1>
              <p class="text-xs-center">
                <stencil-route-link url={isRegister ? '/login' : '/register'}>{isRegister ? 'Have an account?' : 'Need an account?'}</stencil-route-link>
              </p>

              <error-display errors={this.errors} />

              <form onSubmit={this.handleSubmit}>
                {isRegister && (
                  <fieldset class="form-group" disabled={this.disabled}>
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      value={this.name}
                      onInput={this.handleChange}
                      data-auth-id="name"
                      required={true}
                    />
                  </fieldset>
                )}
                <fieldset class="form-group" disabled={this.disabled}>
                  <input
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={this.email}
                    onInput={this.handleChange}
                    data-auth-id="email"
                    required={true}
                  />
                </fieldset>
                <fieldset class="form-group" disabled={this.disabled}>
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={this.password}
                    onInput={this.handleChange}
                    data-auth-id="password"
                    required={true}
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={this.disabled}>
                  {title}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
