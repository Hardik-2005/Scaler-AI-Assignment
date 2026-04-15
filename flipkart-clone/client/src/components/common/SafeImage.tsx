"use client";

import Image, { ImageProps } from "next/image";
import React, { useState } from "react";
import { ImageOff } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined;
  fallbackSrc?: string;
  containerClassName?: string;
}

const DEFAULT_FALLBACK = "/placeholder-image.jpg";

export function SafeImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt = "Product Image",
  className = "",
  containerClassName = "",
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no source at all, immediately use fallback
  const finalSrc = !src || error ? fallbackSrc : src;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gray-50 flex items-center justify-center ${containerClassName}`}>
      {/* Actual Image */}
      {finalSrc === DEFAULT_FALLBACK ? (
        // Custom Placeholder instead of an image file to avoid missing default assets
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 relative z-10">
          <ImageOff className="w-12 h-12 mb-2 opacity-50" />
          <span className="text-xs font-semibold">Image Not Available</span>
        </div>
      ) : (
        <React.Fragment>
          {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
          <Image
            src={finalSrc}
            alt={alt}
            className={`object-contain transition-opacity duration-300 ${className}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError(true);
              setIsLoading(false);
            }}
            {...props}
          />
        </React.Fragment>
      )}
    </div>
  );
}