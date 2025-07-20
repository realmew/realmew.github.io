"use client";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import CinematicIntro from "@/components/CinematicIntro";
import { siteConfig } from "@/config/siteConfig";

// Duplicate code removed

export default function ArtGallery() {
  const NUM_ARTS = 8;
  const artworks = Array.from({ length: NUM_ARTS }, (_, i) => ({
	src: `/art${i + 1}.jpg`,
	title: `Artwork #${i + 1}`,
	description: "",
  }));
  type Layout = { left: number; top: number; rotate: number; width: number; z: number };
  const initialLayout = useMemo(() => {
	return artworks.map((_, i) => {
	  const left = Math.floor(Math.random() * 1700) + 20;
	  const top = Math.floor(Math.random() * 900) + 20;
	  const rotate = Math.floor(Math.random() * 30 - 15);
	  const width = Math.floor(Math.random() * 160) + 160;
	  const z = 10 + i;
	  return { left, top, rotate, width, z };
	});
  }, [artworks]);
  const [positions, setPositions] = useState<Layout[]>(initialLayout);
  const dragInfo = useRef<{ idx: number | null; offsetX: number; offsetY: number }>({ idx: null, offsetX: 0, offsetY: 0 });
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);
  if (siteConfig.isLocked) {
	return (
	  <div className="min-h-screen flex items-center justify-center text-center">
		<h1 className="text-3xl font-bold">{siteConfig.lockMessage}</h1>
		<p className="mt-4 text-lg text-black font-semibold">{siteConfig.lockSubMessage}</p>
	  </div>
	);
  }

  // ...existing code...
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
	  offsetX: clientX - positions[idx]?.left,
	  offsetY: clientY - positions[idx]?.top,
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
	setPositions((prev: Layout[]) => {
	  const newPos = [...prev];
	  if (dragInfo.current.idx !== null) {
		newPos[dragInfo.current.idx] = {
		  ...newPos[dragInfo.current.idx],
		  left: clientX - dragInfo.current.offsetX,
		  top: clientY - dragInfo.current.offsetY,
		};
	  }
	  return newPos;
	});
	if (e.type.startsWith("touch")) e.preventDefault();
  };

  const handleDragEnd = () => {
	dragInfo.current = { idx: null, offsetX: 0, offsetY: 0 };
	window.removeEventListener("mousemove", handleDragMove as EventListener, false);
	window.removeEventListener("mouseup", handleDragEnd);
	window.removeEventListener("touchmove", handleDragMove as EventListener);
	window.removeEventListener("touchend", handleDragEnd, false);
  };

  return (
	<div className="min-h-screen bg-transparent flex flex-col items-center pt-24 pb-40 px-4 relative overflow-x-auto">
	  <CinematicIntro title="ART GALLERY" />
	  <div className="max-w-3xl mx-auto text-center mb-10">
		<h2 className="text-4xl font-bold mb-2">Art Gallery</h2>
		<p className="text-base text-gray-700 mb-4">
		  Explore a dynamic collection of original artwork, creative experiments, and visual stories. Each piece is presented in a unique collage layout—click and drag to interact with the gallery.
		</p>
	  </div>
	  <div
		className="relative w-[1800px] h-[1000px] mx-auto z-10"
		style={{ maxWidth: "100vw" }}
	  >
		{artworks.map((art, i) => {
		  const layout = positions[i] ?? { left: 0, top: 0, rotate: 0, width: 200, z: 1 };
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
				fontFamily: "cursive, Comic Sans MS, Inter, sans-serif"
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
				  fill={true}
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
	  </div>
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
				fill={true}
				className="object-contain rounded-xl shadow-2xl"
				priority={true}
			  />
			</div>
			<h2 className="text-2xl font-bold text-white mt-6 mb-2 text-center font-serif drop-shadow-lg">
			  {artworks[fullscreenIdx].title}
			</h2>
		  </div>
		</div>
	  )}
	</div>
  );
}
