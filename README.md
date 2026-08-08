# Aman Kumar — Frontend Developer Portfolio

A premium, freelance-focused personal portfolio website built with **plain HTML, CSS, and JavaScript** — no frameworks, no build tools.

Live sections: Hero → About → Skills → Featured Projects → Services → Why Work With Me → Testimonials → FAQ → Contact → Footer.

---

## ✨ Design system

| Token | Value |
|---|---|
| Background | `#08090c` (near-black) with layered ambient gradient glow |
| Accent gradient | `#7c6cf0` (indigo) → `#3fd0c9` (teal) |
| Display font | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |
| Body font | [Inter](https://fonts.google.com/specimen/Inter) |
| Mono / utility font | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |

The signature visual is the **animated "profile.js" code window** in the hero — a self-typing JS object introducing Aman, which ties the design directly to his craft instead of a generic hero graphic. All project "screenshots" are hand-built CSS/SVG browser mockups (no broken image links), styled per project type (restaurant, gym, SaaS landing, dashboard, auth).

---

## 📁 Folder structure

```
portfolio/
├── index.html          # All page markup, semantic + accessible
├── css/
│   └── style.css        # Design tokens, components, responsive rules
├── js/
│   └── script.js         # Nav, reveal-on-scroll, counters, typing animation,
│                          # accordion, form validation UX
├── assets/                # Reserved for real photos / screenshots when ready
└── README.md
```

---

## 🚀 Running locally

No build step required. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve it locally for the best experience (fonts + relative paths):
   ```bash
   cd portfolio
   python3 -m http.server 8000
   # visit http://localhost:8000
   ```

---

## 🔧 Customizing

- **Replace placeholders**: swap the SVG portrait in `#about` and the CSS-mockup project media (`.project-card__media`) with real photos/screenshots in `assets/`.
- **Real links**: update the `href="#"` placeholders for GitHub, Live Demo, LinkedIn, and Fiverr with real URLs.
- **Contact form**: `js/script.js` currently validates and simulates a send (no backend). Wire it to a real endpoint (Formspree, EmailJS, your own API) inside the `form.addEventListener('submit', ...)` handler.
- **Colors/type**: all design tokens live at the top of `css/style.css` under `:root` — change once, updates everywhere.

---

## ✅ Included

- Fully responsive (mobile / tablet / desktop)
- Semantic HTML5 landmarks, skip link, visible focus states, `aria-live` form status, `prefers-reduced-motion` support
- Sticky glass navbar, mobile menu, smooth scrolling
- Scroll-reveal animations, animated counters, floating hero elements, hover micro-interactions
- Accessible FAQ accordion (button + `aria-expanded`)
- Client-side contact form validation with inline error states
- No external JS frameworks or CSS libraries — just clean, commented, vanilla code

---

Built by Aman Kumar — Frontend Developer.
