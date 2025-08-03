
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";

export default function ArchivePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [modalAnimating, setModalAnimating] = useState(false);
  const [unlockAnimation, setUnlockAnimation] = useState(false);
  const [vaultAnimStage, setVaultAnimStage] = useState<'idle'|'spinning'|'click'|'open'>('idle');
  const [downloadModal, setDownloadModal] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const archiveItems = [
    {
      title: "Yandhi",
      description: "Unreleased Kanye West album",
      year: "2024",
      gradient: "from-purple-500 to-blue-600",
      image: "/yandhipoll.gif",
      tracklist: [
        "001. Chakras",
        "002. The Storm",
        "003. We Free (Interlude)",
        "004. 80 Degrees",
        "005. New Body",
        "006. Alien",
        "007. I Love It",
        "008. Cash To Burn",
        "009. We Got Love",
        "010. Spread Your Wings",
        "011. City In The Sky",
        "012. The Garden",
        "013. All Dreams Real",
        "014. Home",
        "015. Last Name",
        "016. Law Of Attraction"
      ]
    },
    {
      title: "SWISH", 
      description: "Early version of The Life of Pablo",
      year: "2024",
      gradient: "from-green-500 to-teal-600",
      image: "/swishpoll.jpg",
      tracklist: [
        "01. Liberated",
        "02. Nina Chop",
        "03. Enya",
        "04. Highlights",
        "05. Feedback",
        "06. Mitus Touch",
        "07. Fade",
        "08. Fuck RT Now",
        "09. Rap Tarantino",
        "10. Hold Tight",
        "11. Don't Jump",
        "12. FMLU",
        "13. Wolves",
        "14. That's On You",
        "15. Ultimate Lie",
        "16. Real Freinds",
        "17. 10,000 Hours And A Dream",
        "18. I Feel Like That",
        "19. Fuck The Internet"
      ]
    },
    {
      title: "Bad Bitch Playbook",
      description: "Creative musical project",
      year: "2024", 
      gradient: "from-orange-500 to-red-600",
      image: "/badbitchplaybook.png",
      tracklist: [
        "01. IN THE STARS",
        "02. TIMBO FREESTYLE",
        "03. CHEESECAKE FACTORY",
        "04. BURN",
        "05. LIFESTYLE",
        "06. PAPA WANNA SEE",
        "07. PAPERWORK",
        "08. DON'T KILL THE PARTY",
        "09. SMOKING ON JUNT",
        "10. DRUNK",
        "11. GUN TO MY HEAD",
        "12. FOREVER ROLLIN'",
        "13. BELIEVER",
        "14. RIVER",
        "15. CITY UNDERGROUND",
        "16. BEG FORGIVENESS"
      ]
    },
    {
      title: "Late Orchestration",
      description: "Orchestral reimagining of Late Registration",
      year: "2024-2025",
      gradient: "from-pink-500 to-purple-600",
      image: "/lateorchestration.jpg",
      tracklist: [
        "01. Introduction",
        "02. Touch the Sky",
        "03. Through the Wire", 
        "04. Jesus Walks",
        "05. Heard 'Em Say",
        "06. Gold Digger",
        "07. Skit #1",
        "08. Gone",
        "09. Diamonds from Sierra Leone (Remix)",
        "10. We Major",
        "11. Hey Mama",
        "12. Celebration",
        "13. Gone",
        "14. Touch the Sky",
        "15. Diamonds from Sierra Leone (Remix)",
        "16. Late"
      ]
    },
    {
      title: "Y33ZU5: GOD FORBIDDEN",
      description: "Experimental hip-hop album", 
      year: "2025",
      gradient: "from-indigo-500 to-blue-600",
      image: "/yeezus.jpg",
      tracklist: [
        "01. On Sight",
        "02. Black Skinhead",
        "03. I Am A God (feat. God)",
        "04. New Slaves",
        "05. Hold My Liquor (feat. Chief Keef & Justin Vernon)",
        "06. I'm In It",
        "07. Blood On The Leaves",
        "08. Guilt Trip (feat. Kid Cudi)",
        "09. Send It Up (feat. King Louie)",
        "10. Bound 2",
        "11. God Level",
        "12. Awesome"
      ]
    },
    {
      title: "JACKBOYS 2",
      description: "Hip-hop collective album",
      year: "2025",
      gradient: "from-yellow-500 to-orange-600",
      image: "/ijackboystoo.jpg",
      tracklist: [
        "01. JB2 RADIO",
        "02. CHAMPAIN & VACAY",
        "03. 2000 EXCURSION",
        "04. KICK OUT",
        "05. DUMBO",
        "06. MM3",
        "07. VELOUR",
        "08. CONTEST",
        "09. ILMB",
        "10. WHERE WAS YOU",
        "11. NO COMMENTS",
        "12. BEEP BEEP",
        "13. PBT",
        "14. SHYNE",
        "15. OUTSIDE",
        "16. CANT STOP",
        "17. FLORIDA FLOW",
        "18. DA WIZARD",
        "19. TRIP OUT",
        "20. 110 SOUTH"
      ]
    }
  ];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % archiveItems.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + archiveItems.length) % archiveItems.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const handleExplore = (album: any) => {
    setModalAnimating(true);
    setTimeout(() => {
      setSelectedAlbum(album);
      setModalAnimating(false);
    }, 150);
  };

  const handleDownload = (album: any) => {
    setDownloadModal(true);
  };

  const downloadAlbum = (type: 'album' | 'stems') => {
    // Create download link for ZIP file
    const fileName = type === 'album' 
      ? `${selectedAlbum.title.replace(/[^a-zA-Z0-9]/g, '_')}_Album.zip`
      : `${selectedAlbum.title.replace(/[^a-zA-Z0-9]/g, '_')}_Stems.zip`;
    
    // In a real implementation, this would link to actual ZIP files
    // For now, we'll simulate the download
    const link = document.createElement('a');
    link.href = type === 'album' 
      ? `/downloads/${selectedAlbum.title.replace(/[^a-zA-Z0-9]/g, '_')}_Album.zip`
      : `/downloads/${selectedAlbum.title.replace(/[^a-zA-Z0-9]/g, '_')}_Stems.zip`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close modals
    setDownloadModal(false);
    setSelectedAlbum(null);
  };

  const getPrevIndex = () => (currentIndex - 1 + archiveItems.length) % archiveItems.length;
  const getNextIndex = () => (currentIndex + 1) % archiveItems.length;

  if (siteConfig.isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">{siteConfig.lockMessage}</h1>
        <p className="mt-4 text-lg text-black font-semibold">{siteConfig.lockSubMessage}</p>
      </div>
    );
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "vsn") {
      setPasswordError("");
      setUnlockAnimation(true);
      setVaultAnimStage('spinning');
      setLoadingStep(0);
      // Cycle through loading steps
      const steps = [
        "Authenticating user...",
        "Loading archive_manifest.json...",
        "Decrypting yandhi_album.zip...",
        "Loading swish_tracklist.dat...",
        "Accessing bbpb_stems.wav...",
        "Loading late_orchestration.flac...",
        "Decrypting y33zu5_samples.aiff...",
        "Loading jackboys2_vault.rar...",
        "Finalizing archive access..."
      ];
      const stepInterval = setInterval(() => {
        setLoadingStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(stepInterval);
            // After loading, do a vault click/shake, then open
            setVaultAnimStage('click');
            setTimeout(() => {
              setVaultAnimStage('open');
              setTimeout(() => {
                setModalOpen(false);
                setUnlocked(true);
                setUnlockAnimation(false);
                setVaultAnimStage('idle');
                setLoadingStep(0);
              }, 700); // vault door open duration
            }, 400); // click duration
            return prev;
          }
        });
      }, 300);
    } else {
      setPasswordError("Incorrect password. Please try again.");
      setPassword(""); // Clear the password field
    }
  };

  return (
    <div className="flex flex-col items-center text-gray-900 relative">
      <audio ref={audioRef} src="/yandhi.mp3" preload="auto" />
      {/* Full-screen pastel waves on icon hover */}
      {isHovering && <div className="pastel-waves" />}
      {/* Main content (only show before unlock) */}
      {!unlocked && (
        <div className="flex flex-col items-center mt-24 mb-8 relative z-40">
          <h2 className="text-3xl font-bold mb-4">Access the Archive</h2>
          <p className="text-base text-gray-700 mb-6 text-center max-w-lg">
            The VISION Archive contains a curated selection of past works, creative projects, and milestones. Enter the password to unlock exclusive content and explore our creative journey.
          </p>
          {/* Vault icon with hover audio and click to open modal */}
          <div className="flex flex-col items-center mb-6">
            <button
              ref={btnRef}
              className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-4 border-white/20 shadow-2xl flex items-center justify-center transition-transform duration-700 ease-in-out hover:rotate-[420deg] focus:outline-none focus:ring-4 focus:ring-indigo-400/40 group"
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => { setIsHovering(true); audioRef.current?.play(); }}
              onMouseLeave={() => { setIsHovering(false); audioRef.current?.pause(); if (audioRef.current) audioRef.current.currentTime = 0; }}
              aria-label="Enter the vault"
            >
              <svg
                className="w-32 h-32 md:w-40 md:h-40 text-white drop-shadow-lg"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="20" stroke="#fff" strokeWidth="3" fill="#222" />
                <circle cx="24" cy="24" r="4" fill="#fff" />
                <g stroke="#fff" strokeWidth="2">
                  <line x1="24" y1="8" x2="24" y2="16" />
                  <line x1="24" y1="32" x2="24" y2="40" />
                  <line x1="8" y1="24" x2="16" y2="24" />
                  <line x1="32" y1="24" x2="40" y2="24" />
                  <line x1="13.5" y1="13.5" x2="18.5" y2="18.5" />
                  <line x1="29.5" y1="29.5" x2="34.5" y2="34.5" />
                  <line x1="13.5" y1="34.5" x2="18.5" y2="29.5" />
                  <line x1="29.5" y1="18.5" x2="34.5" y2="13.5" />
                </g>
              </svg>
            </button>
            <span className="mt-4 text-white text-lg font-bold tracking-wide select-none">Enter the Vault</span>
          </div>
        </div>
      )}
      {/* Password modal */}
      {modalOpen && !unlocked && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className={`bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center transition-all duration-300 ${unlockAnimation ? 'scale-110 opacity-50' : 'scale-100 opacity-100'}`}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Enter Password</h2>
            <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4">
              <input
                type="password"
                className="border border-gray-300 rounded px-6 py-4 text-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
              />
              {passwordError && (
                <div className="text-red-500 text-sm text-center font-medium">
                  {passwordError}
                </div>
              )}
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 rounded font-semibold hover:bg-gray-700 transition-colors w-full"
              >
                Unlock
              </button>
              <button
                type="button"
                className="mt-2 text-gray-500 hover:underline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Unlock Animation Overlay */}
      {unlockAnimation && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-[60]">
          <div className="text-center">
            <div className="relative">
              {/* Vault Door Animation - Enhanced */}
              <div className="w-48 h-48 mx-auto mb-8 relative overflow-visible">
                {/* Outer vault ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-400/40 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border-4 border-gray-300/60 animate-ping"></div>
                <div className="absolute inset-8 rounded-full border-4 border-gray-200 animate-spin"></div>
                {/* Vault door with animated wheel and door */}
                <div className={`absolute inset-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl flex items-center justify-center transition-all duration-700 ${vaultAnimStage === 'open' ? 'translate-y-[-400px] opacity-0' : 'translate-y-0 opacity-100'}`}
                  style={{ zIndex: 2 }}
                >
                  {/* Animated wheel */}
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-inner flex items-center justify-center relative`}
                    style={{
                      transform:
                        vaultAnimStage === 'spinning' ? 'rotate(1080deg)' :
                        vaultAnimStage === 'click' ? 'rotate(1080deg) scale(1.08)' :
                        'rotate(0deg) scale(1)'
                    ,
                    transition:
                      vaultAnimStage === 'spinning' ? 'transform 1.2s cubic-bezier(0.4,0,0.2,1)' :
                      vaultAnimStage === 'click' ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' :
                      'transform 0.7s cubic-bezier(0.4,0,0.2,1)'
                    }}
                  >
                    <div className="w-2 h-8 bg-gray-400 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-400 rounded-full absolute"></div>
                  </div>
                </div>
                {/* Vault door front (for sliding/fading open) */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl transition-all duration-700 ${vaultAnimStage === 'open' ? 'translate-y-[-400px] opacity-0' : 'translate-y-0 opacity-100'}`} style={{ zIndex: 1 }}></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-100 mb-2 animate-pulse">VISION Archive</h2>
              <p className="text-xl text-gray-300 mb-6 animate-pulse">Vault Unlocking...</p>
              {/* Loading Steps */}
              <div className="mb-6 h-12 flex items-center justify-center">
                <p className="text-green-400 text-sm font-mono animate-pulse">
                  {loadingStep === 0 && "Authenticating user..."}
                  {loadingStep === 1 && "Loading archive_manifest.json..."}
                  {loadingStep === 2 && "Decrypting yandhi_album.zip..."}
                  {loadingStep === 3 && "Loading swish_tracklist.dat..."}
                  {loadingStep === 4 && "Accessing bbpb_stems.wav..."}
                  {loadingStep === 5 && "Loading late_orchestration.flac..."}
                  {loadingStep === 6 && "Decrypting y33zu5_samples.aiff..."}
                  {loadingStep === 7 && "Loading jackboys2_vault.rar..."}
                  {loadingStep === 8 && "Finalizing archive access..."}
                </p>
              </div>
              {/* Progress bar */}
              <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full transition-all duration-300"
                  style={{ width: `${((loadingStep + 1) / 9) * 100}%` }}
                ></div>
              </div>
              {/* Loading dots */}
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-3 h-3 bg-gray-200 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Archive content - 3D card carousel */}
      {unlocked && (
        <div className="w-full flex flex-col items-center px-4 pt-4 pb-4 animate-fadeIn min-h-[calc(100vh-64px)] justify-start">
          <div className="text-center mb-8 animate-slideUp pt-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">VISION VAULT</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Navigate through the vault collection
            </p>
          </div>
          {/* 3D Carousel Container */}
          <div className="relative w-full max-w-6xl h-80 flex items-center justify-center overflow-hidden">
            {/* Left Navigation Button */}
            <button 
              onClick={goToPrev}
              className="absolute left-8 z-20 w-16 h-16 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <span className="text-2xl">←</span>
            </button>
            {/* Carousel Track */}
            <div className={`carousel-track flex items-center justify-center space-x-16 ${isTransitioning ? 'transitioning' : ''}`}>
              {/* Left Card (previous) */}
              <div className={`card-container left-card opacity-40 scale-75 ${isTransitioning ? 'slide-out-left' : ''}`}>
                <div className="archive-single-card bg-gray-900">
                  <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={archiveItems[getPrevIndex()].image}
                      alt={archiveItems[getPrevIndex()].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <span className="text-white text-lg font-bold">{archiveItems[getPrevIndex()].title}</span>
                  <span className="text-white/60 text-xs mt-2">{archiveItems[getPrevIndex()].year}</span>
                </div>
              </div>
              {/* Center Card (current) */}
              <div className={`card-container center-card opacity-100 scale-100 ${isTransitioning ? 'slide-center' : ''}`}>
                <div className="archive-single-card bg-gray-900 hover:scale-105">
                  <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={archiveItems[currentIndex].image}
                      alt={archiveItems[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <span className="text-white text-xl font-bold">{archiveItems[currentIndex].title}</span>
                  <p className="text-white/90 text-sm mt-2 text-center">{archiveItems[currentIndex].description}</p>
                  <span className="text-white/70 text-xs mt-2">{archiveItems[currentIndex].year}</span>
                  <div 
                    className="mt-3 px-4 py-2 bg-white/20 rounded-full text-white text-xs font-medium cursor-pointer hover:bg-white/30 hover:scale-105 active:scale-95 transition-all duration-200 transform hover:shadow-lg"
                    onClick={() => handleExplore(archiveItems[currentIndex])}
                  >
                    Click to explore
                  </div>
                </div>
              </div>
              {/* Right Card (next) */}
              <div className={`card-container right-card opacity-40 scale-75 ${isTransitioning ? 'slide-out-right' : ''}`}>
                <div className="archive-single-card bg-gray-900">
                  <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={archiveItems[getNextIndex()].image}
                      alt={archiveItems[getNextIndex()].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <span className="text-white text-lg font-bold">{archiveItems[getNextIndex()].title}</span>
                  <span className="text-white/60 text-xs mt-2">{archiveItems[getNextIndex()].year}</span>
                </div>
              </div>
            </div>
            {/* Right Navigation Button */}
            <button 
              onClick={goToNext}
              className="absolute right-8 z-20 w-16 h-16 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <span className="text-2xl">→</span>
            </button>
          </div>
          {/* Progress Indicators - ensure visible */}
          <div className="flex space-x-2 mt-8 z-30 relative">
            {archiveItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full border border-white/40 transition-all duration-300 ${
                  index === currentIndex ? 'bg-gray-900 scale-125' : 'bg-gray-300 hover:bg-gray-500'
                } ${isTransitioning ? 'pointer-events-none' : ''}`}
                style={{ boxShadow: '0 0 4px 1px rgba(0,0,0,0.15)' }}
              />
            ))}
          </div>
          {/* Navigation Hint */}
          <div className="mt-6 text-center pb-16">
            <p className="text-gray-500 text-sm">Use the arrow buttons or dots to navigate • {currentIndex + 1} of {archiveItems.length}</p>
          </div>
        </div>
      )}
      
      {/* Album Details Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className={`bg-gray-900 rounded-xl shadow-2xl p-6 max-w-4xl w-full text-white transform transition-all duration-300 ${modalAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-slideUp'}`}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold">{selectedAlbum.title}</h2>
              <button 
                onClick={() => setSelectedAlbum(null)}
                className="text-white/60 hover:text-white text-2xl hover:rotate-90 transition-all duration-200"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side - Image and basic info */}
              <div className="space-y-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={selectedAlbum.image}
                    alt={selectedAlbum.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Description</h3>
                  <p className="text-lg">{selectedAlbum.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Year</h3>
                  <p className="text-lg">{selectedAlbum.year}</p>
                </div>
              </div>
              
              {/* Right side - Tracklist */}
              <div>
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-3">Tracklist</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 text-sm">
                  {selectedAlbum.tracklist?.map((track: string, index: number) => (
                    <p key={index} className="text-white/90 py-1 px-2 rounded hover:bg-white/10 transition-colors">
                      {track}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-white/60 text-sm mb-4">
                This album is part of the VISION Collective archive showcasing our musical journey and creative evolution.
              </p>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
                  onClick={() => setSelectedAlbum(null)}
                >
                  Close
                </button>
                <button 
                  className="flex-1 bg-white text-gray-900 hover:bg-white/90 px-4 py-2 rounded-lg font-semibold transition-all"
                  onClick={() => handleDownload(selectedAlbum)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Choice Modal */}
      {downloadModal && selectedAlbum && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[70] p-4">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full text-white animate-slideUp">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Download {selectedAlbum.title}</h3>
              <p className="text-white/70">Choose your download format:</p>
            </div>
            
            <div className="space-y-4">
              <button 
                className="w-full bg-gradient-to-r from-gray-800/60 to-gray-700/60 hover:from-purple-800/70 hover:to-blue-800/70 text-white px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-3 border border-white/20"
                onClick={() => downloadAlbum('album')}
              >
                <span className="text-xl">🎵</span>
                <div className="text-left">
                  <div>Full Album</div>
                  <div className="text-sm text-white/60">Complete mixed tracks</div>
                </div>
              </button>
              
              <button 
                className="w-full bg-gradient-to-r from-gray-800/60 to-gray-700/60 hover:from-green-800/70 hover:to-teal-800/70 text-white px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-3 border border-white/20"
                onClick={() => downloadAlbum('stems')}
              >
                <span className="text-xl">🎛️</span>
                <div className="text-left">
                  <div>Stems Pack</div>
                  <div className="text-sm text-white/60">Individual track elements</div>
                </div>
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/20">
              <button 
                className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
                onClick={() => setDownloadModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
