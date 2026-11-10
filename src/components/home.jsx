"use client";

/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import s from "./home.module.css";
import {
  hotel,
  nav,
  hero,
  welcome,
  roomsCopy,
  rooms,
  everyRoom,
  day,
  marquee,
  cards,
  aroundCopy,
  around,
  book,
} from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const iso = (d) => d.toISOString().slice(0, 10);

/* ---------- Small pieces ---------- */

function Wordmark({ className = "" }) {
  return (
    <span className={`${s.wordmark} ${className}`} aria-label={hotel.name}>
      <span aria-hidden="true">metro</span>
      <i aria-hidden="true" />
      <span aria-hidden="true">pole</span>
    </span>
  );
}

// A heading whose words rise out of a mask. `parts` is a list of [text, italic?].
function Rise({ as: Tag = "h2", parts, className = "", mode = "view" }) {
  return (
    <Tag className={className} data-rise={mode}>
      {parts.map(([text, em], i) =>
        text.split(" ").map((w, k) => (
          <Fragment key={`${i}-${k}`}>
            <span className={s.w}>
              <span className={em ? s.em : undefined} data-w>
                {w}
              </span>
            </span>{" "}
          </Fragment>
        )),
      )}
    </Tag>
  );
}

function Label({ n, children }) {
  return (
    <p className={s.label} data-reveal>
      <span>({n})</span>
      {children}
    </p>
  );
}

