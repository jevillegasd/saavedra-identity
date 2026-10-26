"use strict";
// The house logo as a React component (no JSX so any bundler can consume it). Painted through a CSS mask so one
// cached SVG takes any colour: `color` defaults to currentColor, so `className="text-brand-gold"` recolours it.
const React = require("react");

const LOGO_RATIO = "2240 / 1194"; // native aspect ratio of logo.svg

/**
 * @param {object} props
 * @param {number|string} [props.size=48] rendered height; width follows the aspect ratio
 * @param {string} [props.color="currentColor"] any CSS colour
 * @param {string} [props.src="/logo.svg"] where the app serves logo.svg (copy it from @saavedra/identity/logo/)
 * @param {string} [props.className]
 * @param {string} [props.label="Saavedra"] accessible name; "" hides it from screen readers
 */
function Logo({ size = 48, color = "currentColor", src = "/logo.svg", className, label = "Saavedra" }) {
  const height = typeof size === "number" ? `${size}px` : size;
  const style = {
    display: "inline-block",
    flexShrink: 0,
    height,
    aspectRatio: LOGO_RATIO,
    backgroundColor: color,
    printColorAdjust: "exact",
    WebkitPrintColorAdjust: "exact",
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
  return React.createElement("span", {
    role: label ? "img" : undefined,
    "aria-label": label || undefined,
    "aria-hidden": label ? undefined : true,
    className,
    style,
  });
}

/** Brand constants for code that needs a literal (print styles, canvases that cannot read CSS variables). */
const BRAND = Object.freeze({ green: "#143A32", gold: "#B69A56", offwhite: "#FBFBF9", ink: "#1F2937" });

module.exports = { Logo, BRAND, LOGO_RATIO };
