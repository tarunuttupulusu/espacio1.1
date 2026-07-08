import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Briefcase, FolderKanban, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';
import LiquidMorphFloatingMenu from '../ui/LiquidMorphFloatingMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Pages that start with a dark cinematic hero
  const hasDarkHero = ['/', '/about', '/services', '/projects', '/what-we-do'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      // On dark-hero pages: stay transparent until user scrolls past the full
      // viewport height (i.e. past where the sticky hero image lives).
      // On other pages: become solid immediately after a tiny scroll.
      const threshold = hasDarkHero ? window.innerHeight * 0.85 : 20;
      setScrolled(window.scrollY > threshold);
    };
    // Run once on mount in case page loads mid-scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasDarkHero]);

  useEffect(() => {
    setMobileMenuOpen(false);
    // Reset scrolled state when navigating to a new page
    setScrolled(false);
  }, [location]);

  const navLinks = [
    { name: 'Home',     path: '/' },
    { name: 'Services',  path: '/services' },
    { name: 'Projects',  path: '/projects' },
    { name: 'Spaces',    path: '/what-we-do' },
    { name: 'Materials', path: '/products' },
    { name: 'About',     path: '/about' },
    { name: 'FAQs',      path: '/faq' },
  ];

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // isNavLight = true means white bg + dark text (post-hero or non-hero pages)
  const isNavLight = scrolled || !hasDarkHero;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isNavLight
          ? 'bg-bg/95 backdrop-blur-md shadow-sm px-0 pt-0'
          : 'bg-transparent px-5 pt-5 lg:px-12 lg:pt-[10px]'
      }`}
      >
        <div className={`max-w-[1440px] mx-auto pl-6 pr-10 flex items-center justify-between transition-all duration-700 ${
          isNavLight ? 'py-4' : 'pt-[18px] pb-[10px]'
        }`}>

          {/* Logo */}
          <Link to="/" className={`hover:opacity-90 transition-opacity ${isNavLight ? '' : 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'}`}>
            <Logo scrolled={isNavLight} />
          </Link>

          {/* Desktop Nav & CTA Grouped on the right */}
          <div className="hidden lg:flex items-center gap-12 ml-auto">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative hover-underline font-sans text-[18px] font-normal tracking-normal transition-colors duration-300 py-1 ${
                    isNavLight ? '' : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]'
                  } ${
                    isActive(link.path) 
                      ? (isNavLight ? 'text-ink font-medium' : 'text-white font-medium')
                      : (isNavLight ? 'text-ink-soft hover:text-ink' : 'text-white/75 hover:text-white')
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="activeNav"
                      className={`absolute bottom-[-3px] left-0 w-full h-[1.5px] ${isNavLight ? 'bg-ink' : 'bg-white'}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 35 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              to="/contact"
              className={`inline-flex items-center gap-2 font-sans text-[16px] font-medium px-6 py-3 rounded-full transition-all duration-300 ${
                isNavLight 
                  ? 'bg-ink text-bg hover:bg-bg-deep' 
                  : 'bg-white text-ink hover:bg-white/90 shadow-md'
              }`}
            >
              <span>Contact us</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>


        </div>
      </nav>


      {/* Mobile Liquid Morphing Floating Navigation Menu */}
      <LiquidMorphFloatingMenu />
    </>
  );
};

export default Navbar;
