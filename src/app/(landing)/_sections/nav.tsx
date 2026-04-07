"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_ITEMS, NAV_EYEBROW } from "@/content/landing";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-100 h-15 section-pad-x flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-bg-deep/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ height: 60 }}
    >
      <button
        onClick={() => go("hero")}
        className="bg-transparent border-none cursor-pointer p-0 flex items-center gap-0 flex-nowrap text-text"
        aria-label="PLANY — strona główna"
      >
        {NAV_EYEBROW.map((w, i) => (
          <span key={w} className="flex items-center">
            {i > 0 && (
              <span
                className="h-px bg-accent opacity-50"
                style={{
                  width: "clamp(10px,1.5vw,18px)",
                  margin: "0 clamp(5px,.8vw,9px)",
                }}
                aria-hidden
              />
            )}
            {w === "PLANY" ? (
              <Logo size={20} color="#C4A97D" />
            ) : (
              <span
                className="font-sans font-normal text-dim uppercase tracking-wider"
                style={{ fontSize: "clamp(9px,1vw,11px)" }}
              >
                {w}
              </span>
            )}
          </span>
        ))}
      </button>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-7">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            className="bg-transparent border-none cursor-pointer text-[11px] font-normal text-muted hover:text-text uppercase tracking-wider py-1 transition-colors"
          >
            {n.label}
          </button>
        ))}
        <button
          onClick={() => go("kontakt")}
          className="text-[11px] font-medium uppercase tracking-wider px-5 py-2 bg-accent text-white border-none cursor-pointer hover:bg-accent-hover transition-colors"
        >
          Wycena
        </button>
      </div>

      {/* Burger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden bg-transparent border-none cursor-pointer p-2 text-text"
        aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="md:hidden absolute top-15 inset-x-0 bg-bg-deep/95 backdrop-blur-md border-b border-line section-pad-x py-4 flex flex-col gap-3">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="bg-transparent border-none text-left cursor-pointer text-[13px] text-muted uppercase tracking-wide py-2"
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => go("kontakt")}
            className="mt-2 text-[12px] font-medium uppercase tracking-wider px-5 py-3 bg-accent text-white border-none cursor-pointer text-center"
          >
            Wycena
          </button>
        </div>
      )}
    </nav>
  );
}
