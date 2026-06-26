import React from 'react';

const Hero = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 section-gap reveal active">
            <div className="md:col-span-7 lg:col-span-8 bg-card-dark rounded-[2.5rem] p-10 md:p-16 hero-glow-shadow border border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[500px]">
                <div className="absolute -top-24 -left-24 size-96 bg-royal-blue/20 rounded-full blur-[100px]"></div>
                <div className="relative z-20 max-w-xl text-left">
                    <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-8">
                        Engineering <span className="text-royal-blue italic">scalable</span> digital solutions.
                    </h1>
                    <p className="text-gray-400 text-xl leading-relaxed mb-10 font-medium">
                        Software Developer specialized in modern full-stack development, building resilient and high-performance applications with React, Next.js, and Prisma.
                    </p>
                    <div className="flex flex-wrap items-center gap-5">
                        {/* <a href="/resume/Bryant_Melliza_Resume.pdf" download className="flex items-center gap-2 px-10 py-5 bg-royal-blue text-white rounded-2xl font-black hover:bg-royal-blue/80 transition-all shadow-lg shadow-royal-blue/20">
                            Download Resume <span className="material-symbols-outlined text-sm">download</span>
                        </a> */}
                        <a href="#contact" className="flex items-center gap-2 px-10 py-5 bg-white/5 text-white rounded-2xl font-black border border-white/10 hover:bg-white/10 transition-all">
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
            <div className="md:col-span-5 lg:col-span-4 bg-card-dark rounded-[2.5rem] p-10 bento-shadow border border-white/5 flex flex-col">
                <div className="flex flex-col items-center text-center">
                    <div className="size-48 md:size-56 bg-gradient-to-br from-royal-blue to-accent rounded-3xl mb-8 p-1.5 shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
                        <img alt="Bryant Melliza" className="w-full h-full object-cover rounded-[1.25rem]" src="/images/bry_pic.jpeg" />
                    </div>
                    <h3 className="text-white text-3xl font-black mb-2">Bryant Melliza</h3>
                    <p className="text-royal-blue font-bold mb-6">Software Developer</p>
                    <div className="w-full space-y-4 mb-8 text-left">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-royal-blue/30 transition-colors group cursor-pointer" onClick={() => window.open('mailto:bryantiversonmelliza03@gmail.com')}>
                            <span className="material-symbols-outlined text-royal-blue group-hover:scale-110 transition-transform">mail</span>
                            <span className="text-gray-300 font-medium text-xs md:text-sm break-all">bryantiversonmelliza03@gmail.com</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-royal-blue/30 transition-colors">
                            <span className="material-symbols-outlined text-royal-blue">phone</span>
                            <span className="text-gray-300 font-medium">+63 939 817 0375</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-royal-blue/30 transition-colors">
                            <span className="material-symbols-outlined text-royal-blue">location_on</span>
                            <span className="text-gray-300 font-medium">Metro Manila, PH</span>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <a href="https://github.com/brybryson" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-center items-center hover:bg-white/10 hover:border-royal-blue/30 transition-all group">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="size-8 invert opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <a href="https://www.linkedin.com/in/bryant-iverson-c-melliza-6759b8292" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-center items-center hover:bg-white/10 hover:border-royal-blue/30 transition-all group">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="size-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
