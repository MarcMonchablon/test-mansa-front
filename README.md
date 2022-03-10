<p align="center"><a href="https://github.com/MansaGroup/kanedama" target="blank"><img src="./.github/assets/logo.png" width="80" alt="Mansa's Logo" /></a></p>
<h1 align="center">Mansa's Kanedama</h1>
<p align="center">Take home test to <b>join us</b> 💜</p>


My version of Mansa's frontend test :)

It can be seen live at https://test-mansa-front.stupid-domain-name.com/

(it's a silly domain I use to host small projects of mine)


# Quick reminder:

```
# Install dependencies
npm ci --workspace=frontend

# Launch Storybook
# (not a reminder, but nifty tool nonetheless)
npm run storybook --workspace=frontend

# Run it
npm run dev --workspace=frontend

# Test it
npm run test --workspace=frontend

# Build & start it
cd frontend/
npm run build
PORT=3000 npm run start
```

# Design notes

## Project scope

One of the first requirement was: "The view should only be for **one** single user."

At first I though it meant that the view is user-specific,
and thus should be routed as `/user/:userId`, implying that there may
be other users;

But on second tought, I interpreted that as "There is no need to handle multiple-users",
which would also make sense if the user is attached to a logged-in session,
and we are emulating something like a `/account` or `/user-settings` page.

For this short demo, I choose the later option,
with the logged-in session logic being (crudely) emulated
via Next.js `getServerSideProps()`.


## Directory structure

The directory structure here is mostly flat, to keep it simple,
so expected for those in  /pages expected by Next.js,
all components are in the `components/` folder,
Usually in their own directory, (but related components can be put in the same folder),
with its `test` and `stories` files.

In real-word project, more prone to evolution,
I would have put most of the current files in a `modules/user/` folder,
with its own `components/`, `services/` and `hooks/` folders;
Keeping shared elements in a top-level `components/` and `services/` folders.

I kept a `models/` folder for shared models, but usually I like to keep most
data models in the related service by default, and only move them in standalone file
when used in enough place, or when the model get big enough.


## File nomenclatures

A component Foobar will have the following file structure:
```
components/
  Foobar/
    Foobar.component.tsx
    Foobar.component.test.tsx
    Foobar.component.story.tsx
```

In the same vein, services will be suffixed by `.service`,
Typescript models will be suffixed by `.model`,
and hooks will be suffixed by `.hook`.

While it's certainly a bit redundant to have
 - `components/Gizmo/Gizmo.component.tsx`,
 - `components/Gizmo/Gizmo.component.test.tsx`,
 - `services/gizmo.service.ts`,
 - `services/gizmo.service.test.ts`,
 - `hooks/useGizmo.hook.ts`

the upside of having a more convenient fuzzy search in project's file
outweighted the cons.


### Example workflow

I'm working on the `Gizmo.component.tsx` file, if I want to open Gizmo-related files,

it makes sense to first do a project-wide file search for gizmo-related files, and then specify the file type.

 - `gizserv` will open `service/gizmo.service.ts`,
 - `gizhook` with open `hooks/useGizmo.hook.ts`,
 - `gizcomtes` will open `components/Gizmo/Gizmo.component.test.tsx`.


## CSS

Most of the CSS is in the `styles/` folder,
as told in the "CSS architecture" addendum, I felt that a classic CSS approach
would be cleaner.

I did not use CSS modules here, since there's not a lot of CSS
to be done.

As for `styled-components`, I used it only for the 'UserInitialsBadge' component,
which is the kind of use-case I felt would be the most appropriate,
with a JS-defined background color (and possibly the text-color).


## Storybook

On top of the unit tests, (and two meagers E2E tests with `Cypress`),
I took the liberty to add [Storybook](https://storybook.js.org/), which help
building a cohesive UI components library.

I've seen it in action, and really liked the idea,
but I have to confess that I used this project as ginea pig.

So far I liked it a lot! It allows for playing with components in a visual manner,
and while it feels a bit 'slow' this should have no impact on user-facing performances.


# Addendum

## About hooks and services

At first, I wanted to move the custom hooks in `company.service.ts` and `accounts.service.ts`,
but this [broke tests](https://medium.com/welldone-software/jest-how-to-mock-a-function-call-inside-a-module-21c05c57a39f)
in `CompanySection` and `AccountsSection` unit tests, even though it's an implementation detail.
So either we left the hooks in their respective components, or we consider them to be shareable /
we want more separation of concerns for .component files, hence the separate .hook files.


## CSS architecture

My front-end career so far has been more Angular-oriented,
so I haven't had a lot of experience with `styled-components`,
but it has some similarity with the component-scoped CSS feature
that Angular 2+ offers.

In multiple projects I've been very happy with a mixed approach
of classic CSS and component-scoped CSS:

 - Keep most of the CSS under a `styles/` directory,
 splitted by pages, components, and the usual `reset.css`-type files.

 - Have a handful of component-scoped CSS, either because I have to
 do some layout that I know will be specific to this very component,
 or because I want to declare CSS classes that are manipulated by the
 component logic.


Having classic CSS as the default styling strategy allowed my colleagues and I:
 - to take advantage of the good sides of the CSS cascade,
 - to work with integrators even when they didn't knew the
 intricacies of the JS framework used,
 - and generally offered a nice experience when manipulating CSS in the inspector,

all of which made it in my experience a worthwhile tradeoff, even with the pain sometime cause by its unscoped nature.


About the debugging experience, I'm a bit concerned by the lack of sourcemap in `styled-components`, both now and in the forseable future, since the maintainers consider it to be low priority eye-candy.
(cf https://github.com/styled-components/styled-components/issues/827)
This alone makes me weight heavily against using `styled-components` as the default styling strategy.


With that said, the ability to have a nice way to use props in style,
and to colocate components with it's style give make it a nice tool
to use in some specific cases.



### Small issue between Next.js and styled-components

I sometime got 'React hydration error', causing unstyled components due
to the way Next.js is configured.

One fix needed to add a .babelrc conf, which unfortunately disabled the SWC, thankfully the latest (12.1.x) version of Next.js specifically included a fix for `styled-components` with SWC. It still had the issue after upgrading but
at least it's prioritized by the Next.js team :)


