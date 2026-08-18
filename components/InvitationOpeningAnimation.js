"use client";

import { AnimatePresence, motion } from "framer-motion";
import InvitationCover from "./InvitationCover";

const ease = [0.22, 1, 0.36, 1];

export default function InvitationOpeningAnimation({
  visible,
  isOpening,
  onOpen,
  wedding,
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="invitation-overlay"
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ perspective: 1400 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {!isOpening ? (
            <InvitationCover wedding={wedding} onOpen={onOpen} />
          ) : (
            <>
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 origin-right overflow-hidden"
                initial={{ rotateY: 0, x: 0 }}
                animate={{ rotateY: -82, x: "-14%" }}
                transition={{ duration: 1.2, ease }}
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="h-full w-[100vw] shadow-[8px_0_28px_rgba(44,40,36,0.12)]">
                  <InvitationCover
                    wedding={wedding}
                    onOpen={onOpen}
                    isOpening
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 origin-left overflow-hidden"
                initial={{ rotateY: 0, x: 0 }}
                animate={{ rotateY: 82, x: "14%" }}
                transition={{ duration: 1.2, ease }}
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative -ml-[50vw] h-full w-[100vw] shadow-[-8px_0_28px_rgba(44,40,36,0.12)]">
                  <InvitationCover
                    wedding={wedding}
                    onOpen={onOpen}
                    isOpening
                  />
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
