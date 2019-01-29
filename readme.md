# ![RealWorld Example App](logo.png)

[![RealWorld Frontend](https://img.shields.io/badge/realworld-frontend-%23783578.svg)](http://realworld.io)

> ### Stencil codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

So far, I've got all the templates and proper auth in place. You can already register, log-in and change your settings.

### [Demo](https://stencil-realworld.netlify.com)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **[Stencil](https://stenciljs.com/)** including CRUD operations, authentication, routing, pagination, and more.

This not necessarily follows all the best practices for Stencil, as the community is still in its infancy... Thefore, any feedback is welcome, let's make this codebase great! Stencil is a very promising tool and this app could be the starting point for dicussing how to best build components and applications for years to come 😉

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## How it works

The whole codebase is based on Stencil, having as its single outside dependency (other than `stencil-router`), the markdown parser `marked` for the articles' pages. Stencil is built on top of the web-components standard and has a very tiny API, which is a blend of React, Angular and Vue. The whole app has been built on Typescript, as usual for this stack, and you might find your way around easier by taking a look at type definitions.

As the "Conduit" app is quite simple, there's no need for a central state management othern than the user information held in the `app-root` component. There's an example e2e test, although it can be greatly improved to provide a better example when Stencil fixes tests dependendable upon `stencil-router`.

## Getting started

```
npm install // or yarn

npm run start // or yarn start
```

Feel free to file an issue or submit a PR. If you have the time and energy to improve this codebase and keep active in its support, let me know if you want to become a contributor 😉

## Stencil, the compiler framework

If you want to learn more about Stencil and start using it, I recommend, first, taking a look at their [announcement video](https://www.youtube.com/watch?v=UfD-k7aHkQE). [The docs](https://stenciljs.com/) are still a bit incomplete, but are short and straight to the point. If you already know a modern MVC framework you can probably figure it out pretty quickly... as for Typescript, there's no express need for anything other than simple types and interfaces, [Typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) is a great guide to start. Just go for it!

## TODO

- Better testing
  - Right now, I don't see any use for unit testing;
  - End to end testing is limited due to a bug with `stencil-router`, but there are plenty of cool possibilities, which we can explore after that is solved;
  - Soon Stencil will release its screenshot visual diffing testing tool, and that could provide some other cool ways to demonstrate testing.
- Proper tag displaying in the `editor` route;
- Continuous Integration (CI) set-up.
  - Several free tools to do so, just have to spend the time and energy to do so.
- Review by the Stencil community to better align best practices
- 404 page? This is already set-up in the `not-found` component, but I don't know if it's desirable considering other RealWorld apps don't have it
