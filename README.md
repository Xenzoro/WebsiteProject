# Jacob Martinez's Portfolio

This is my personal portfolio site. It's built to actually show the work, not just list it: coursework and personal projects across C++, x86-64 Assembly, Java, and web development.

## Tech stack

Vanilla HTML, CSS, and JavaScript. No framework, no build step. Bootstrap handles layout and the grid. Supabase (Postgres) is the backend for all project data and image storage. GSAP runs the animations. Prism.js does syntax highlighting on code snippets.

## How the project data works

The homepage grid is driven entirely by a Supabase table called `project-cards`. Columns:

- `title`
- `tools_used` — array of tags
- `blurb`
- `image_url`
- `sort_order`
- `long_description`
- `code_snippets` — jsonb
- `terminal_session` — jsonb
- `demo_url`

Every project also has its own detail page (`detail.html?id=`) that pulls from the same row and renders the full write-up, real code excerpts, and then either a terminal replay or a link to a live demo, depending on what that project actually has.

The tag search on the homepage isn't a hardcoded list of filter buttons. It pulls whatever tags actually exist in the data, live, so it can't drift out of sync with the projects.

## The code and terminal output are real

Code snippets and terminal output on the detail pages come straight from the actual source repos and actual program runs. None of it is invented. Where a project has a terminal section, it's labeled as captured output from a real run, not a live execution environment, since nothing on the page is actually running code.

## Cover images

Each project's cover image is a custom generated diagram matching the site's dark theme, meant to represent what the project actually does. This is mostly for the C++ and Assembly projects, since those don't have any real visual output to screenshot.

## About page

The about me page pulls from its own Supabase table (`about-me`), including a photo gallery at the bottom. Cards with more than one photo get a small carousel instead of just showing a single image.

## Mobile

The site is responsive. Mobile gets its own nav menu instead of just squeezing the desktop one down.

## Backend notes

Supabase handles both the data and the image storage. Row level security is on, with a public read-only policy. There's no public write access. Any writes to the data happen manually through Supabase directly.
