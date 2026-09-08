# Weekly SEO and AI Discovery Check - 2026-09-08

- Site: https://www.dillanmilo.com/; audit date September 8, 2026, America/Chicago.
- Overall status: **Yellow for limited discovery; technical checks green.** No new P0/P1 finding observed. This is a weekly delta, not a new comprehensive scorecard.
- Baselines: August 31 SEO audit and client analytics report; repository HEAD `9a6f45e`. No later tracked content changes or existing tracked edits were present at the start.
- Evidence: current public HTTP responses, generated production output, browser smoke, authenticated Search Console and GA4, current primary documentation. Account checks were read-only.
- Complete comparison periods: August 31-September 6 versus August 24-30. September 7-8 excluded. GA4's previously verified property timezone is America/Los_Angeles; owner timezone is America/Chicago. Search Console daily reporting uses Pacific time.

## Outcome and Changes

The site remains crawlable, its primary content is prerendered, and both public pages remain indexed. The prior modification-date correction is now live, so DM-009 is resolved in production. No new supported website-source fix emerged from this week's checks. The main commercial limitation is very little attributable discovery, not an observed indexing block. This sample cannot support a ranking-penalty diagnosis or a conversion redesign.

Updated `docs/seo-and-ai-optimization-workflow.md` with reusable weekly comparison, QA attribution, account-access, asset-validation, and release-readback rules. Added this report. No source, layout, copy, interaction, crawler permission, account setting, submission, commit, push, or deployment changed. All pre-existing untracked files were preserved.

## Current Measurement

| Metric | Aug 31-Sep 6 | Aug 24-30 | Interpretation |
|---|---:|---:|---|
| Search Console Web clicks | 0 | 0 | No click growth observed |
| Search Console Web impressions | 0 | 1 | Too little exposure to diagnose a trend |
| Average position | N/A | 83 | Current UI zero has no meaning without impressions |
| GA4 sessions | 3 | 7 | Down four sessions; all Direct in both periods |
| Engaged sessions | 1 | 1 | No absolute change |
| Engagement rate | 33.33% | 14.29% | Small denominator; not evidence of improved UX |
| Average engagement time/session | 28 seconds | 12 seconds | Rounded GA4 display values |
| All event count | 14 | 63 | Interaction volume, not leads |
| Recorded key events | 0 | 0 | No recorded key-event conversions |
| Organic / identifiable AI-referral sessions | 0 / 0 | 0 / 0 | No such source rows; unattributed influence remains unknown |

GA4 property `527258687` (`dillanmilo.com`), All Users, displayed 100% of available data. Source/medium table had exactly one row: `(direct) / (none)`. The requested `generate_lead` event-count filter returned 0/0; the event selector did not expose that event for the selected periods. Removing the filter produced 14/63 total events, confirming that zero was not the total interaction count. Do not equate these results with independently verified absence of business inquiries: mailbox/CRM, phone, and direct email were not reconciled in this run. Known historical QA conversions in the August 31 report are not customer leads.

Search Console's unfiltered available August 18-September 6 range still showed one click and 36 impressions, 2.8% CTR, average position 6.5; Queries exposed no rows. The weekly comparison's chart accessibility text contained an invalid-date label. The date dialog explicitly verified August 31-September 6 and August 24-30, and the metric cards supplied the counts above; the malformed chart label was not used as evidence.

