<p align="center"><a href="https://github.com/MansaGroup/kanedama" target="blank"><img src="./.github/assets/logo.png" width="80" alt="Mansa's Logo" /></a></p>
<h1 align="center">Mansa's Kanedama</h1>
<p align="center">Take home test to <b>join us</b> 💜</p>


My version of Mansa's frontend test :)


# Preface: the project scope

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



# Marc Monchablon's design document

## Directory structure

# TODO
I hesitated between 

Another, alternative structure that I would use in a real-word project
would be more module-centric:

 - package.json
 - ...
 - modules
   - user
     - api
     - components
 - pages
   - ...
 


# Addendum

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


