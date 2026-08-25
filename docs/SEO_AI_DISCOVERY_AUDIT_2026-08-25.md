# SEO and AI Discovery Audit — Dillanmilo.com

## Audit details

- Site/project: Dillanmilo.com / `dillan2.0`
- Production URL: https://www.dillanmilo.com/
- Audit date: 2026-08-25, America/Chicago
- Audit mode: Full
- Auditor/agent: Codex
- Evidence inspected: current tracked repository, Git history since the August 18 audit, generated production output, metadata, JSON-LD, crawler files, public-route assets, conversion instrumentation, prior audits, project workflow, and client growth profile
- Access limitations: shell DNS was unavailable; the web fetch returned no inspectable production content; live-browser access was declined; local TCP listening was denied by the sandbox. Current production HTTP behavior, CDN/WAF treatment, live mobile rendering, contact delivery, Search Console, Bing Webmaster Tools, GA4 reports, field Core Web Vitals, and lab browser metrics were therefore not testable. August 18 production results are historical context, not current proof.
- Guidance status: primary Google, OpenAI, Perplexity, Bing, schema, and `llms.txt` pages were requested on 2026-08-25 but returned no inspectable content in this environment. The project skill's official-source reference was last reviewed 2026-07-20. No crawler-policy or schema-type expansion was made.

## Executive summary

Overall repository and generated-output readiness is **Strong**, but current live-production readiness is **not fully testable with this run's access**. No P0 or P1 source-level defect was found. The strongest foundation remains complete prerendered homepage content, consistent canonical metadata, a compact canonical sitemap, parseable factual JSON-LD, crawlable priority links, clear services and geography, and an instrumented enquiry path. The main new drift was that The Forge Session entered the portfolio on August 21 while `llms.txt`, homepage sitemap freshness, and `WebPage.dateModified` still reflected the earlier baseline; those signals are now synchronized to the real commit date. The highest residual content risk is that several visible outcome claims have no supporting evidence artifact in the repository, so they should be confirmed or softened before being reused in expanded content or external profiles. Production read-back and mobile/browser smoke testing are required after an approved deployment.

## Scorecard

| Category | Score | Confidence | Summary |
|---|---:|---|---|
| Crawlability and indexability | 4/5 | Medium | Local robots and sitemap output are coherent; current production responses and CDN/WAF behavior were not testable. |
| Rendering and initial HTML | 5/5 | High | Generated HTML includes identity, services, work, contact path, links, metadata, and JSON-LD. |
| Metadata and canonicalization | 5/5 | High | Generated homepage and static privacy metadata are unique and self-consistent. |
| Site architecture and semantics | 4/5 | High | Compact section architecture is crawlable and includes one main H1, headings, landmarks, and priority links. |
| Structured data and entity clarity | 4/5 | High | JSON-LD parses and tracks visible services/projects; the relationship between the personal service entity and Creative Currents needs an explicit business decision. |
| Content quality and answer readiness | 4/5 | Medium | Audience, services, location, evidence, and next step are clear; outcome-claim substantiation is not stored in the repository. |
| Trust, authorship, and evidence | 3/5 | Medium | Identity, profiles, contact details, portfolio, and privacy notice are present; claim evidence and a fuller trust/legal surface are limited. |
| AI crawler and discovery readiness | 4/5 | Medium | Search/retrieval bots are allowed and `llms.txt` is synchronized; training permission is implicitly allowed by the wildcard rule without a documented policy decision. |
| Performance, media, and accessibility | N/A | Low | Assets and responsive source patterns were inspected, but no browser lab or field result was available. |
| Measurement and monitoring | N/A | Low | Instrumentation exists and August 18 configuration is documented, but current platform data was inaccessible. |

## Priority findings

