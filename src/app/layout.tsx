import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import "./globals.css";
import MenuBar from "@/components/MenuBar";
import BodyScrollController from "@/components/BodyScrollController";
import MainBackground from "@/components/MainBackground";
import PageTransition from "@/components/PageTransition";


export const metadata: Metadata = {
  title: "VISION",
  description: "A creative portfolio and art collage website.",
  icons: {
    icon: "/favicon.gif"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MenuBar />
        {/* Blurred background image for all pages */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <Image
            src="/test.jpg"
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover scale-105"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />
        </div>
        <BodyScrollController />
        <PageTransition>
          <MainBackground>
            {children}
          </MainBackground>
        </PageTransition>
      </body>
    </html>
  );
}
