# 🛠️ Project Setup

_**In order to get the app running with the expected behaviour you'll need these:**_

## 🟢 Node 20.11.0 *(LTS)*
You can use the node binary from the official package or a node package manager (such as [NVM](https://github.com/nvm-sh/nvm), [FNM](https://github.com/Schniz/fnm), [N](https://github.com/tj/n))

## 🐱 PNPM

With Node LTS Installed, you can enable corepack...

```shell
corepack enable
```

...then install the dependencies with pnpm

```shell
pnpm install
```

---
## ⚡ Development Server

You can start the dev server by using...

```shell
pnpm dev
```
---

## 📈 Build

You can use this to build into the production version of the app...

```shell
pnpm build
```

---

# 🧠 Proccess

- First I decided to go to start working on the primitives of UI, so style config and primitive components.

- Then I started thinking about how I was going to build the calendar system, and after a quick prototype I had an idea, I came up with what I call "virtual month", where the "intersectional" weeks between months doesn't exist, so we only have weeks that are fully inside the month. This way we can have a more consistent and predictable UI and UX since we have a per-week pagination.

- I kept focusing on working little by little on the components trying to make them as composable as possible, so I could reuse them in other parts of the app too.
---

# 🏗️ Architecture
- I used a really standard and simple way of building the app.

- For UI controls and other states I leveraged Vue's native reactivity system since I didn't really need a state system (yet).

- As I explained before, a key to this project is the "virtual month" system. Here's a quick explanation of how it works:
  - "Virtual weeks" are weeks that doesn't have days from other months, so they are fully inside the month.
  - If you're seeing the first week of the month on the screen, the first day displayed isn't necessarily Monday, it's the first day of the week that has days from the month.
  - In some weeks you'll see from 1 to to 7 calendar tiles displayed, depending on the days that are within the month, it's never consistent.

- Folder Structure:
    - 'common': Constants and 'domain types'
    - 'components':
        - 'ui': All the UI primitives that are reusable and composable. No business logic here.
        - 'common': Components that often might include business logic or wrappers for UI components.
    - 'composables': All the composable functions used in the app, nothing much.
    - 'services': Layer that communicates with external sources.
    - 'utils': Utility functions that are used in the app.

---
# 📝 Next Steps
- Definetly I would start by writing tests, specially since it's an app that can easily break it's really important to have t hem. I'd start by writing tests for the calendar system with Vitest and also e2e tests with Cypress.

- Also I would definetly focus on performance and optimization, since it has a few flaws that are noticeable and can be improved. It's really important for the UX and also can affect the DX if not taken care of.

- Collaborate with others and hear feedback so I can have other perspective on how to approach the problems and solutions.
---
# 💭 Final Thoughts

This was really challenging considering the little time I had and never having built a calendar system before. I got stuck a few times fixing bugs, I had to rethink and refactor too but at the end I found a way to make it work with my own approach.

I'm looking forward to hear feedback and improve it even more :D