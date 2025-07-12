import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CinematicIntro({ title = "VISION" }: { title?: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.15, filter: "blur(16px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-cinematic-fade"
      aria-hidden="true"
    >
      <h1 className="text-6xl font-extrabold text-white tracking-widest drop-shadow-2xl animate-cinematic-title">
        {title}
      </h1>
    </motion.div>
  );
}