// A framed photograph that wipes in, then drifts inside its frame.
function Photo({ src, alt = "", className = "", cursor }) {
  return (
    <div className={`${s.photo} ${className}`} data-clip data-cursor={cursor}>
      <img src={src} alt={alt} data-drift="7" loading="lazy" decoding="async" />
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const root = useRef(null);
  const lenis = useRef(null);
  const inRef = useRef(null);
  const outRef = useRef(null);
  const [nights, setNights] = useState(1);
  const [menu, setMenu] = useState(false);
  const [hot, setHot] = useState(null);

  useEffect(() => {
    const el = root.current;
    const q = (sel) => el.querySelector(sel);
    const qa = (sel) => Array.from(el.querySelectorAll(sel));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Tomorrow and the day after, as the default stay.
    const a = new Date();
    a.setDate(a.getDate() + 1);
    const b = new Date();
    b.setDate(b.getDate() + 2);
    if (inRef.current && !inRef.current.value) {
      inRef.current.value = iso(a);
      inRef.current.min = iso(new Date());
      outRef.current.value = iso(b);
      outRef.current.min = iso(a);
    }

    // The time in Kolkata, in the header and the footer.
    const clock = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      qa("[data-clock]").forEach((n) => (n.textContent = t));
    };
    clock();
    const clockId = window.setInterval(clock, 20000);

    if (reduce) {
      // Everything is visible by default in the CSS; only the loader has to go.
      el.dataset.ready = "true";
      return () => window.clearInterval(clockId);
    }

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const smooth = new Lenis({ lerp: 0.1 });
    lenis.current = smooth;
    smooth.on("scroll", ScrollTrigger.update);
    const tick = (t) => smooth.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    smooth.stop();

    const cleanups = [];
    const ctx = gsap.context(() => {
      /* ----- Loader: count, then the screen parts at the logo's bar ----- */
      const count = { v: 0 };
      const intro = gsap.timeline({
        onComplete: () => {
          el.dataset.ready = "true";
          smooth.start();
        },
      });
      intro
        .to(count, {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const n = q("[data-count]");
            if (n) n.textContent = String(Math.round(count.v)).padStart(3, "0");
          },
        })
        .to("[data-pre-bar]", { scaleY: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to("[data-pre-ui]", { autoAlpha: 0, duration: 0.35 }, ">-0.1")
        .to("[data-pre-l]", { xPercent: -100, duration: 1.1, ease: "power4.inOut" }, ">")
        .to("[data-pre-r]", { xPercent: 100, duration: 1.1, ease: "power4.inOut" }, "<")
        .to("[data-pre-bar]", { autoAlpha: 0, duration: 0.3 }, "<")
        .set("[data-pre]", { display: "none" })
        // The name arrives letter by letter, and its bar grows between the halves.
        .from("[data-char]", { yPercent: 118, duration: 1.1, stagger: 0.045, ease: "power4.out" }, "-=0.75")
        .from("[data-slit]", { scaleY: 0, duration: 1, ease: "power4.out" }, "-=0.9")
        .from("[data-hero-ui]", { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.08 }, "-=0.6")
        .from(
          "[data-header]",
          { yPercent: -100, autoAlpha: 0, duration: 0.8, ease: "power3.out", clearProps: "all" },
          "-=0.8",
        );

      /* ----- Hero: the logo's bar opens into the hotel ----- */
      const bar = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const size = parseFloat(getComputedStyle(q("[data-mega]")).fontSize);
        const half = Math.max(1.5, size * 0.012);
        const tall = size * 0.78;
        return `inset(${h / 2 - tall}px ${w / 2 - half}px ${h / 2 - tall}px ${w / 2 - half}px)`;
      };
      const open = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      open
        .fromTo(
          "[data-slit]",
          { clipPath: bar },
          { clipPath: "inset(0px 0px 0px 0px)", duration: 0.6, ease: "power2.inOut" },
          0,
        )
        .fromTo("[data-slit] img", { scale: 1.5 }, { scale: 1.04, duration: 0.75, ease: "power1.out" }, 0)
        .to('[data-mega="l"]', { xPercent: -45, duration: 0.45 }, 0)
        .to('[data-mega="r"]', { xPercent: 45, duration: 0.45 }, 0)
        .to("[data-hero-fade]", { autoAlpha: 0, duration: 0.15 }, 0)
        .fromTo("[data-slit-shade]", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.4)
        .fromTo(
          "[data-hero-copy] [data-w]",
          { yPercent: 118 },
          { yPercent: 0, duration: 0.3, stagger: 0.035, ease: "power3.out" },
          0.5,
        )
        .fromTo("[data-bar]", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power3.out" }, 0.66)
        .to({}, { duration: 0.12 });

      /* ----- The welcome lights up word by word ----- */
      gsap.fromTo(
        "[data-read] span",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: { trigger: "[data-read]", start: "top 82%", end: "bottom 50%", scrub: true },
        },
      );

      // The small photographs open inside the line as it is read.
      gsap.fromTo(
        "[data-pill]",
        { width: 0, marginInline: 0 },
        {
          width: "1.7em",
          marginInline: "0.08em",
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-read]", start: "top 70%", end: "bottom 55%", scrub: true },
        },
      );

      /* ----- Rooms: the bar wipes each room over the last while the section holds ----- */
      const layers = qa("[data-layer]");
      const steps = layers.length;
      const roomsTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "[data-rooms]",
          start: "top top",
          end: `+=${steps * 85}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => el.style.setProperty("--rooms", self.progress.toFixed(3)),
        },
      });
      gsap.set("[data-room-text]:not([data-room-text='0'])", { autoAlpha: 0, y: 14 });
      layers.slice(1).forEach((layer, k) => {
        const at = 0.45 + k * 1.45;
        roomsTl
          .fromTo(layer, { xPercent: 100 }, { xPercent: 0, duration: 1, ease: "power2.inOut" }, at)
          // The photograph moves against its frame, so it stays almost still while the edge passes.
          .fromTo(
            layer.querySelector("img"),
            { xPercent: -90, scale: 1.12 },
            { xPercent: 0, scale: 1, duration: 1, ease: "power2.inOut" },
            at,
          )
          .to(layers[k].querySelector("img"), { xPercent: -10, duration: 1, ease: "power2.inOut" }, at)
          .to("[data-roll]", { yPercent: (-100 / steps) * (k + 1), duration: 0.6, ease: "power3.inOut" }, at + 0.2)
          .to(`[data-room-text="${k}"]`, { autoAlpha: 0, y: -14, duration: 0.3 }, at + 0.1)
          .to(`[data-room-text="${k + 1}"]`, { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.5);
      });
      roomsTl
        .fromTo(
          "[data-amenity]",
          { opacity: 0.32 },
          { opacity: 1, duration: 0.3, stagger: (steps * 1.45 - 0.6) / 6 },
          0.15,
        )
        .to({}, { duration: 0.45 });

      /* ----- One day: the scroll turns the clock, the sky and the photographs ----- */
      const moments = day.moments;
      const n = moments.length;
      const dayEl = q("[data-day]");
      const sun = q("[data-sun]");
      const clockEl = q("[data-day-clock]");
      const dots = qa("[data-day-dot]");
      // Each moment rests on its own hour; the clock runs between them.
      const knots = [[0, moments[0].hour - 1], ...moments.map((m, i) => [(i + 0.45) / n, m.hour]), [1, 23.98]];
      const hourAt = (p) => {
        for (let i = 1; i < knots.length; i += 1) {
          if (p <= knots[i][0]) {
            const [p0, h0] = knots[i - 1];
            const [p1, h1] = knots[i];
            return h0 + (h1 - h0) * ((p - p0) / (p1 - p0 || 1));
          }
        }
        return 23.98;
      };
      const sky = (p) => {
        const h = hourAt(p);
        const mins = Math.round(h * 60);
        clockEl.textContent = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
        // The sun crosses from 06:00 to 18:30; after that the moon climbs.
        const night = h >= 18.5;
        const t = night ? (h - 18.5) / 11 : (h - 6) / 12.5;
        const a = Math.PI * (1 - t);
        sun.setAttribute("cx", (200 + 180 * Math.cos(a)).toFixed(1));
        sun.setAttribute("cy", (200 - 180 * Math.sin(a)).toFixed(1));
        dayEl.dataset.night = night ? "true" : "false";
        const idx = Math.min(n - 1, Math.floor(p * n));
        dots.forEach((d, i) => {
          d.dataset.on = i === idx ? "true" : i < idx ? "done" : "false";
        });
      };
      const dayTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: dayEl,
          start: "top top",
          end: `+=${n * 80}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            sky(self.progress);
            dayEl.style.setProperty("--day", self.progress.toFixed(4));
          },
        },
      });
      sky(0);
      moments.forEach((m, i) => {
        if (i === 0) return;
        const at = i - 0.3;
        dayTl
          .to(dayEl, { backgroundColor: m.tone.bg, color: m.tone.fg, duration: 0.5 }, at)
          .to(`[data-moment="${i - 1}"]`, { autoAlpha: 0, yPercent: -30, duration: 0.25, ease: "power2.in" }, at)
          .fromTo(
            `[data-moment="${i}"]`,
            { autoAlpha: 0, yPercent: 30 },
            { autoAlpha: 1, yPercent: 0, duration: 0.3, ease: "power2.out" },
            at + 0.25,
          )
          .fromTo(
            `[data-day-photo="${i}"]`,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut" },
            at,
          )
          .fromTo(`[data-day-photo="${i}"] img`, { scale: 1.35 }, { scale: 1, duration: 0.6, ease: "power2.out" }, at)
          .to(`[data-day-photo="${i - 1}"] img`, { yPercent: -10, duration: 0.5 }, at);
      });
      dayTl.to({}, { duration: 0.7 });

      const mm = gsap.matchMedia();

      /* ----- Cards stack: the one beneath settles back as the next arrives ----- */
      mm.add("(min-width: 900px)", () => {
        const list = qa("[data-card]");
        list.slice(0, -1).forEach((card, i) => {
          gsap.to(card.querySelector("[data-card-in]"), {
            scale: 0.93,
            yPercent: -2,
            filter: "brightness(0.6)",
            ease: "none",
            scrollTrigger: { trigger: list[i + 1], start: "top bottom", end: "top 12%", scrub: true },
          });
        });
      });

      /* ----- The marquee rows run against each other with the scroll ----- */
      qa("[data-band]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -30 : 0 },
          {
            xPercent: i % 2 ? 0 : -30,
            ease: "none",
            scrollTrigger: { trigger: row.parentElement, start: "top bottom", end: "bottom top", scrub: 0.4 },
          },
        );
      });

      /* ----- Photographs wipe in and drift; tiles and text rise ----- */
      qa("[data-clip]").forEach((node) => {
        const st = { trigger: node, start: "top 88%", once: true };
        gsap.fromTo(
          node,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut", scrollTrigger: st },
        );
        gsap.fromTo(
          node.querySelector("img"),
          { scale: 1.4 },
          { scale: 1.14, duration: 1.9, ease: "power3.out", scrollTrigger: { ...st } },
        );
      });
      qa("[data-drift]").forEach((node) => {
        const v = Number(node.dataset.drift);
        gsap.fromTo(
          node,
          { yPercent: -v },
          {
            yPercent: v,
            ease: "none",
            scrollTrigger: { trigger: node.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      qa('[data-rise="view"]').forEach((node) => {
        gsap.from(node.querySelectorAll("[data-w]"), {
          yPercent: 118,
          duration: 1.15,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: { trigger: node, start: "top 90%", once: true },
        });
      });
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 30 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" }),
      });
      // The radar draws its rings, then its places land.
      gsap.from("[data-ring]", {
        strokeDashoffset: 1,
        duration: 1.6,
        stagger: 0.12,
        ease: "power2.inOut",
        scrollTrigger: { trigger: "[data-radar]", start: "top 80%", once: true },
      });
      gsap.from("[data-dot]", {
        scale: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.5,
        ease: "back.out(3)",
        scrollTrigger: { trigger: "[data-radar]", start: "top 80%", once: true },
      });

      // The footer sits under the page, so its entrance is timed from the page's end:
      // the wordmark rises first (it is uncovered first), then the heading.
      gsap.from("[data-giant] > *", {
        yPercent: 112,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-end]", start: "top 96%", once: true },
      });
      gsap.from('[data-rise="foot"] [data-w]', {
        yPercent: 118,
        duration: 1.15,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-end]", start: "top 45%", once: true },
      });

      /* ----- The page's colours follow the section in view ----- */
      qa("[data-zone]").forEach((zone) => {
        ScrollTrigger.create({
          trigger: zone,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) el.dataset.theme = zone.dataset.zone;
            else if (el.dataset.theme === zone.dataset.zone) el.dataset.theme = "paper";
          },
        });
      });

      /* ----- The header steps aside on the way down; the pole fills as you go ----- */
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          el.style.setProperty("--page", self.progress.toFixed(4));
          q("[data-header]").dataset.away = self.direction === 1 && self.scroll() > 400 ? "true" : "false";
        },
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, root);

    /* ----- Pointer effects (mouse only) ----- */
    if (fine) {
      const cur = q("[data-cur]");
      const txt = q("[data-cur-text]");
      const x = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
      const y = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
      const move = (e) => {
        x(e.clientX);
        y(e.clientY);
        cur.dataset.on = "true";
      };
      const over = (e) => {
        const tag = e.target.closest("[data-cursor]");
        const link = e.target.closest("a, button, input, select, label");
        if (link) {
          cur.dataset.mode = "link";
        } else if (tag) {
          txt.textContent = tag.dataset.cursor;
          cur.dataset.mode = "label";
        } else {
          cur.dataset.mode = "";
        }
      };
      const out = () => (cur.dataset.on = "false");
      window.addEventListener("mousemove", move, { passive: true });
      window.addEventListener("mouseover", over, { passive: true });
      document.documentElement.addEventListener("mouseleave", out);
      cleanups.push(() => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseover", over);
        document.documentElement.removeEventListener("mouseleave", out);
      });

      // Magnetic buttons lean towards the pointer.
      qa("[data-magnet]").forEach((node) => {
        const pull = (e) => {
          const r = node.getBoundingClientRect();
          gsap.to(node, {
            x: (e.clientX - r.left - r.width / 2) * 0.35,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.4,
            ease: "power3.out",
          });
        };
        const back = () => gsap.to(node, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
        node.addEventListener("mousemove", pull);
        node.addEventListener("mouseleave", back);
        cleanups.push(() => {
          node.removeEventListener("mousemove", pull);
          node.removeEventListener("mouseleave", back);
        });
      });

      // Tiles tip towards the pointer.
      qa("[data-tilt]").forEach((node) => {
        const tip = (e) => {
          const r = node.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(node, {
            rotateY: px * 7,
            rotateX: -py * 7,
            transformPerspective: 900,
            duration: 0.5,
            ease: "power2.out",
          });
        };
        const flat = () => gsap.to(node, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
        node.addEventListener("mousemove", tip);
        node.addEventListener("mouseleave", flat);
        cleanups.push(() => {
          node.removeEventListener("mousemove", tip);
          node.removeEventListener("mouseleave", flat);
        });
      });
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.clearInterval(clockId);
      window.removeEventListener("load", onLoad);
      cleanups.forEach((fn) => fn());
      ctx.revert();
      gsap.ticker.remove(tick);
      smooth.destroy();
      lenis.current = null;
    };
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMenu(false);
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis.current) lenis.current.scrollTo(target, { offset: -70, duration: 1.8 });
    else target.scrollIntoView();
  };

  const onDates = () => {
    const a = new Date(inRef.current.value);
    const b = new Date(outRef.current.value);
    if (inRef.current.value) {
      const next = new Date(a);
      next.setDate(next.getDate() + 1);
      outRef.current.min = iso(next);
      if (!(b > a)) outRef.current.value = iso(next);
    }
    const n = Math.round((new Date(outRef.current.value) - a) / 864e5);
    setNights(Number.isFinite(n) && n > 0 ? n : 1);
  };

  const band = [...marquee, ...marquee, ...marquee];

  return (
    <div ref={root} className={s.root} data-theme="paper">
      {/* ---------- Loader ---------- */}
      <div className={s.pre} data-pre aria-hidden="true">
        <i className={s.preL} data-pre-l />
        <i className={s.preR} data-pre-r />
        <i className={s.preBar} data-pre-bar />
        <div className={s.preUi} data-pre-ui>
          <Wordmark />
          <span data-count>000</span>
        </div>
      </div>
      <noscript>
        <style>{"[data-pre]{display:none}"}</style>
      </noscript>

      {/* ---------- Pointer and page progress ---------- */}
      <div className={s.cur} data-cur aria-hidden="true">
        <span data-cur-text />
      </div>
      <i className={s.pole} aria-hidden="true" />
      <div className={s.grain} aria-hidden="true" />

      {/* ---------- Header ---------- */}
      <header className={s.header} data-header data-open={menu || undefined}>
        <a className={s.brand} href="#top" onClick={(e) => go(e, "#top")} aria-label="Metropole, home">
          <Wordmark />
        </a>
        <p className={s.time}>
          Kolkata <span data-clock>--:--</span>
        </p>
        <nav className={s.nav} aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className={s.book} href="#book" onClick={(e) => go(e, "#book")} data-magnet>
          Book a stay
        </a>
        <button
          className={s.burger}
          aria-expanded={menu}
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu(!menu)}
        >
          <i />
          <i />
        </button>
      </header>

      <main id="top" className={s.main}>
        {/* ---------- Hero: the bar opens ---------- */}
        <section className={s.hero} data-hero>
          <p className={s.heroTop} data-hero-fade>
            {hero.top.map((t) => (
              <span key={t} data-hero-ui>
                {t}
              </span>
            ))}
            <span lang="bn" className={s.bn} data-hero-ui>
              {hotel.bengali}
            </span>
          </p>

          <h1 className={s.mega} aria-label="Metropole, a boutique hotel in South Kolkata">
            <span className={s.megaL} data-mega="l" aria-hidden="true">
              {"metro".split("").map((c, i) => (
                <span key={i} data-char>
                  {c}
                </span>
              ))}
            </span>
            <span className={s.megaR} data-mega="r" aria-hidden="true">
              {"pole".split("").map((c, i) => (
                <span key={i} data-char>
                  {c}
                </span>
              ))}
            </span>
          </h1>

          <div className={s.slit} data-slit>
            <img src="/photos/facade-dusk.jpg" alt="Metropole at dusk, seen from Sarat Bose Road" fetchPriority="high" />
            <i className={s.slitShade} data-slit-shade />
          </div>

          <div className={s.heroCopy} data-hero-copy>
            <Rise as="p" parts={hero.line} className={s.heroLine} mode="hero" />
            <form className={s.bar} data-bar onSubmit={(e) => e.preventDefault()}>
              <label>
                <span>Check in</span>
                <input ref={inRef} type="date" onChange={onDates} />
              </label>
              <label>
                <span>Check out</span>
                <input ref={outRef} type="date" onChange={onDates} />
              </label>
              <label>
                <span>Guests</span>
                <select defaultValue="2">
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                </select>
              </label>
              <a className={s.barBtn} href={`tel:${hotel.tel}`}>
                <span>
                  Call to book
                  <small>
                    {nights} {nights === 1 ? "night" : "nights"} · {hotel.phone}
                  </small>
                </span>
                <Arrow />
              </a>
            </form>
          </div>

          <p className={s.hint} data-hero-fade aria-hidden="true">
            <span data-hero-ui>Scroll to open</span>
            <i />
          </p>
        </section>

        {/* ---------- Welcome: a statement with photographs set into the line ---------- */}
        <section className={`${s.wrap} ${s.welcome}`}>
          <div className={s.welcomeSide}>
            <Label n="01">{welcome.label}</Label>
            <div className={s.badge} data-reveal aria-hidden="true">
              <svg viewBox="0 0 200 200">
                <defs>
                  <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text>
                  <textPath href="#ring">{welcome.badge}</textPath>
                </text>
              </svg>
              <strong>24</strong>
            </div>
          </div>
          <div>
            <p className={s.statement} data-read>
              {welcome.parts.map((part, i) =>
                typeof part === "string" ? (
                  part.split(" ").map((w, k) => <span key={`${i}-${k}`}>{w} </span>)
                ) : (
                  <Fragment key={i}>
                    <i className={s.pill} data-pill>
                      <img src={part.src} alt={part.alt} loading="lazy" />
                    </i>{" "}
                  </Fragment>
                ),
              )}
            </p>
            <ul className={s.basics}>
              {welcome.basics.map((b) => (
                <li key={b.v} data-reveal>
                  <strong>{b.k}</strong>
                  {b.v}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Rooms: the bar wipes from one room to the next ---------- */}
        <section className={s.suite} id="rooms" data-rooms>
          <div className={`${s.wrap} ${s.suiteIn}`}>
            <div className={s.suiteHead}>
              <div>
                <Label n="02">{roomsCopy.label}</Label>
                <Rise parts={roomsCopy.title} className={s.h2} />
              </div>
              <p className={s.count} aria-hidden="true">
                <i />
                {roomsCopy.types}
              </p>
            </div>
            <div className={s.viewer} data-cursor="Scroll">
              {rooms.map((r, i) => (
                <div key={r.id} className={s.layer} data-layer={i}>
                  <img src={r.src} alt={`${r.name} room at Metropole`} loading={i ? "lazy" : "eager"} decoding="async" />
                </div>
              ))}
              <i className={s.viewerShade} aria-hidden="true" />
              <div className={s.roomCap}>
                <div className={s.roll}>
                  <div data-roll>
                    {rooms.map((r, i) => (
                      <p key={r.id}>
                        <span>0{i + 1}</span>
                        {r.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={s.rollText}>
                  {rooms.map((r, i) => (
                    <p key={r.id} data-room-text={i}>
                      {r.text}
                    </p>
                  ))}
                </div>
              </div>
              <aside className={s.inRoom}>
                <p className={s.label}>
                  <span>(+)</span>
                  {roomsCopy.everyLabel}
                </p>
                <ul>
                  {everyRoom.map((e) => (
                    <li key={e} data-amenity>
                      {e}
                    </li>
                  ))}
                </ul>
                <a className={s.link} href={`tel:${hotel.tel}`}>
                  {roomsCopy.ask} <Arrow />
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* ---------- One day: the scroll turns the clock ---------- */}
        <section
          className={s.day}
          id="day"
          data-day
          data-night="false"
          style={{ backgroundColor: day.moments[0].tone.bg, color: day.moments[0].tone.fg }}
        >
          <div className={`${s.wrap} ${s.dayIn}`}>
            <div className={s.dayHead}>
              <div>
                <Label n="03">{day.label}</Label>
                <Rise parts={day.title} className={s.h2} />
              </div>
              <p className={s.dayClock} aria-hidden="true">
                <span data-day-clock>07:00</span>
                <small>Kolkata</small>
              </p>
            </div>

            <div className={s.dayStage}>
              <div className={s.dayLeft}>
                <svg className={s.sky} viewBox="0 0 400 214" aria-hidden="true">
                  <path className={s.arc} d="M20,200 A180,180 0 0 1 380,200" pathLength="1" />
                  <line className={s.horizon} x1="0" y1="200" x2="400" y2="200" />
                  <g className={s.stars}>
                    <circle cx="70" cy="70" r="1.6" />
                    <circle cx="130" cy="34" r="1.2" />
                    <circle cx="205" cy="88" r="1.4" />
                    <circle cx="262" cy="30" r="1.7" />
                    <circle cx="318" cy="76" r="1.2" />
                    <circle cx="352" cy="132" r="1.5" />
                    <circle cx="44" cy="140" r="1.1" />
                  </g>
                  <circle className={s.sun} data-sun cx="20" cy="200" r="13" />
                </svg>
                <div className={s.dayText}>
                  {day.moments.map((m, i) => (
                    <article key={m.part} data-moment={i}>
                      <p className={s.dayPart}>
                        <span>0{i + 1}</span>
                        {m.part}
                      </p>
                      <h3>{m.title}</h3>
                      <p>{m.text}</p>
                    </article>
                  ))}
                </div>
              </div>
              <div className={s.dayPhotos}>
                {day.moments.map((m, i) => (
                  <div key={m.part} className={s.dayPhoto} data-day-photo={i}>
                    <img src={m.src} alt={m.alt} decoding="async" />
                  </div>
                ))}
              </div>
            </div>

            <ol className={s.dayRail} aria-hidden="true">
              {day.moments.map((m) => (
                <li key={m.part} data-day-dot>
                  {m.part}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Marquee ---------- */}
        <div className={s.marquee} aria-hidden="true">
          <div data-band>
            {band.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
          <div data-band className={s.outline}>
            {band.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {/* ---------- Dine and gather: stacked cards ---------- */}
        <section className={`${s.wrap} ${s.stack}`}>
          {cards.map((c, i) => (
            <article key={c.id} id={c.id} className={s.card} data-card data-tone={c.tone}>
              <div className={s.cardIn} data-card-in>
                <div className={s.cardText}>
                  <p className={s.label}>
                    <span>(0{i + 4})</span>
                    {c.label}
                  </p>
                  <Rise parts={c.title} className={s.h2} />
                  <p className={s.body} data-reveal>
                    {c.text}
                  </p>
                  <a className={s.link} href={`tel:${hotel.tel}`} data-reveal>
                    {c.cta} <Arrow />
                  </a>
                </div>
                <div className={s.cardPhoto}>
                  <img src={c.src} alt={c.alt} data-drift="6" loading="lazy" decoding="async" />
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ---------- Around: a radar of distances ---------- */}
        <section className={s.around} id="around" data-zone="ink">
          <div className={`${s.wrap} ${s.aroundGrid}`}>
            <div className={s.aroundSide}>
              <Label n="06">{aroundCopy.label}</Label>
              <Rise parts={aroundCopy.title} className={s.h2} />
              <div className={s.radar} data-radar aria-hidden="true">
                <i className={s.sweep} />
                <svg viewBox="0 0 400 400">
                  {around.map((p, i) => {
                    const r = 28 + 162 * Math.sqrt(p.km / 20);
                    const a = (i * 137.5 - 70) * (Math.PI / 180);
                    return (
                      <g key={p.v} data-hot={hot === i || undefined}>
                        <circle className={s.ring} data-ring cx="200" cy="200" r={r.toFixed(1)} pathLength="1" />
                        <circle
                          className={s.dot}
                          data-dot
                          cx={(200 + r * Math.cos(a)).toFixed(1)}
                          cy={(200 + r * Math.sin(a)).toFixed(1)}
                          r="5"
                        />
                      </g>
                    );
                  })}
                  <line className={s.radarBar} x1="200" y1="184" x2="200" y2="216" />
                </svg>
                <p className={s.radarNow}>
                  {hot === null ? aroundCopy.idle : `${around[hot].v} · ${around[hot].d}`}
                </p>
              </div>
              <p className={s.radarNote}>{aroundCopy.note}</p>
            </div>
            <ul className={s.places} onMouseLeave={() => setHot(null)}>
              {around.map((p, i) => (
                <li
                  key={p.v}
                  data-reveal
                  data-cursor={p.d}
                  data-hot={hot === i || undefined}
                  onMouseEnter={() => setHot(i)}
                >
                  <small>0{i + 1}</small>
                  <span>{p.v}</span>
                  <em>{p.d}</em>
                </li>
              ))}
              <li className={s.placesFoot} data-reveal>
                <a className={s.link} href={hotel.maps} target="_blank" rel="noreferrer">
                  Get directions <Arrow />
                </a>
              </li>
            </ul>
          </div>
        </section>
        <i data-end aria-hidden="true" />
      </main>

      {/* ---------- Book: uncovered as the page lifts away ---------- */}
      <footer className={s.footer} id="book">
        <div className={`${s.wrap} ${s.footIn}`}>
          <div className={s.footTop}>
            <div>
              <p className={s.label}>
                <span>(07)</span>
                {book.label}
              </p>
              <Rise parts={book.title} className={s.h2} mode="foot" />
            </div>
            <a className={s.call} href={`tel:${hotel.tel}`} data-magnet>
              <small>Call to book</small>
              {hotel.phone}
            </a>
          </div>
          <dl className={s.facts}>
            <div>
              <dt>Address</dt>
              <dd>
                {hotel.street}
                <br />
                {hotel.city}
              </dd>
            </div>
            <div>
              <dt>Check in</dt>
              <dd>{hotel.checkIn}</dd>
            </div>
            <div>
              <dt>Check out</dt>
              <dd>{hotel.checkOut}</dd>
            </div>
            <div>
              <dt>Kolkata now</dt>
              <dd>
                <span data-clock>--:--</span> IST
              </dd>
            </div>
            <div>
              <dt>Find us</dt>
              <dd>
                <a className={s.link} href={hotel.maps} target="_blank" rel="noreferrer">
                  Directions <Arrow />
                </a>
              </dd>
            </div>
          </dl>
          <p className={s.giant} data-giant aria-hidden="true">
            {"metro|pole".split("").map((c, i) => (c === "|" ? <i key={i} /> : <span key={i}>{c}</span>))}
          </p>
          <p className={s.note}>Concept preview · Photographs from the hotel&apos;s public listing</p>
        </div>
      </footer>
    </div>
  );
}
