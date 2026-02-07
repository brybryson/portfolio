import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, isOpen, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showDocs, setShowDocs] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCurrentSlide(0);
            setShowDocs(false);
        } else {
            document.body.style.overflow = 'auto'; // Restore on close
        }
        return () => { document.body.style.overflow = 'auto'; }; // Cleanup
    }, [isOpen]);

    if (!project) return null;

    const slides = project.slideshow || [project.image];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className={`w-full ${project.documentation ? 'max-w-4xl' : 'max-w-5xl'} max-h-[90vh] overflow-y-auto carousel-hide-scrollbar bg-glass-bg backdrop-blur-xl border border-white/10 p-8 md:p-12 relative text-center rounded-[2.5rem]`}
                        style={{
                            background: "var(--glass-bg)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)"
                        }}
                    >
                        <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50">
                            <span className="material-symbols-outlined text-4xl">close</span>
                        </button>

                        <div className="max-w-3xl mx-auto space-y-12">
                            {!showDocs ? (
                                <>
                                    <div>
                                        <span className="text-royal-blue font-black text-sm uppercase tracking-[0.3em] mb-4 block">{project.category}</span>
                                        <h2 className="text-white text-5xl md:text-6xl font-black tracking-tight leading-tight">{project.title}</h2>
                                        <p className="text-gray-400 text-xl mt-6 leading-relaxed italic">"{project.quote}"</p>
                                    </div>

                                    <div className="slideshow-container rounded-[3rem] aspect-video relative group/nav overflow-hidden bento-shadow border border-white/10">
                                        {slides.length > 1 && (
                                            <>
                                                <button className="nav-button prev opacity-0 group-hover/nav:opacity-100" onClick={prevSlide}>
                                                    <span className="material-symbols-outlined">west</span>
                                                </button>
                                                <button className="nav-button next opacity-0 group-hover/nav:opacity-100" onClick={nextSlide}>
                                                    <span className="material-symbols-outlined">east</span>
                                                </button>
                                            </>
                                        )}

                                        <AnimatePresence mode='wait'>
                                            <motion.img
                                                key={currentSlide}
                                                src={slides[currentSlide]}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-full h-full object-cover absolute inset-0"
                                                alt={`${project.title} slide`}
                                            />
                                        </AnimatePresence>
                                    </div>

                                    {slides.length > 1 && (
                                        <div className="flex justify-center gap-3">
                                            {slides.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => setCurrentSlide(idx)}
                                                    className={`slide-indicator ${idx === currentSlide ? 'active' : ''}`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Project Grid / Content */}
                                    {project.challenge ? (
                                        <div className="grid md:grid-cols-2 gap-8 text-left">
                                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4">
                                                    {project.id === 'prefect' || project.id === 'petgrooming' || project.id === 'vetflow' ? 'Core Objective' : 'The Challenge'}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{project.challenge}</p>
                                            </div>
                                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4">
                                                    {project.id === 'prefect' || project.id === 'petgrooming' || project.id === 'vetflow' ? 'Key Innovation' : 'The Solution'}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                                            </div>
                                        </div>
                                    ) : project.longDescription ? (
                                        <>
                                            <div className="grid md:grid-cols-3 gap-8">
                                                {project.features.map((feature, idx) => (
                                                    <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                                        <span className="material-symbols-outlined text-royal-blue text-4xl mb-4">{feature.icon}</span>
                                                        <h4 className="text-white font-bold mb-2">{feature.name}</h4>
                                                        <p className="text-gray-500 text-sm">{feature.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-gray-400 text-lg leading-relaxed text-justify px-4">
                                                {project.longDescription}
                                            </p>
                                        </>
                                    ) : null}

                                    {/* Icons / Feature Grid */}
                                    {project.features && !project.longDescription && (
                                        <div className={`grid grid-cols-2 ${project.features.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
                                            {project.features.map((feature, idx) => (
                                                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                    <span className="material-symbols-outlined text-royal-blue text-2xl mb-2">{feature.icon}</span>
                                                    <div className="text-white font-bold text-xs uppercase tracking-tighter">{feature.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Specialized Hardware/Software Grid for SALBAG */}
                                    {project.id === 'salbag' && (
                                        <div className="grid md:grid-cols-2 gap-8 text-left">
                                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4">Hardware Stack</h3>
                                                <ul className="text-gray-400 text-sm space-y-3">
                                                    {project.hardwareStack.map((item, idx) => (
                                                        <li key={idx} className="flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-royal-blue text-sm">{item.icon}</span>
                                                            {item.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                                                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-4">Software Stack</h3>
                                                <ul className="text-gray-400 text-sm space-y-3">
                                                    {project.softwareStack.map((item, idx) => (
                                                        <li key={idx} className="flex items-center gap-3">
                                                            <span className="material-symbols-outlined text-royal-blue text-sm">{item.icon}</span>
                                                            {item.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-8 flex flex-wrap justify-center gap-6">
                                        {project.demoUrl && (
                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-background-dark rounded-2xl font-black text-lg hover:bg-gray-100 transition-all active:scale-95 shadow-2xl">
                                                {project.id === 'petgrooming' ? 'View Backend' : 'Live Demo'}
                                            </a>
                                        )}
                                        {project.documentation && (
                                            <button
                                                onClick={() => setShowDocs(true)}
                                                className="px-10 py-5 bg-white text-background-dark rounded-2xl font-black text-lg hover:bg-gray-100 transition-all active:scale-95 shadow-2xl"
                                            >
                                                View Documentation
                                            </button>
                                        )}
                                        <button onClick={onClose} className={`px-10 py-5 ${project.demoUrl || project.documentation ? 'bg-transparent text-white border-2 border-white/20' : 'bg-royal-blue text-white'} rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95 shadow-xl`}>
                                            Back to Portfolio
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="text-justify"
                                >
                                    <div className="text-center mb-12">
                                        <span className="text-royal-blue font-black text-sm uppercase tracking-[0.3em] mb-4 block">Project Detail</span>
                                        <h2 className="text-white text-4xl font-black mb-8 tracking-tight">{project.title} Documentation</h2>
                                    </div>

                                    <div className="space-y-12">
                                        {project.documentation.overview && (
                                            <section className="space-y-4">
                                                <h3 className="text-royal-blue font-black text-xs uppercase tracking-widest">Abstract</h3>
                                                <p className="text-gray-400 leading-relaxed">{project.documentation.overview}</p>
                                            </section>
                                        )}

                                        {project.documentation.problem && (
                                            <section className="space-y-4">
                                                <h3 className="text-royal-blue font-black text-xs uppercase tracking-widest">Problem Statement</h3>
                                                <p className="text-gray-400 leading-relaxed">{project.documentation.problem}</p>
                                            </section>
                                        )}

                                        {project.documentation.objectives && (
                                            <section className="space-y-4">
                                                <h3 className="text-royal-blue font-black text-xs uppercase tracking-widest">Objectives</h3>
                                                <div className="grid md:grid-cols-3 gap-6">
                                                    {project.documentation.objectives.map((obj) => (
                                                        <div key={obj.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                                                            <div className="size-8 bg-royal-blue text-white rounded-full flex items-center justify-center font-black mx-auto mb-4 text-xs">
                                                                {obj.id}
                                                            </div>
                                                            <p className="text-gray-400 text-sm font-bold">{obj.text}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {project.documentation.components && (
                                            <section className="space-y-4">
                                                <h3 className="text-royal-blue font-black text-xs uppercase tracking-widest">Key Components</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {project.documentation.components.map((comp, idx) => (
                                                        <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 transition-all hover:border-royal-blue/30 group">
                                                            <div className="size-10 bg-royal-blue/20 text-royal-blue rounded-xl flex items-center justify-center">
                                                                <span className="material-symbols-outlined">{comp.icon}</span>
                                                            </div>
                                                            <span className="text-gray-300 font-bold">{comp.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-6 pt-8">
                                        <button
                                            onClick={() => setShowDocs(false)}
                                            className="px-10 py-5 bg-royal-blue text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all active:scale-95 shadow-xl"
                                        >
                                            Back to Project
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
