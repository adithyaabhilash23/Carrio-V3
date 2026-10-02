# CarryO Care — Journey & Route Animation

A fully self-contained extraction of the animated journey map visual from the CarryO Care website.

This module visualizes the complete hospital journey lifecycle:
1. **Departure from Home**: The vehicle sets off from the `HOME` marker.
2. **Accompanied Outbound Journey**: Moves forward along the mint green topographic map along the outward dashed path (`#outward-path`).
3. **Arrival at Hospital**: Reaches the `HOSPITAL` marker, accompanied by care rings (`.arrival-care`) and the "BY YOUR SIDE" companion marker.
4. **Dwell Time**: Pauses at the hospital between `keyTimes="0.44"` and `0.56` (1.44s dwell time in a 12s loop).
5. **Vehicle Flip & Return Journey**: Flips horizontally via `animateTransform scale(-1, 1)` and travels back along `#return-path` safely home.
6. **Continuous Loop**: Smoothly resets and repeats indefinitely.

---

## 1. Directory Structure & Files

```
carryo-journey-animation/
├── CarryOJourneyAnimation.tsx     # Main React component entry point
├── CarryOJourneyAnimation.html    # Standalone pure HTML & CSS file (open directly in browser)
├── carryo-journey-animation.css   # Self-contained styles, colors, keyframes & responsive rules
├── index.ts                       # TypeScript / JavaScript module export barrel
└── README.md                      # Documentation & integration guide
```

---

## 2. Main Entry Points

| Integration Type | Entry File | Description |
| :--- | :--- | :--- |
| **React / Next.js / Vite** | [`CarryOJourneyAnimation.tsx`](./CarryOJourneyAnimation.tsx) (or [`index.ts`](./index.ts)) | Portable React component with typed props. |
| **Static HTML / Plain JS** | [`CarryOJourneyAnimation.html`](./CarryOJourneyAnimation.html) | Pure HTML markup and `<link rel="stylesheet" href="carryo-journey-animation.css">`. |

---

## 3. Dependencies & Assets

### Self-Contained Assets
- **SVG & Graphics**: All graphics (the vehicle/van, wheels, medical cross, home icon, hospital cross, companion icon, care bursts, and map dots) are **100% inline SVG**. No external PNGs, SVGs, or icon libraries (`lucide-react`, etc.) are needed.
- **Animation Engine**: Driven by native browser SVG SMIL animations (`<animateMotion>` and `<animateTransform>`) and pure CSS keyframes (`draw-route`, `marker-appear`, `care-pop`). No JavaScript animation libraries (e.g. Framer Motion, GSAP) are required.

