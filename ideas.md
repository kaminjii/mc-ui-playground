# UI and Mastercard

## 📜 Evolution of React: Major Eras

### 🧪 1. The Experimental Era (2013–2014)

> _"A new way of thinking about UIs"_

**Key Themes:**

- React open-sourced by Facebook in 2013.
- Introduction of JSX, the virtual DOM, and component-based architecture.
- Heavy reliance on class components.
- Community skepticism toward JSX and "HTML in JavaScript".

**Milestone:** First release of React; early traction in the dev community.

---

### 🏗 2. The Structural Era (2015–2017)

> _"Organizing large-scale apps"_

**Key Themes:**

- **React Native (2015)** enabled cross-platform mobile development.
- Growth of **Redux** for global state management.
- Patterns like **higher-order components (HOCs)** and **render props** became common.
- Tooling improved with **Create React App (CRA)** for scaffolding apps.

**Milestone:** React adopted widely in production and mobile development.

---

### ⚙️ 3. The Hooks Era (2018–2020)

> _"Goodbye classes, hello functions"_

**Key Themes:**

- React 16.8 (2019) introduced **Hooks** (`useState`, `useEffect`, etc.).
- Shift from class to **function components**.
- Simpler and more concise code structure.
- State and side effects managed in a unified way.

**Milestone:** Functional components became the norm; Hooks adoption soared.

---

### 🚀 4. The Concurrent Era (2020–2022)

> _"Performance, scheduling, and async rendering"_

**Key Themes:**

- Introduction of **Concurrent Mode** and **Suspense** (experimental).
- Growth of **React Query**, **SWR**, and **Recoil** for state/data fetching.
- Focus on performance: **lazy loading**, **code-splitting**, and streaming.
- Meta-frameworks like **Next.js** and **Remix** rose in popularity.

**Milestone:** React evolved to support large-scale, performant, async apps.

---

### 🌐 5. The Full-Stack & Server Components Era (2023–Now)

> _"React is more than a client-side view library"_

**Key Themes:**

- **React 19** (2024) shipped **Server Components (RSC)**.
- Deep integration with **Next.js App Router** for full-stack rendering.
- Continued shift toward **hybrid server/client components**.
- State management leans on **context**, **React Query**, **server-side caching**.
- Early versions of **React Compiler** and **React Forget** (experimental) released.

**Milestone:** React matures as a full-stack framework with server-first capabilities.

---

### 🔮 (Emerging) 6. The Compiler-Optimized Era (Coming Soon)

> _"Let the compiler handle the hard parts"_

**What's Coming:**

- **React Compiler** to optimize hook usage and reduce boilerplate.
- **React Forget** to eliminate the need for `useMemo`, `useCallback`, etc.
- Tighter integration with **modern bundlers** like **Turbopack**, **Vite**, and **Bun**.
- Focus on **zero-config**, faster build times, and leaner apps.

**Milestone:** React continues to abstract away manual performance tuning.

here include a demo of major react ideas and nonos like propdrilling vs context api, how to avoid unnecessary renders. lazy imports or lazy loads, caching those kinds of things. if you can include interactive demos of this.

## Yarn vs NPM vs PNPM

## vite vs cra vs next vs other things

summarize what these are and why we use them. cra was sunsetted - say why, say why vite is a good option.

we had an issue with @connect/typography package component because of a static font file .woff2

- explain why vitest was having issues with this but jest in cra doesnt.
- explain how we can use mocks to get around this as a temporary solution

## SPA vs MPA

## Major UI CSS Concepts

### Flex

Discuss major flex classes like align/justify items/content, and stretch and shrink, and wrap and gap

add and interactive demo where the user and dynamically change the number of items in a container and the containers flex properties. show the main axis and cross axis in a way that will help a non-ui developer understand flex more easily. i want the elements to be difference sizes so that the user can see how the alignment will affect the items.

### spacing

discuss the difference between padding and margin and gap. give an interactive demo that looks like the margin and padding on the browser developer tools.

### em vs px vs rem

discuss what is em vs px and why and when we use one over the other
discuss how this differs between font size and spacing sizes. include an interactive demo that will show a conversion from px to em with a visual aid to show what this is will look like relatively

## svg vs img

say when and where we prefer each. in mastercard MADE storybook there is an icon lib. you can click the download button on your desired icon which will open the .svg file in the browser. you can inspect it and then copy the svg and path info. you can add <title> to make it accessible to screen readers.

## Mastercard MADE

MADE standard for mastercard adaptive design ecosystem. Made has design tokens and classes that can be used for styling.

tokens with made-u- are utility classes. common ones youll see will be made-u-display-flex or made-u-padding-4-x. in a div you will put these under the styles={{}} section like : {example here}.

they also have component classes which are like a bunch of bundled util classes that include hover and focus states. this will be like made-c- and an example is made-c-primary-button. for a button youll use made-c-primary-button and youll get an orange primary button. if you want dark you have to use both made-c-primary-button to get the button styles, and the ALSO use made-c-primary-button-on-dark to get the dark variant. you cannot use made-c-primary-button-on-dark by itself. these will go in the 'classname'. one criticism of this is that it causes long classnames.

made also has a UI Kit called the Connect UI Kit. this is a component library where you can implement fully fuctional and styled components. the benefit is that it saves a lot of time implementing components and keeps us up to date with mastercard's latest design standards. however, there are limitations because these components are not fully customizable and we are limited to restrictions they place. for example, the @connect/toast limits toast messages to 2 lines of text. this is a hard restriction that we on our own cannot modify.

Made and connect have many resources included the Figmas for designers
links here:

and storybooks for devs
links here:

#### how can we go about contributing to these

1. create an aha ticket
2. get your ticket prioritized
3. follow docs to create/open PR

- forks the repo
- make changes
- run tests (removing any local installation of cypress and using the connect ui kit script 'npm run cypress:pipeline - all scripts found in package.json)
- upgrade version and changelog
- upgrade any other package that uses the pack you modified as a dependency

a challenge of this is that there are many components in connect ui kit that depend on others. mastercard prevents added commits from others into your forked repo - making resolving merge conflicts annoying.
