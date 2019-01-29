import { newE2EPage } from '@stencil/core/testing';

// The goal of this test is to fill out the login form with a mocking
// user and check if the header changes its layout to reflect the change

// HOWEVER, as it stands, testings with stencil-router is broken and therefore
// we can't render any route, only the basic layout (header and footer). Hence,
// this is a stub test, just to show how it could be done ;)
// See https://stenciljs.com/docs/testing-overview
it('successful login', async () => {
  const page = await newE2EPage({
    url: '/login',
    html: '<app-root></app-root>',
  });

  const header = await page.find('app-header');
  expect(header).toHaveClass('hydrated');
});
