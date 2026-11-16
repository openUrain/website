# Zibblu product website

Independent, static product website for **https://zibblu.openurain.com/**, developed alongside [openUrain/website](https://github.com/openUrain/website). Deliberately no build-time dependencies: `public/` is the complete deployable site.

## Architecture and deployment

**Keep two independent Cloudflare Pages projects.**

| | openUrain | Zibblu |
| --- | --- | --- |
| Pages project | Existing `openurain-site` | Create `zibblu-site` |
| Git repository | `openUrain/website` | `openUrain/website` |
| Production branch | `main` | `main` |
| Root directory | Repository root | `sites/zibblu` |
| Build command | `npm run build` | `exit 0` (no build required) |
| Output directory | `dist` | `public` |
| Custom domain | `openurain.com` | `zibblu.openurain.com` |

1. Merge the reviewed website PR only when the Zibblu Pages project is ready, or temporarily expect an unavailable target from the main site's Explore link.
2. In Cloudflare Dashboard → Workers & Pages, create `zibblu-site` from the **same GitHub repo** with the settings above.
3. In `zibblu-site` → Custom domains, add `zibblu.openurain.com`. Because the domain is already in Cloudflare, let Pages provision and verify the DNS record and certificate; do **not** point the subdomain to the Zibblu Online API.
4. Confirm HTTPS, assets, responsive layout, 404 behavior, robots and sitemap; check that the openUrain homepage's **Explore Zibblu** navigates to the new root in the same tab.
5. Leave `zibblu-api.openurain.com`, Cloudflare Tunnel, Win11 Docker/PostgreSQL, R2 downloads, and `openurain-site` settings untouched.

A quick local preview can run from this directory:
```sh
python -m http.server 8080 --directory public
```
Then open http://localhost:8080/. No npm install is required for the product website.

## Product copy and links

- Windows download is pinned to the **v0.1.3** public R2 URL already used on openUrain. Update the URL and release label together when a newer stable installer is approved.
- Logo comes from `https://openurain.com/brand/zibblu.png` to avoid binary duplication. If the main site assets move, move/copy the logo into this site's public directory and update links.
- Local-First server behavior follows the approved 2026-11-16 policies: temporary text 72h, published attachments 7d, incomplete uploads 24h, and local SQLite history as the long-term source.
- Do not claim that **normal online conversations** are end-to-end encrypted. Private LAN chat is a distinct opt-in mode and does not fall back to the internet. Do not imply that offline devices can recover expired server content.
- Cross-platform mobile availability is a roadmap goal, **not** a shipped download.
- The hero chat window is an **illustration**, not a real client screenshot.

## Review checklist

- Desktop and mobile widths (320, 375, 768, 1024, 1440px), no horizontal overflow or text clipping.
- Keyboard navigation, skip link, readable contrast, semantic headings and accessible links.
- `prefers-reduced-motion` and no-JS fallback.
- No page trackers or server-side form submissions.
- Canonical/OG/robots/sitemap URLs match the production hostname.
- Cloudflare Pages production and preview deployments succeed without modifying the openUrain build configuration.
