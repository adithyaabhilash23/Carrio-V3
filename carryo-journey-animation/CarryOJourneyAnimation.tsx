import React from "react";
import "./carryo-journey-animation.css";

export interface CarryOJourneyAnimationProps {
  /** Optional additional CSS class for the container */
  className?: string;
  /** Optional inline styles for the container */
  style?: React.CSSProperties;
  /** Accessible label for the scene */
  ariaLabel?: string;
  /** Caption text displayed at the top left of the scene */
  captionText?: string;
}

/**
 * CarryO Care Journey Animation
 * 
 * Self-contained visual representing the complete hospital journey:
 * - Home departure
 * - Outward accompanied journey along the route
 * - Hospital arrival with companion and care indicators
 * - Dwell pause at the hospital
 * - Vehicle flip and safe return journey home
 */
export function CarryOJourneyAnimation({
  className = "",
  style,
  ariaLabel = "Illustrated journey: a CarryO Care vehicle travels from home to hospital, where a companion waits, and returns home with you.",
  captionText = "A little care, all the way home",
}: CarryOJourneyAnimationProps) {
  return (
    <div
      className={`map-scene ${className}`.trim()}
      role="img"
      aria-label={ariaLabel}
      style={style}
    >
      <div className="map-caption">
        <span className="map-caption-dot" /> {captionText}
      </div>

      <svg
        className="journey-map"
        viewBox="0 0 760 440"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="map-dots"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" className="map-dot" />
          </pattern>
          <path
            id="outward-path"
            d="M116 283C178 216 234 180 307 190C390 202 407 112 496 112C551 112 586 146 628 182"
          />
          <path
            id="return-path"
            d="M628 215C563 278 522 323 446 305C353 282 343 360 255 350C198 344 162 316 116 296"
          />
        </defs>

        {/* Map Background Pattern */}
        <rect
          x="24"
          y="24"
          width="712"
          height="392"
          rx="22"
          fill="url(#map-dots)"
        />

        {/* Topographic Contour Lines */}
        <path
          d="M68 99C149 142 196 108 267 130S384 148 449 73s136-30 219 4M62 369c87-63 148-42 229-69s124-16 188 34 126 51 203-6M76 228c67-38 112-26 153-7s91 19 131-18 84-47 137-25 94 25 177-3"
          className="contour-line"
        />

        {/* Route Soft Underlays */}
        <path
          d="M114 285C176 218 236 181 307 193c81 14 101-79 189-79 55 0 91 34 131 69"
          className="route-underlay"
        />
        <path
          d="M628 215c-65 63-106 108-182 90-93-23-103 55-191 45-57-6-93-34-139-54"
          className="route-underlay"
        />

        {/* Animated Dashed Route Strokes */}
        <use href="#outward-path" className="route-stroke route-outward" />
        <use href="#return-path" className="route-stroke route-return" />

        {/* HOME Marker */}
        <g className="map-home">
          <circle cx="116" cy="289" r="34" className="home-halo" />
          <circle cx="116" cy="289" r="22" className="home-marker" />
          <path
            d="m105 288 11-9 11 9v11h-8v-8h-7v8h-7v-11Z"
            className="home-icon"
          />
          <rect
            x="76"
            y="337"
            width="80"
            height="27"
            rx="13.5"
            className="map-label-bg"
          />
          <text x="116" y="355" textAnchor="middle" className="map-label">
            HOME
          </text>
        </g>

        {/* HOSPITAL Marker */}
        <g className="map-hospital">
          <circle cx="628" cy="199" r="35" className="hospital-halo" />
          <circle cx="628" cy="199" r="23" className="hospital-marker" />
          <path d="M618 190h5v-3h10v3h5v20h-7v-6h-6v6h-7Zm8.5 2h3v2.5h2.5v3h-2.5v2.5h-3v-2.5h-2.5v-3h2.5Z" fillRule="evenodd" className="hospital-icon" />
          <rect
            x="576"
            y="246"
            width="104"
            height="27"
            rx="13.5"
            className="map-label-bg"
          />
          <text x="628" y="264" textAnchor="middle" className="map-label">
            HOSPITAL
          </text>
        </g>


        {/* Moving Vehicle with Bidirectional Journey & Upright Orientation */}
        <g className="moving-vehicle" aria-hidden="true">
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            rotate="auto"
            keyPoints="0;0.485;0.485;0.515;0.515;1"
            keyTimes="0;0.44;0.48;0.52;0.56;1"
            calcMode="linear"
            path="M116 283C178 216 234 180 307 190C390 202 407 112 496 112C551 112 586 146 628 182 C636 191 636 206 628 215 C563 278 522 323 446 305C353 282 343 360 255 350C198 344 162 316 116 296"
          />
          <g className="vehicle-flip">
            <animateTransform
              attributeName="transform"
              type="scale"
              calcMode="discrete"
              values="1 1; 1 1; 1 -1; 1 -1"
              keyTimes="0;0.49;0.51;1"
              dur="12s"
              repeatCount="indefinite"
            />
            <rect
              x="-20"
              y="-11"
              width="40"
              height="22"
              rx="8"
              className="vehicle-body"
            />
            <path
              d="M-9-8h12v7h-18v-3a4 4 0 0 1 4-4ZM5-8h7a4 4 0 0 1 4 4v3H5v-7Z"
              className="vehicle-windows"
            />
            <circle cx="-10" cy="11" r="3" className="vehicle-wheel" />
            <circle cx="10" cy="11" r="3" className="vehicle-wheel" />
            <path d="M0-5v8m-4-4h8" className="vehicle-cross" />
          </g>
        </g>

        {/* Companion Waypoint Marker */}
        <g className="companion-marker">
          <circle cx="379" cy="221" r="19" className="companion-halo" />
          <circle cx="379" cy="216" r="5" className="companion-icon" />
          <path
            d="M369 232c1-7 5-10 10-10s9 3 10 10"
            className="companion-icon"
          />
        </g>
        <rect
          x="330"
          y="250"
          width="98"
          height="25"
          rx="12.5"
          className="map-label-bg map-label-tag"
        />
        <text
          x="379"
          y="267"
          textAnchor="middle"
          className="map-label map-label-small"
        >
          BY YOUR SIDE
        </text>
      </svg>

      {/* Legend */}
      <div className="map-legend">
        <span>
          <i className="legend-dot legend-home" /> Home
        </span>
        <span>
          <i className="legend-dot legend-care" /> Accompanied journey
        </span>
        <span>
          <i className="legend-dot legend-return" /> Safe return
        </span>
      </div>

      <span className="map-index">01 <span>/</span> 05</span>
    </div>
  );
}

export default CarryOJourneyAnimation;
