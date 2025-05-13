import React, { useEffect, useState, useRef } from "react";

const fallback = "/images/covernotavailable.png";

const HighThumbnail = ({ src, alt = "표지 이미지", className = "" }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [phase, setPhase] = useState("high"); // high → original → fallback
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setImgSrc(fallback);
      return;
    }

    const high = toHighQuality(src);
    setImgSrc(high);
    setPhase("high");
  }, [src]);

  const toHighQuality = (url) => {
    let fixed = url.replace(/^http:\/\//, "https://");
    if (fixed.includes("zoom=")) {
      return fixed.replace(/zoom=\d+/, "zoom=3");
    } else if (fixed.includes("=s")) {
      return fixed.replace(/=s\d+/, "=s400");
    }
    return fixed;
  };

  const handleLoad = () => {
    const img = imgRef.current;
    if (!img) return;

    if (phase === "high" && img.naturalWidth <= 1) {
      setImgSrc(src); 
      setPhase("original");
    } else if (phase === "original" && img.naturalWidth <= 1) {
      setImgSrc(fallback);
      setPhase("fallback");
    }
  };

  const handleError = () => {
    if (phase === "high") {
      setImgSrc(src);
      setPhase("original");
    } else if (phase === "original") {
      setImgSrc(fallback);
      setPhase("fallback");
    }
  };

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default HighThumbnail;
