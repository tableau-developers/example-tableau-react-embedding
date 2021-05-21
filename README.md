# Example: Tableau + React

This example illustrates how you can incorporate Tableau, using the Tableau Javascript API, into your React project.

## Overview

This example uses [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/) to serve a simple HTML page locally that contains a Tableau visualization hosted on Tableau Public. This approach works for Tableau Server and Online as well, I am using Tableau Public _only_ for convenience and because it ensures that anyone who clones this repo can successfully run the application.

## How to use this repo

The following assumes you have cloned this repository and navigated to the root of the repo on your local machine. I will also use `yarn` for all commands below but you should be able to use `npm` as well.

1. Run `yarn install` to install all dependencies
2. Run `yarn start` to start Webpack Dev Server
3. Open your browser and navigate to `http://localhost:3000`

## Under the hood

As with all development-related topics, there are a million ways to accomplish embedding Tableau inside of a React front-end. What follows is an overview of how this repo accomplishes this and why I made some of the choices that I did. By no means should you consider this the single "best" way to embed Tableau using React. That will depend on your use case, stack, etc.

### The build

Every dev has their own, personal method of building JS. A quick confession before we go any further as it will probably help understand why my build process looks and works like it does: I never learned to use `create-react-app`. I honestly don't know why, I just started out building my own Webpack and Babel config files for my React apps and have always done it that way. So, yeah, if you are accustomed to `create-react-app` things might look a little wonky to you. I would imagine that moving this to use `create-react-app` wouldn't be too hard, so feel free if that's where you're more comfortable!

I also got into writing Typescript a few years ago and I now have a hard time switching back to vanilla JS. So everything here is written in Typescript but it should mirror vanilla JS pretty closely and I've intentionally tried to avoid doing anything particularly wacky with types.

So, in summary, my build process uses a custom webpack and custom babel config to compile and bundle Typescript down to a single JS output.

### The JS API

When we think about embedding Tableau in a React project, one of our first considerations is how we will incorporate the Tableau JS API. For this example, I created a local copy of the latest API release (2.8.1 as of the writing of this) at `/src/static/js/tableau-2.8.1.min.js` and simply imported that JS lib into the top-level index for my React application (`/src/index.tsx`).

If I wanted to avoid having the API code in my transpiled bundle, I could have also imported the API directly from the HTML file at `/src/static/html/index.html`. This approach would also allow me to use the API wrapper provided by Tableau to ensure that I always have the most recent release of whatever API version I'm using.

### The non-Tableau parts of the UI

This is pretty bare bones. This example intentionally avoids too much CSS or formatting and, instead, aims to focus solely on how to get a Tableau visualization to appear within a React app.

We have a parent HTML file (`/src/static/html/index.html`) that renders the base HTML that we'll use to mount our React app. Specifically, we are mounting our React app inside of the `<div id="root">` tag.

Within React, inside of our top level file (`/src/index.tsx`), we render another div: `<div id="tableauViz">` that we will use to embed our Tableau visualization. You'll also note that we're using a combination of the `useState` and `useEffect` hooks to evaluate when the DOM is ready for the visualization to be embedded. This is important because we need to make sure that the `<div id="tableauViz">` is _actually_ present in the DOM before we pass that node to our Tableau component.

### The `<Tableau />` component

This is where most of the magic happens. The first thing to note is that our component actually returns _nothing_! Yep, check out that `return null;` line. If you're new to React, it may be a little weird to see this but it is actually legit. A React component does not need to return any UI elements at all. In our case, our component is simply invoking the Tableau Javascript API. The Javascript API itself handles all of the UI "stuff" that needs to take place.

The second important point here is that we are using a ref to instantiate the Tableau `Viz()` object. Honestly, I'm not going to claim to be an expert on refs and it's a topic that is _well_ beyond the scope of this example. But, basically, the rationale for using a ref here is because we want the viz object to act kind of like an instance variable in a class. As components up and down the dependency tree re-render, we will generally want viz to remain stable. This also allows us to pass our viz object safely up to a parent component in order to do things like setting event listeners or interacting with the viz.

### Interaction and events

This example doesn't deal with interacting with our viz or using events because, again, we're focused only on how we embed Tableau within a React project. But interaction and events are likely to be important topics if you're planning a project that embeds Tableau. As with embedding, there are many ways to accomplish this but, if you use the framework I've provided here, my suggestion would be to add an optional prop to our `<Tableau />` component that accepts a callback function where we can return the viz object after it's instantiated.

## About the author

John Hegele is a Solutions Engineer at Tableau specializing in developing around Tableau and supporting large, global services companies.

## Questions / comments

Would appreciate if you drop any issues or questions into the issues for this repo. I'll try to answer if I can, otherwise we can both hope that the broader community is able to chime in.
