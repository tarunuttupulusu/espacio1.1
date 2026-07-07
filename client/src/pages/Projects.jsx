import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import { Search, ArrowUpRight } from 'lucide-react';
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

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const filterChips = [
    { label: 'All Projects', value: 'all' },
    { label: 'Villas', value: 'villa' },
    { label: 'Apartments', value: 'apartment' },
    { label: 'Commercial Offices', value: 'office' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Renovations', value: 'renovation' },
    { label: 'Luxury Homes', value: 'luxury_home' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/projects');
        if (response.data.success) {
          setProjects(response.data.data);
          setFilteredProjects(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const mockProjects = [
    { title: 'The Lakeside Sanctuary', location: 'Banjara Hills, Hyd', category: 'villa', style: 'Japandi Minimal', heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', slug: 'lakeside-sanctuary', year: 2025 },
    { title: 'Modernist Penthouse', location: 'Jubilee Hills, Hyd', category: 'apartment', style: 'Warm Editorial', heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', slug: 'modernist-penthouse', year: 2024 },
    { title: 'Minimalist Executive Office', location: 'HITEC City, Hyd', category: 'office', style: 'Clean Contemporary', heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', slug: 'minimalist-office', year: 2025 },
    { title: 'Bespoke Residence', location: 'Kokapet, Hyd', category: 'luxury_home', style: 'Warm Contemporary', heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', slug: 'bespoke-residence', year: 2024 },
    { title: 'Lakeside Renovation Build', location: 'Begumpet, Hyd', category: 'renovation', style: 'Contemporary Classic', heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', slug: 'lakeside-renovation', year: 2023 }
  ];

  const sourceData = projects.length > 0 ? projects : mockProjects;

  useEffect(() => {
    let result = sourceData;

    if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.style?.toLowerCase().includes(query)
      );
    }

    setFilteredProjects(result);
  }, [activeFilter, searchQuery, projects]);

  return (
    <div className="bg-bg min-h-screen pt-36 pb-24">
      <SEO title="Portfolio & Case Studies — ESPACIO" description="Browse ESPACIO's luxury portfolio. Apartments, Independent Villas, Penthouse projects, and commercial offices executed to perfection in Hyderabad." url="/projects" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="max-w-[650px] space-y-4 mb-16">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Case Studies</span>
          <h1 className="text-5xl font-display font-bold text-ink tracking-tight">Spaces that tell stories.</h1>
          <p className="font-sans text-[14px] text-ink-soft leading-relaxed">
            Every project reflects thoughtful space layouts, structural checks, custom materials procurement, and attention to detail.
          </p>
        </div>

        {/* Filter & Search Bar Area */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between border-b border-ink-border pb-8 mb-12 gap-6">
          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none shrink-0">
            {filterChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setActiveFilter(chip.value)}
                className={`font-sans text-[11px] font-semibold uppercase tracking-widest px-4.5 py-2 rounded-pill transition-all duration-200 shrink-0 ${
                  activeFilter === chip.value
                    ? 'bg-ink text-bg'
                    : 'bg-bg-card text-ink-soft border border-ink-border hover:text-ink'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-full lg:max-w-[320px] w-full">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-card border border-ink-border focus:border-gold focus:outline-none rounded-pill font-sans text-xs px-12 py-3 text-ink placeholder:text-ink-muted transition-all duration-200"
            />
            <Search size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>

        {/* Portfolio Grid */}
        {loading && projects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="aspect-[4/3] bg-bg-card animate-pulse rounded-card" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-bg-card rounded-card border border-ink-border">
            <p className="font-sans text-sm text-ink-soft">No projects found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx % 4 === 0;
              return (
                <Reveal key={idx} delay={(idx % 3) * 0.08}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block rounded-card overflow-hidden bg-bg-card card-lift"
                  >
                    <div className={`relative overflow-hidden ${isLarge ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-expo-out"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-gold font-bold">
                          {project.style || 'Luxury build'}
                        </span>
                        <span className="font-sans text-[11px] text-ink-muted">{project.year}</span>
                      </div>
                      <h3 className="font-display text-[18px] font-bold text-ink group-hover:text-ink-soft transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="font-sans text-[13px] text-ink-soft">{project.location}</p>
                      
                      <div className="pt-4 flex items-center gap-1 text-[11px] text-ink font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                        <span>View case study</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
