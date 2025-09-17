"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

// Heroicons
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", href: "/" },
  { label: "News", href: "/dashboard/news" },
  { label: "Album", href: "/dashboard/album" },
  { label: "Events", href: "/dashboard/event" },
  { label: "Class", href: "/dashboard/class" },
  { label: "UKM", href: "/dashboard/ukm" },
  { label: "Admin", href: "/login" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b-2 sticky top-0 z-50 mb-5 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={"/"} className="text-xl font-semibold text-gray-800">Sakti Info</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={`p-2 px-4 text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "text-black border-b-1 border-black"
                          : "text-gray-800 hover:bg-gray-200 rounded-lg"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Burger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-800" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm font-medium px-2 py-1 ${
                        pathname === item.href
                          ? "text-sky-600 border-l-4 border-sky-600"
                          : "text-gray-700 hover:text-sky-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </nav>
  );
}
