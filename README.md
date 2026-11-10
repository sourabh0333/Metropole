# Metropole demo site

A concept preview for Hotel Metropole (174, Sarat Bose Road, Kolkata): a one-page site, built to show the hotel what a site of its own could feel like. Not a finished website.

## Run

```bash
pnpm dev --port 3100
```

## How it works

One page built around the hotel's own logo: the vertical bar in "metro|pole" is the motif. It parts the loader, opens the hero and measures the scroll. Warm paper, oxblood, one dark section, large serif type. Two earlier versions (a dark pinned "tour", then a plain light editorial page) were dropped.

- `src/components/home.jsx`: the page and all motion (GSAP ScrollTrigger, Lenis smooth scroll).
- `src/components/home.module.css`: all styles. Tokens are in `src/app/globals.css`.
- `src/content/site.js`: all copy and lists. Headings are lists of `[text, italic?]` parts.
- `public/photos/`: the stills.

Sections and their effects:

1. **Loader**: a counter, then the screen parts at the bar.
2. **Hero** (pinned): the wordmark fills the screen; scrolling opens its bar into the dusk photograph, then the headline and booking bar rise.
3. **Welcome**: the statement lights word by word, and three small photographs open inside the line; a rotating "Open 24 hours" badge.
4. **Rooms** (pinned): one large viewer. The bar wipes each room over the last, the room's name rolls, and the "In every room" list lights up item by item.
5. **One day** (pinned): the scroll turns a clock from morning to night. The sun crosses its arc and the moon follows, the section's colour moves from morning cream to night, and five moments (tea, check-in, the café corner, dinner at Ivory, the front desk at night) change with their photographs.
6. **Marquee**: two rows running against each other with the scroll.
7. **Dine and Gather**: stacked cards; the first settles back as the second covers it.
8. **Around**: the page turns dark. A radar draws one ring per place at its distance from the hotel; pointing at a place lights its ring.
9. **Book**: the footer sits under the page and is uncovered as the page lifts away.

Throughout: headings rise word by word from a mask, photos wipe in and drift, a custom pointer, magnetic buttons, a header that reads on any colour and steps aside on the way down, a progress line at the right edge, live Kolkata time. With reduced motion everything is shown still and the loader is skipped.

## Checked

Lint and a production build pass (one static page). The page was checked at 1440 × 900, 1366 × 633 (a short laptop), 820 × 1100 (tablet) and 375 × 812 (phone): no sideways scroll, and every pinned section and the footer fit the screen. Run `pnpm build` only while `pnpm dev` is stopped, or restart dev afterwards.

## Before showing or launching: to confirm with the hotel

- **Photos** are from the hotel's public Booking.com listing, for this mock-up only. Get the hotel's own files and permission before anything goes live. The entrance photo is low resolution.
- **Restaurant name**: Booking.com says "Ivory"; Tripadvisor says "TFO".
- **Room labels**: the cards say Double, Corner and Twin (what the photos show). The hotel sells Standard, Deluxe and Executive; which photo is which type is not known.
- **Distances** in Around are from booking sites. The radar's rings are to scale by distance (square-root scale); the dots' directions mean nothing, and the page says so.
- **One day**: only check-in (12:00 pm), check-out and the 24-hour desk are known times. The other moments are parts of the day, not opening hours; the restaurant's and café's real hours should replace them. "Café corner" is written from a listing photo of a shelf of books and board games.
- **Copy** about breakfast sent to rooms and event set-ups is written from listed amenities (room service, flexible event space); have the hotel check it.
- **Booking** is a phone link only. A WhatsApp number or a booking engine can replace it.
- The page is `noindex`.
