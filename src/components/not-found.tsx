import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

// This is a stub for a not-found page, in case the RealWorld
// people decide to put the effort into creating it
@Component({
  tag: 'not-found',
})
export class NotFound {
  @Prop() history: RouterHistory;

  componentWillLoad() {
    // TODO (optional): navigate without the history prop, as it shouldn't be necessary
    // Where art thou, navigate?
    this.history.push('/');
  }

  render() {
    return null;
  }
}
