import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Calendar, LayoutGrid, Layers, CheckCircle } from 'lucide-react';
import SEO from '../components/common/SEO';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Before/After drag slider state
  const [sliderPos, setSliderPos] = useState(50);
  const sliderContainerRef = useRef(null);

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/projects/${slug}`);
        if (response.data.success) {
          setProject(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching project case study:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [slug]);

  // Offline mock project metadata fallbacks matching display expectations
  const getMockFallback = () => {
    return {
      title: "The Lakeside Sanctuary",
      location: "Banjara Hills, Hyderabad",
      category: "villa",
      area: "4,600 sq.ft.",
      year: 2025,
      style: "Japandi Minimalist",
      description: "A monumental residential build optimizing structural tolerances, hidden utility lines, and rich oak textures.",
      story: {
        vision: "Create an airy, quiet sanctuary prioritizing spatial flow, matching wood grain textures, and natural lighting.",
        challenges: "Integrating dual cooling track ducts into a walnut panel false ceiling without visible shadow gaps.",
        solutions: "Engineered customized recessed tracking pathways lined with sound-dampening fluted composite panels.",
        engineering: "Calculated structural partitions supporting heavy floor-to-ceiling marble panels along the foyer.",
        outcome: "A timeless residential landmark celebrated for structural precision and editorial calm."
      },
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
      ],
      beforeImages: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"],
      afterImages: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"],
      testimonial: {
        name: "Srinivas R.",
        text: "Espacio did not decorate our home. They built it around our lives. The alignment of panel joints and the smooth execution was perfect.",
        rating: 5
      }
    };
  };

  const p = project || getMockFallback();

  if (loading && !project) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center font-sans text-sm text-walnut animate-pulse">Loading case study details...</div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pb-24">
      <SEO title={`${p.title} — Luxury Case Study`} description={p.description ? p.description.substring(0, 150) : 'Case study description...'} image={p.heroImage} url={`/projects/${p.slug}`} />
      {/* Back button */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-28 pb-4">
        <Link to="/projects" className="inline-flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-walnut hover:text-gold font-bold transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Case Studies</span>
        </Link>
      </div>

      {/* Hero section */}
      <section className="relative h-[65vh] w-full bg-black">
        <img
          src={p.heroImage}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <div className="absolute bottom-12 left-0 w-full">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col space-y-3">
            <span className="font-sans text-xs uppercase tracking-widest text-gold font-bold">
              {p.style || 'Bespoke execution'}
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-editorial font-bold leading-tight">
              {p.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Overview Block */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-walnut/10">
        <div className="flex items-center space-x-3">
          <MapPin className="text-gold shrink-0" size={20} />
          <div>
            <span className="font-sans text-[10px] text-walnut uppercase tracking-widest block">Location</span>
            <span className="font-sans font-bold text-sm text-charcoal">{p.location}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <LayoutGrid className="text-gold shrink-0" size={20} />
          <div>
            <span className="font-sans text-[10px] text-walnut uppercase tracking-widest block">Size</span>
            <span className="font-sans font-bold text-sm text-charcoal">{p.area || 'N/A'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="text-gold shrink-0" size={20} />
          <div>
            <span className="font-sans text-[10px] text-walnut uppercase tracking-widest block">Year</span>
            <span className="font-sans font-bold text-sm text-charcoal">{p.year}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Layers className="text-gold shrink-0" size={20} />
          <div>
            <span className="font-sans text-[10px] text-walnut uppercase tracking-widest block">Type</span>
            <span className="font-sans font-bold text-sm text-charcoal capitalize">{p.category?.replace('_', ' ')}</span>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="max-w-[1000px] mx-auto px-6 py-20 space-y-16">
        {/* Core Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="font-editorial text-2xl font-bold text-charcoal md:col-span-1">The Vision</div>
          <div className="font-sans text-sm text-walnut leading-relaxed md:col-span-2">
            {p.story?.vision || p.description}
          </div>
        </div>

        {/* Challenges & Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-walnut/5 pt-12">
          <div className="font-editorial text-2xl font-bold text-charcoal md:col-span-1">The Challenge</div>
          <div className="font-sans text-sm text-walnut leading-relaxed md:col-span-2">
            {p.story?.challenges || 'Optimizing partition thresholds and hidden layout tracking slots.'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-walnut/5 pt-12">
          <div className="font-editorial text-2xl font-bold text-charcoal md:col-span-1">The Engineering</div>
          <div className="font-sans text-sm text-walnut leading-relaxed md:col-span-2">
            {p.story?.engineering || 'Mild steel reinforcement configurations and structural load-bearing tolerances checks.'}
          </div>
        </div>
      </section>

      {/* Before / After Slider (Render only if before/after images exist) */}
      {p.beforeImages?.length > 0 && p.afterImages?.length > 0 && (
        <section className="max-w-[1000px] mx-auto px-6 py-12">
          <h2 className="font-editorial text-2xl font-bold text-center mb-8">Before & After Transformation</h2>
          <div
            ref={sliderContainerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] rounded-img overflow-hidden select-none cursor-ew-resize border border-walnut/10 shadow-lg"
          >
            {/* After Image */}
            <img
              src={p.afterImages[0]}
              alt="Transformation After"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute bottom-4 right-4 bg-charcoal/80 text-white text-[10px] uppercase font-sans font-bold px-3 py-1.5 rounded-full z-10">After</div>

            {/* Before Image */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={p.beforeImages[0]}
                alt="Transformation Before"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: sliderContainerRef.current ? sliderContainerRef.current.getBoundingClientRect().width : '100%' }}
              />
              <div className="absolute bottom-4 left-4 bg-charcoal/80 text-white text-[10px] uppercase font-sans font-bold px-3 py-1.5 rounded-full">Before</div>
            </div>

            {/* Drag handle line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gold z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold shadow-md flex items-center justify-center text-charcoal font-bold text-sm">
                ↔
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Editorial Masonry Gallery */}
      {p.gallery?.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
          <h2 className="font-editorial text-3xl font-bold mb-12 text-center">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {p.gallery.map((imgUrl, index) => (
              <div key={index} className="rounded-card overflow-hidden border border-walnut/5 shadow-sm group">
                <img
                  src={imgUrl}
                  alt={`Project Gallery ${index + 1}`}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Client Testimonial (Quote block) */}
      {p.testimonial?.text && (
        <section className="max-w-[800px] mx-auto px-6 py-20 text-center bg-offwhite rounded-card border border-walnut/5">
          <div className="w-12 h-12 rounded-full bg-cream border border-walnut/15 flex items-center justify-center text-gold mx-auto mb-6">
            ★
          </div>
          <p className="font-editorial text-xl italic text-charcoal leading-relaxed mb-6">
            "{p.testimonial.text}"
          </p>
          <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-charcoal">
            {p.testimonial.name}
          </h4>
          <span className="font-sans text-xs text-walnut">Hyderabad Project Client</span>
        </section>
      )}

      {/* Final Lead CTA */}
      <section className="mt-24 text-center max-w-[700px] mx-auto px-6 space-y-6">
        <h2 className="font-editorial text-3xl font-bold">Inspired by this project?</h2>
        <p className="font-sans text-sm text-walnut">Let's create a customized home layout built around your preferences.</p>
        <div className="pt-2">
          <Link to="/contact" className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-hover text-charcoal font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-button transition-transform duration-300 hover:scale-105">
            <span>Book Consultation</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
