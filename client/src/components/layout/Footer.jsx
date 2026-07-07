import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();
  const espRef = useRef(null);
  const inView = useInView(espRef, { once: false, margin: '-60px' });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Spaces', href: '/what-we-do' },
    { name: 'Materials', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'FAQs', href: '/faq' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/theespacio.in' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'Linkedin', href: 'https://linkedin.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-bg-dark text-bg pb-10">
      {/* 1. Center CTA Banner with Dusk Architectural Background */}
      <div 
        className="relative py-28 px-6 md:px-12 text-center mb-16 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 16, 20, 0.82), rgba(16, 16, 20, 0.95)), url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        {/* Top/bottom soft fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-transparent to-bg-dark pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto">
          <h2 className="font-display text-[clamp(32px,5vw,60px)] font-medium leading-[1.1] tracking-tight text-bg mb-6">
            Ready to Transform<br />Your Space?
          </h2>
          <p className="font-sans text-[15px] text-bg/60 max-w-[480px] mx-auto leading-relaxed mb-10">
            Every great space starts with a single conversation. Let's talk about your vision and bring it to life together.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white bg-transparent hover:bg-white text-white hover:text-ink font-sans text-[13px] font-semibold px-8 py-3.5 rounded-full transition-all duration-300 group"
          >
            <span>Let's talk</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Thin Divider line */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 border-t border-white/10 mb-12" />

      {/* 2. Contact Block: Address + Get in Touch side by side on desktop, stacked on mobile */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-14">
        {/* Address + Phone */}
        <p className="font-sans text-[15px] text-bg/60 leading-relaxed mb-1">
          Aziznagar, Moinabad Road, Hyderabad, Telangana 500075
        </p>
        <a href="tel:+919000000000" className="font-sans text-[15px] text-bg/60 hover:text-bg transition-colors block mb-8">
          +91 90000 00000
        </a>

        {/* Get in Touch + Email */}
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
          Get in Touch
        </p>
        <a href="mailto:espacio.hyd@gmail.com" className="font-sans text-[18px] md:text-[22px] font-medium text-bg hover:text-gold transition-colors">
          espacio.hyd@gmail.com
        </a>
      </div>

      {/* 3. Nav + Social Two-Column Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-2 md:flex md:flex-row md:justify-between gap-10 py-8 border-t border-white/5 mb-4">
        {/* Left: Nav Links — stacked vertically */}
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="font-sans text-[15px] font-medium text-bg/60 hover:text-bg transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Social Links — stacked vertically, right-aligned on mobile too */}
        <div className="flex flex-col gap-4 items-end md:items-start">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] font-medium text-bg/60 hover:text-bg transition-colors">
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* 4. Massive Animated ESPACIO Typography */}
      <div ref={espRef} className="max-w-[1440px] mx-auto px-4 my-10 select-none overflow-hidden flex items-center justify-center">
        {/* ESP - slides in from left */}
        <motion.span
          className="font-display text-[clamp(80px,14vw,200px)] font-bold tracking-tight text-white/90 leading-none"
          initial={{ x: '-80%', opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: '-80%', opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          ESP
        </motion.span>
        {/* ACIO - slides in from right */}
        <motion.span
          className="font-display text-[clamp(80px,14vw,200px)] font-bold tracking-tight text-white/90 leading-none"
          initial={{ x: '80%', opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: '80%', opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          ACIO
        </motion.span>
      </div>

      {/* 5. Copyright Strip */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
        <p className="font-sans text-[12px] text-bg/30">
          © {year} ESPACIO. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6 text-[12px] text-bg/30">
          <Link to="/privacy" className="hover:text-bg/50 transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-bg/50 transition-colors">Terms of Service</Link>
          <span>|</span>
          <Link to="/cookies" className="hover:text-bg/50 transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
