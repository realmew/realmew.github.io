import CinematicIntro from "@/components/CinematicIntro";
"use client";
"use client";
import { useState } from "react";

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-6 left-6 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-white/80 hover:bg-gray-200 text-black rounded-lg px-4 py-2 font-bold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Menu
      </button>
      {open && (
        <div
          className="mt-2 w-56 bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl shadow-xl py-5 flex flex-col animate-fade-in rotate-[-3deg] drop-shadow-lg relative scrapbook-paper"
          style={{ boxShadow: '0 8px 24px 0 rgba(0,0,0,0.10)', fontFamily: 'cursive, Comic Sans MS, Inter, sans-serif' }}
        >
          <div className="absolute -top-3 left-8 w-24 h-4 bg-gray-300/80 rounded rotate-[-6deg] shadow-md z-10 border border-gray-400/60" style={{borderStyle:'dashed'}}></div>
          <a href="/" className="px-5 py-2 mb-2 bg-gray-200 rounded-lg shadow border-2 border-gray-300 border-dashed hover:bg-gray-300 transition-colors rotate-[-4deg] -ml-3 scrapbook-link relative z-20 text-gray-900">Home
            <span className="absolute -top-2 -right-2 w-8 h-3 bg-gray-400/80 rounded rotate-[8deg] shadow border border-gray-500/60" style={{borderStyle:'dashed'}}></span>
          </a>
          <a href="/portfolio" className="px-5 py-2 mb-2 bg-gray-300 rounded-lg shadow border-2 border-gray-400 border-dashed hover:bg-gray-400 transition-colors rotate-[3deg] ml-4 scrapbook-link relative z-20 text-gray-900">Portfolio
            <span className="absolute -bottom-2 left-2 w-10 h-3 bg-gray-500/80 rounded rotate-[-8deg] shadow border border-gray-600/60" style={{borderStyle:'dashed'}}></span>
          </a>
          <a href="/contact" className="px-5 py-2 mb-2 bg-gray-100 rounded-lg shadow border-2 border-gray-200 border-dashed hover:bg-gray-200 transition-colors rotate-[-2deg] -ml-2 scrapbook-link relative z-20 text-gray-900">Contact
            <span className="absolute -top-2 right-4 w-7 h-3 bg-gray-400/80 rounded rotate-[6deg] shadow border border-gray-500/60" style={{borderStyle:'dashed'}}></span>
          </a>
          <a href="/art" className="px-5 py-2 bg-gray-400 rounded-lg shadow border-2 border-gray-500 border-dashed hover:bg-gray-500 transition-colors rotate-[2deg] ml-2 scrapbook-link relative z-20 text-gray-900">Art Gallery
            <span className="absolute -bottom-2 right-2 w-8 h-3 bg-gray-600/80 rounded rotate-[-7deg] shadow border border-gray-700/60" style={{borderStyle:'dashed'}}></span>
          </a>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 px-4 py-24">
      {/* Cinematic intro overlay */}
      <CinematicIntro />
      <DropdownMenu />
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center uppercase tracking-tight">Contact</h1>
        {submitted ? (
          <div className="text-center text-green-600 font-bold text-xl py-12">
            Thank you for reaching out!<br />We'll get back to you soon.
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 font-semibold text-gray-700">
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
                autoComplete="name"
              />
            </label>
            <label className="flex flex-col gap-2 font-semibold text-gray-700">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-2 font-semibold text-gray-700">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 resize-none"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors mt-2"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
