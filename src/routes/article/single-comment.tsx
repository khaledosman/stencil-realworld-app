import { Component, h, Prop } from '@stencil/core';
import { IComment, deleteComment } from '../../api/comments';
import { IUser } from '../../api/auth';

@Component({
  tag: 'single-comment',
})
export class SingleComment {
  @Prop() user: IUser;
  @Prop() comment: IComment;
  @Prop() slug: string;
  @Prop() removeComment: (id: number) => void;

  deleteComment = async () => {
    const { user, comment, slug } = this;
    if (!user || user.username !== comment.author.username || !window.confirm('Are you sure you want to delete your comment?')) {
      return;
    }

    const res = await deleteComment(slug, comment.id, user.token);
    if (res.success) {
      this.removeComment(comment.id);
    }
  };

  render() {
    const { author, body, updatedAt } = this.comment;
    const authorURL = `/profile/${author.username}`;
    return (
      <div class="card">
        <div class="card-block">
          <p class="card-text">{body}</p>
        </div>
        <div class="card-footer">
          <stencil-route-link url={authorURL} anchorClass="comment-author">
            <img class="comment-author-img" src={author.image} alt="comment author image" />
          </stencil-route-link>
          &nbsp;
          <stencil-route-link url={authorURL} anchorClass="comment-author">
            {author.username}
          </stencil-route-link>
          <span class="date-posted">Dec 29th</span>
          <span class="date-posted">
            {new Date(updatedAt).toLocaleDateString('en', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          {this.user && this.user.username === author.username && (
            <span class="mod-options">
              <button aria-label="Button to delete your comment" onClick={this.deleteComment}>
                <ion-icon name="ion-trash-a"></ion-icon>
              </button>
            </span>
          )}
        </div>
      </div>
    );
  }
}