| ID | Priority | Surface | Finding | Evidence | Impact | Recommendation | Validation |
|---|---|---|---|---|---|---|---|
| DM-004 | Resolved | Discovery freshness | The August 21 portfolio addition was absent from `llms.txt`, while homepage sitemap and JSON-LD modification dates remained July 20. | Commits `a4ae9c5` and `82a8491`; `src/content/siteData.ts`; prior `public/llms.txt`, `public/sitemap.xml`, and `vite.config.ts`. | Machine-readable discovery surfaces did not fully reflect the current visible portfolio. | Added a factual Forge entry and used the real August 21 content-change date. | Build passed; generated JSON-LD parses; Forge appears in initial HTML, ItemList schema, and `dist/llms.txt`; sitemap date is `2026-08-21`. |
| DM-005 | P2 | Content evidence | Several visible project/outcome statements are not substantiated by an evidence file available in the repository. | Examples in `src/content/siteData.ts` include enterprise-client reach, real-client use, direct bookings, appointment conversion readiness, and client/speaking outcomes. Evidence status: **not observed**, not proven false. | Unsupported reuse in landing pages, schema, profiles, or sales materials could reduce trust and create claim risk. | Owner/client should confirm each claim and retain a source, permission, or approved wording; otherwise soften it. Do not add review or rating schema. | Review against contracts, client approvals, product records, or analytics without placing private evidence in public output. |
| DM-006 | P3 | Entity policy | Visible content names Creative Currents as Dillan's independent software studio, while JSON-LD uses a personally named `ProfessionalService` as the organization and `worksFor` target. | `src/components/info.tsx` and JSON-LD generated by `vite.config.ts`. Evidence status: **confirmed implementation**, intended legal/brand relationship **not observed**. | External systems may receive a less precise brand/person relationship than intended. | Decide whether Dillan, Creative Currents, or both are the canonical service entity; then align names, URLs, `worksFor`/`founder`, contact facts, and verified profiles. | Validate visible-content parity and the JSON-LD graph after an approved decision. |
| DM-007 | P3 | Crawler policy | `OAI-SearchBot` and `PerplexityBot` are explicitly allowed; `User-agent: * / Allow: /` also permits GPTBot and other training crawlers unless overridden. The business decision is undocumented. | `public/robots.txt`. Evidence status: **confirmed repository policy**; current provider/CDN behavior **not testable**. | Search/retrieval visibility and model-training permission are not deliberately separated. | Keep the current file until Dillan makes a policy choice. Re-fetch current primary provider documentation and verify CDN/WAF behavior immediately before any change. | Production robots read-back plus provider crawler/IP documentation and CDN logs/rules. |
| DM-008 | P3 | Production assurance | Current production status, redirects, headers, error status, rendered mobile behavior, and deployed discovery-file parity could not be tested. | DNS failure, empty web output, declined browser access, and sandbox `listen EPERM`. Evidence status: **not testable with current access**. | A deployment or edge-only regression could exist despite correct local output. | After deployment approval, perform canonical-host, `200`/redirect/`404`, header, mobile viewport, no-JS HTML, schema, form, and discovery-file read-back. | Compare response bodies/hashes and rendered output with this build. |

## What is already working

- The production build prerenders all priority homepage sections rather than emitting only an app shell.
- Generated HTML has one title, one description, one canonical, one JSON-LD block, `lang="en"`, a descriptive H1, service copy, selected work, and crawlable section/privacy links.
- Robots references the canonical sitemap and does not block required assets in repository output.
- The sitemap contains only the intended homepage and privacy URL; its dates are tied to real modifications rather than the audit date.
- JSON-LD uses stable IDs and includes Person, WebSite, WebPage, ProfessionalService, four Service entities, and an ItemList of visible projects.
- The 1200×630 Open Graph image and responsive hero sources exist with real dimensions.
- Contact CTAs, direct email/phone/social paths, Turnstile-backed form code, privacy disclosure, and a `generate_lead` event are present.
- The selected-work and service copy retains the direct personal voice and no new credential, testimonial, or outcome claim was introduced.

## Technical SEO

**Confirmed locally:** canonical URLs use `https://www.dillanmilo.com/`; homepage and privacy metadata are distinct; robots and sitemap are internally consistent; generated initial HTML contains priority content and real anchors; local referenced assets exist; sitemap `lastmod` now matches the August 21 portfolio change. The static privacy route is included and links back to `/`.

**Inferred from configuration:** Vercel should serve the static output and apply the declared security headers, but configuration intent is not production proof. Unknown-route status and canonical-host convergence were healthy on August 18 but were not reverified on August 25. Parameter variants retain the homepage canonical in generated source, which is appropriate for attribution parameters if production serves the same document.

## Content, AEO, GEO, and AI discovery

The homepage directly states who Dillan is, what he builds, who the work is for, local service areas, project examples, and how to contact him. Services are written as plain-language answers rather than query variants, and the project architecture avoids thin city/service fan-out. `llms.txt` remains a concise optional discovery aid and now lists The Forge Session; it correctly defers to canonical HTML.

No special “AI SEO” metadata or speculative schema was added. Search/retrieval access is present in repository robots output. Training access is also implicitly open under the wildcard rule, so a future change requires an explicit business-policy decision and fresh provider verification.

## Structured data

The generated JSON-LD parsed successfully and contains these graph types: Person, WebSite, WebPage, ProfessionalService, four Service entities, and ItemList. The Forge Session is included as visible `CreativeWork`, and `WebPage.dateModified` is now the verified 2026-08-21 content-change date. No rating, review, FAQ, LocalBusiness, or unsupported credential markup is present. The personal-service/Creative Currents relationship remains a policy clarification, not an automatic schema edit.

## Conversion paths

The prerendered document exposes hero, floating, navigation, and contact-section calls to action plus crawlable email and privacy links. The enquiry form is intentionally revealed after interaction and requires client-side Turnstile; direct contact remains available if the form cannot load. Analytics code distinguishes funnel diagnostics from the `generate_lead` completion event and does not intentionally include contact-field contents. Actual form delivery and event receipt were not retested.

## Performance, media, accessibility, and mobile

