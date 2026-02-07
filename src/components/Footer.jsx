import React from 'react';

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row items-center justify-between w-full pt-20 pb-16 mt-24 border-t border-white/5 gap-8">
            <div className="flex items-center gap-3 opacity-50">
                <div className="size-10 flex items-center justify-center">
                    <img src="/logo/bim_italic_white.png" alt="BIM Logo" className="w-full h-auto object-contain" />
                </div>
                <p className="text-gray-400 text-sm font-bold">
                    © 2026 Bryant Melliza Portfolio. All Rights Reserved.
                </p>
            </div>
            <div className="flex items-center gap-10">
                <a className="text-gray-500 font-bold hover:text-royal-blue transition-colors text-sm uppercase tracking-widest"
                    href="https://www.linkedin.com/in/bryant-iverson-c-melliza-6759b8292"
                    target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a className="text-gray-500 font-bold hover:text-royal-blue transition-colors text-sm uppercase tracking-widest"
                    href="https://github.com/brybryson" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </footer>
    );
};

export default Footer;
