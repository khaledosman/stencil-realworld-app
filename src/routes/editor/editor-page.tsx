import { Component, State, h, Prop } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import { createArticle, IArticle, getSingleArticle, updateArticle } from '../../api/articles';
import { IUser } from '../../api/auth';
import { IAPIErrors } from '../../api/utils';

const inputFields = [
  { id: 'title', placeholder: 'Article Title', required: true, large: true },
  {
    id: 'description',
    placeholder: "What's this article about",
    required: true,
  },
  {
    id: 'body',
    placeholder: 'Write your article (in markdown)',
    isTextArea: true,
    required: true,
  },
  {
    id: 'tags',
    placeholder: 'Enter tags (separated by comma)',
    required: true,
  },
];

@Component({
  tag: 'editor-page',
})
export class EditorPage {
  @Prop() user: IUser;
  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;

  @State() title: string = '';
  @State() description: string = '';
  @State() body: string = '';
  @State() tags: string = '';
  @State() disabled: boolean = false;
  @State() isLoading: boolean = false;
  @State() errors?: IAPIErrors;
  @State() article?: IArticle;

  handleChange = e => {
    const name = e.target.getAttribute('data-settings-id');
    const value = e.target.value;
    if (name && value) {
      this[name] = value;
    }
  };

  handleSubmit = async e => {
    this.disabled = true;
    e.preventDefault();
    const { user, article, title, description, body, tags } = this;
    if (!user || !title || !description || !body) {
      this.disabled = false;
      return;
    }
    const tagList = tags.split(',').map(t => t.trim());
    const newArticle = { title, description, body, tagList };

    // If we're editing a specific article, we want to use its slug to
    // update it
    const res = article
      ? await updateArticle({
          slug: article.slug,
          token: user && user.token,
          article,
        })
      : await createArticle(newArticle, user.token);
    const { success, errors } = res;
    if (success) {
      // TODO (optional): avoid unnecessary requests by including the article info
      // in the history transition
      this.history.push(`/article/${res.article.slug}`);
    } else {
      this.errors = errors;
    }
    this.disabled = false;
  };

  componentWillLoad() {
    // If the route includes a slug, we want to fetch the
    // corresponding article before anything else, hence the
    // loading state set to true
    const { slug } = this.match.params;
    if (slug) {
      this.isLoading = true;
    }
  }

  async componentDidLoad() {
    document.title = 'Editor - Stencil Conduit';
    const { slug } = this.match.params;
    if (slug && this.isLoading) {
      const res = await getSingleArticle(slug, this.user && this.user.token);
      const { success, article, errors } = res;
      if (success) {
        this.article = article;
        this.title = article.title;
        this.description = article.description;
        this.body = article.body;
        this.tags = article.tagList.join(' , ');
      } else {
        this.errors = errors;
      }
      this.isLoading = false;
    }
  }

  render() {
    if (this.isLoading) {
      return <loading-spinner />;
    }

    if (this.errors) {
      return [<h1>Something went wrong</h1>, <error-display errors={this.errors} />];
    }

    // TODO: dynamic tag-list
    return (
      <main class="editor-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={this.handleSubmit}>
                <fieldset disabled={this.disabled}>
                  {inputFields.map(i => {
                    const props = {
                      'class': `form-control ${i.large ? 'form-control-lg' : ''}`,
                      'placeholder': i.placeholder,
                      'type': 'text',
                      'value': this[i.id],
                      'onInput': this.handleChange,
                      'required': i.required || false,
                      'data-settings-id': i.id,
                    };
                    return <fieldset class="form-group">{i.isTextArea ? <textarea {...props} rows={8} /> : <input {...props} />}</fieldset>;
                  })}
                  <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
