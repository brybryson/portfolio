import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const ProjectGrid = ({ onOpenModal }) => {
    const [visibleCount, setVisibleCount] = useState(3);

    const showMoreProjects = () => {
        setVisibleCount(prev => prev + 3);
    };

    return (
        <section id="works" className="section-gap">
            <div className="flex items-end justify-between mb-12">
                <div className="text-left">
                    <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight">Selected Projects</h2>
                    <p className="text-gray-400 mt-4 text-lg">Engineering solutions for complex technical challenges.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                <AnimatePresence mode="popLayout">
                    {projects.slice(0, visibleCount).map((project, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: (index % 3) * 0.1 }}
                            key={project.id}
                        >
                            <ProjectCard project={project} onClick={() => onOpenModal(project)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {visibleCount < projects.length && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={showMoreProjects}
                        className="group relative px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <span>View More Projects</span>
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-y-1">expand_more</span>
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProjectGrid;
