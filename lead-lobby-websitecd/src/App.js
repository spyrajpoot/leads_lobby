import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Mail, Phone, MapPin, CheckCircle, Code, Smartphone, TrendingUp, Video, Database, Users, Award, Target } from 'lucide-react';

const LeadLobby = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());

  // Scroll-based navigation visibility
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setNavVisible(false);
          } else {
            setNavVisible(true);
          }
          lastScrollY.current = currentScrollY;
          setScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu overlay body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  // Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Reset scroll and close menu on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setVisibleCards(new Set());
  }, [currentPage]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-card-id');
            if (id) {
              setVisibleCards((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [currentPage]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setShowSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setFormErrors({});
      setTimeout(() => setShowSuccess(false), 4000);
    } else {
      setFormErrors(errors);
    }
  };

  const pages = ['Home', 'Services', 'About', 'Portfolio', 'Contact'];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');
        
        * { 
          font-family: 'Inter', sans-serif; 
          box-sizing: border-box;
        }
        h1, h2, h3, h4, h5, h6 { font-family: 'Sora', sans-serif; }
        
        .glass {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(12px) saturate(110%);
          -webkit-backdrop-filter: blur(12px) saturate(110%);
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(2,6,23,0.08);
          border: 1px solid rgba(255,255,255,0.35);
        }
        
        .hero-fade-in {
          animation: heroFadeIn 1s ease-out forwards;
        }
        
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .card-fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .card-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .nav-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        
        .nav-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translate(-50%, 0); opacity: 1; }
          to { transform: translate(-50%, -100%); opacity: 0; }
        }
        
        .menu-fade-in {
          animation: menuFadeIn 0.3s ease-out;
        }
        
        @keyframes menuFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .btn-primary {
          background:  #6366F1;
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-primary:hover {
          background: #0066DD;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,119,255,0.3);
        }
        
        .btn-primary:active { 
          transform: translateY(0);
        }
        
        .service-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 40px rgba(2,6,23,0.12);
        }
        
        .project-card {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .project-card:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 32px rgba(2,6,23,0.15);
        }
        
        .project-card img {
          transition: transform 0.5s ease;
        }
        
        .project-card:hover img {
          transform: scale(1.1);
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg,  #6366F1 0%,#8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-text {
          background: linear-gradient(135deg,  #6366F1 0%,#8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-gradient {
          background: radial-gradient(circle at 30% 50%, rgba(0,119,255,0.08) 0%, transparent 50%),
                      radial-gradient(circle at 70% 50%, rgba(0,153,255,0.06) 0%, transparent 50%);
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color:  #6366F1;
          box-shadow: 0 0 0 3px rgba(0,119,255,0.1);
        }
        
        .team-card {
          transition: all 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-5px);
        }
        
        @media (max-width: 768px) {
          .stat-number { font-size: 2rem; }
        }
      `}</style>

      {/* Floating Navigation */}
      <nav 
        className={`fixed left-1/2 z-50 transition-all duration-300 ${
          navVisible ? 'top-4 opacity-100' : '-top-24 opacity-0'
        }`}
        style={{ transform: 'translateX(-50%)', width: 'min(980px, 92%)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="glass px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-xl font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1 transition-colors hover:text-blue-600"
            aria-label="Lead Lobby home"
          >
            Lead Lobby
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            {pages.map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page.toLowerCase())}
                className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-3 py-2 ${
                  currentPage === page.toLowerCase() ? 'text-blue-600 bg-blue-50' : 'text-black hover:text-blue-600'
                }`}
                aria-current={currentPage === page.toLowerCase() ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded transition-colors hover:bg-gray-100"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 menu-fade-in"
          style={{ 
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)'
          }}
          onClick={() => setMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div 
            className="glass absolute left-1/2 top-24 p-8 w-80 max-w-[90%]"
            style={{ transform: 'translateX(-50%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              {pages.map(page => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page.toLowerCase());
                    setMenuOpen(false);
                  }}
                  className={`text-lg font-medium text-left py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    currentPage === page.toLowerCase() 
                      ? 'bg-blue-600 text-white' 
                      : 'text-black hover:bg-gray-100'
                  }`}
                  aria-current={currentPage === page.toLowerCase() ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="pt-24">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} visibleCards={visibleCards} />}
        {currentPage === 'services' && <ServicesPage visibleCards={visibleCards} />}
        {currentPage === 'about' && <AboutPage visibleCards={visibleCards} />}
        {currentPage === 'portfolio' && <PortfolioPage visibleCards={visibleCards} />}
        {currentPage === 'contact' && <ContactPage formData={formData} setFormData={setFormData} formErrors={formErrors} handleSubmit={handleSubmit} showSuccess={showSuccess} setShowSuccess={setShowSuccess} />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Lead Lobby</h3>
              <p className="text-gray-400">Transforming ideas into digital reality.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {pages.map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page.toLowerCase())}
                    className="text-gray-400 hover:text-white text-left transition-colors"
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="flex flex-col gap-2 text-gray-400">
                <p>App Development</p>
                <p>Web Design</p>
                <p>Data Science</p>
                <p>Digital Marketing</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="flex flex-col gap-2 text-gray-400">
                <p>hello@leadlobby.com</p>
                <p>(415) 555-1234</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lead Lobby. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const HomePage = ({ setCurrentPage, visibleCards }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden hero-gradient">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-fade-in leading-tight">
            Transforming Ideas Into<br/>
            <span className="gradient-text">Digital Reality</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-700 hero-fade-in" style={{ animationDelay: '0.2s' }}>
            We design, develop, and market to help your brand grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center hero-fade-in" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => setCurrentPage('services')}
              className="btn-primary px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Our Services <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => setCurrentPage('portfolio')}
              className="glass px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </section>
{/* Client Logos Marquee */}
<section className="py-16 px-4 bg-gray-50 overflow-hidden">
  <div className="max-w-6xl mx-auto mb-8">
    <p className="text-center text-gray-600 font-medium mb-8">
      Trusted by leading companies worldwide
    </p>
  </div>
  <div className="flex overflow-hidden">
    <div className="flex animate-marquee gap-16">
      {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'Spotify'].map((company, i) => (
        <div key={i} className="flex items-center justify-center min-w-[150px]">
          <span className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
            {company}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Stats Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '50+', label: 'Happy Clients' },
              { number: '10+', label: 'Team Members' },
              { number: '5', label: 'Years Experience' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`card-fade-up ${visibleCards.has(`stat-${i}`) ? 'visible' : ''}`}
                data-card-id={`stat-${i}`}
              >
                <div className="stat-number">{stat.number}</div>
                <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Why Choose Lead Lobby</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">We deliver excellence in every project</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Award size={40} className="text-blue-600" />,
                title: 'Innovation First', 
                desc: 'Cutting-edge solutions using the latest technologies and design trends that keep you ahead of the competition.' 
              },
              { 
                icon: <Target size={40} className="text-blue-600" />,
                title: 'Results Driven', 
                desc: 'We focus on measurable outcomes that grow your business and deliver real ROI for your investment.' 
              },
              { 
                icon: <Users size={40} className="text-blue-600" />,
                title: 'Full Support', 
                desc: 'From concept to launch and beyond, we are with you every step providing dedicated support and guidance.' 
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`glass p-8 text-center service-card card-fade-up ${visibleCards.has(`value-${i}`) ? 'visible' : ''}`}
                data-card-id={`value-${i}`}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What We Do Best</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Comprehensive digital solutions tailored to your needs</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'App Development', icon: <Smartphone size={48} className="text-blue-600" />, desc: 'Native and cross-platform mobile apps' },
              { title: 'Website Design', icon: <Code size={48} className="text-blue-600" />, desc: 'Modern, responsive web experiences' },
              { title: 'Digital Marketing', icon: <TrendingUp size={48} className="text-blue-600" />, desc: 'SEO, social media, and growth strategies' }
            ].map((service, i) => (
              <div 
                key={i} 
                className={`glass p-8 text-center service-card cursor-pointer card-fade-up ${visibleCards.has(`featured-${i}`) ? 'visible' : ''}`}
                data-card-id={`featured-${i}`}
                onClick={() => setCurrentPage('services')}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.desc}</p>
                <button className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
                  Learn more <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">See our latest work in action</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: 'FinTech Mobile App',
                img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
                result: '500K+ downloads'
              },
              {
                title: 'E-Commerce Platform',
                img: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
                result: '300% sales increase'
              }
            ].map((project, i) => (
              <div 
                key={i} 
                className={`glass overflow-hidden project-card cursor-pointer card-fade-up ${visibleCards.has(`highlight-${i}`) ? 'visible' : ''}`}
                data-card-id={`highlight-${i}`}
                onClick={() => setCurrentPage('portfolio')}
              >
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-blue-600 font-semibold">✨ {project.result}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('portfolio')}
              className="btn-primary px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
            >
              View All Projects <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">Let's bring your vision to life with cutting-edge digital solutions.</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ visibleCards }) => {
  const services = [
    {
      title: 'App Development',
      desc: 'Fast, reliable, user-friendly mobile apps for iOS and Android that deliver exceptional user experiences. We build native and cross-platform solutions tailored to your business needs.',
      icon: <Smartphone size={48} className="text-blue-600" />,
      features: ['iOS & Android', 'Cross-platform', 'Native performance', 'App store optimization']
    },
    {
      title: 'Data Science / Machine Learning',
      desc: 'AI solutions that extract insights from your data and drive intelligent business decisions. From predictive analytics to custom ML models, we turn data into actionable intelligence.',
      icon: <Database size={48} className="text-blue-600" />,
      features: ['Predictive analytics', 'Custom ML models', 'Data visualization', 'AI integration']
    },
    {
      title: 'Website Development',
      desc: 'Modern, responsive websites built with the latest technologies for optimal performance. We create stunning web experiences that convert visitors into customers.',
      icon: <Code size={48} className="text-blue-600" />,
      features: ['Responsive design', 'Fast performance', 'SEO optimized', 'CMS integration']
    },
    {
      title: 'Video Editing / Graphics Design',
      desc: 'High-impact visuals and video content that captivates your audience and elevates your brand. From motion graphics to promotional videos, we bring your story to life.',
      icon: <Video size={48} className="text-blue-600" />,
      features: ['Motion graphics', 'Video production', 'Brand identity', 'Social media content']
    },
    {
      title: 'SEO / Digital Marketing',
      desc: 'Increase visibility and reach your target audience with data-driven marketing strategies. We help you grow organically and maximize your ROI across all channels.',
      icon: <TrendingUp size={48} className="text-blue-600" />,
      features: ['SEO optimization', 'Social media marketing', 'Content strategy', 'Analytics & reporting']
    }
  ];

  return (
    <div className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Our Services</h1>
        <p className="text-center text-gray-600 mb-16 text-xl max-w-2xl mx-auto">
          Comprehensive digital solutions designed to transform your business and drive growth
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div 
              key={i} 
              className={`glass p-8 service-card card-fade-up ${visibleCards.has(`service-${i}`) ? 'visible' : ''}`}
              data-card-id={`service-${i}`}
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-center">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{service.desc}</p>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-blue-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold text-center mb-16">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We learn about your goals, audience, and vision' },
              { step: '02', title: 'Strategy', desc: 'We create a roadmap tailored to your needs' },
              { step: '03', title: 'Execution', desc: 'We build, test, and refine your solution' },
              { step: '04', title: 'Launch & Support', desc: 'We deploy and provide ongoing optimization' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`text-center card-fade-up ${visibleCards.has(`process-${i}`) ? 'visible' : ''}`}
                data-card-id={`process-${i}`}
              >
                <div className="text-5xl font-bold text-blue-600 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const AboutPage = ({ visibleCards }) => {
  return (
    <div className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-16">About Lead Lobby</h1>
        
        {/* Company Story */}
        <div className="glass p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Lead Lobby was founded with a simple yet powerful mission: to bridge the gap between innovative ideas and digital reality. We believe every business, regardless of size, deserves world-class digital solutions that drive real, measurable results.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            What started as a small team of passionate developers and designers has grown into a full-service digital agency. Since our inception, we've helped hundreds of clients transform their digital presence through cutting-edge technology, creative design, and strategic marketing.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our team brings together diverse expertise in development, design, data science, and digital marketing to deliver comprehensive solutions. We don't just build products—we build partnerships, working closely with each client to understand their unique challenges and create solutions that exceed expectations.
          </p>
        </div>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Award size={40} className="text-blue-600" />,
                title: 'Innovation', 
                desc: 'Embracing the latest technologies and creative approaches to stay ahead of the curve and deliver cutting-edge solutions.' 
              },
              { 
                icon: <Target size={40} className="text-blue-600" />,
                title: 'Excellence', 
                desc: 'Delivering quality that exceeds expectations every time, with attention to detail and commitment to perfection.' 
              },
              { 
                icon: <Users size={40} className="text-blue-600" />,
                title: 'Partnership', 
                desc: 'Building lasting relationships through trust, transparency, and genuine dedication to our clients success.' 
              }
            ].map((value, i) => (
              <div 
                key={i} 
                className={`glass p-8 text-center team-card card-fade-up ${visibleCards.has(`value-${i}`) ? 'visible' : ''}`}
                data-card-id={`value-${i}`}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <div className="glass p-12 mb-16 bg-gradient-to-br from-blue-50 to-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            To empower businesses with transformative digital solutions that drive growth, enhance user experiences, and create lasting impact. We're committed to turning your vision into reality through innovation, expertise, and unwavering dedication to your success.
          </p>
        </div>

        {/* Team Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Talented professionals passionate about digital excellence
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { name: 'Michael Chen', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'Emily Rodriguez', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
              { name: 'David Park', role: 'Lead Developer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
              { name: 'Lisa Thompson', role: 'Marketing Director', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80' },
              { name: 'James Wilson', role: 'Data Scientist', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }
            ].map((member, i) => (
              <div 
                key={i} 
                className={`glass overflow-hidden team-card card-fade-up ${visibleCards.has(`team-${i}`) ? 'visible' : ''}`}
                data-card-id={`team-${i}`}
              >
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const PortfolioPage = ({ visibleCards }) => {
  const projects = [
    {
      title: 'FinTech Mobile App',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      role: 'Full Stack Development',
      tech: 'React Native, Node.js, PostgreSQL',
      result: '500K+ downloads in first 6 months',
      category: 'Mobile'
    },
    {
      title: 'E-Commerce Platform',
      img: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      role: 'Web Development & Design',
      tech: 'React, Tailwind CSS, Stripe API',
      result: '300% increase in online sales',
      category: 'Web'
    },
    {
      title: 'AI Analytics Dashboard',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      role: 'Data Science & ML',
      tech: 'Python, TensorFlow, D3.js',
      result: 'Reduced analysis time by 80%',
      category: 'AI/ML'
    },
    {
      title: 'Brand Identity Campaign',
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      role: 'Marketing & Design',
      tech: 'Adobe Suite, Social Media',
      result: '2M+ impressions, 45% engagement',
      category: 'Marketing'
    },
    {
      title: 'Healthcare Management System',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      role: 'Full Stack Development',
      tech: 'Vue.js, Django, MySQL',
      result: 'Serving 10K+ patients daily',
      category: 'Web'
    },
    {
      title: 'Real Estate Website',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      role: 'Web Development & SEO',
      tech: 'Next.js, Headless CMS',
      result: '150% increase in qualified leads',
      category: 'Web'
    },
    {
      title: 'Fitness Tracking App',
      img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
      role: 'Mobile Development',
      tech: 'Flutter, Firebase',
      result: '100K+ active users',
      category: 'Mobile'
    },
    {
      title: 'Restaurant Ordering System',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      role: 'Full Stack Development',
      tech: 'React, Node.js, MongoDB',
      result: '40% faster order processing',
      category: 'Web'
    },
    {
      title: 'Social Media Management Tool',
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      role: 'Web Development',
      tech: 'React, Express, Redis',
      result: 'Managing 50K+ accounts',
      category: 'Web'
    }
  ];

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Our Portfolio</h1>
        <p className="text-center text-gray-600 mb-16 text-xl max-w-2xl mx-auto">
          Real projects, real results. See how we've helped businesses achieve their digital goals.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className={`glass overflow-hidden project-card card-fade-up ${visibleCards.has(`project-${i}`) ? 'visible' : ''}`}
              data-card-id={`project-${i}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Role:</strong> {project.role}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Tech:</strong> {project.tech}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-blue-600 font-semibold text-sm flex items-center gap-2">
                    <CheckCircle size={16} /> {project.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center glass p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-600 mb-8 text-lg">Let's discuss how we can bring your vision to life</p>
          <button 
            onClick={() => window.scrollTo(0, 0)}
            className="btn-primary px-8 py-4 rounded-full font-semibold text-lg"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ formData, setFormData, formErrors, handleSubmit, showSuccess, setShowSuccess }) => {
  return (
    <div className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Get In Touch</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Ready to start your project? We'd love to hear from you.
        </p>

        {/* Office Address */}
        <div className="glass p-8 mb-12 text-center">
          <div className="flex justify-center mb-4">
            <MapPin className="text-blue-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Office</h2>
          <p className="text-gray-700 text-lg mb-2">123 Digital Avenue, Tech District</p>
          <p className="text-gray-700 text-lg mb-6">San Francisco, CA 94103</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-sm">
            <a href="mailto:hello@leadlobby.com" className="text-blue-600 hover:underline flex items-center justify-center gap-2 font-medium">
              <Mail size={18} /> hello@leadlobby.com
            </a>
            <a href="tel:+14155551234" className="text-blue-600 hover:underline flex items-center justify-center gap-2 font-medium">
              <Phone size={18} /> (415) 555-1234
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="name">
                Name <span className="text-blue-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all bg-white"
                placeholder="Your full name"
              />
              {formErrors.name && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">⚠️ {formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="phone">
                Phone <span className="text-blue-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all bg-white"
                placeholder="Your phone number"
              />
              {formErrors.phone && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">⚠️ {formErrors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="email">
                Email <span className="text-blue-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all bg-white"
                placeholder="your.email@example.com"
              />
              {formErrors.email && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">⚠️ {formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="message">
                Message / Concern <span className="text-blue-600">*</span>
              </label>
              <textarea
                id="message"
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 transition-all resize-none bg-white"
                placeholder="Tell us about your project..."
              />
              {formErrors.message && <p className="text-red-600 text-sm mt-2 flex items-center gap-1">⚠️ {formErrors.message}</p>}
            </div>

            <button
              onClick={handleSubmit}
              className="btn-primary w-full px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Send Message
            </button>

            <p className="text-center text-sm text-gray-500">
              We typically respond within 1-2 business days
            </p>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4" 
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setShowSuccess(false)}
          >
            <div 
              className="glass p-10 max-w-md text-center menu-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Thank You!</h3>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                We've received your message and will get back to you within 1-2 business days.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="btn-primary px-8 py-3 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadLobby;
