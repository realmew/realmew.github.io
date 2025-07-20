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
];

const instagramLinks: Record<string, string> = {
  "CallMeSilly": "https://www.instagram.com/bleed4clout?igsh=dm1lamhyZWkxYjU1",
  "Juakooo": "https://www.instagram.com/00joakl?igsh=MXkwNW9yMW96Nmtycg==",
  "Wves": "https://www.instagram.com/fxwvsnxd?igsh=MTVmeXVrb2FvOTYxNA=="
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
    <div className="min-h-screen w-full flex flex-col items-center bg-transparent text-gray-900 dark:text-gray-100 pt-24 pb-32 overflow-visible">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-black">Meet Our Team</h1>
      <p className="text-lg max-w-2xl text-center mb-10 text-black">
        Our team is a diverse group of creative professionals dedicated to delivering exceptional work and groundbreaking music production. Get to know the people who make VISION possible.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {teamMembers.map((member) => (
          <div key={member.name} className="flex flex-col items-center bg-white/30 backdrop-blur-xl rounded-xl shadow-lg p-6 border-2 border-gray-300">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mb-3 object-cover border border-gray-300 dark:border-gray-600"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-300">
                {member.name[0]}
              </div>
            )}
            <span className="font-semibold text-lg flex items-center gap-2 text-gray-900">
              {member.name}
              {instagramLinks[member.name] && (
                <a href={instagramLinks[member.name]} target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.017 6.016a6.5 6.5 0 11-4.033 12.017 6.5 6.5 0 014.033-12.017zm-1.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </span>
            <p className="text-gray-700 text-sm text-center">{member.role}</p>
            <p className="text-gray-600 text-sm text-center mt-2">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
