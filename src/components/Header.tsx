import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { name: "Home", href: "https://www.studyabroadind.com/", target: "_blank" },
  { name: "Blogs", href: "https://www.studyabroadind.com/blogs", target: "_blank" },
  { name: "Courses", href: "https://www.studyabroadind.com/courses", target: "_blank" },
  { name: "Gallery", href: "https://www.studyabroadind.com/gallery", target: "_blank" },
  { name: "Contact", href: "https://www.studyabroadind.com/contact", target: "_blank" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerHeight = 64; // px, matches h-16

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const form = document.getElementById("test-form");
    if (form) {
      const y = form.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-50 to-teal-50 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="https://www.studyabroadind.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center h-full max-h-full overflow-hidden"
          >
            <img
              src="/avatar.png"
              alt="Study Abroad Logo"
              width={160}
              height={40}
              className="h-auto max-h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                rel="noopener noreferrer"
                className="group relative text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors flex flex-col items-center px-1"
              >
                {item.name}
                <span
                  className="pointer-events-none absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-blue-400 origin-left transform transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                />
              </a>
            ))}
            <Button
              onClick={handleScrollToForm}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-teal-700 transition-all"
            >
              Take Test
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-l border-gray-100 p-0 bg-gradient-to-r from-blue-50 to-teal-50"
            >
              {/* Logo and Header */}
              <div className="px-6 py-6 border-b border-gray-100">
                <a
                  href="https://www.studyabroadind.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-full max-h-full overflow-hidden"
                >
                  <img
                    src="/avatar.png"
                    alt="Study Abroad Logo"
                    width={160}
                    height={40}
                    className="h-auto max-h-12 w-auto object-contain"
                  />
                </a>
              </div>
              {/* Navigation Links */}
              <div className="px-4 py-6">
                <div className="flex flex-col space-y-1">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.target}
                      rel="noopener noreferrer"
                      className="group relative px-4 py-3 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 active:bg-blue-100 transition-all duration-200 flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-base font-medium">{item.name}</span>
                      <span className="pointer-events-none absolute left-4 right-4 -bottom-1 h-0.5 rounded-full bg-blue-400 origin-left transform transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                    </a>
                  ))}
                  <Button
                    onClick={handleScrollToForm}
                    className="mt-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-teal-700 transition-all"
                  >
                    Take Test
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header; 