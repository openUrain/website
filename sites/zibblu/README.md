# Zibblu product website

Static product site for **https://zibblu.openurain.com/**, deployed independently from the openUrain organization site.

## Deployment

Both sites use [openUrain/website](https://github.com/openUrain/website), but **separate Cloudflare Pages projects**:

| | openUrain organization site | Zibblu site |
| --- | --- | --- |
| Pages project | `openurain-site` | `zibblu-site` |
| Repository | `openUrain/website` | `openUrain/website` |
| Branch | `main` | `main` |
| Root directory | repository root | `sites/zibblu` |
| Build command | `npm run build` | `exit 0` |
| Output directory | `dist` | `public` |
| Domain | `openurain.com` | `zibblu.openurain.com` |

Do not alter the Zibblu API, Cloudflare Tunnel, R2 object store, or openUrain primary site deployment settings when updating this site.

To preview locally:

```sh
python -m http.server 8080 --directory public
```

## Editorial direction

The site uses a distinct **dark editorial hero → light everyday-chat story → dark private-LAN section → simple self-hosting explanation → Windows download** sequence. The Zibblu violet brand remains; nonessential card grids and unnecessary page furniture are removed.

- Product screenshots are taken from [Zibblu's canonical showcase folder](https://github.com/openUrain/Zibblu/tree/main/assets/showcase). The current static site loads them from GitHub raw URLs; review caching/asset availability before production, and consider copying optimized derivatives into `public/images/` when a binary-asset upload route is available.
- All screenshots are Owner-confirmed redacted test media. The LAN screenshot shows **device discovery**, not a completed private session.
- The public product website currently displays **Windows only**. This does not delete development support for iOS elsewhere in the repositories.
- **Windows release:** GitHub's latest published Windows Release checked 2026-11-23 was **v0.1.10**. The CTA uses the corresponding Owner-reported R2 key `zibblu/windows/v0.1.10/Zibblu_0.1.10_x64_Client_Setup.exe` and checksum path. **The R2 hostname could not be reached from this environment; verify HTTP status, size, MIME and checksum match before production merge/deploy.** The verified GitHub Release provides a visible fallback.
- Ordinary chats are server-routed and are **not end-to-end encrypted**. M2 private LAN text uses authenticated encrypted direct transport with no internet fallback; end-of-session cleanup does not promise to erase screenshots or OS traces. AI copy must match the actual released behavior, not planned issues.

## Acceptance checklist

- Desktop/mobile at 320, 375, 768, 1024, 1440px; keyboard tab order, visible focus, skip link, link purpose and no unexpected horizontal overflow.
- Reduced-motion behavior, no-JS fallback, correct screenshot labels, image aspect ratios, and no browser console errors.
- Check release download and SHA-256 against R2 directly; ensure the current version remains correct and no iOS CTA appears.
- Confirm Cloudflare Pages deploy, HTTPS, canonical, OG image, robots, sitemap and responsive assets in the actual deployed preview.
- Never describe code review or static inspection as a completed live browser/production test.
