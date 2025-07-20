"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BodyScrollController() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/art" && pathname !== "/support" && pathname !== "/team" && pathname !== "/events") {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [pathname]);
  return null;
}
