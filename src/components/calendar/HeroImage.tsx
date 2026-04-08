"use client";

import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  primary: string;
  monthName: string;
  year: number;
  credit?: string;
}

export default function HeroImage({
  src,
  alt,
  primary,
  monthName,
  year,
  credit,
}: HeroImageProps) {
  return (
    <div className="relative w-full h-[240px] md:h-[280px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 900px"
        className="object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: "90px" }}>
        <svg
          viewBox="0 0 1000 90"
          preserveAspectRatio="none"
          className="w-full h-full"
          aria-hidden="true"
        >
          <polygon points="0,90 0,45 500,0 1000,45 1000,90" fill={primary} />
          <polygon points="0,90 0,62 500,20 1000,62 1000,90" fill={primary} opacity="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-end justify-end pr-8 pb-4 pointer-events-none z-10">
        <div className="text-right">
          <div
            className="font-display font-bold leading-none"
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {monthName}
          </div>
          <div className="text-white/80 font-body font-semibold text-lg tracking-widest">
            {year}
          </div>
        </div>
      </div>

      {credit ? (
        <div className="absolute bottom-1 right-2 text-[10px] text-white/60 z-10 select-none pointer-events-none">
          Photo: Unsplash
        </div>
      ) : null}
    </div>
  );
}
