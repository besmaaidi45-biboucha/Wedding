"use client";

import { useEffect, useRef, useState } from "react";

type Section = {
  id: string;
  type: "image" | "video";
  name: string; // nom du fichier sans dossier
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const update = () => setIsMobile(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const sections: Section[] = [
    { id: "accueil", type: "video", name: "12.mp4" },
    { id: "page_2", type: "image", name: "11.svg" },
    { id: "page_3", type: "image", name: "12.svg" },
    { id: "page_4", type: "image", name: "13.svg" },
    { id: "page_6", type: "video", name: "3.mp4" },
    { id: "page_5", type: "image", name: "6.png" },
  ];

  return (
    <main style={{ margin: 0, padding: 0 }}>
      {sections.map((section) => {
        const basePath =
          section.type === "image" ? "/images" : "/videos";

        const src = isMobile
          ? `${basePath}/mobile/${section.name}`
          : `${basePath}/desktop/${section.name}`;

        return (
          <FullSection
            key={section.id}
            section={{ ...section, src }}
            fallbackSrc={`${basePath}/desktop/${section.name}`}
            isMobile={isMobile}
          />
        );
      })}
    </main>
  );
}

/* ============================= */

function FullSection({
  section,
  fallbackSrc,
  isMobile,
}: {
  section: Section & { src: string };
  fallbackSrc: string;
  isMobile: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (section.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [section.src, section.type]);

  return (
    <section
      id={section.id}
      style={{
        position: "relative",
        width: "100%",
        height: section.type === "video" ? "100vh" : "auto",
        aspectRatio: 
            section.type === "image"
	  ? isMobile 
            ? " 4 / 5" 
            : "16 / 9"
          : undefined,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        scrollMarginTop: "80px",
      }}
    >
      {/* IMAGE */}
      {section.type === "image" && (
        <div
  className="hero-bg"
  style={{ backgroundImage: `url(${section.src})` }}
/>

      )}

      {/* VIDEO */}
      {section.type === "video" && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => {
            // fallback si la vidéo mobile n’existe pas
            (e.currentTarget as HTMLVideoElement).src = fallbackSrc;
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={section.src} type="video/mp4" />
        </video>
      )}
    </section>
  );
}
