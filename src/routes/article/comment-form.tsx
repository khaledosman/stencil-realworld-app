import { Component, h, State, Prop } from '@stencil/core';
import { createComment, IComment } from '../../api/comments';
import { IAPIErrors } from '../../api/utils';
import { IUser } from '../../api/auth';

@Component({
  tag: 'comment-form',
})
export class CommentForm {
  @Prop() user: IUser;
  @Prop() slug: string;
  @Prop() addComment: (comment: IComment) => void;

  @State() body: string = '';
  @State() disabled: boolean = false;
  @State() errors: IAPIErrors;

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.user) {
      return;
    }

    this.disabled = true;
    const commentInfo = await createComment(this.slug, this.body, this.user.token);
    const { comment, errors, success } = commentInfo;
    if (success) {
      this.body = '';
      this.addComment(comment);
    } else {
      this.errors = errors;
    }
    this.disabled = false;
  };

  handleChange = e => {
    this.body = e.target.value;
  };

  render() {
    if (this.errors) {
      return <error-display errors={this.errors} />;
    }

    if (!this.user) {
      return (
        <p>
          Please <stencil-route-link url="/login">sign in</stencil-route-link> or <stencil-route-link url="/register">register</stencil-route-link> to comment.
        </p>
      );
    }

    return (
      <form class="card comment-form" onSubmit={this.handleSubmit}>
        <fieldset disabled={this.disabled}>
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows={3} value={this.body} onInput={this.handleChange} required={true} />
          </div>
          <div class="card-footer">
            <img src={this.user.image} class="comment-author-img" alt="comment author image" />
            <button class="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}
