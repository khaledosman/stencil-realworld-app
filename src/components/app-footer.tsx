import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
})
export class Footer {
  render() {
    return (
      <footer>
        <div class="container">
          <stencil-route-link url="/" anchorClass="logo-font">
            conduit
          </stencil-route-link>
          <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    );
  }
}
