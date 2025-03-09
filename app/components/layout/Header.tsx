import { motion } from "framer-motion";
import { instrumentSerif } from "@/app/styles/fonts";
import { useState, useEffect } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Handle scroll events for header visibility and background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update header background opacity based on scroll
      setScrolled(currentScrollY > 20);

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle smooth scroll for anchor links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-[#00EFA6]/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className={`text-3xl font-medium ${instrumentSerif.className} relative group`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-white/90 relative z-10">parity</span>
            <motion.div
              className="absolute -inset-x-4 -inset-y-2 bg-[#00EFA6]/5 rounded-lg -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
              whileHover={{ scale: 1.05 }}
            />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};
