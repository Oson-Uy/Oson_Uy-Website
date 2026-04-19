import React from 'react';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-16 md:py-24 text-slate-900">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rotate-45"></div>
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">Arkit</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-12 font-medium leading-relaxed">
              Defining the standard of excellence in architectural real estate throughout Central Asia&apos;s historical and modern landscapes.
            </p>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Projects', 'Developments', 'About Us', 'Sustainability'].map(item => (
                  <li key={item}><a href="#" className="text-sm font-bold hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-8">Solutions</h4>
              <ul className="space-y-4">
                {['Investment', 'Concierge', 'Management', 'Legal'].map(item => (
                  <li key={item}><a href="#" className="text-sm font-bold hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-8">Contact</h4>
              <p className="text-sm font-bold mb-4">info@arkit.uz</p>
              <p className="text-sm font-bold mb-4">+998 (71) 234-56-78</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-100 mt-16 md:mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center md:text-left">
            © 2026 Arkit Real Estate. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
