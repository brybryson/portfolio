import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between w-full mb-20 scroll-mt-20">
            <div className="flex items-center gap-4 group cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-300">
                <div className="relative size-16 flex items-center justify-center">
                    <img
                        src="/bryant-portfolio/logo/bim_italic_white.png"
                        alt="BIM Logo"
                        className="w-full h-auto object-contain transition-all duration-300"
                    />
                </div>
                <div className="flex flex-col leading-none">
                    <h2 className="text-white text-xl font-black tracking-tighter uppercase transition-colors">Bryant Melliza</h2>
                    <span className="text-[10px] text-royal-blue font-black tracking-[0.3em] uppercase mt-1">
                        Software Developer
                    </span>
                </div>
            </div>
            <nav className="hidden md:flex items-center bg-card-dark/50 backdrop-blur-xl px-2 py-2 rounded-full border border-white/10 bento-shadow transition-all duration-300">
                <a className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors" href="#works">Works</a>
                <a className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors" href="#tech-stack">Stack</a>
                <a className="px-6 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors" href="#experience">Experience</a>
                <a href="#contact" className="ml-2 px-8 py-2.5 bg-royal-blue text-white rounded-full text-sm font-black hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-royal-blue/20 flex items-center justify-center">
                    Let's Talk
                </a>
            </nav>
        </header>
    );
};

export default Header;
