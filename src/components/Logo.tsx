import { useState } from "react";

type LogoProps = {
  /** Pixel size of the logo image (only used when the PNG is present). */
  size?: number;
  className?: string;
};

/**
 * Renders public/assets/logo.png if available.
 * Falls back to a text logo: "Cairo" in white + "X" in red.
 */
const Logo = ({ size = 36, className = "" }: LogoProps) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <span
        className={`font-display text-xl sm:text-2xl font-bold tracking-tight select-none ${className}`}
      >
        <span className="text-brand-text">Cairo</span>
        <span className="text-brand-red">X</span>
      </span>
    );
  }

  return (
    <img
      src="/assets/logo.png"
      alt="CairoX"
      onError={() => setImgFailed(true)}
      style={{ height: size, width: "auto" }}
      className={`block select-none ${className}`}
    />
  );
};

export default Logo;
