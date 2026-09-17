# Allevor website — clean React/Vite rebuild

This rebuild preserves the content and visual direction of the original Allevor Framer site while replacing the third-party exported Framer runtime with maintainable React/Vite code and explicit SEO metadata.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Make.com form

Set the Vite environment variable before building:

```text
VITE_MAKE_WEBHOOK_URL=https://hook.us1.make.com/REPLACE_WITH_YOUR_WEBHOOK
```

Do not commit secrets. A Make webhook URL is technically public when embedded in browser code, so if the webhook needs authentication or must be kept private, use a server-side endpoint instead.

The form sends JSON fields matching the original form: `Name`, `Business`, `Email`, `Automation Request`, and `Current Process`.

## SEO included

- semantic section structure
- title and meta description
- canonical URL
- Open Graph tags
- Twitter card tags
- favicon / Apple touch icon
- robots.txt
- sitemap.xml
- JSON-LD ProfessionalService schema

## Vercel

Vercel can deploy this Vite/React project directly. Set the build command to `npm run build` and the output directory to `dist` if it is not auto-detected.
