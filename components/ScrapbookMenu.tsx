"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrapbookMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-6 left-6 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-[#f8e8ff]/90 hover:bg-[#fffbe7] text-[#6d5a8d] rounded-lg px-4 py-2 font-bold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#f7d8b7] border-2 border-dashed border-[#d1b3e0]"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Menu
      </button>
      {/* AnimatePresence enables exit animations */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-2 w-56 bg-[#fffbe7] border-2 border-dashed border-[#f7d8b7] rounded-xl shadow-xl py-5 flex flex-col animate-fade-in rotate-[-3deg] drop-shadow-lg relative scrapbook-paper"
            aria-hidden={!open}
          >
            {/* Tape accent */}
            <div className="absolute -top-3 left-8 w-24 h-4 bg-[#f8e8ff] rounded rotate-[-6deg] shadow-md z-10 border border-[#d1b3e0]" style={{borderStyle:'dashed'}}></div>
            {/* Menu items as collage scraps */}
            <Link href="/" className="px-5 py-2 mb-2 bg-[#f8e8ff] rounded-lg shadow border-2 border-[#d1b3e0] border-dashed hover:bg-[#fffbe7] transition-colors rotate-[-4deg] -ml-3 scrapbook-link relative z-20 text-[#6d5a8d] font-bold">Home
              <span className="absolute -top-2 -right-2 w-8 h-3 bg-[#fffbe7] rounded rotate-[8deg] shadow border border-[#f7d8b7]" style={{borderStyle:'dashed'}}></span>
            </Link>
            <Link href="/archive" className="px-5 py-2 mb-2 bg-[#fffbe7] rounded-lg shadow border-2 border-[#f7d8b7] border-dashed hover:bg-[#f8e8ff] transition-colors rotate-[3deg] ml-4 scrapbook-link relative z-20 text-[#6d5a8d] font-bold">Archive
              <span className="absolute -bottom-2 left-2 w-10 h-3 bg-[#f7d8b7] rounded rotate-[-8deg] shadow border border-[#f7d8b7]" style={{borderStyle:'dashed'}}></span>
            </Link>
            <Link href="/contact" className="px-5 py-2 mb-2 bg-[#e0f7fa] rounded-lg shadow border-2 border-[#b3e0e0] border-dashed hover:bg-[#f8e8ff] transition-colors rotate-[-2deg] -ml-2 scrapbook-link relative z-20 text-[#6d5a8d] font-bold">Contact
              <span className="absolute -top-2 right-4 w-7 h-3 bg-[#f8e8ff] rounded rotate-[6deg] shadow border border-[#d1b3e0]" style={{borderStyle:'dashed'}}></span>
            </Link>
            <Link href="/art" className="px-5 py-2 bg-[#ffe7fa] rounded-lg shadow border-2 border-[#e0b3d7] border-dashed hover:bg-[#fffbe7] transition-colors rotate-[2deg] ml-2 scrapbook-link relative z-20 text-[#6d5a8d] font-bold">Art Gallery
              <span className="absolute -bottom-2 right-2 w-8 h-3 bg-[#e0b3d7] rounded rotate-[-7deg] shadow border border-[#e0b3d7]" style={{borderStyle:'dashed'}}></span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
