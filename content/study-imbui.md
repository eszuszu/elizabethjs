# imbui

**Front-End Framework Atomics**  
2025  
https://github.com/eszuszu/imbui

## Problem

How can I lower the complexity and boilerplate involved with spinning up a new web based software project while simultaneously learning common front-end design patterns without the reliance on the black-box of a framework?

**Why?**  
Reusability in many projects: First and foremost. It offered a domain to learn and apply contemporary front-end development concepts, design patterns, and exploration of the modern browser specification. Re-usable code modules unlock faster prototyping. No outside dependencies reduces bundle size and increases ownership and control of code. Focus on browser native API’s keeps implementation open for code author preference and feature focused.

**Why front-end?**  
The browser offers a huge playground for the implementation of all kinds of forward looking media and technology. The broad ecosystem dedicated towards the DOM is feature and semantically rich (source for npm numbers?).  Historically, browser engine oriented front-end engineering has been limited by JavaScript’s confines as an interpreted language running on a runtime engine, giving limited to no public access to low-level compute and resource allocation (source) with management primarily optimized through just-in-time compilation by the browser or runtime engine.  In 2025, the WASM and WebGPU have opened many opportunities for the research and development of novel web interfaces, technologies, and ecosystems as they enable more public access (source). Now the DOM and a web browser can be a medium for things ranging from 3D particle effects to providing progressive web apps with offline capabilities (PWA’s) using web workers. Additionally, browsers are natively integrated in most personal computing devices with vendor features guided by a widely integrated spec published by the W3C.

## Investigation & Review

* Personal study and exploration of concepts:   
* Custom Element browser APIs  
* node.js   
* TypeScript structural typing, generics  
* Vite Ecosystem  
*  Programming Design Patterns  
* MVVM \- model, view, view model  
* Context API patterns  
* signals, effects, Reactive Programming  
* CI & CD basics  
* Git Pre-hooks  
* Github workers and automations  
* Implementation

Designed a suite of reusable development tools using TypeScript for managing state and reactivity of Custom Element based web components and applications. The libraries are:  
  - `pulse`  
  - `cast`  
  - `infuse`  
  - `core`

Each library is focused on a specific stage or strategy of web component and application composition.

## Prototyping, Iteration

I began studying and exploring front-end reactive and stateful design patterns for managing the DOM. I implemented prototypes, learning and refining through the application and exploration of concepts—including dependency injection, mixins, a context API, and standard TypeScript decorators. I read documentation and programming style guides for TypeScript and other dev dependencies to better understand real considerations for production, optimization, and code maintainance., investigating concepts in educational collaboration with generative AI chat interfaces, prototyping from first principles, and developed growing intuition around developer experience concerns—informed by rolling my own small ecosystem. I engineered declarative interfaces to reduce the code verbosity and imperative aspects of authoring custom element based web components. Another primary quality of life concern was to design and promote composable code authoring workflows and loosely coupled modules. This ethos has been a strong guiding factor throughout the development of Imbui.

The prototyping process for Imbui has roughly been:

primitives \--\> mixins \--\> stateful constructs \--\> helpers,  
transformers, & parsers \--\> Web API integrations, controllers & orchestrators

Where each starts building on the rest, generally increasing in complexity.

## Tooling & Dev Dependencies

<code>
“packageManager”: “pnpm@10.14.0”  
“devDependencies”: {  
  “@eslint/js”: “^9.33.0”,  
  “@types/node”: “^22.15.2”,  
  “@vitest/coverage-v8”: “^3.2.4”,  
  “eslint”: “^9.33.0”,  
  “globals”: “^16.3.0”,  
  “husky”: “^9.1.7”,  
  “jsdom”: “^26.1.0”,  
  “lint-staged”: “^16.1.5”,  
  “typescript”: “^5.8.3”,  
  “typescript-eslint”: “^8.39.1”,  
  “vite”: “^6.3.3”,  
  “vitest”: “^3.2.4”  
},  
“engines”: {  
  “node”: “^22.11.0”  
}  
Generative AI chats
</code>

Throughout the project's lifecycle I have kept a demo development server for live prototyping using the build tool Vite to take advantage of hot module replacement (HMR). As a front-end focused toolkit, having an isolated directory to test integrations and demo code has been an important part of the pipeline. Vite’s ‘library’ mode, my current choice in tooling for building out the project for production, uses rollup and esbuild. I’ve found Vite’s ecosystem has reduced complexity around bundling and preparing modules for publishing in open registries such as npm and CDNs. As the project evolves and I learn more I’ll look into build tooling more in depth.

## ‘Dog food’ phase for documentation

In an effort to prove the libraries usefulness and gauge its current limits, documentation is being developed using imbui. This will give a meta level to the project, where developers can inspect the source code, in addition to the docs site production code, to better understand how the libraries might be used.  Completing documentation is another important step for drawing future project collaborators and informing any future testers and early users.

## Evaluation

Imbui is a solid prototyping multiplier and intuitive to develop with. It is a culmination of my broad personal investigation and general review of the front-end ecosystems in 2025—an emergent toolkit for prototyping and implementing helpful code patterns. Exposure to developer needs, CI/CD, infra, and dev ops considerations from first principles has empowered me to manage and contribute to future projects of growing scale.

The current development goals are to create and provide professional collaboration information, write, develop, and host in-depth documentation to attract interested contributors, and to author guides on how to get started using the libraries and contributing to the project. I plan to release Imbui’s current packages in alpha on package registries for initial feedback and review, sometime around December 2025 through the first quarter of 2026\.

## Future Development Goals

* Seek feedback, users, contributors.  
* Continue increasing test coverage  
* Optimizations: templating engine, imbui/cast.  
* Recalibrate: continue development, or move on 
