"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import InvitationOpeningAnimation from "./InvitationOpeningAnimation";
import OurStory from "./OurStory";
import PhotoUpload from "./PhotoUpload";
import WeddingHero from "./WeddingHero";
import WeddingInfo from "./WeddingInfo";
import WeddingNavigation from "./WeddingNavigation";

export default function WeddingExperience({ wedding }) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState("cover");

  const isOpening = phase === "opening";
  const isRevealed = phase === "revealed";
  const showCover = phase !== "revealed";

  useEffect(() => {
    document.body.style.overflow = isRevealed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isRevealed]);

  useEffect(() => {
    if (!isOpening) return undefined;

    const timeout = window.setTimeout(() => {
      setPhase("revealed");
    }, 1250);

    return () => window.clearTimeout(timeout);
  }, [isOpening]);

  function handleOpen() {
    if (phase !== "cover") return;
    if (prefersReducedMotion) {
      setPhase("revealed");
      return;
    }
    setPhase("opening");
  }

  return (
    <div className="paper-grain relative min-h-dvh overflow-x-hidden">
      <InvitationOpeningAnimation
        visible={showCover}
        isOpening={isOpening}
        onOpen={handleOpen}
        wedding={wedding}
      />

      <div
        className={isRevealed ? "" : "pointer-events-none"}
        inert={!isRevealed ? true : undefined}
      >
        <motion.div
          initial={false}
          animate={
            isOpening || isRevealed
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.985 }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <WeddingNavigation />
          <WeddingHero wedding={wedding} />
          <div className="mx-auto h-px w-16 bg-line/90" />
          <WeddingInfo wedding={wedding} />
          <div className="mx-auto h-px w-16 bg-line/90" />
          <OurStory wedding={wedding} />
          <div className="mx-auto h-px w-16 bg-line/90" />
          <PhotoUpload />
          <div className="mx-auto h-px w-16 bg-line/90" />
          <QuietSection
            id="messages"
            label="Messages"
            text="Mesajlar için bu alan yakında açılacaktır."
          />
          <div className="h-16 md:h-8" />
        </motion.div>
      </div>
    </div>
  );
}

function QuietSection({ id, label, text }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 px-6 py-24 sm:px-10 sm:py-32 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-md text-center">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-bronze">
          {label}
        </p>
        <p className="mt-8 font-serif text-lg font-light italic leading-8 text-muted">
          {text}
        </p>
      </div>
    </section>
  );
}
