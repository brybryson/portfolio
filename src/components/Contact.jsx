import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="w-full bg-royal-blue rounded-[3rem] p-12 md:p-24 cta-glow-shadow border border-royal-blue/20 relative overflow-hidden flex flex-col items-center text-center reveal active">
            <div className="absolute -bottom-40 -left-40 size-96 bg-white/20 rounded-full blur-[120px]"></div>
            <div className="absolute -top-40 -right-40 size-96 bg-accent/30 rounded-full blur-[120px]"></div>
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-white text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">Let's build the <br />next big thing.</h2>
                <p className="text-white/80 text-xl md:text-2xl mb-14 font-medium">
                    Currently open to internship opportunities and high-impact software engineering roles.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="mailto:bryantiversonmelliza03@gmail.com"
                        className="px-14 py-6 bg-white text-royal-blue rounded-[2rem] font-black text-xl hover:bg-gray-100 transition-all active:scale-95 shadow-2xl shadow-black/30">
                        Send a Message
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
