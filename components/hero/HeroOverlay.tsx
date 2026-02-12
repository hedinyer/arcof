"use client";

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <p className="mt-4 text-lg md:text-xl text-white/80 text-center max-w-xl">
        Cutting-edge technology meets innovative design
      </p>
    </div>
  );
}
