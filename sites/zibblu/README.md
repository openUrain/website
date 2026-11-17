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

- The Windows stable download points to the **v0.1.5 GitHub Release EXE** and a separate **older v0.1.4 R2 installer** is labeled as such. Do not invent a v0.1.5 R2 URL until that object has been uploaded and verified.
- The logo is served from this site’s own public directory.
- Long-term ordinary history lives in local SQLite. Text delivery defaults to 72 hours. Attachment availability and automatic cleanup depend on deployment settings.
- Do not claim that **normal online conversations** are end-to-end encrypted. Private LAN chat is a distinct opt-in mode and does not fall back to the internet. Do not imply that offline devices can recover expired server content.
- The iPhone **v0.1.5 testing preview** is an **unsigned GitHub Actions IPA artifact**, not an App Store or TestFlight release; users with repository access can retrieve the artifact and sign it locally. Do not present it as a tap-to-install publicly distributed IPA. iPad-specific layout and Android remain separate future work.
- Screenshots show the real Windows client from earlier tests. The [chat and file view](https://github.com/openUrain/Zibblu/blob/v0.1.4/docs/windows-feedback/issue35/chat-files.png) and [private LAN view](https://github.com/openUrain/Zibblu/blob/v0.1.4/docs/windows-feedback/issue26-private.png) are WebP exports of existing repository assets.

## Review checklist

- Desktop and mobile widths (320, 375, 768, 1024, 1440px), no horizontal overflow or text clipping.
- Keyboard navigation, skip link, readable contrast, semantic headings and accessible links.
- `prefers-reduced-motion` and no-JS fallback.
- No page trackers or server-side form submissions.
- Canonical/OG/robots/sitemap URLs match the production hostname.
- Cloudflare Pages production and preview deployments succeed without modifying the openUrain build configuration.
