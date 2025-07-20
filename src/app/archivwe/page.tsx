// ...existing code from portfolio/page.tsx, but with ArchivePage and ARCHIVE title...
"use client";
import CinematicIntro from '../../components/CinematicIntro';

const isLocked = true; // Set to false to unlock

export default function ArchivePage() {
  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">This page is currently locked.</h1>
        <p className="mt-4 text-lg text-black font-semibold">Only the Home and Events/Polls pages are accessible.</p>
      </div>
    );
  }
  return (
    <>
      <CinematicIntro title="ARCHIVE" />
      {/* ...rest of your archive page content... */}
    </>
  );
}
