import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/common/SEO';

const faqItems = [
  {
    q: "How long does a typical project take from start to finish?",
    a: "Typically 2–3 months, depending on the level of detailing, material procurement times, and custom fabrication complexity involved in your project.",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
  },
  {
    q: "What does your design process look like?",
    a: "We start with a space assessment, move into 2D layout planning, present photorealistic 3D concepts, customize materials, and then run turnkey onsite execution.",
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    q: "What sets ESPACIO apart from other design firms?",
    a: "We are an engineering-first design studio. Every connection, edge band, and layout is simulated in CAD before execution to eliminate errors and guarantee timeline deliverables.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
  },
  {
    q: "Do you offer remote design consultations?",
    a: "Yes. We offer interactive virtual sessions using digital 3D walkthroughs so you can review design configurations and layouts anywhere in the world.",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
  },
  {
    q: "What geographic areas do you serve?",
    a: "We proudly serve Hyderabad and its surrounding areas, executing turnkey luxury residential and commercial fit-outs.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  },
  {
    q: "What types of projects does ESPACIO specialise in?",
    a: "We specialize in premium apartments, bespoke villas, modern workspaces, luxury kitchen systems, and turnkey residential transformations.",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen pt-32 pb-24">
      <SEO 
        title="FAQ — ESPACIO Interiors" 
        description="Frequently asked questions about design process, timeline, turnkey execution, and custom materials by ESPACIO." 
        url="/faqs" 
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Heading, Text & Dynamic Changing Image */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Pill Indicator */}
            <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full w-fit mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider">FAQ</span>
            </div>
            
            <h1 className="font-display text-[clamp(32px,3.5vw,48px)] font-bold text-ink leading-tight mb-4">
              Got Questions?<br />We Have Answers.
            </h1>
            
            <p className="font-sans text-sm text-ink/60 leading-relaxed mb-10 max-w-[450px]">
              From first consultation to final installation, we know you want to understand exactly what to expect. Here's everything you need to know about working with ESPACIO.
            </p>
            
            {/* Dynamic Changing Image Card */}
            <div className="relative aspect-[4/3] md:aspect-[3/4] w-full max-w-[480px] overflow-hidden rounded-[24px] shadow-lg bg-bg-dark">
              <AnimatePresence mode="wait">
                <motion.img
                  key={openIndex !== null ? openIndex : 'default'}
                  src={openIndex !== null ? faqItems[openIndex].img : 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'}
                  alt="ESPACIO Interiors"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 flex flex-col justify-start lg:pt-4">
            <div className="border-t border-ink/10">
              {faqItems.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="border-b border-ink/10 py-6">
                    <button
                      onClick={() => toggleFAQ(idx)}
                      onMouseEnter={() => setOpenIndex(idx)}
                      className="w-full flex items-start gap-4 text-left group"
                    >
                      {/* Plus/Minus Indicator */}
                      <span className="font-sans text-[20px] leading-none text-gold/80 group-hover:text-gold font-light mt-0.5 shrink-0 select-none">
                        {isOpen ? '—' : '+'}
                      </span>
                      
                      <span className="font-display text-[16px] md:text-[18px] font-bold text-ink group-hover:text-gold transition-colors duration-300">
                        {faq.q}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 pr-4 pt-3 font-sans text-sm text-walnut leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;
