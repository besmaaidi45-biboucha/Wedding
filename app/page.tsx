"use client";

import { useEffect, useRef } from "react";

type Section = {
  id: string;
  type: "image" | "video";
  src: string;
};

export default function Home() {
  const sections: Section[] = [
    { id: "accueil", type: "video", src: "/videos/12.mp4" },
    { id: "page_2", type: "image", src: "/images/2.png" },
    { id: "page_3", type: "image", src: "/images/page_3.png" },
    { id: "page_4", type: "image", src: "/images/page_4.png" },
    { id: "page_6", type: "video", src: "/videos/3.mp4" },
    { id: "page_5", type: "image", src: "/images/page_5.png" },
  ];

  return (
    <main style={{ margin: 0, padding: 0 }}>
      {sections.map((section) => (
        <FullSection key={section.id} section={section} />
      ))}
    </main>
  );
}

/* ============================= */

function FullSection({ section }: { section: Section }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch(() => {
          // IMPORTANT : on ignore volontairement l’erreur autoplay
          // pour éviter le crash Next.js
        });
    }
  }, []);

  return (
    <section
      id={section.id}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        scrollMarginTop: "80px",
      }}
    >
      {/* IMAGE */}
      {section.type === "image" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${section.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
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
