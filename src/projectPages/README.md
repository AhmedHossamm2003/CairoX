# Project Landing Pages

This folder is where each project can have its **own custom landing page** that
replaces the generic `ProjectDetail` page for that project's URL.

## When to use this

Use a custom landing page for any flagship project that deserves more than the
generic detail layout — case studies, marketing sites, interactive previews, etc.

The generic page is `src/pages/ProjectDetail.tsx` and will continue to handle
every project that does **not** have a custom landing page set.

## How to add a custom landing page

**Step 1 — create your component here.**
For example, `src/projectPages/DentamizeLanding.tsx`:

```tsx
const DentamizeLanding = () => {
  return (
    <div>
      {/* Your fully custom marketing page for this project */}
    </div>
  );
};

export default DentamizeLanding;
```

**Step 2 — wire it up in `src/data/projects.ts`.**
Import your component and attach it to the project's `customLandingPage` field:

```ts
import DentamizeLanding from "../projectPages/DentamizeLanding";

export const projects: Project[] = [
  {
    slug: "dentamize",
    name: "Dentamize",
    // ...the rest of the fields stay the same
    customLandingPage: DentamizeLanding,
  },
  // ...
];
```

That's it. The router in `src/App.tsx` automatically picks up any project that
defines a `customLandingPage` and renders it at `/projects/<slug>` instead of
the generic detail page.

## Conventions

- One file per project landing page.
- Name files using `<ProjectName>Landing.tsx` (PascalCase).
- Keep these pages self-contained — they own their own hero, sections, and CTAs.
- Reuse shared components (`Button`, `SectionHeader`, etc.) where it makes sense,
  but don't be afraid to design something unique for a flagship project.
