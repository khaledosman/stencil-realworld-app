import { Component, h, Prop } from '@stencil/core';
import { IAPIErrors } from '../api/utils';

@Component({
  tag: 'error-display',
})
export class ErrorDisplay {
  @Prop() errors?: IAPIErrors;

  render() {
    if (!this.errors) {
      return null;
    }

    return (
      <ul class="error-messages">
        {Object.keys(this.errors).map(k =>
          this.errors[k].map(e => (
            <li>
              {k} {e}
            </li>
          ))
        )}
      </ul>
    );
  }
}
