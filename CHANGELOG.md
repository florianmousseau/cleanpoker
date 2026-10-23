# Changelog

## [0.0.30] - 2026-10-23

- fix(privacy): list every field the reader count stores, and how long

## [0.0.29] - 2026-10-22

- fix(backend): bound every websocket write with a deadline

## [0.0.28] - 2026-10-22

- fix(home): keep the create button off until the page has its handler (#294)
- fix(home): say how a vote works in the lead, in five languages (#292)
- fix(deps): build the room server on Go 1.26.10 (GO-2026-6809) (#293)
- fix(room): ignore the answer to a vote that a later vote replaced
- fix(room): bound rooms, answer each vote and drop silent sockets

## [0.0.26] - 2026-10-17

- fix(home): check the deck against the server's limits and say which one (#285)
- fix(ci): deploy a release before the back-merge, not after it

## [0.0.25] - 2026-10-17

- fix(room): publish each state in the order it was applied
- fix(room): cut off a subscriber whose queue is full instead of skipping it
- fix(room): an expired room closes its sockets and never blocks a command

## [0.0.24] - 2026-10-17

- fix(server): refuse a room body over the size limit

## [0.0.23] - 2026-10-17

- fix(server): bound what a client can make a room hold

## [0.0.22] - 2026-10-17

- fix(results): size the bars on the votes of the revealed round
- fix(room): ignore commands from a seat that is gone

## [0.0.21] - 2026-10-17

- fix(ci): free and wait for the back-merge checks too

## [0.0.20] - 2026-10-16

- fix(ci): release the pending runs of the release pull request

## [0.0.19] - 2026-10-16

- fix(ui): the German home heading no longer pushes a 320 px screen (#263)

## [0.0.18] - 2026-10-14

- feat(health): outage drill on the production probe (#257)
- fix(i18n): translate the join form placeholder in every language (#256)

## [0.0.17] - 2026-10-10

- fix(counter): hand the bindings back to the counter and the probe under adapter-cloudflare 8 (#253)

## [0.0.16] - 2026-10-08

- fix(deps): build the room server on Go 1.26.9 and x/net 0.60.0 (#249)

## [0.0.15] - 2026-10-07

- fix(health): read the head of main from the room server on the site

## [0.0.14] - 2026-10-07

- refactor(health): address static analysis findings
- feat(health): judge what a visitor gets, on the server and on the site

## [0.0.13] - 2026-09-27

- fix(room): hold the name limit server-side, ask before removing someone, break long card labels (#230)
- docs: rewrite the README from what the code does, add CONTRIBUTING and issue templates (#231)
- chore(deps-dev): bump size-limit and @size-limit/file to 14.0.0 together (#229)
- chore(deps-dev): bump the frontend group in /frontend with 4 updates (#225, #226)
- chore(deps): bump golang.org/x/net in /backend in the backend group (#224)

## [0.0.12] - 2026-09-13

- fix(home): drop the hint that repeated the lead and closed on a formula (#221)

## [0.0.11] - 2026-09-12

- fix(seo): keep the noindex legal notices out of the sitemap (#218)

## [0.0.10] - 2026-09-11

- refactor(room): say why the refresh mutation changes nothing
- fix(room): a reload takes the same seat back instead of leaving (QA-105)

## [0.0.9] - 2026-09-10

- fix(room): stop serving a translated room under the wrong lang attribute
- fix(room): say so when the browser refuses to copy the room link

## [0.0.8] - 2026-09-08

- fix(test): read a footer label without stripping tags (#202)
- fix(frontend): the displayed text holds its form - arrows, footer labels, register (#200)

## [0.0.7] - 2026-09-01

- feat(compteur): count unique readers server-side, and say so in five languages (#189)
- docs(og): drop the middle dot from the share card (#187)
- fix(backend): a client is subscribed before it joins, so its arrival reaches it once (#182)

## [0.0.6] - 2026-08-24

- fix(legal): name the second processor, the real-time server at Fly.io
- fix(legal): name the host's role as a processor, in the five languages

## [0.0.5] - 2026-08-24

- feat: no measurement script, and the two-sided sentence that replaces it
- docs(agents): the narrow-screen gate and the percent sign, with what neither can see

## [0.0.4] - 2026-08-23

- fix(ui): every table scrolls in its own box, and the backend stops being pinned to one host
- fix(seo): link the de, es and pt content pages from their about page (#164)
- fix(ci): go.mod carries the patch version the Dockerfile builds with

## [0.0.3] - 2026-08-23

- fix(ui): nothing pushes a page past a 320 px screen, and the percent sign joins the typography guard

## [0.0.2] - 2026-08-21

- fix(ci): run the release gate instead of announcing it (#161)
- fix(ci): let the release pull request run the checks main requires

## [0.0.1] - 2026-08-20

- fix(i18n): weld double punctuation to the word before it in French
