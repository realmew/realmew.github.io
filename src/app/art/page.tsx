"use client";
import Image from "next/image";
import CinematicIntro from "@/components/CinematicIntro";
import { useMemo, useRef, useState } from "react";

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

// Automatically generate 20 artwork entries
const NUM_ARTS = 20;
const artworks = Array.from({ length: NUM_ARTS }, (_, i) => ({
	src: `/art${i + 1}.jpg`,
	title: `Artwork #${i + 1}`,
	description: "",
}));
export default function ArtGallery() {
	// Generate initial random positions, sizes, and rotations for each artwork

	const initialLayout = useMemo(() => {
		return artworks.map((_, i) => {
			// Larger container for more photos
			const left = Math.floor(Math.random() * 1700) + 20; // 20-1720px
			const top = Math.floor(Math.random() * 900) + 20; // 20-920px
			const rotate = Math.floor(Math.random() * 30 - 15); // -15 to +15 deg
			const width = Math.floor(Math.random() * 160) + 160; // 160-320px
			const z = 10 + i; // Layering
			return { left, top, rotate, width, z };
		});
	}, []);

	// State for positions (so they can be updated on drag)
	const [positions, setPositions] = useState(initialLayout);
	const dragInfo = useRef<{ idx: number | null; offsetX: number; offsetY: number }>({ idx: null, offsetX: 0, offsetY: 0 });
	const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);

	// Mouse/touch event handlers
	const handleDragStart = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
		idx: number
	) => {
		e.preventDefault();
		let clientX: number, clientY: number;
		if (e.type === "touchstart") {
			const touchEvent = e as React.TouchEvent<HTMLDivElement>;
			clientX = touchEvent.touches[0].clientX;
			clientY = touchEvent.touches[0].clientY;
		} else {
			const mouseEvent = e as React.MouseEvent<HTMLDivElement>;
			clientX = mouseEvent.clientX;
			clientY = mouseEvent.clientY;
		}
		dragInfo.current = {
			idx,
			offsetX: clientX - positions[idx].left,
			offsetY: clientY - positions[idx].top,
		};
		window.addEventListener("mousemove", handleDragMove as EventListener, false);
		window.addEventListener("mouseup", handleDragEnd, false);
		window.addEventListener("touchmove", handleDragMove as EventListener, { passive: false });
		window.addEventListener("touchend", handleDragEnd, false);
	};

	const handleDragMove = (e: MouseEvent | TouchEvent) => {
		if (dragInfo.current.idx === null) return;
		let clientX: number, clientY: number;
		if (e.type === "touchmove") {
			const touchEvent = e as TouchEvent;
			clientX = touchEvent.touches[0].clientX;
			clientY = touchEvent.touches[0].clientY;
		} else {
			const mouseEvent = e as MouseEvent;
			clientX = mouseEvent.clientX;
			clientY = mouseEvent.clientY;
		}
		setPositions((prev) => {
			const newPos = [...prev];
			newPos[dragInfo.current.idx!] = {
				...newPos[dragInfo.current.idx!],
				left: clientX - dragInfo.current.offsetX,
				top: clientY - dragInfo.current.offsetY,
			};
			return newPos;
		});
		if (e.type.startsWith("touch")) e.preventDefault();
	};

	const handleDragEnd = () => {
		dragInfo.current = { idx: null, offsetX: 0, offsetY: 0 };
		window.removeEventListener("mousemove", handleDragMove as EventListener, false);
		window.removeEventListener("mouseup", handleDragEnd, false);
		window.removeEventListener("touchmove", handleDragMove as EventListener, false);
		window.removeEventListener("touchend", handleDragEnd, false);
	};

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 flex flex-col items-center pt-24 pb-40 px-4 relative overflow-x-auto">
	<CinematicIntro title="ART GALLERY" />
	  <DropdownMenu />
	  <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 mb-8 text-center tracking-tight uppercase drop-shadow-2xl font-serif z-10">
		Art Collage
	  </h1>
	  <div
		className="relative w-[1800px] h-[1000px] mx-auto z-10"
		style={{ maxWidth: "100vw" }}
	  >
		{artworks.map((art, i) => {
		  const layout = positions[i];
		  return (
			<div
			  key={i}
			  className="absolute bg-gray-100 rounded-xl p-1 shadow-lg flex flex-col items-center select-none cursor-grab"
			  style={{
				left: layout.left,
				top: layout.top,
				width: layout.width,
				transform: `rotate(${layout.rotate}deg)`,
				zIndex: layout.z,
				boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
				fontFamily: "cursive, Comic Sans MS, Inter, sans-serif",
			  }}
			  onMouseDown={(e) => handleDragStart(e, i)}
			  onTouchStart={(e) => handleDragStart(e, i)}
			  onClick={() => setFullscreenIdx(i)}
			>
			  {/* Tape accent */}
			  <div
				className="absolute -top-3 left-8 w-20 h-4 bg-gray-300/80 rounded rotate-[-6deg] shadow-md z-10 border border-gray-400/60"
				style={{ borderStyle: "dashed" }}
			  ></div>
			  <div className="w-full aspect-[4/3] relative mb-1 overflow-hidden rounded-lg">
				<Image
				  src={art.src}
				  alt={art.title}
				  fill
				  className="object-cover"
				/>
			  </div>
			  <h2 className="text-base font-bold text-gray-800 mb-1 text-center font-serif">
				{art.title}
			  </h2>
			  <p className="text-gray-500 text-center text-xs italic">
				{art.description}
			  </p>
			</div>
		  );
		})}
		{/* Fullscreen overlay */}
		{fullscreenIdx !== null && (
		  <div
			className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
			onClick={() => setFullscreenIdx(null)}
		  >
			<div
			  className="relative max-w-4xl w-full flex flex-col items-center"
			  onClick={(e) => e.stopPropagation()}
			>
			  <button
				className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black rounded-full px-4 py-2 font-bold shadow-lg text-lg z-50"
				onClick={() => setFullscreenIdx(null)}
				aria-label="Close fullscreen"
			  >
				×
			  </button>
			  <div className="w-full h-[60vh] sm:h-[80vh] relative flex items-center justify-center">
				<Image
				  src={artworks[fullscreenIdx].src}
				  alt={artworks[fullscreenIdx].title}
				  fill
				  className="object-contain rounded-xl shadow-2xl"
				  priority
				/>
			  </div>
			  <h2 className="text-2xl font-bold text-white mt-6 mb-2 text-center font-serif drop-shadow-lg">
				{artworks[fullscreenIdx].title}
			  </h2>
			</div>
		  </div>
		)}
	  </div>
	</div>
	);
}
