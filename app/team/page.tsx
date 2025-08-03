"use client";
import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";

const teamMembers = [
  {
    name: "Seth",
    role: "Team Member",
    description: "Hi im seth (wym by bio)",
    photo: "/Seth.jpg",
  },
  {
    name: "Mob Boss Dre",
    role: "Team Member",
    description: "dre",
    photo: "/Mob Boss Dre.png",
  },
  {
    name: "CallMeSilly",
    role: "Team Member",
    description: "Hello I Exist And I'm Silly",
    photo: "/CallMeSilly.jpg",
  },
  {
    name: "Crahout",
    role: "Team Member",
    description: "I've got you",
    photo: "/Crahout.png",
  },
  {
    name: "Grass",
    role: "Team Member",
    description: "Sup its Grass and this is your reminder to go touch grass (not me but actual grass... nvm)",
    photo: "/Grass.jpg",
  },
  {
    name: "John Lunny",
    role: "Team Member",
    description: "I am John Lunny",
    photo: "/John Lunny.jpg",
  },
  {
    name: "Juakooo",
    role: "Team Member",
    description: "goofy goober",
    photo: "/juakooo.png",
  },
  {
    name: "KRXN",
    role: "Team Member",
    description: "hi im krxn aka youn thoug and mangoes are really good just saying ok peace",
    photo: "/KRXN.gif",
  },
  {
    name: "Wves",
    role: "Team Member",
    description: "",
    photo: "",
    instagram: "https://instagram.com/wves"
  },
  {
    name: "Sharpz",
    role: "Team Member",
    description: "20 🇵🇷 intermediate artist",
    photo: "/Sharpz.png",
  },
  {
    name: "Ambitiousgoat23",
    role: "Team Member", 
    description: "idk what to describe myself",
    photo: "/ambitousgoat23.png",
  },
  {
    name: "Macintosh 💿",
    role: "Team Member",
    description: "I'm Macintosh, and I like to mix, master, or add extra production on unreleased music. I used to be a huge Kanye fan but due to the recent incidents, I converted myself into a Dua Lipa fan.",
    photo: "/Macintosh.jpg",
  },
];

const socialLinks: Record<string, { instagram?: string; newgrounds?: string; youtube?: string }> = {
  "CallMeSilly": { 
    instagram: "https://www.instagram.com/bleed4clout?igsh=dm1lamhyZWkxYjU1" 
  },
  "Juakooo": { 
    instagram: "https://www.instagram.com/00joakl?igsh=MXkwNW9yMW96Nmtycg==" 
  },
  "Wves": { 
    instagram: "https://www.instagram.com/fxwvsnxd?igsh=MTVmeXVrb2FvOTYxNA==" 
  },
  "Sharpz": {
    newgrounds: "https://sharpz.newgrounds.com/",
    youtube: "https://www.youtube.com/@Sh_rpz"
  },
  "Ambitiousgoat23": {
    youtube: "https://www.youtube.com/@AmbitousGoat"
  }
};

export default function TeamPage() {
  if (siteConfig.isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">{siteConfig.lockMessage}</h1>
        <p className="mt-4 text-lg text-black font-semibold">{siteConfig.lockSubMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-transparent text-gray-900 pt-16 pb-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Our Team</h1>
        <p className="text-gray-600 text-sm max-w-lg">Creative professionals making VISION possible</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full max-w-6xl px-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="flex flex-col items-center bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-gray-200 hover:bg-white/30 transition-all">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full mb-2 object-cover border border-gray-300"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center text-lg font-bold text-gray-500">
                {member.name[0]}
              </div>
            )}
            <div className="text-center">
              <h3 className="font-medium text-sm text-gray-900 leading-tight mb-1">{member.name}</h3>
              {member.description && (
                <p className="text-xs text-gray-600 mb-2 leading-relaxed">{member.description}</p>
              )}
              {socialLinks[member.name] && (
                <div className="flex justify-center gap-1">
                  {socialLinks[member.name].instagram && (
                    <a href={socialLinks[member.name].instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-pink-500 hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {socialLinks[member.name].newgrounds && (
                    <a href={socialLinks[member.name].newgrounds} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-orange-500 hover:text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-16.5v3.5h2v-3.5h-2zm0 5v7h2v-7h-2z"/>
                      </svg>
                    </a>
                  )}
                  {socialLinks[member.name].youtube && (
                    <a href={socialLinks[member.name].youtube} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-red-500 hover:text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
