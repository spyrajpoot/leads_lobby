import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Mail, Phone, MapPin, CheckCircle, Code, Smartphone, TrendingUp, Video, Database, Users, Award, Target, Star, Zap, Shield, Rocket, ArrowRight } from 'lucide-react';

const LeadLobby = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

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
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
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
    <div className="min-h-screen bg-white text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@600;700;800;900&display=swap');
        
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
        h1, h2, h3 { font-family: 'Sora', sans-serif; }
        
        .glass {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(99,102,241,0.18), 0 0 0 1px rgba(255,255,255,0.5) inset;
          border: 1px solid rgba(255,255,255,0.5);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 40%, #EC4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .btn-primary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(99,102,241,0.5);
        }
        
        .service-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        
        .service-card::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s;
        }
        
        .service-card:hover::after {
          opacity: 1;
        }
        
        .service-card:hover {
          transform: translateY(-16px) scale(1.03);
          box-shadow: 0 25px 50px rgba(99,102,241,0.3);
        }
        
        .project-card {
          transition: all 0.4s ease;
          overflow: hidden;
          cursor: pointer;
        }
        
        .project-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(99,102,241,0.35);
        }
        
        .project-card img {
          transition: transform 0.6s ease;
        }
        
        .project-card:hover img {
          transform: scale(1.15) rotate(2deg);
        }
        
        .hero-gradient {
          background: 
            radial-gradient(circle at 20% 30%, rgba(99,102,241,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(139,92,246,0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236,72,153,0.1) 0%, transparent 60%);
          position: relative;
        }
        
        .hero-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.03) 50%, transparent 100%),
            linear-gradient(0deg, transparent 0%, rgba(139,92,246,0.03) 50%, transparent 100%);
          animation: grid 20s linear infinite;
        }
        
        @keyframes grid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .marquee-wrapper {
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        
        .marquee {
          display: flex;
          animation: scroll 40s linear infinite;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .marquee:hover {
          animation-play-state: paused;
        }
        
        .stat-number {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse-ring {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: #6366F1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 768px) {
          .stat-number { font-size: 2.5rem; }
        }
      `}</style>

      <nav 
        className={`fixed left-1/2 z-50 transition-all duration-500 ${
          navVisible ? 'top-6 opacity-100' : '-top-32 opacity-0'
        }`}
        style={{ transform: 'translateX(-50%)', width: 'min(980px, 92%)' }}
      >
        <div className="glass px-8 py-5 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-black gradient-text focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg px-3 py-2 transition-all"
          >
            Lead Lobby
          </button>
          
          <div className="hidden md:flex items-center gap-10">
            {pages.map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page.toLowerCase())}
                className={`text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg px-4 py-2 ${
                  currentPage === page.toLowerCase() 
                    ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg' 
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-purple-50"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div 
          className="fixed inset-0 z-40"
          style={{ 
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="glass absolute left-1/2 top-28 p-10 w-96 max-w-[92%]"
            style={{ transform: 'translateX(-50%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {pages.map(page => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page.toLowerCase());
                  setMenuOpen(false);
                }}
                className={`w-full text-lg font-bold text-left py-4 px-6 rounded-xl transition-all mb-3 ${
                  currentPage === page.toLowerCase() 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl' 
                    : 'text-gray-800 hover:bg-purple-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="pt-24">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'portfolio' && <PortfolioPage />}
        {currentPage === 'contact' && <ContactPage formData={formData} setFormData={setFormData} formErrors={formErrors} handleSubmit={handleSubmit} showSuccess={showSuccess} />}
      </main>

      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-4 gradient-text">Lead Lobby</h3>
              <p className="text-gray-300 leading-relaxed">Transforming ideas into digital reality with innovation and excellence.</p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <div className="flex flex-col gap-3">
                {pages.map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page.toLowerCase())}
                    className="text-gray-300 hover:text-white text-left transition-colors hover:translate-x-1 duration-300"
                  >
                    → {page}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Services</h4>
              <div className="flex flex-col gap-3 text-gray-300">
                <p>• App Development</p>
                <p>• Web Design</p>
                <p>• Data Science</p>
                <p>• Digital Marketing</p>
                <p>• Video Production</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Contact</h4>
              <div className="flex flex-col gap-3 text-gray-300">
                <p className="flex items-center gap-2"><Mail size={18} /> hello@leadlobby.com</p>
                <p className="flex items-center gap-2"><Phone size={18} /> (415) 555-1234</p>
                <p className="flex items-center gap-2"><MapPin size={18} /> San Francisco, CA</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Lead Lobby. All rights reserved. Built with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const HomePage = ({ setCurrentPage }) => {
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden hero-gradient">
        <div className="max-w-6xl mx-auto text-center relative z-10 py-20">
          <div className="inline-block mb-8 floating">
            <span className="px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-bold shadow-lg">
              🚀 Trusted by 50+ Companies Worldwide
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            Transform Ideas Into<br/>
            <span className="gradient-text">Digital Reality</span>
          </h1>
          <p className="text-xl md:text-3xl mb-12 text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Premium digital experiences that captivate audiences and drive exponential growth
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setCurrentPage('services')}
              className="btn-primary px-12 py-6 rounded-full font-bold text-xl inline-flex items-center justify-center gap-3 shadow-2xl"
            >
              Explore Services <ArrowRight size={24} />
            </button>
            <button 
              onClick={() => setCurrentPage('portfolio')}
              className="glass px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl transition-all"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <p className="text-center text-gray-600 font-bold tracking-widest uppercase text-sm mb-16">
          Trusted By Industry Leaders
        </p>
        <div className="marquee-wrapper">
          <div className="marquee">
            <div className="flex items-center gap-20 px-10">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'Spotify', 'Adobe', 'Samsung'].map((c, i) => (
                <span key={i} className="text-4xl font-black text-gray-300 hover:text-purple-600 transition-all cursor-pointer transform hover:scale-125 whitespace-nowrap">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-20 px-10">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'Spotify', 'Adobe', 'Samsung'].map((c, i) => (
                <span key={i + 10} className="text-4xl font-black text-gray-300 hover:text-purple-600 transition-all cursor-pointer transform hover:scale-125 whitespace-nowrap">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 text-center">
            {[
              { num: 150, label: 'Projects Completed', icon: <Rocket size={40} className="mx-auto mb-6 text-purple-600" /> },
              { num: 50, label: 'Happy Clients', icon: <Users size={40} className="mx-auto mb-6 text-indigo-600" /> },
              { num: 10, label: 'Expert Team', icon: <Award size={40} className="mx-auto mb-6 text-pink-600" /> },
              { num: 5, label: 'Years Experience', icon: <Shield size={40} className="mx-auto mb-6 text-purple-600" /> }
            ].map((s, i) => (
              <div key={i} className="pulse-ring">
                {s.icon}
                <div className="stat-number">{s.num}+</div>
                <p className="text-gray-600 font-bold mt-4 text-lg">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              What <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-gray-600 text-2xl font-medium">Real results, real testimonials</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO, TechStart',
                text: 'Lead Lobby completely transformed our digital presence. The execution and attention to detail exceeded every expectation.',
                img: 'https://i.pravatar.cc/150?img=1'
              },
              {
                name: 'Michael Chen',
                role: 'Founder, GrowthCo',
                text: 'Incredible team! They brought our vision to life and helped us scale to new heights with strategic precision.',
                img: 'https://i.pravatar.cc/150?img=13'
              },
              {
                name: 'Emily Rodriguez',
                role: 'CMO, InnovateLabs',
                text: 'The ROI exceeded all projections. Their digital marketing strategies delivered phenomenal results consistently.',
                img: 'https://i.pravatar.cc/150?img=5'
              }
            ].map((t, i) => (
              <div key={i} className="glass p-10 service-card">
                <div className="flex gap-2 mb-6">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={24} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg italic font-medium">{t.text}</p>
                <div className="flex items-center gap-5">
                  <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full border-4 border-purple-200" />
                  <div>
                    <p className="font-black text-xl">{t.name}</p>
                    <p className="text-purple-600 font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              Why Choose <span className="gradient-text">Lead Lobby</span>
            </h2>
            <p className="text-gray-600 text-2xl font-medium">Excellence in every detail</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Zap size={56} className="text-purple-600" />,
                title: 'Lightning Fast', 
                desc: 'Optimized performance and blazing-fast load times that keep users engaged and converting.' 
              },
              { 
                icon: <Target size={56} className="text-indigo-600" />,
                title: 'Results Driven', 
                desc: 'Data-driven strategies delivering measurable ROI and exponential business growth.' 
              },
              { 
                icon: <Shield size={56} className="text-pink-600" />,
                title: 'Secure & Reliable', 
                desc: 'Enterprise-grade security with 99.9% uptime. Your digital assets are protected.' 
              }
            ].map((v, i) => (
              <div key={i} className="glass p-12 text-center service-card">
                <div className="flex justify-center mb-8">{v.icon}</div>
                <h3 className="text-3xl font-black mb-6">{v.title}</h3>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-gray-600 text-2xl font-medium">Comprehensive solutions for modern businesses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'App Development', icon: <Smartphone size={64} className="text-purple-600" />, desc: 'Native & cross-platform mobile experiences that users love' },
              { title: 'Web Development', icon: <Code size={64} className="text-indigo-600" />, desc: 'Modern, scalable web applications built for performance' },
              { title: 'Digital Marketing', icon: <TrendingUp size={64} className="text-pink-600" />, desc: 'Growth-focused strategies that drive real results' }
            ].map((s, i) => (
              <div 
                key={i} 
                className="glass p-12 text-center service-card cursor-pointer"
                onClick={() => setCurrentPage('services')}
              >
                <div className="flex justify-center mb-8 floating">{s.icon}</div>
                <h3 className="text-3xl font-black mb-6">{s.title}</h3>
                <p className="text-gray-700 mb-8 text-lg font-medium leading-relaxed">{s.desc}</p>
                <button className="text-purple-600 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all">
                  Learn More <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-600 text-2xl font-medium">See our work in action</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 mb-16">
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
            ].map((p, i) => (
              <div 
                key={i} 
                className="glass overflow-hidden project-card"
                onClick={() => setCurrentPage('portfolio')}
              >
                <img 
                  src={p.img} 
                  alt={p.title}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-10">
                  <h3 className="text-3xl font-black mb-4">{p.title}</h3>
                  <p className="text-purple-600 font-black text-xl">✨ {p.result}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('portfolio')}
              className="btn-primary px-12 py-6 rounded-full font-bold text-xl inline-flex items-center gap-3 shadow-2xl"
            >
              View All Projects <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">Ready to Start Your Project?</h2>
          <p className="text-2xl mb-12 opacity-95 font-medium">Let's transform your vision into reality with cutting-edge digital solutions</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-purple-600 px-12 py-6 rounded-full font-black text-xl hover:bg-gray-100 transition-all hover:scale-110 shadow-2xl"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = () => {
  const services = [
    {
      title: 'App Development',
      desc: 'Fast, reliable, user-friendly mobile apps for iOS and Android. Native and cross-platform solutions that deliver exceptional experiences and drive engagement.',
      icon: <Smartphone size={64} className="text-purple-600" />,
      features: ['iOS & Android', 'Cross-platform', 'Native performance', 'App store optimization']
    },
    {
      title: 'Data Science / Machine Learning',
      desc: 'AI solutions that extract actionable insights from your data. From predictive analytics to custom ML models that drive intelligent business decisions.',
      icon: <Database size={64} className="text-indigo-600" />,
      features: ['Predictive analytics', 'Custom ML models', 'Data visualization', 'AI integration']
    },
    {
      title: 'Website Development',
      desc: 'Modern, responsive websites built with cutting-edge technologies. Lightning-fast performance and stunning designs that convert visitors into customers.',
      icon: <Code size={64} className="text-pink-600" />,
      features: ['Responsive design', 'Blazing performance', 'SEO optimized', 'CMS integration']
    },
    {
      title: 'Video Editing / Graphics Design',
      desc: 'High-impact visuals and video content that captivates audiences. From motion graphics to promotional videos that elevate your brand presence.',
      icon: <Video size={64} className="text-purple-600" />,
      features: ['Motion graphics', 'Video production', 'Brand identity', 'Social media content']
    },
    {
      title: 'SEO / Digital Marketing',
      desc: 'Increase visibility and reach your target audience with data-driven strategies. Organic growth that maximizes ROI across all digital channels.',
      icon: <TrendingUp size={64} className="text-indigo-600" />,
      features: ['SEO optimization', 'Social media marketing', 'Content strategy', 'Analytics & reporting']
    }
  ];

  return (
    <div className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6">Our Services</h1>
          <p className="text-gray-600 text-2xl max-w-3xl mx-auto font-medium">
            Comprehensive digital solutions designed to transform your business and accelerate growth
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {services.map((service, i) => (
            <div key={i} className="glass p-10 service-card">
              <div className="flex justify-center mb-8 floating">{service.icon}</div>
              <h3 className="text-3xl font-black mb-6 text-center">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg font-medium">{service.desc}</p>
              <div className="border-t-2 border-purple-100 pt-6">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle size={20} className="text-purple-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-16">
          <h2 className="text-5xl font-black text-center mb-16">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Deep dive into your goals, audience, and vision' },
              { step: '02', title: 'Strategy', desc: 'Custom roadmap tailored to your unique needs' },
              { step: '03', title: 'Execution', desc: 'Build, test, and refine with precision' },
              { step: '04', title: 'Launch', desc: 'Deploy and provide ongoing optimization' }
            ].map((item, i) => (
              <div key={i} className="text-center glass p-8 service-card">
                <div className="text-6xl font-black text-purple-600 mb-6">{item.step}</div>
                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6">About Lead Lobby</h1>
        </div>
        
        <div className="glass p-16 mb-20">
          <h2 className="text-4xl font-black mb-8">Our Story</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
            Lead Lobby was founded with a powerful mission: to bridge the gap between innovative ideas and digital reality. We believe every business deserves world-class digital solutions that drive measurable results.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
            What started as a small team of passionate developers has grown into a full-service digital powerhouse. We've helped hundreds of clients transform their digital presence through cutting-edge technology and strategic innovation.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            Our team brings together diverse expertise in development, design, data science, and digital marketing. We don't just build products—we build lasting partnerships through trust, transparency, and exceptional results.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-5xl font-black text-center mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Award size={56} className="text-purple-600" />,
                title: 'Innovation', 
                desc: 'Embracing cutting-edge technologies and creative approaches to stay ahead of the curve and deliver transformative solutions.' 
              },
              { 
                icon: <Target size={56} className="text-indigo-600" />,
                title: 'Excellence', 
                desc: 'Delivering quality that exceeds expectations with meticulous attention to detail and unwavering commitment to perfection.' 
              },
              { 
                icon: <Users size={56} className="text-pink-600" />,
                title: 'Partnership', 
                desc: 'Building lasting relationships through genuine dedication, transparency, and commitment to our clients success.' 
              }
            ].map((value, i) => (
              <div key={i} className="glass p-10 text-center service-card">
                <div className="flex justify-center mb-8">{value.icon}</div>
                <h3 className="text-3xl font-black mb-6">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="glass p-16 bg-gradient-to-br from-purple-50 to-indigo-50">
          <h2 className="text-4xl font-black mb-8 text-center">Our Mission</h2>
          <p className="text-2xl text-gray-700 leading-relaxed text-center font-medium">
            To empower businesses with transformative digital solutions that drive exponential growth, enhance user experiences, and create lasting impact through innovation and unwavering dedication.
          </p>
        </div>

        <section className="mt-20">
          <h2 className="text-5xl font-black text-center mb-6">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-16 text-xl font-medium">
            Talented professionals passionate about digital excellence
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { name: 'Michael Chen', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'Emily Rodriguez', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
              { name: 'David Park', role: 'Lead Developer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
              { name: 'Lisa Thompson', role: 'Marketing Director', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80' },
              { name: 'James Wilson', role: 'Data Scientist', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' }
            ].map((member, i) => (
              <div key={i} className="glass overflow-hidden service-card">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-black mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-bold text-lg">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  const projects = [
    {
      title: 'FinTech Mobile App',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      role: 'Full Stack Development',
      tech: 'React Native, Node.js, PostgreSQL',
      result: '500K+ downloads in 6 months',
      category: 'Mobile'
    },
    {
      title: 'E-Commerce Platform',
      img: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      role: 'Web Development & Design',
      tech: 'React, Tailwind CSS, Stripe',
      result: '300% increase in sales',
      category: 'Web'
    },
    {
      title: 'AI Analytics Dashboard',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      role: 'Data Science & ML',
      tech: 'Python, TensorFlow, D3.js',
      result: '80% faster analysis',
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
      title: 'Healthcare System',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      role: 'Full Stack Development',
      tech: 'Vue.js, Django, MySQL',
      result: '10K+ patients daily',
      category: 'Web'
    },
    {
      title: 'Real Estate Website',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      role: 'Web Development & SEO',
      tech: 'Next.js, Headless CMS',
      result: '150% more qualified leads',
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
      title: 'Restaurant Ordering',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      role: 'Full Stack Development',
      tech: 'React, Node.js, MongoDB',
      result: '40% faster processing',
      category: 'Web'
    },
    {
      title: 'Social Media Tool',
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      role: 'Web Development',
      tech: 'React, Express, Redis',
      result: 'Managing 50K+ accounts',
      category: 'Web'
    }
  ];

  return (
    <div className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6">Our Portfolio</h1>
          <p className="text-gray-600 text-2xl max-w-3xl mx-auto font-medium">
            Real projects, real results. See how we've helped businesses achieve digital excellence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <div key={i} className="glass overflow-hidden project-card">
              <div className="relative overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {project.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black mb-4">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2 font-semibold">
                  <strong>Role:</strong> {project.role}
                </p>
                <p className="text-sm text-gray-600 mb-6 font-semibold">
                  <strong>Tech:</strong> {project.tech}
                </p>
                <div className="border-t-2 border-purple-100 pt-4">
                  <p className="text-purple-600 font-black text-lg flex items-center gap-2">
                    <CheckCircle size={20} /> {project.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center glass p-16 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50">
          <h2 className="text-4xl font-black mb-6">Have a Project in Mind?</h2>
          <p className="text-gray-600 mb-10 text-xl font-medium">Let's discuss how we can bring your vision to life</p>
          <button 
            onClick={() => window.scrollTo(0, 0)}
            className="btn-primary px-12 py-6 rounded-full font-bold text-xl shadow-2xl inline-flex items-center gap-3"
          >
            Start Your Project <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ formData, setFormData, formErrors, handleSubmit, showSuccess }) => {
  return (
    <div className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6">Get In Touch</h1>
          <p className="text-gray-600 text-2xl font-medium">
            Ready to start your project? Let's create something amazing together.
          </p>
        </div>

        <div className="glass p-12 mb-16 text-center">
          <div className="flex justify-center mb-6">
            <MapPin className="text-purple-600" size={48} />
          </div>
          <h2 className="text-3xl font-black mb-6">Our Office</h2>
          <p className="text-gray-700 text-xl mb-3 font-semibold">123 Digital Avenue, Tech District</p>
          <p className="text-gray-700 text-xl mb-8 font-semibold">San Francisco, CA 94103</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-lg">
            <a href="mailto:hello@leadlobby.com" className="text-purple-600 hover:underline flex items-center justify-center gap-3 font-bold">
              <Mail size={22} /> hello@leadlobby.com
            </a>
            <a href="tel:+14155551234" className="text-purple-600 hover:underline flex items-center justify-center gap-3 font-bold">
              <Phone size={22} /> (415) 555-1234
            </a>
          </div>
        </div>

        <div className="glass p-12">
          <h2 className="text-3xl font-black mb-10 text-center">Send Us a Message</h2>
          
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-bold mb-3 text-gray-800" htmlFor="name">
                Name <span className="text-purple-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 text-lg font-medium transition-all bg-white"
                placeholder="Your full name"
              />
              {formErrors.name && <p className="text-red-600 font-semibold mt-2 flex items-center gap-2">⚠️ {formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-lg font-bold mb-3 text-gray-800" htmlFor="phone">
                Phone <span className="text-purple-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 text-lg font-medium transition-all bg-white"
                placeholder="Your phone number"
              />
              {formErrors.phone && <p className="text-red-600 font-semibold mt-2 flex items-center gap-2">⚠️ {formErrors.phone}</p>}
            </div>

            <div>
              <label className="block text-lg font-bold mb-3 text-gray-800" htmlFor="email">
                Email <span className="text-purple-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 text-lg font-medium transition-all bg-white"
                placeholder="your.email@example.com"
              />
              {formErrors.email && <p className="text-red-600 font-semibold mt-2 flex items-center gap-2">⚠️ {formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-lg font-bold mb-3 text-gray-800" htmlFor="message">
                Message <span className="text-purple-600">*</span>
              </label>
              <textarea
                id="message"
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 text-lg font-medium transition-all resize-none bg-white"
                placeholder="Tell us about your project..."
              />
              {formErrors.message && <p className="text-red-600 font-semibold mt-2 flex items-center gap-2">⚠️ {formErrors.message}</p>}
            </div>

            <button
              onClick={handleSubmit}
              className="btn-primary w-full px-8 py-5 rounded-xl font-black text-xl shadow-2xl"
            >
              Send Message
            </button>

            <p className="text-center text-gray-500 font-medium">
              We typically respond within 1-2 business days
            </p>
          </div>
        </div>

        {showSuccess && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center px-6" 
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => {}}
          >
            <div className="glass p-16 max-w-md text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={56} className="text-green-600" />
              </div>
              <h3 className="text-4xl font-black mb-4">Thank You!</h3>
              <p className="text-gray-700 mb-10 text-xl leading-relaxed font-medium">
                We've received your message and will get back to you within 1-2 business days.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadLobby;