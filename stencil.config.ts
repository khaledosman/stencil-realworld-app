import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/conduit-main.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://stencil-realworld.netlify.com',
      prerenderConfig: './prerender.config.ts',
      // uncomment the following line to disable service workers in production
      // serviceWorker: null,
    },
  ],
  buildEs5: false,
  extras: {
    cssVarsShim: false,
    dynamicImportShim: false,
    safari10: false,
    scriptDataOpts: false,
    shadowDomShim: false,
  },
};
