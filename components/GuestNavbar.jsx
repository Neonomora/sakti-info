"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// ✅ Perbarui href agar sesuai dengan routing nyata (tanpa /guest)
const navItems = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Album", href: "/album" },
  { label: "Events", href: "/event" },
  { label: "Class", href: "/class" },
  { label: "UKM", href: "/ukm" },
  { label: "Admin", href: "/login" },
];

export default function GuestNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="w-full border-b-2 sticky top-0 z-50 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={"/"} className={"text-xl font-semibold text-gray-800"}>
            Sakti Info
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={`px-4 py-2 text-sm font-medium transition-all ${
                        isActive(item.href)
                          ? "text-black border-b-2 border-black"
                          : "text-gray-700 hover:text-black hover:bg-gray-100 rounded-md"
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
              <NavigationMenuList className="flex flex-col space-y-2 mt-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm font-medium px-4 py-2 transition ${
                        isActive(item.href)
                          ? "text-sky-600 border-l-4 border-sky-600 bg-sky-50"
                          : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
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
