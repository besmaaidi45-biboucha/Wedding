"use client"; // obligatoire pour useState/useEffect

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navItems = [
    { label: "Accueil", href: "/#accueil" },
    { label: "RSVP", href: "/rsvp" },
    { label: "Rubrique 1", href: "/#page_1" },
    { label: "Rubrique 2", href: "/#page_2" },
  ];

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navbar sur scroll
 useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY) setShow(true);       // scroll up
    else if (currentScrollY > lastScrollY + 10) setShow(false); // scroll down
    setLastScrollY(currentScrollY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (e.clientY < 50) setShow(true);    // curseur en haut → show
    else if (window.scrollY === 0) setShow(false); // pas de scroll → hide
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, [lastScrollY]);


  return (
    <header
      style={{
        position: "fixed",
        top: show ? 0 : "-100px",
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        padding: "20px 32px",
        backgroundColor: "var(--color-background)",
        transition: "top 0.3s ease",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: "32px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
