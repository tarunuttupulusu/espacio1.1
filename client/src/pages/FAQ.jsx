import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('/faqs');
        if (response.data.success) {
          setFaqs(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  // Static fallback FAQs in case the DB seed is not loaded yet
  const fallbackFAQs = [
    {
      question: "How long does a turnkey project take?",
      answer: "Typically 2–3 months, depending on the level of detailing and customization involved in your project."
    },
    {
      question: "Do you provide turnkey interior solutions?",
      answer: "Yes. Every project we take on, residential or commercial is delivered turnkey, with design, materials, execution, and finishing handled entirely by our team."
    },
    {
      question: "What is your consultation process?",
      answer: "We begin with a free consultation to understand your space, requirements, and vision, before moving into detailed design and planning."
    },
    {
      question: "Which locations do you currently serve?",
      answer: "We're proudly based in Hyderabad and have delivered residential and commercial projects across the city."
    },
    {
      question: "Do you sell materials separately from design services?",
      answer: "Yes. Our materials including WPC panels, polygranite sheets, acrylic sheets, and more are available for standalone purchase, without needing to book a full design or execution project."
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : fallbackFAQs;

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-5xl font-editorial font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-sm text-walnut">
            Find answers to common questions about our design process, turnkey execution, and premium materials.
          </p>
        </div>

        {/* FAQ List */}
        {loading && faqs.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-16 bg-offwhite animate-pulse rounded-card" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displayFAQs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-offwhite border border-walnut/10 rounded-card overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-sans font-medium text-charcoal hover:text-gold transition-colors"
                  >
                    <span>{faq.question || faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-walnut shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2 font-sans text-sm text-walnut leading-relaxed border-t border-walnut/5">
                          {faq.answer || faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
