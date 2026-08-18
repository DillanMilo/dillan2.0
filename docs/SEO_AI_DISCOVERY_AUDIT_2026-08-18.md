# SEO and AI Discovery Audit — Dillanmilo.com

## Audit details

- Site/project: Dillanmilo.com / `dillan2.0`
- Production URL: https://www.dillanmilo.com/
- Audit date: 2026-08-18, America/Chicago
- Audit mode: Full
- Evidence inspected: repository, live HTML, redirects, robots, sitemap, llms.txt, GA4, attempted Search Console, internal links, media, prior audit, growth profile
- Access limitations: Creative Currents Google account has no access to the exact URL-prefix or domain Search Console property; PageSpeed API was rate-limited; no field Core Web Vitals data was available
- Guidance reference: canonical SEO and AI Optimization Audit references last reviewed 2026-07-20; no crawler-policy change was implemented

## Executive summary

Overall readiness is **Strong**. The canonical host, HTTPS convergence, metadata, initial HTML, crawl controls, compact sitemap, factual `llms.txt`, structured data, internal links, analytics wiring, privacy page, and real 404 behavior are healthy. The highest-risk operational gap is Search Console ownership/access: neither the exact URL-prefix nor domain property is available to the signed-in Creative Currents account. GA4 is receiving data but shows no visible key events in the current cards, so measurement and outcome interpretation remain weak. No supported SEO code change was required in this run.

## Scorecard

| Category | Score | Confidence | Summary |
|---|---:|---|---|
| Crawlability and indexability | 4/5 | High | Canonical redirects, robots, sitemap, and 404 behavior pass; Search Console cannot be verified. |
| Rendering and initial HTML | 5/5 | High | Prerendered HTML contains primary copy, H1, links, and JSON-LD. |
| Metadata and canonicalization | 5/5 | High | Unique homepage/privacy metadata and self-consistent canonicals. |
| Site architecture and semantics | 4/5 | Medium | Compact one-page architecture is intentional and crawlable. |
| Structured data and entity clarity | 4/5 | High | Person, WebSite, WebPage, ProfessionalService, Service, and project entities are present and factual. |
| Content quality and answer readiness | 4/5 | High | Services, geography, evidence, selected work, and contact path are explicit. |
| Trust, authorship, and evidence | 4/5 | High | Personal identity, portfolio evidence, contact details, and privacy notice are present. |
| AI crawler and discovery readiness | 4/5 | Medium | OAI-SearchBot and PerplexityBot are allowed and `llms.txt` is factual; model-training policy remains unspecified. |
| Performance, media, and accessibility | N/A | Low | No field data; PageSpeed API was rate-limited. |
| Measurement and monitoring | 2/5 | High | GA4 receives data; Search Console access and key-event visibility are unresolved. |

## Priority findings

| ID | Priority | Surface | Finding | Evidence | Impact | Recommendation | Validation |
|---|---|---|---|---|---|---|---|
| DM-001 | P1 | Search Console | Creative Currents account cannot access either `https://www.dillanmilo.com/` or `sc-domain:dillanmilo.com`. | Live signed-in Search Console read-back. | Indexing, query, page, enhancement, and release monitoring cannot be managed from the working account. | Grant the Creative Currents account access or verify the appropriate property. | Open the exact property and confirm Overview/Pages/Sitemaps are available. |
| DM-002 | P2 | GA4 | GA4 receives data but visible cards show zero key events. | GA4 Favorites `dillanmilo.com`: 3 active users, 10 events, 0 key events in the visible current card. | Qualified enquiry performance cannot be distinguished from general engagement. | Verify `generate_lead` and contact-form success are configured as key events after testing the real form flow. | GA4 DebugView/Realtime plus successful test enquiry, then Admin key-event read-back. |
| DM-003 | P3 | Crawler policy | Search/retrieval crawlers are allowed, while model-training crawler policy is not explicitly separated. | `public/robots.txt`. | Business intent regarding model training is undocumented. | Keep current behavior unless Dillan wants a deliberate search-versus-training policy. | Recheck current provider docs before any robots change. |

## What is already working

- Canonical host convergence to `https://www.dillanmilo.com/`
- HTTP 200 for canonical pages and 404 for an unknown route
- Pre-rendered initial HTML with service, portfolio, and contact content
- One intentional homepage plus privacy-page sitemap
- Accurate social metadata and 1200×630 share image
- Factual entity graph and project evidence
- GA4 event code for CTA, navigation, portfolio, contact, social, and lead actions
- Factual `llms.txt` that defers to canonical HTML

## Changes implemented

No SEO/AEO/GEO source-code change was required. Created the required project workflow Markdown and this reproducible audit artifact.

## Validation

- TypeScript and Vite production client build: passed.
- SSR build and prerender: passed; 53,382 characters rendered into `dist/index.html`.
- Full ESLint run: passed.
- Local production preview: homepage, privacy, robots, sitemap, and llms.txt returned HTTP 200 with expected content.
- Generated homepage retained the canonical, primary content, and JSON-LD.
- Production contact-form QA passed on 2026-08-18: Turnstile cleared normally, the form displayed `MESSAGE SENT! I'LL BE IN TOUCH SOON.`, and Gmail received the exact test inquiry from `contact@dillanmilo.com` to the Creative Currents inbox.
- GA4 Realtime showed `contact_form_open`, `contact_form_start`, and eleven total event names during the successful test. The source emits `contact_form_submit`, `generate_lead`, and `contact_form_success` only around the successful request path; the processed GA4 insight card had not yet populated a `generate_lead` value at verification time.
- Recommended key-event definition: mark only `generate_lead` as the primary commercial key event. Keep `contact_form_open`, `contact_form_start`, `contact_form_submit`, and `contact_form_success` as diagnostic funnel events to avoid double-counting one enquiry.
- Search Console access remains blocked for `dillan@creativecurrents.io`; neither the URL-prefix nor domain property is available in the signed-in account. The owner account and intended Full vs Restricted role could not be recovered safely.

## Remaining opportunities

1. Resolve Search Console ownership/access.
2. Test the production contact form and configure genuine lead events as key events.
3. Establish a field/lab performance baseline when tooling is available.
4. Decide whether to separate model-training crawler policy from search/retrieval access.
5. Keep the intentionally compact site; do not manufacture thin service or city pages.

## Weekly monitoring plan

- Sample `/`, `/privacy.html`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, one unknown URL, and the contact submission path.
- Watch canonical redirects, initial HTML, GA4 lead events, Search Console access, and any new public project evidence.
- Escalate any homepage availability failure, broad noindex/disallow, missing canonical, broken form, or loss of prerendered content.

## Sources

- Google Search AI optimization guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- OpenAI publishers and developers FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Perplexity crawler documentation: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- llms.txt proposal: https://llmstxt.org/
