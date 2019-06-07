import { Component, State, h, Prop } from '@stencil/core';
import { getTags } from '../../api/tags';

@Component({
  tag: 'home-tags',
})
export class HomeTags {
  @Prop() setTag: (tag: string) => void;

  @State() tags: string[] = [];

  listTags = async () => {
    const tagList = await getTags();
    const { success, tags } = tagList;
    if (success) {
      this.tags = tags;
    }
  };

  handleClick = e => {
    const name = e.target.getAttribute('data-tag-id');
    if (name) {
      this.setTag(name);
    }
  };

  componentDidLoad() {
    this.listTags();
  }

  render() {
    if (this.tags.length === 0) {
      return <div class="sidebar" />;
    }

    return (
      <div class="sidebar">
        <p>Popular Tags</p>

        <div class="tag-list">
          {this.tags.map(t => (
            <button
              type="button"
              class="tag-pill tag-default"
              data-tag-id={t}
              onClick={this.handleClick}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
