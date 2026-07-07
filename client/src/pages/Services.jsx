import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';

const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

const services = [
  {
    num: '01',
    title: 'Full Home Interiors',
    tag: 'End-to-End',
    desc: 'Complete interior design and execution for apartments, villas, and luxury homes. From structural layout to finishing touches — one team, one timeline.',
    includes: ['Living & Dining Design', 'Bedroom & Wardrobe Systems', 'Modular Kitchen', 'Foyer & Utility', 'False Ceilings & Lighting', 'Complete Handover'],
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02',
    title: 'Modular Kitchen Design',
    tag: 'Precision-Engineered',
    desc: 'Kitchen systems designed around your workflow. We use premium hardware, soft-close mechanisms, and direct-sourced shutters for cabinets that last decades.',
    includes: ['Layout & Workflow Planning', 'Premium Hardware (Hettich/Hafele)', 'Countertop in Granite / Quartz', 'Chimney & Appliance Integration', 'Backsplash Tiling', '10-Year Warranty'],
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '03',
    title: 'Commercial Spaces',
    tag: 'Impact-First',
    desc: 'Offices, showrooms, clinics, and hospitality spaces designed to communicate brand identity while maximising workflow and employee experience.',
    includes: ['Space Planning & Zoning', 'Brand Integration Design', 'Workstation & Cabin Systems', 'Reception & Lobby', 'Lighting Design', 'Compliance-Ready Build'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '04',
    title: 'Renovation & Refurbishment',
    tag: 'Transform',
    desc: 'Breathe new life into an existing space without full demolition. Strategic renovation with minimal disruption and maximum transformation.',
    includes: ['Structural Assessment', 'Selective Demolition & Rebuild', 'Surface Treatments & Finishes', 'New Furniture & Fixtures', 'Electrical & Plumbing Updates', 'Zero-Dust Commitment'],
    img: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=900&q=80',
  },
];

const processSteps = [
  { step: '01', name: 'Free Consultation', desc: 'We understand your vision, lifestyle, and budget constraints — no pressure, no pitch.' },
  { step: '02', name: 'Site Visit & Measurement', desc: 'Our team surveys site dimensions, structural constraints, and wiring channels.' },
  { step: '03', name: '3D Concept Design', desc: 'Photorealistic 3D renders of your space before a single nail goes in.' },
  { step: '04', name: 'Material Selection', desc: 'Walk through our material library. Touch, see, and confirm every finish.' },
  { step: '05', name: 'Production & Execution', desc: 'On-time, on-spec execution with regular progress photo updates.' },
  { step: '06', name: 'Quality Handover', desc: 'Final punch-list inspection, clean-up, and keys handover on your timeline.' },
];

const Services = () => {
  return (
    <div className="bg-bg overflow-x-hidden">
      <SEO title="Services — ESPACIO Interiors" description="Full home interiors, modular kitchens, commercial spaces, and renovations. Engineering-first luxury design executed by ESPACIO." url="/services" />

      {/* ── HERO ── */}
      <section className="bg-bg-dark relative pt-40 pb-24 px-6 md:px-10 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=80"
          alt="ESPACIO Services" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 to-bg-dark/95" />
        <div className="relative max-w-[1440px] mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-6">Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(42px,6vw,80px)] font-bold leading-[1.05] tracking-tight text-bg max-w-[700px]">
            Designed around your lifestyle.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[15px] text-bg/60 max-w-[480px] leading-relaxed mt-6">
            Turnkey design and build with engineering tolerances. No templates. No hidden package tricks.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto divide-y divide-ink-border">
          {services.map((s, i) => (
            <div key={s.num} className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal delay={0.05} className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="aspect-[4/3] rounded-card overflow-hidden bg-bg-card">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </Reveal>
              <Reveal delay={0.15} className={`space-y-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-[11px] font-semibold text-gold">{s.num}</span>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-ink-muted bg-bg-card px-3 py-1 rounded-pill">{s.tag}</span>
                </div>
                <h2 className="font-display text-[clamp(28px,3vw,42px)] font-bold tracking-tight text-ink leading-tight">{s.title}</h2>
                <p className="font-sans text-[15px] text-ink-soft leading-relaxed">{s.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-sans text-[13px] text-ink-soft">
                      <CheckCircle2 size={14} className="text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary w-fit">
                  Enquire About This <ArrowUpRight size={13} />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6 md:px-10 bg-bg-card border-t border-ink-border">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-3">How We Work</p>
            <h2 className="font-display text-[clamp(28px,3vw,44px)] font-bold tracking-tight text-ink mb-14">Our Process</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-border">
            {processSteps.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <div className="bg-bg-card p-8 space-y-4">
                  <span className="font-display text-5xl font-bold text-ink-border">{p.step}</span>
                  <h3 className="font-display text-[18px] font-bold text-ink">{p.name}</h3>
                  <p className="font-sans text-[13px] text-ink-soft leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg-dark py-24 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <Reveal>
            <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-bg leading-tight max-w-[500px]">
              Let's design your space together.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/contact" className="btn-gold shrink-0">
              Book Free Consultation <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Services;
