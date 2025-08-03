"use client";
import { usePathname } from "next/navigation";

export default function MainBackground({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (isHome) {
    return <main className="pt-16 bg-transparent min-h-screen">{children}</main>;
  }
  return (
    <main className="pt-16 min-h-screen w-full bg-white">
      {children}
    </main>
  );
}
