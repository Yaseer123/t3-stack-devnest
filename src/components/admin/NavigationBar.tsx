"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "~/components/DarkMode"; // Import the ModeToggle component

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-white">
          <Link href="/admin">DevNest</Link>
        </div>

        {/* Links for larger screens */}
        <ul className="hidden space-x-6 text-white md:flex">
          <li>
            <Link
              href="/admin"
              className={`${
                isActive("/admin") ? "text-yellow-400" : "hover:text-gray-300"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/contact"
              className={`${
                isActive("/admin/contact")
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/admin/seo"
              className={`${
                isActive("/admin/seo")
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              SEO
            </Link>
          </li>
          <li>
            <Link
              href="/admin/aboutus"
              className={`${
                isActive("/admin/aboutus")
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/admin/services"
              className={`${
                isActive("/admin/services")
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/admin/all-services"
              className={`${
                isActive("/admin/all-services")
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              All Services
            </Link>
          </li>
          <li>
            <Link
              href="/admin/projects"
              className={`${
                isActive("/admin/projects")
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/admin/reviews"
              className={`${
                isActive("/admin/reviews")
                  ? "text-yellow-400"
                  : "hover:text-gray-300"
              }`}
            >
              Reviews
            </Link>
          </li>
        </ul>

        {/* User Button and Theme Toggle for larger screens */}
        <div className="hidden items-center space-x-4 md:flex">
          <ModeToggle /> {/* Add the mode toggle here */}
          <UserButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-2 flex flex-col items-center md:hidden">
          <Link
            href="/admin"
            className={`py-2 text-white ${
              isActive("/admin") ? "text-yellow-400" : "hover:text-gray-300"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/contact"
            className={`py-2 text-white ${
              isActive("/admin/contact")
                ? "text-yellow-400"
                : "hover:text-gray-300"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/admin/seo"
            className={`py-2 text-white ${
              isActive("/admin/seo") ? "text-yellow-400" : "hover:text-gray-300"
            }`}
          >
            SEO
          </Link>
          <Link
            href="/admin/aboutus"
            className={`py-2 text-white ${
              isActive("/admin/aboutus")
                ? "text-yellow-400"
                : "hover:text-gray-300"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/admin/services"
            className={`py-2 text-white ${
              isActive("/admin/services")
                ? "text-yellow-400"
                : "hover:text-gray-300"
            }`}
          >
            Services
          </Link>
          <Link
            href="/admin/all-services"
            className={`py-2 text-white ${
              isActive("/admin/all-services")
                ? "text-yellow-400"
                : "hover:text-gray-300"
            }`}
          >
            All Services
          </Link>
          <Link
            href="/admin/projects"
            className={`py-2 text-white ${
              isActive("/admin/projects")
                ? "text-yellow-400"
                : "hover:text-gray-300"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/admin/reviews"
            className={`py-2 text-white ${
              isActive("/admin/reviews")
                ? "text-yellow-400"
                : "hover:text-gray-300"
            }`}
          >
            Reviews
          </Link>
        </div>
      )}

      {/* UserButton and Mode Toggle in mobile view */}
      {isOpen && (
        <div className="mt-2 flex items-center justify-center space-x-4 md:hidden">
          <ModeToggle /> {/* Add the mode toggle here */}
          <UserButton />
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
