import { Component, Prop, h, State } from '@stencil/core';
import { IAPIErrors } from '../../api/utils';
import { updateUser, IUserUpdate, IUser } from '../../api/auth';

const inputFields = [
  { id: 'image', placeholder: 'URL of profile picture', type: 'text' },
  { id: 'username', placeholder: 'Your Name', type: 'text', required: true },
  {
    id: 'bio',
    placeholder: 'Short bio about you',
    isTextArea: true,
    type: 'text',
  },
  { id: 'email', placeholder: 'Email', type: 'email', required: true },
  { id: 'password', placeholder: 'Password', type: 'password' },
];

@Component({
  tag: 'settings-page',
})
export class SettingsPage {
  @Prop() setUser: (user: IUser) => void;
  @Prop() user: IUser;

  @State() username: string = '';
  @State() email: string = '';
  @State() bio: string = '';
  @State() image: string = '';
  @State() password: string = '';
  @State() disabled: boolean = false;
  @State() errors?: IAPIErrors;

  handleSubmit = async e => {
    e.preventDefault();
    this.disabled = true;
    const {
      username,
      email,
      image,
      bio,
      user: { token },
    } = this;
    if (!username || !email) {
      return;
    }
    const user: IUserUpdate = {
      username,
      email,
      password: this.password || undefined,
      image,
      bio,
    };
    const res = await updateUser(user, token);
    if (res.success && res.user) {
      this.setUser(res.user);
    } else {
      this.errors = res.errors;
    }
    this.disabled = false;
  };

  handleChange = e => {
    const name = e.target.getAttribute('data-settings-id');
    const value = e.target.value;
    if (name && value) {
      this[name] = value;
    }
  };

  componentDidLoad() {
    this.username = this.user.username;
    this.email = this.user.email;
    this.bio = this.user.bio;
    this.image = this.user.image;
    document.title = 'Settings - Stencil Conduit';
  }

  render() {
    return (
      <main class="settings-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>
              <error-display errors={this.errors} />
              <form onSubmit={this.handleSubmit}>
                <fieldset disabled={this.disabled}>
                  {inputFields.map(i => {
                    const props = {
                      'class': 'form-control form-control-lg',
                      'placeholder': i.placeholder,
                      'type': i.type || 'text',
                      'value': this[i.id],
                      'onInput': this.handleChange,
                      'required': i.required || false,
                      'data-settings-id': i.id,
                    };
                    return <fieldset class="form-group">{i.isTextArea ? <textarea {...props} rows={8} /> : <input {...props} />}</fieldset>;
                  })}
                  <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