### External Dependencies
- **Font (Optional)**: `DM Sans` (Google Fonts).
  - Used for map labels (`HOME`, `HOSPITAL`, `BY YOUR SIDE`, and caption/legend text).
  - If omitted, the CSS automatically falls back to system fonts (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
  - Google Font CDN link:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    ```

---

## 4. How to Integrate into a Separate Static HTML Website

### Step 1: Copy Files
Copy the following files into your target website:
- `carryo-journey-animation.css`
- Paste the HTML markup from `CarryOJourneyAnimation.html`

### Step 2: Include the CSS in `<head>`
```html
<link rel="stylesheet" href="path/to/carryo-journey-animation.css">
```

### Step 3: Insert the Markup
```html
<div
  class="map-scene"
  role="img"
  aria-label="Illustrated journey: a CarryO Care vehicle travels from home to hospital, where a companion waits, and returns home with you."
>
  <div class="map-caption">
    <span class="map-caption-dot"></span> A little care, all the way home
  </div>

  <svg
    class="journey-map"
    viewBox="0 0 760 440"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="map-dots" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" class="map-dot" />
      </pattern>
      <path id="outward-path" d="M116 283C178 216 234 180 307 190C390 202 407 112 496 112C551 112 586 146 628 182" />
      <path id="return-path" d="M628 215C563 278 522 323 446 305C353 282 343 360 255 350C198 344 162 316 116 296" />
    </defs>

    <rect x="24" y="24" width="712" height="392" rx="22" fill="url(#map-dots)" />
    <path d="M68 99C149 142 196 108 267 130S384 148 449 73s136-30 219 4M62 369c87-63 148-42 229-69s124-16 188 34 126 51 203-6M76 228c67-38 112-26 153-7s91 19 131-18 84-47 137-25 94 25 177-3" class="contour-line" />
    <path d="M114 285C176 218 236 181 307 193c81 14 101-79 189-79 55 0 91 34 131 69" class="route-underlay" />
    <path d="M628 215c-65 63-106 108-182 90-93-23-103 55-191 45-57-6-93-34-139-54" class="route-underlay" />
    <use href="#outward-path" class="route-stroke route-outward" />
    <use href="#return-path" class="route-stroke route-return" />

    <!-- HOME Marker -->
    <g class="map-home">
      <circle cx="116" cy="289" r="34" class="home-halo" />
      <circle cx="116" cy="289" r="22" class="home-marker" />
      <path d="m105 288 11-9 11 9v11h-8v-8h-7v8h-7v-11Z" class="home-icon" />
      <rect x="76" y="337" width="80" height="27" rx="13.5" class="map-label-bg" />
      <text x="116" y="355" text-anchor="middle" class="map-label">HOME</text>
    </g>

    <!-- HOSPITAL Marker -->
    <g class="map-hospital">
      <circle cx="628" cy="199" r="35" class="hospital-halo" />
      <circle cx="628" cy="199" r="23" class="hospital-marker" />
      <path d="M628 187v24m-12-12h24" class="hospital-icon" />
      <rect x="576" y="246" width="104" height="27" rx="13.5" class="map-label-bg" />
      <text x="628" y="264" text-anchor="middle" class="map-label">HOSPITAL</text>
    </g>

    <!-- Arrival Care Badges -->
    <g class="arrival-care">
      <circle cx="565" cy="148" r="14" class="care-circle" />
      <path d="M560 148h10m-5-5v10" class="care-plus" />
      <circle cx="684" cy="234" r="14" class="care-circle care-circle-two" />
      <path d="M679 234h10m-5-5v10" class="care-plus" />
      <path d="M660 134c7-9 16-10 24-8" class="care-spark" />
      <path d="M577 280c-6 9-16 12-24 10" class="care-spark" />
    </g>

    <!-- Moving Vehicle (Outward, Dwell, Flip, Return) -->
    <g class="moving-vehicle" aria-hidden="true">
      <animateMotion
        dur="12s"
        repeatCount="indefinite"
        rotate="auto"
        keyPoints="0;1;1;0"
        keyTimes="0;0.44;0.56;1"
        calcMode="linear"
        path="M116 283C178 216 234 180 307 190C390 202 407 112 496 112C551 112 586 146 628 182C563 245 522 290 446 272C353 249 343 327 255 317C198 311 162 283 116 263"
      />
      <g class="vehicle-flip">
        <animateTransform
          attributeName="transform"
          type="scale"
          calcMode="discrete"
          values="1 1; -1 1; -1 1"
          keyTimes="0;0.5;1"
          dur="12s"
          repeatCount="indefinite"
        />
        <rect x="-20" y="-11" width="40" height="22" rx="8" class="vehicle-body" />
        <path d="M-9-8h12v7h-18v-3a4 4 0 0 1 4-4ZM5-8h7a4 4 0 0 1 4 4v3H5v-7Z" class="vehicle-windows" />
        <circle cx="-10" cy="11" r="3" class="vehicle-wheel" />
        <circle cx="10" cy="11" r="3" class="vehicle-wheel" />
        <path d="M0-5v8m-4-4h8" class="vehicle-cross" />
      </g>
    </g>

    <!-- Companion Waypoint Marker -->
    <g class="companion-marker">
      <circle cx="379" cy="274" r="19" class="companion-halo" />
      <circle cx="379" cy="269" r="5" class="companion-icon" />
      <path d="M369 285c1-7 5-10 10-10s9 3 10 10" class="companion-icon" />
    </g>
    <rect x="330" y="312" width="98" height="25" rx="12.5" class="map-label-bg map-label-tag" />
    <text x="379" y="329" text-anchor="middle" class="map-label map-label-small">BY YOUR SIDE</text>
  </svg>

  <!-- Legend -->
  <div class="map-legend">
    <span><i class="legend-dot legend-home"></i> Home</span>
    <span><i class="legend-dot legend-care"></i> Accompanied journey</span>
    <span><i class="legend-dot legend-return"></i> Safe return</span>
  </div>

  <span class="map-index">01 <span>/</span> 05</span>
</div>
```

---

## 5. How to Integrate into a React Project

```tsx
import { CarryOJourneyAnimation } from "./carryo-journey-animation";

export function HeroBanner() {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto" }}>
      <CarryOJourneyAnimation />
    </div>
  );
}
```

---

## 6. Key Configuration Parameters

- **Animation Cycle Time**: Configured via `dur="12s"` in `<animateMotion>` and `<animateTransform>`. Changing this to e.g. `16s` or `8s` adjusts vehicle speed while keeping timing ratios intact.
- **Dwell Time at Hospital**: Governed by `keyTimes="0;0.44;0.56;1"` and `keyPoints="0;1;1;0"`.
- **Reduced Motion**: Automatically pauses/hides `<animateMotion>` and minimizes transitions when the user's OS has "Reduce motion" enabled via `@media (prefers-reduced-motion: reduce)`.
