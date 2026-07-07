import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import { ArrowUpRight } from 'lucide-react';
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

const mockCategories = [
  { name: 'Modular Kitchen', slug: 'modular-kitchen', description: 'Precision-engineered kitchens with high-gloss acrylic, polygranite surfaces, and concealed lighting tracks.', heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'], filters: ['Island Kitchen', 'Parallel Kitchen', 'L-Shape', 'Modern', 'Luxury'] },
  { name: 'Master Bedroom', slug: 'master-bedroom', description: 'Sanctuary interiors with walnut wood headboards, warm lighting zones, and bespoke built-in wardrobes.', heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], filters: ['Master Suite', 'Kids Room', 'Guest Room', 'Japandi', 'Luxury'] },
  { name: 'Living Room', slug: 'living-room', description: 'Editorial living zones crafted around natural light, marble accents, and low-profile custom furniture.', heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'], filters: ['Minimal', 'Luxury', 'Japandi', 'TV Wall', 'Open Layout'] },
  { name: 'Wardrobe Systems', slug: 'wardrobes', description: 'Bespoke floor-to-ceiling storage with velvet drawer linings, mirror panels, and hidden pull-out trays.', heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'], filters: ['Walk-in', 'Built-in', 'Sliding', 'Modern', 'Luxury'] },
  { name: 'Home Office', slug: 'home-office', description: 'Focus zones with sound-dampening fluted panels, ergonomic wall shelving and concealed cable management.', heroImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'], filters: ['Minimal', 'Executive', 'Creative', 'Storage'] },
  { name: 'Commercial Office', slug: 'commercial-office', description: 'Turnkey executive workspaces designed for efficient traffic flows, acoustic panels, and brand-aligned finishes.', heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'], filters: ['Executive', 'Open Plan', 'Reception', 'Collaborative'] },
  { name: 'Pooja Room', slug: 'pooja-room', description: 'Sacred sanctuaries merging ancestral stone textures with sleek back-lit marble panels and warm lighting.', heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'], filters: ['Traditional', 'Modern', 'Marble', 'Minimal'] },
  { name: 'Dining Room', slug: 'dining-room', description: 'Refined gathering spaces with custom hardwood dining tables, feature pendant lighting, and plaster wall finishes.', heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'], filters: ['Formal', 'Casual', 'Luxury', 'Open Plan'] },
];

const WhatWeDo = () => {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/categories')
      .then(r => { if (r.data.success && r.data.data.length > 0) setCategories(r.data.data); else setCategories(mockCategories); })
      .catch(() => setCategories(mockCategories))
      .finally(() => setLoading(false));
  }, []);

  const displayCategories = categories.length > 0 ? categories : mockCategories;
  const activeCategory = slug ? displayCategories.find(c => c.slug === slug) : null;

  // ── CATEGORY DETAIL PAGE ───────────────────────────────────────────────────
  if (activeCategory) {
    const filters = ['All', ...(activeCategory.filters || [])];
    return (
      <div className="bg-bg min-h-screen">
        <SEO title={`${activeCategory.name} Interiors — ESPACIO`} description={activeCategory.description} url={`/what-we-do/${activeCategory.slug}`} />

        {/* Hero */}
        <section className="relative h-[70vh] bg-bg-dark flex items-end">
          <img src={activeCategory.heroImage} alt={activeCategory.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
          <div className="relative max-w-[1440px] w-full mx-auto px-6 md:px-10 pb-16 z-10">
            <nav className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-bg/50 mb-5">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link to="/what-we-do" className="hover:text-gold transition-colors">Spaces</Link>
              <span>/</span>
              <span className="text-gold">{activeCategory.name}</span>
            </nav>
            <h1 className="font-display text-[clamp(36px,5vw,64px)] font-bold text-bg leading-tight tracking-tight mb-4">{activeCategory.name}</h1>
            <p className="font-sans text-[14px] text-bg/60 max-w-[500px] leading-relaxed">{activeCategory.description}</p>
          </div>
        </section>

        {/* Filter Chips */}
        <div className="sticky top-[68px] z-30 bg-bg/95 backdrop-blur-xl border-b border-ink-border py-4">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center gap-2 overflow-x-auto">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`shrink-0 font-sans text-[11px] font-semibold uppercase tracking-widest px-4 py-2 rounded-pill transition-all duration-200 ${
                  activeFilter === f ? 'bg-ink text-bg' : 'bg-bg-card text-ink-soft hover:text-ink border border-ink-border'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(activeCategory.galleryImages || []).map((img, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className={`rounded-card overflow-hidden group ${idx % 3 === 0 ? 'md:col-span-2' : ''}`}>
                  <img src={img} alt={`${activeCategory.name} ${idx + 1}`}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${idx % 3 === 0 ? 'aspect-video' : 'aspect-[4/3]'}`} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Related Spaces */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-12 border-t border-ink-border">
          <Reveal>
            <h2 className="font-display text-[22px] font-bold text-ink mb-8">Explore Related Spaces</h2>
          </Reveal>
          <div className="flex gap-5 overflow-x-auto pb-4">
            {displayCategories.filter(c => c.slug !== activeCategory.slug).slice(0, 5).map((cat, idx) => (
              <Link key={idx} to={`/what-we-do/${cat.slug}`} className="shrink-0 w-44 group">
                <div className="aspect-[3/4] rounded-card overflow-hidden mb-3 relative">
                  <img src={cat.heroImage} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 to-transparent" />
                  <span className="absolute bottom-3 left-3 font-display text-[13px] font-bold text-bg">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-bg-dark py-20 px-6 md:px-10">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <h2 className="font-display text-[clamp(28px,3.5vw,48px)] font-bold text-bg tracking-tight">
              Ready to transform your {activeCategory.name.toLowerCase()}?
            </h2>
            <Link to="/contact" className="btn-gold shrink-0">
              Book Free Consultation <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // ── HUB GRID PAGE ─────────────────────────────────────────────────────────
  return (
    <div className="bg-bg min-h-screen">
      <SEO title="Space Explorer — ESPACIO Interiors" description="Browse room design categories: kitchens, living rooms, bedrooms, offices, pooja rooms, and wardrobes by ESPACIO." url="/what-we-do" />

      {/* Hero */}
      <section className="bg-bg-dark relative pt-40 pb-24 px-6 md:px-10 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt="What We Do" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 to-bg-dark/95" />
        <div className="relative max-w-[1440px] mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mb-6">Space Explorer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(42px,6vw,80px)] font-bold leading-[1.05] tracking-tight text-bg max-w-[700px]">
            Every space deserves exceptional design.
          </motion.h1>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading
            ? [1,2,3,4].map(n => <div key={n} className="aspect-[4/3] bg-bg-card animate-pulse rounded-card" />)
            : displayCategories.map((cat, idx) => (
              <Reveal key={idx} delay={(idx % 2) * 0.1}>
                <Link to={`/what-we-do/${cat.slug}`}
                  className="group relative rounded-card overflow-hidden aspect-[4/3] bg-bg-dark block">
                  <img src={cat.heroImage} alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                    <div>
                      <h2 className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-bg mb-2 group-hover:text-gold transition-colors duration-300">
                        {cat.name}
                      </h2>
                      <p className="font-sans text-[13px] text-bg/60 max-w-[280px] leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                        {cat.description?.substring(0, 85)}...
                      </p>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-pill border border-bg/20 flex items-center justify-center text-bg group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))
          }
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-24 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <Reveal>
            <h2 className="font-display text-[clamp(32px,4vw,56px)] font-bold tracking-tight text-bg leading-tight max-w-[500px]">
              Ready to transform your space?
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

export default WhatWeDo;
