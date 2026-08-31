# SEO and AI Discovery Audit — Dillanmilo.com

## Audit details

- Date: August 31, 2026, America/Chicago.
- Mode: full audit with strictly nonvisual local implementation.
- Repository: `/Users/dillanmilosevich/Desktop/IDE/dillan2.0`, branch `main`.
- Production: https://www.dillanmilo.com/ (read-only checks).
- Evidence: project workflow, growth profile, previous audits, tracked source and Git history, baseline and post-change production builds, generated HTML/JSON-LD/assets, live HTTP responses, and a loopback browser preview at desktop and mobile sizes.
- Limits: no current Search Console, Bing Webmaster Tools, GA4 reports, field Core Web Vitals, provider crawler logs, or authenticated CDN/WAF configuration inspected. No ranking, indexing, citation, traffic, or conversion impact is claimed. No form was submitted, CAPTCHA solved, URL submitted, or external setting changed.
- Working-tree preservation: the existing untracked `docs/search-optimization-review-2026-08-11 2.md` and `tradingview/` were left untouched.
- Current Google, OpenAI, Perplexity and Schema.org guidance was read on this date. The Bing help URL returned no usable guidance; no Bing-specific policy change was made.

## Executive summary

**Verdict: strong technical foundation; no observed P0/P1 failure on the sampled live routes.** The live homepage has complete prerendered content, a consistent canonical, parseable schema, and working discovery files. The only implemented site change corrects homepage `dateModified` and sitemap `lastmod` to August 23, the verified latest meaningful content edit; it does not manufacture August 31 freshness. `llms.txt` was already synchronized and needed no edit.

The main remaining concerns are unsubstantiated outcome claims, incomplete visitor-readable geographic context, an unresolved person/studio schema relationship, and a stale compressed build artifact. Production gzip negotiation returned complete HTML, so the compressed artifact is a latent portability risk, not an observed live rendering failure. Any content, component, loading, policy, or production change remains withheld. The final homepage body is byte-identical to both the pre-change build and live HTML.

## Scorecard

Scores describe inspected evidence, not predicted search performance.

| Category | Score | Confidence | Evidence |
|---|---:|---|---|
| Crawlability and indexability | 4/5 | High | Sampled live 200/308/404 responses, open robots and canonical sitemap; actual indexing unmeasured. |
| Rendering and initial HTML | 4/5 | High | Full ordinary and gzip live HTML; unused compressed build copy lacks prerendered content. |
| Metadata and canonicalization | 5/5 | High | Unique homepage/privacy metadata, consistent canonical URLs, corrected local dates. |
| Architecture and semantics | 4/5 | High | Crawlable links and one H1 per page; homepage main landmark covers only the hero. |
| Structured data and entity clarity | 3/5 | High | Content-backed services/projects; deprecated service type and person/studio relationship need review. |
| Content and answer readiness | 3/5 | Medium | Clear services and portfolio; geographic visibility, process and scope details are limited. |
| Trust and evidence | 3/5 | Medium | Named identity, studio, profiles, contact and privacy; outcome substantiation not observed. |
| AI crawler/discovery readiness | 4/5 | Medium | Open robots and successful test UAs; real provider-IP access and training-policy intent unverified. |
| Performance and accessibility | N/A | — | Desktop/mobile smoke and static checks only; no field or lab performance rating. |
| Measurement | N/A | — | Instrumentation inspected; current account data and delivery not tested. |

## Findings and disposition

