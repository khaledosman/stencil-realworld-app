import { Component, h } from '@stencil/core';

// If I wanted to isolate the CSS applied to this component from the rest of
// the stylesheet, I could use `shadow: true` in the @Component options ;)
// Learn more: https://stenciljs.com/docs/styling
@Component({
  tag: 'loading-spinner',
  styleUrl: 'loading-spinner.css',
})
export class LoadingSpinner {
  render() {
    return <div class="loader" />;
  }
}
