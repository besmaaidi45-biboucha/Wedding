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
    { id: "accueil", type: "video", name: "1.mp4" },
    { id: "page_2", type: "image", name: "2.svg" },
    { id: "page_3", type: "image", name: "3.svg" },
    { id: "page_4", type: "video", name: "4.mp4" },
    { id: "page_5", type: "image", name: "5.svg" },
    { id: "page_6", type: "image", name: "6.svg" },
    { id: "page_7", type: "image", name: "7.png" },
    { id: "page_8", type: "image", name: "8.png" },
    { id: "page_9", type: "image", name: "9.png" },
    { id: "page_10", type: "image", name: "10.png" },
    { id: "page_11", type: "video", name: "5.mp4" },
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
           key={section.src} // 🔥 OBLIGATOIRE
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => {
            console.log("VIDEO ERROR, fallback");
            (e.currentTarget as HTMLVideoElement).src = fallbackSrc;
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit:
               section.name === "1.mp4" 
               ? "contain"
               : "cover",
            zIndex: -1,
          }}
        >
          <source src={section.src} type="video/mp4" />
        </video>
      )}
    </section>
  );
}
