import { Component, State, Prop } from "@stencil/core";
import { IUser } from "../../userTunnel";
import { createComment, IComment } from "../../api/comments";
import { IAPIErrors } from "../../api/utils";

@Component({
  tag: "comment-form"
})
export class CommentForm {
  @Prop() user: IUser;
  @Prop() slug: string;
  @Prop() addComment: (comment: IComment) => void;

  @State() body: string = "";
  @State() disabled: boolean = false;
  @State() errors: IAPIErrors;

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.user) {
      return;
    }

    this.disabled = true;
    const commentInfo = await createComment(
      this.slug,
      this.body,
      this.user.token
    );
    const { comment, errors, success } = commentInfo;
    if (success) {
      this.body = "";
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
    // TODO: error-handling
    if (this.errors) {
      return <code>{JSON.stringify(this.errors)}</code>;
    }

    if (!this.user) {
      <p>
        Please <stencil-route-link url="/login">sign in</stencil-route-link> or{" "}
        <stencil-route-link url="/register">register</stencil-route-link> to
        comment.
      </p>;
    }

    return (
      <form class="card comment-form" onSubmit={this.handleSubmit}>
        <fieldset disabled={this.disabled}>
          <div class="card-block">
            <textarea
              class="form-control"
              placeholder="Write a comment..."
              rows={3}
              value={this.body}
              onInput={this.handleChange}
              required={true}
            />
          </div>
          <div class="card-footer">
            <img
              src={this.user.image}
              class="comment-author-img"
            />
            <button class="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}
