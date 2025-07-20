
"use client";
import CinematicIntro from "@/components/CinematicIntro";
import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  if (siteConfig.isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">{siteConfig.lockMessage}</h1>
        <p className="mt-4 text-lg text-black font-semibold">{siteConfig.lockSubMessage}</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-gray-900 pt-24 pb-32">
      <CinematicIntro title="Support" />
      <div className="max-w-lg w-full mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-center">Support & Contact</h2>
        <p className="text-base text-gray-700 mb-6 text-center text-black font-semibold">
          Need help or have a question? Reach out to our support team using the form below. Were here to assist you with any inquiries, feedback, or technical issues.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-green-600 text-center font-semibold py-8">
            Thank you for reaching out! Our support team will get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
}

