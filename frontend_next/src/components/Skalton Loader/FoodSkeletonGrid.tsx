"use client";

import { motion } from "framer-motion";

export default function FoodSkeletonGrid() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {/* Logo Animation */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Rotating Circle F */}
        <motion.span
          className="inline-flex items-center justify-center h-12 w-12 bg-[#217041] text-white text-xl font-bold rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        >
          F
        </motion.span>

        {/* Text Wave Animation */}
        <div className="flex space-x-1 text-2xl font-bold text-gray-800">
          {"oodessa".split("").map((letter, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Loading Dots */}
      <div className="flex mt-6 space-x-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-3 w-3 rounded-full bg-[#217041]"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              delay: dot * 0.2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>
    </div>
  );
}
