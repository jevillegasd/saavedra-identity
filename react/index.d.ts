import type { CSSProperties, ReactElement } from "react";

export interface LogoProps {
  /** Rendered height (px or any CSS length); width follows the aspect ratio. */
  size?: number | string;
  /** Any CSS colour; defaults to currentColor so `className="text-brand-gold"` recolours it. */
  color?: string;
  /** Where the app serves logo.svg (copy it from `@saavedra/identity/logo/`). */
  src?: string;
  className?: string;
  /** Accessible name; an empty string hides the logo from screen readers. */
  label?: string;
  style?: CSSProperties;
}

export declare function Logo(props: LogoProps): ReactElement;
export declare const BRAND: Readonly<{ green: "#143A32"; gold: "#B69A56"; offwhite: "#FBFBF9"; ink: "#1F2937" }>;
export declare const LOGO_RATIO: "2240 / 1194";