Static inspection confirmed responsive mobile/desktop hero sources (667×1000 and 1920×888), a 1200×630 social image, explicit image dimensions for the Creative Currents mark, a skip link, semantic navigation/main/section headings, accessible CTA names, form labels/errors, and reduced-motion handling in key animation code. Portfolio media uses desktop/mobile sources and posters. Browser layout, focus flow, animation completion, Turnstile iframe behavior, Core Web Vitals, and console/network behavior were not testable; no performance pass/fail is claimed.

## Measurement

Repository instrumentation includes GA4 ID `G-SL5CG1FVGQ`, Vercel Analytics, attribution parameters (including ChatGPT-style UTM values), section/portfolio/contact diagnostics, and `generate_lead`. The August 18 audit documents verified Search Console ownership and key-event configuration. No August 25 Search Console, Bing, analytics, referral, indexing, ranking, or conversion data was accessible, so no movement or impact claim is made.

## Changes implemented

| Change | Files/surfaces | Reason | Verification |
|---|---|---|---|
| Updated homepage modification date to 2026-08-21 | `vite.config.ts`, `public/sitemap.xml` | Matches the real Forge portfolio content commit rather than manufacturing audit freshness. | Generated JSON-LD and sitemap checks passed. |
| Added The Forge Session to the curated project index | `public/llms.txt` | Synchronizes the optional discovery aid with visible selected work. | Built file contains the factual canonical project link; initial HTML and schema contain the same project. |
| Added this dated audit and durable workflow update | `docs/SEO_AI_DISCOVERY_AUDIT_2026-08-25.md`, `docs/seo-and-ai-optimization-workflow.md` | Preserves reproducible evidence and access limitations. | Final diff and working-tree scope reviewed. |

## Validation

- `npm run lint`: passed with no output warnings.
- `npm run build`: passed, including TypeScript project check, Vite client build, SSR build, and prerender; 57,793 React-rendered characters were inserted into `dist/index.html`.
- Generated-output assertion script: passed for language, title, description, canonical, one parseable JSON-LD block, WebPage modification date, Forge parity across visible HTML/schema/`llms.txt`, priority copy, contact path, section links, robots rules, sitemap routes/date, privacy canonical, and local referenced-file existence.
- Media inspection: social image 1200×630; logo 512×512; mobile hero 667×1000; desktop hero 1920×888.
- Local preview HTTP/browser smoke test: **not run** because the sandbox denied binding `127.0.0.1:4173` with `EPERM`.
- Live production/browser/mobile checks: **not run** because current production access was unavailable/declined. This is an access limitation, not a passing result.

## Remaining opportunities

1. **Blocking/high-priority technical work:** none confirmed in source; production parity remains unverified.
2. **Content and evidence work:** verify or soften project outcome claims; add distinct deeper content only when real evidence and buyer value support it.
3. **Authority/entity work:** decide and document the canonical relationship between Dillan's personal entity and Creative Currents; keep verified profiles consistent.
4. **Performance/accessibility work:** obtain field Core Web Vitals and run desktop/mobile keyboard, focus, motion, video, Turnstile, and network checks.
5. **Measurement and operations:** read Search Console indexing/performance after its processing period; verify Bing access; establish complete-period organic/AI-referral/qualified-lead baselines.
6. **Policy decisions:** choose whether model-training crawlers should remain allowed separately from search and user-triggered retrieval.

## Weekly monitoring plan

- URLs/templates: `/`, `/privacy.html`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, the Search Console verification file, one unknown URL, canonical host variants, and the enquiry flow.
- Metrics/tools: Search Console coverage/performance, Bing coverage, GA4 `generate_lead`, raw AI referral source/medium, qualified enquiries, field Core Web Vitals, build/lint, and live response checks.
- Expected baseline: canonical pages return 200; host/protocol variants converge once; unknown pages return 404; priority copy and JSON-LD exist in initial HTML; discovery files return 200 with correct content types; no broad noindex/disallow; form completion records one primary lead event.
- Alert thresholds: any P0 condition immediately; any priority-route, canonical, initial-HTML, schema-parse, contact-form, or discovery-file regression within one review cycle.
- Report destination: dated audit/delta under `docs/` plus concise durable workflow updates only when verified reusable context changes.
- Owner/escalation: Dillan approves deployment, crawler-training policy, public claims, entity positioning, and external webmaster/analytics changes.

## Approval-required production actions

1. Review and approve the five local files for deployment; no deployment was performed.
2. After deployment, authorize a live read-back of redirects, responses, headers, unknown-route status, discovery files, schema, and desktop/mobile rendering.
3. Separately approve any Search Console sitemap submission/URL inspection, Bing/IndexNow action, analytics change, CDN/WAF change, or robots training-policy change.
4. Confirm or revise outcome claims and the Creative Currents entity relationship before those facts are expanded elsewhere.

## Sources

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google: canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: structured-data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [OpenAI: Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Schema.org](https://schema.org/)
- [`llms.txt` proposal](https://llmstxt.org/)

These primary pages were requested on 2026-08-25 but were not inspectable in the current environment; crawler behavior was therefore not represented as freshly reverified and no crawler-policy change was made.