Sources: [Search performance comparison](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fwww.dillanmilo.com%2F&num_of_days=7&compare_date=PREV), [GA4 weekly source report](https://analytics.google.com/analytics/web/#/a386683689p527258687/reports/explorer?params=_u.comparisonOption%3DlastPeriodMdw%26_u.date00%3D20260831%26_u.date01%3D20260906%26_r.explorerCard..seldim%3D%5B%22sessionSourceMedium%22%5D&r=lifecycle-traffic-acquisition-v2). These require existing account access.

## Search Console Health

- Page indexing, updated September 3: **2 indexed**, **1 not indexed**, with only `Alternate page with proper canonical tag`. Same counts/reason as the prior account baseline.
- Manual actions: **No issues detected**.
- Security issues: **No issues detected**.
- Core Web Vitals, updated September 6: insufficient usage data in the last 90 days for both mobile and desktop. No field performance score or pass is claimed.
- Submitted sitemaps: empty table, 0-0 of 0, for the exact `https://www.dillanmilo.com/` property. The public sitemap works and is listed in robots. Submission elsewhere or discovery through robots is not ruled out. No sitemap was submitted today.

## Technical Checks

| Surface | September 8 observation |
|---|---|
| Homepage and `/privacy.html` | 200 HTML; unique titles/descriptions, one canonical and H1 per page, index/follow |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | 200 with plain text / XML / plain text; byte-identical to repository sources |
| Google verification HTML | 200; byte-identical to repository file |
| `/og-image.png` | 200 `image/png` |
| `/seo-audit-missing-20260908` | Real 404, not a homepage soft 404 |
| HTTP apex | 308 to HTTPS apex, then 308 to HTTPS www, then 200; no loop |
| Compressed live homepage | Decoded bytes identical to ordinary live HTML |
| OAI-SearchBot / PerplexityBot UA probes | 200; byte-identical to ordinary live HTML; not authenticated provider-IP tests |
| Homepage initial HTML | 71,850 bytes, full body; body byte-identical to local production build |
| Homepage schema | JSON parses; nine top-level entities, unchanged service/project graph; `dateModified: 2026-08-23` |
| Sitemap dates | Homepage August 23; privacy July 20; no manufactured audit-date freshness |
| Local output references | No missing local href/src/poster targets or fragment IDs; no duplicate IDs |
| Production JS asset | `/assets/index-OFKuiIVK.js` returns 200 JavaScript; different local hash is not a broken production reference |
| Build / lint | `npm run build` (TypeScript, client, SSR/prerender) and `npm run lint` pass |
| Live browser smoke | Homepage screenshot inspected at 1366x880; contact form opens and dismisses; privacy link navigates correctly |

Live homepage SHA-256: `e4ca449f07bc46b7453bf9392a14aa567d9d368313f6476c2a846ce65e346be8`. Working HTTP captures and parser assertions are in `/tmp/dillanmilo-seo-2026-09-08/` for this session; this report is the durable result. Live homepage bytes differ from the local whole document due to the deployed JS reference, while body bytes match. No form was filled or submitted and no CAPTCHA was solved. September 8 browser visits/form opening may appear as QA analytics outside the reporting periods.

## Open Findings and Next Actions

| ID / Priority | Current status | Concrete next action |
|---|---|---|
| DM-009 / resolved | Date correction is live | Stop carrying it as awaiting deployment |
| DM-010 / P2, unchanged | Local decompressed `dist/index.html.gz` has 13,989 bytes and zero H1s, while final plain HTML has full content. Live compressed response is correct. | In a separately scoped build change, regenerate the HTML gzip after prerender; validate decoded equality and live content negotiation. Files: `scripts/prerender.mjs`, compression configuration in `vite.config.ts`. No demonstrated current production failure. |
| DM-011 / P2, unchanged | Outcome claims still lack supporting artifacts in this audit | Assemble evidence for the exact client/savings/booking claims in `src/content/siteData.ts` and `src/components/home.tsx` before expanding or revising them |
| DM-012 / P2, unchanged | Full geography is not visitor-readable body copy | Consider one concise service-area sentence within the existing About/services region; validate factual scope and desktop/mobile wrapping before publishing |
| DM-013 / P3, unchanged | `ProfessionalService` remains deprecated; person/studio modeling unresolved | Confirm which entity actually provides the services before migrating `vite.config.ts` schema; preserve factual identity and visible-content parity |
| DM-014 / P3, unchanged | Search bots allowed; wildcard also permits training crawlers | Retain current policy until an explicit training-policy decision |
| DM-015 / P3, unchanged | Main landmark still covers the hero only | Consider full-page landmark correction in a separate accessibility change; verify focus/skip-link behavior |
| DM-016 / P3, newly observed | Submitted sitemaps table empty for this property | Optional one-time submission of `https://www.dillanmilo.com/sitemap.xml`, followed by processing readback; not an indexing emergency with both pages indexed |

The requested audit is complete. These are separate implementation opportunities, not new production failures. The [audit skill](/Users/dillanmilosevich/.codex/skills/seo-ai-optimization-audit/SKILL.md) says: "This workflow is **under-the-hood only**" and "Do not commit, push, deploy, publish, submit URLs, or change production, analytics, webmaster, crawler, CDN, or WAF settings without explicit approval for that exact action." Under the existing project boundary, loading/visible-copy/DOM changes and URL submission are retained as recommendations. Content additions would visibly change the About/services region; their primary risks are unsupported claims and layout wrapping. Landmark work can affect assistive navigation. Validate those with approved copy, schema parity, desktop/mobile screenshots, and keyboard checks before release.

## Next Weekly Run

Use September 7-13 versus August 31-September 6 once September 13 is complete in both tools. Recheck availability, crawl controls, indexed-page counts, search clicks/impressions, raw source/medium, lead events and QA attribution. Escalate new 5xx/noindex/canonical failures or loss of a primary indexed page immediately. Continue reporting raw counts while volume is this low. Prioritize evidence-backed service/project content and relevant distribution over repetitive metadata churn; any outreach remains a separate action, and none was sent.

Not verified: Bing account coverage, provider-IP access or WAF logs, AI citations, full backlink health, new mobile-browser or laboratory performance tests, end-to-end message delivery, independent qualified leads. No unsupported score was assigned to these categories.

## Current Guidance

Verified September 8: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) says existing SEO requirements apply and no special AI file/schema is required; [OpenAI crawlers](https://developers.openai.com/api/docs/bots) distinguishes search from training controls; [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) separates search and user fetchers and documents provider IP checks; [Schema.org ProfessionalService](https://schema.org/ProfessionalService) confirms deprecation. `llms.txt` remains an optional factual index, not evidence of citation or a ranking guarantee. No crawler-policy change was justified.