| ID | Priority | Finding and evidence | Impact and disposition |
|---|---|---|---|
| DM-009 | P3, fixed locally | `vite.config.ts:169` and `public/sitemap.xml:6` said August 21, but commit `a8b1bb583b66585fa5e4e9e241ed18a5c4074620` changed mobile-app service capability and A5 Rail copy on August 23 at 19:25 UTC. | Corrected both to `2026-08-23`. Live still reports August 21 because nothing was deployed. |
| DM-010 | P2, withheld | `build:client` compresses HTML before `scripts/prerender.mjs` replaces the plain file. Final plain HTML is 71,850 bytes with one H1; decompressed `dist/index.html.gz` is 13,989 bytes with empty root and no H1. | A host that uses the sidecar could serve an app shell. Actual live gzip response contains full HTML. Compression-order changes could alter loading behavior and are outside this run. |
| DM-011 | P2, withheld | No supporting evidence artifact observed for enterprise reach, real-client use, direct bookings, appointment readiness, client/speaking outcomes, and savings language in `src/content/siteData.ts` and `src/components/home.tsx`. | Evidence absence is not proof of falsehood. Confirm claims before expanding them; any copy revision requires approval. |
| DM-012 | P2, withheld | Full service areas exist in the business brief, metadata, schema and `llms.txt`, but not visitor-readable page copy. Only The Woodlands appears in body geography, within the screen-reader-only H1. | Prior audit wording overstated visible geographic clarity. Adding geographic text would change visible copy/layout. No location pages or hidden SEO text were added. |
| DM-013 | P3, withheld | JSON-LD uses the personally named `ProfessionalService` entity while the visible studio link names Creative Currents. Schema.org explicitly marks `ProfessionalService` deprecated. | Resolve person, studio and service identity before migrating the graph. No invented business identity, address, legal name, or profile association. |
| DM-014 | P3, withheld | Wildcard robots permission permits training crawlers as well as search crawlers; no explicit owner training-policy decision is documented. | Preserve current permissions. Search visibility does not itself authorize a training-policy change. |
| DM-015 | P3, withheld | `src/components/home.tsx:53` contains the only main landmark, excluding the subsequent info/work/contact regions. | A full-page landmark could help assistive navigation but requires DOM/component approval. No layout or semantics were changed. |

## Technical and live checks

Read-only HTTP sampling on August 31:

| URL/surface | Observed response |
|---|---|
| `https://www.dillanmilo.com/` | 200, `text/html; charset=utf-8`, full prerendered body. |
| `/privacy.html` | 200, HTML, self-canonical. |
| `/robots.txt` | 200, plain text; byte-identical to local source. |
| `/sitemap.xml` | 200, XML; homepage and privacy only. |
| `/llms.txt` | 200, plain text; byte-identical to local source. |
| `/og-image.png` | 200, `image/png`; 1200×630 asset verified locally. |
| `/googlef00330ae270640c3.html` | 200, byte-identical to the verification file; this alone does not prove current account ownership. |
| `/seo-audit-missing-20260831` | Real 404, plain-text host response. |
| `https://dillanmilo.com/` | 308 directly to HTTPS www homepage. |
| `http://www.dillanmilo.com/` | 308 directly to HTTPS www homepage. |
| `http://dillanmilo.com/` | 308 to HTTPS apex, then the verified 308 to HTTPS www. |
| `/index.html` and `/?utm_source=chatgpt.com` | 200, canonical points to homepage. |
| `/privacy.html/` | 200, canonical points to `/privacy.html`. |
| Homepage with gzip request | 200 with `Content-Encoding: gzip`; decoded bytes identical to ordinary live homepage. |
| Homepage with `OAI-SearchBot` and `PerplexityBot` UAs | 200, bytes identical to ordinary live homepage. These are UA probes, not requests from authenticated provider IPs. |

Observed homepage headers include HSTS, CSP, `nosniff`, frame denial and referrer policy, without an `X-Robots-Tag: noindex`. Source and generated metadata are index/follow. Redirects, canonical annotations and sitemap routes are coherent. Existing duplicate URL variants consolidate by canonical; no redirect or navigation changes were justified within this boundary.

The loopback Vite preview returned 200 for homepage/privacy/robots/sitemap/llms with appropriate HTML/text/XML content types. Its SPA fallback also returns the homepage with 200 for a missing path; this is a preview limitation, not the production behavior observed above. It does not emulate all Vercel headers or edge routing.

## Content, schema and AI discovery

The initial HTML contains four service descriptions, seven portfolio entries, contact options, social links and the privacy link. Each service and project name/description in JSON-LD occurs in body HTML. Each page has one H1, one title, one description, one canonical and `lang="en"`; no duplicate IDs or broken local references were found.

