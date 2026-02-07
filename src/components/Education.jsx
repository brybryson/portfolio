import React from 'react';

const Education = () => {
    return (
        <section id="education" className="section-gap reveal active">
            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-12 text-center">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="gradient-card p-10 rounded-[2.5rem] bento-shadow flex flex-col justify-between group text-left relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="size-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 overflow-hidden p-4">
                            <img src="/images/education/NU LOGO.png" alt="National University Logo" className="w-full h-full object-contain" />
                        </div>
                        <h4 className="text-white font-black text-2xl mb-2">BS Information Technology</h4>
                        <p className="text-gray-300 font-bold text-lg mb-6 text-left">National University — Fairview</p>
                        <p className="text-gray-400 leading-relaxed text-left">
                            Specialization in Mobile and Internet Technologies. Blue Scholar (100% Full Merit Scholarship). Focus on modern full-stack development and IoT integration.
                        </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
                        <span className="text-royal-blue font-black text-sm uppercase tracking-widest text-left">In Progress (2022 - 2026)</span>
                        <span className="text-gray-500 font-bold text-sm">Consistent First Honor</span>
                    </div>
                </div>
                <div className="gradient-card p-10 rounded-[2.5rem] bento-shadow flex flex-col justify-between group text-left relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="size-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 overflow-hidden p-4">
                            <img src="/images/education/CNSTHS.png" alt="CNSTHS Logo" className="w-full h-full object-contain" />
                        </div>
                        <h4 className="text-white font-black text-2xl mb-2">STEM Strand</h4>
                        <p className="text-gray-300 font-bold text-lg mb-6 text-left">Caloocan National Science & Technology High School</p>
                        <p className="text-gray-400 leading-relaxed text-left">
                            Graduated with High Honors. Science, Technology, Engineering, and Mathematics strand with focus on analytical thinking and technical foundations.
                        </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
                        <span className="text-gray-400 font-black text-sm uppercase tracking-widest text-left">Graduated 2022</span>
                        <span className="text-gray-500 font-bold text-sm">High Honors</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
