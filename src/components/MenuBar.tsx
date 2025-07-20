"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";

export default function MenuBar() {
  const pathname = usePathname();
  
  const allMenuItems = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/archive", label: "Archive" },
    { href: "/art", label: "Art Gallery" },
    { href: "/team", label: "Team" },
    { href: "/support", label: "Support" },
  ];

  // Filter menu items based on lock state
  const menuItems = siteConfig.isLocked 
    ? allMenuItems.filter(item => siteConfig.publicPaths.includes(item.href))
    : allMenuItems;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gray-900 tracking-tight"
            >
              VISION
            </motion.div>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group"
              >
                <motion.div
                  whileHover={{ y: -1 }}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </motion.div>
                {/* Active indicator */}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={false}
                />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenuButton menuItems={menuItems} pathname={pathname} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenuButton({ menuItems, pathname }: { menuItems: Array<{ href: string; label: string }>, pathname: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1"
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