The homepage graph has nine top-level entities: Person, WebSite, WebPage, ProfessionalService, four Services and ItemList. Project items include CreativeWork and SoftwareApplication. JSON parsing and content parity pass; no external Rich Results Test submission was made. This is not a claim that every entity qualifies for a Google rich result. In particular, do not invent prices or ratings to satisfy software-app rich-result requirements. The earlier audit statement that no LocalBusiness markup exists was imprecise: ProfessionalService is a LocalBusiness subtype. Its deprecation and identity migration need explicit review. See [Schema.org ProfessionalService](https://schema.org/ProfessionalService), [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), and [software-app requirements](https://developers.google.com/search/docs/appearance/structured-data/software-app).

`llms.txt` already includes The Forge Session, the mobile-app capability and current A5 positioning. It remains an optional factual index, not an access control or ranking mechanism. Google states that special AI files and special schema are unnecessary for its generative search features. No AI-only markup, query-variant pages, FAQ/review/rating markup, or speculative business facts were added. [Google AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

Robots explicitly allows OAI-SearchBot and PerplexityBot, plus a wildcard allow. OpenAI documents search access separately from GPTBot training controls; Perplexity documents search and user-triggered fetchers separately and notes possible WAF restrictions. Current robots was left unchanged. [OpenAI publisher guidance](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq), [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

## Performance, media, accessibility and measurement

- Browser smoke: desktop 1280×720 and mobile 390×844 screenshots inspected; no horizontal document overflow at either size. Navigation to contact, opening/dismissing the form and opening privacy worked. No browser error/warning logs were recorded in these checks.
- The local production build lacks a configured public Turnstile key and displays its existing “MESSAGE FORM IS TEMPORARILY UNAVAILABLE.” state when the form opens. `ContactForm.tsx:98–124` implements that state. No credentials/environment files were edited, form filled or submitted. Delivery and production form readiness are not validated by this run.
- Static assets: all 21 configured media references and eight CSS asset references resolve; manifests/icons exist. Social image 1200×630, mobile hero 667×1000, desktop hero 1920×888, logo 512×512. Imagery, formats, priorities and loading strategies were unchanged.
- One H1 per page, crawlable anchors, section labels, form labels and direct email/phone alternatives are present. This is not a full keyboard/contrast/accessibility certification. No Core Web Vitals or Lighthouse score was measured.
- GA4 `G-SL5CG1FVGQ`, Vercel Analytics, funnel diagnostics and `generate_lead` exist in code. Source review and stubbed local analytics checks confirm localhost suppression and event fields that do not contain enquiry values; success emission follows a successful API response. ChatGPT-style UTM attribution is retained.
- `page_location` preserves arbitrary URL query parameters. Current forms do not put enquiry data there; leakage was not observed. Query sanitization would require a separate measurement-policy review to preserve intended attribution.
- August 18 Search Console ownership and GA4 key-event configuration are historical project records, not freshly verified account results. No account reporting tools for these systems were found in the available tool inventory; authenticated browser account reporting was not attempted.

## Exact files changed

| File | Change | Scope classification |
|---|---|---|
| `vite.config.ts` | WebPage `dateModified`: August 21 → August 23. | Strictly under the hood: JSON-LD date only. |
| `public/sitemap.xml` | Homepage `lastmod`: August 21 → August 23; privacy date retained. | Strictly under the hood: sitemap metadata only. |
| `docs/seo-and-ai-optimization-workflow.md` | Verified durable guidance and dated audit entry. | Documentation only; not served from public output. |
| `docs/SEO_AI_DISCOVERY_AUDIT_2026-08-31.md` | This report. | Documentation only; not served from public output. |

The corrected date follows the real content commit, consistent with [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). No visible copy, UI, UX, design, layout, CSS, imagery, component, animation, loading behavior, analytics implementation, crawler permission or hosting rule was changed.

## Validation

| Check | Result |
|---|---|
| `npm run lint`, before and after source changes | Pass, no lint warnings. |
| `npm run build`, before and after source changes | Pass: TypeScript, Vite client build, SSR build and prerender. Final prerender inserts 57,827 characters. |
| Generated metadata/HTML/JSON-LD/XML assertions | Pass for both pages, schema parity, expected dates, canonical uniqueness, IDs and local references. |
| Body-preservation comparison | Pass: homepage body byte-identical before/after and to live body. SHA-256: `89655a715ddd3ea09d75bd4a3cfeaecb581b94afc52a4cf5a849d94c6ce414fe`. |
| Structured-data comparison | Pass: parsed pre/post graph differs only in WebPage.dateModified. |
| Privacy preservation | Pass: whole generated file byte-identical before/after and to live response. |
| Live normal/gzip/test-crawler content comparison | Pass: all decoded live homepage bytes match each other. |
| Compression sidecar parity | Pre-existing failure for homepage only; withheld as DM-010. Privacy parity passes. |
| Asset/media/manifests and analytics stub checks | Pass, subject to the measurement limits above. |
| Local browser and HTTP checks | Pass within the stated preview and Turnstile limitations. |
| `git diff --check` and hunk-by-hunk scope review | Pass; only metadata dates and documentation changed. |

No permanent tests were added for a two-field metadata correction. Checks used temporary scripts/assertions and build output. Temporary diagnostics include `/tmp/dillan2-final-output-audit.json` and `/tmp/dillan-seo-*`; these are reproducible scratch evidence, not durable project dependencies. Build output is ignored and was not committed. Initial sandbox restrictions on DNS and loopback listening were resolved through approved read-only HTTP and loopback-preview escalations; no approval blocker remains for the completed work.

## Withheld work and approval requirements

The SEO and AI Optimization Audit skill and the user's explicit boundary prohibit presentation, interaction and loading changes in this run. Approval must identify the exact exception before any such work proceeds.

| Proposed work | Affected files/surface | Expected effect, rationale and risk | Approval and validation plan |
|---|---|---|---|
| Generate compressed HTML after prerender | `scripts/prerender.mjs`, potentially `vite.config.ts` compression configuration | Could change initial content/loading on hosts using the gzip sidecar; prevents app-shell delivery there. No current production failure observed. | Exact loading-behavior exception; then compare decoded/ordinary bytes and test production-equivalent negotiation, hydration and responsive loading. |
| Substantiate or revise outcome claims; add process/scope answers or case-study evidence | `src/content/siteData.ts`, `src/components/home.tsx`, `src/components/info.tsx`, potentially portfolio components | Visible wording/layout could change. Risk is unsupported commercial claims or altered positioning. | Owner/client evidence and approved wording/design; then verify claim sources, screenshots and schema parity. |
| Add a readable service-area statement | `src/components/info.tsx` or `src/components/home.tsx` | Adds visible copy and could affect spacing; clarifies geographic scope already in the business brief. | Exact copy/location approval; then desktop/mobile, accessibility and factual-parity checks. |
| Expand main landmark | `src/App.tsx`, `src/components/home.tsx` | Changes DOM and assistive navigation; styling selectors could be affected. | Component/DOM exception; then keyboard/screen-reader, screenshots and layout regression checks. |
| Resolve person/studio/service graph and replace deprecated ProfessionalService | `vite.config.ts`; visible studio facts in `src/components/info.tsx` as evidence | Machine-readable entity relationships change; wrong brand or profile linkage could misidentify the provider. | Owner identity decision; then supported type/property review, JSON-LD parsing and visible-content parity. No invented address/reviews. |
| Deliberately allow or restrict model training | `public/robots.txt`, and later CDN/WAF if needed | Changes crawler permissions independently of search discovery. | Explicit owner policy; reverify provider documentation, preserve intended search access, and read back production only after separate release approval. |
| Change attribution sanitization or analytics settings | `src/utils/analytics.ts`, GA4/Bing/Search Console | Can change recorded attribution and reports; no present enquiry leakage observed. | Separate measurement scope and any external-setting approval; test allowed parameters and event payloads without personal data. |
| Simplify duplicate-URL redirects, add optional privacy social metadata or further metadata polish | `vercel.json`, `public/privacy.html` | Low benefit relative to already correct canonicals; redirects alter navigation and social tags affect sharing previews. | Deferred as unnecessary for this run; any redirect change needs explicit navigation scope and status/parameter regression tests. |
| Release, submit URLs, verify live form delivery, or modify accounts | Hosting/webmaster/analytics/email surfaces | Makes changes live or creates external effects. | Exact separate authorization. No commit, push, deployment, publishing, sitemap submission or email was performed. |

No further approval is needed for the completed local metadata correction. Withheld recommendations are not a request to deploy this build; the local Turnstile and compressed-output caveats should be understood before any later release.

## Weekly monitoring plan

Suggested checklist only; no scheduled automation was created.

- Sample homepage, privacy, robots, sitemap, llms, social image, canonical-host redirects and one missing URL. Expect the statuses above and no unintended noindex/disallow.
- Compare normal and decoded gzip HTML, full initial content, one canonical per page, parseable schema and sitemap dates tied to actual content changes. Escalate missing content or widespread index-control failures immediately.
- After a separately approved release, confirm both local corrected dates appear live and verify asset/content parity without submitting a form unless authorized.
- When account access is available, compare complete Search Console/Bing and GA4 periods for landing pages, qualified `generate_lead` actions, search/AI referrals and crawl/index errors. Distinguish traffic from qualified enquiries and correlation from causation.
- Retain decisions and verified baselines in the project workflow; owner for evidence, identity, training policy and release approval is Dillan.

## Sources

Primary guidance verified August 31, 2026; citations above identify the supported claims:

- [Google generative AI optimization](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google software-app rich results](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Schema.org ProfessionalService](https://schema.org/ProfessionalService)
- [OpenAI publisher guidance](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Perplexity crawler guidance](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
