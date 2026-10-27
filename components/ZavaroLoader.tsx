
"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const letters = ["Z", "A", "V", "A", "R", "O"];

export default function ZavaroLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setVisible(false),
      reduceMotion ? 500 : 2500
    );

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="zavaro-loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: reduceMotion ? 0.25 : 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f5f4f0] text-[#191918]"
          role="status"
          aria-label="Loading ZAVARO"
        >
          {/* Atmospheric light sweep */}
          {!reduceMotion && (
            <motion.div
              initial={{ x: "-150%", opacity: 0 }}
              animate={{
                x: ["-150%", "150%"],
                opacity: [0, 0.65, 0],
              }}
              transition={{
                duration: 1.8,
                delay: 0.2,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/90 to-transparent blur-2xl"
            />
          )}

          {/* Subtle background rings */}
          {!reduceMotion && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.16, 0] }}
              transition={{
                duration: 2.1,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute h-64 w-64 rounded-full border border-[#b8b0a3]/70 sm:h-80 sm:w-80"
            />
          )}

          <div className="relative z-10 flex flex-col items-center">
            {/* Staggered wordmark */}
            <div className="flex overflow-hidden py-3">
              {letters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="overflow-hidden"
                >
                  <motion.span
                    initial={{
                      y: reduceMotion ? 0 : "110%",
                      opacity: reduceMotion ? 1 : 0,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: reduceMotion ? 0.2 : 0.75,
                      delay: reduceMotion ? 0 : 0.15 + index * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block pl-[0.08em] text-[clamp(2.5rem,8vw,5rem)] font-medium tracking-[0.12em]"
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Expanding signature line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.9,
                delay: reduceMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 h-px w-28 origin-center bg-[#191918]"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8, letterSpacing: "0.12em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 1.15,
              }}
              className="mt-5 text-[9px] text-[#77766f]"
            >
              BEYOND THE ORDINARY
            </motion.p>
          </div>

          {/* Bottom signature */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="absolute bottom-8 text-[9px] tracking-[0.25em] text-[#77766f]"
          >
            CONTEMPORARY FASHION
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
