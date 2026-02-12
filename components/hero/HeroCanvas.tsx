"use client";

export function HeroCanvas() {
  return (
    <div className="relative w-full aspect-[16/5] rounded-[2rem] overflow-hidden bg-[var(--background-surface)]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Vídeo: discusión con agente de bienes raíces"
      >
        <source
          src="/vecteezy_discussion-with-a-real-estate-agent-house-model-with-agent_12829473.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
