"use client";

import { useEffect, useRef, useState } from "react";
import { LogoTile } from "./Logo";

type Phase = "boot" | "assemble" | "open" | "gone";

const SESSION_KEY = "ekiz-intro-seen";
const LINE_EKIZ = "ekiz";
const LINE_YAZILIM = "YAZILIM";
const TOTAL_CHARS = LINE_EKIZ.length + LINE_YAZILIM.length;
const TYPE_START_MS = 1150;
const TYPE_CHAR_MS = 70;
const HOLD_AFTER_TYPE_MS = 450;
const OPEN_MS =
  TYPE_START_MS + TOTAL_CHARS * TYPE_CHAR_MS + HOLD_AFTER_TYPE_MS;
const DONE_MS = OPEN_MS + 1200;

export default function LogoLoader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("boot");
  const [charCount, setCharCount] = useState(0);
  const holeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setPhase("gone");
      return;
    }

    document.documentElement.classList.add("logo-loader-active");
    setPhase("assemble");

    const typeTimers: number[] = [];
    const typeKickoff = window.setTimeout(() => {
      for (let i = 1; i <= TOTAL_CHARS; i++) {
        typeTimers.push(
          window.setTimeout(() => {
            setCharCount(i);
          }, (i - 1) * TYPE_CHAR_MS),
        );
      }
    }, TYPE_START_MS);

    const openAt = window.setTimeout(() => setPhase("open"), OPEN_MS);
    const doneAt = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.documentElement.classList.remove("logo-loader-active");
      setPhase("gone");
    }, DONE_MS);

    return () => {
      window.clearTimeout(typeKickoff);
      typeTimers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(openAt);
      window.clearTimeout(doneAt);
      document.documentElement.classList.remove("logo-loader-active");
    };
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const el = holeRef.current;
    if (!el) return;

    let anim: Animation | undefined;
    const raf = window.requestAnimationFrame(() => {
      anim = el.animate(
        [
          { transform: "translate(-50%, -50%) scale(1)" },
          { transform: "translate(-50%, -50%) scale(60)" },
        ],
        {
          duration: 1200,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
          fill: "forwards",
        },
      );
    });

    return () => {
      window.cancelAnimationFrame(raf);
      anim?.cancel();
    };
  }, [phase]);

  return (
    <>
      {children}

      {phase !== "gone" && (
        <div
          className={`logo-loader logo-loader--${phase}`}
          role="status"
          aria-live="polite"
          aria-label="Yükleniyor"
        >
          <div ref={holeRef} className="logo-loader__hole" aria-hidden="true" />

          {phase === "assemble" && (
            <div className="logo-loader__brand">
              <div className="logo-loader__stage">
                <span className="logo-loader__layer logo-loader__core"><LogoTile size={140} /></span>
              </div>


              <div className="logo-loader__wordmark" aria-hidden="true">
                <span className="logo-loader__ekiz">
                  {LINE_EKIZ.slice(0, Math.min(charCount, LINE_EKIZ.length))}
                  {charCount > 0 &&
                    charCount < LINE_EKIZ.length && (
                      <span className="logo-loader__caret" />
                    )}
                </span>
                <span className="logo-loader__yazilim">
                  {charCount > LINE_EKIZ.length
                    ? LINE_YAZILIM.slice(0, charCount - LINE_EKIZ.length)
                    : ""}
                  {charCount >= LINE_EKIZ.length &&
                    charCount < TOTAL_CHARS && (
                      <span className="logo-loader__caret" />
                    )}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
