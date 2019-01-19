import { Component } from "@stencil/core";

@Component({
  tag: "home-page"
})
export class HomePage {
  render() {
    return (
      <main class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div class="container page">
          <div class="row">
            <home-feed class="col-md-9" />
            <home-tags class="col-md-3" />
          </div>
        </div>
      </main>
    );
  }
}
