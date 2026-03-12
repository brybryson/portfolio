import React from 'react';

const Experience = () => {
    return (
        <section id="experience" className="section-gap reveal active">
            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-12 text-left">Professional Journey</h2>
            <div className="space-y-8">
                {/* New Internship Role */}
                <div className="bg-card-dark p-10 rounded-[2.5rem] bento-shadow border border-white/5 flex flex-col md:flex-row items-start gap-10 hover:bg-white/[0.02] transition-colors">
                    <div className="size-24 bg-white/5 border border-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden p-4">
                        <img src="/images/experience/JLABS-LOGO.png" alt="JLabs Innovatech Inc. Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-left">
                            <div>
                                <h4 className="text-white font-black text-2xl">Intern Developer</h4>
                                <p className="text-royal-blue font-bold mt-1 text-left">JLabs Innovatech Inc.</p>
                            </div>
                            <span className="text-royal-blue text-xs font-black bg-royal-blue/10 px-4 py-2 rounded-full uppercase tracking-widest border border-royal-blue/20 self-start">
                                March 2026 - Present
                            </span>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed text-left">
                            Joining the engineering team at JLabs Innovatech Inc. to contribute to high-quality web and mobile solutions. I collaborate with cross-functional teams including designers and PMs to develop maintainable code, assist in UI/UX implementation, and participate in the full software development lifecycle (SDLC) using Agile methodologies.
                        </p>
                    </div>
                </div>

                {/* Previous Role Updated */}
                <div className="bg-card-dark p-10 rounded-[2.5rem] bento-shadow border border-white/5 flex flex-col md:flex-row items-start gap-10 hover:bg-white/[0.02] transition-colors">
                    <div className="size-24 bg-white/5 border border-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden p-4">
                        <img src="/images/experience/NLP LOGO.png" alt="NLP Business Development Services Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-left">
                            <div>
                                <h4 className="text-white font-black text-2xl">Software Developer</h4>
                                <p className="text-royal-blue font-bold mt-1 text-left">NLP Business Development Services</p>
                            </div>
                            <span className="text-royal-blue text-xs font-black bg-royal-blue/10 px-4 py-2 rounded-full uppercase tracking-widest border border-royal-blue/20 self-start">
                                Nov 2025 - Feb 2026
                            </span>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed text-left">
                            Engineered responsive web applications using React 19, Next.js, and Prisma (PostgreSQL). Led the rapid redesign of internal modules and optimized data schemas using Prisma ORM. Integrated AI-assisted tooling to accelerate feature delivery.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
