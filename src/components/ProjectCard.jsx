import React from 'react';

const ProjectCard = ({ project, onClick }) => {
    return (
        <div onClick={() => onClick(project)} className="group cursor-pointer">
            <div className="glass-card rounded-[2.5rem] p-8 bento-shadow h-full transition-all hover:border-royal-blue/50 border border-white/10 group-hover:scale-[1.02] duration-500">
                <div className="aspect-[4/3] bg-gray-900 rounded-3xl mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-6">
                        <span className="text-white font-black flex items-center gap-2">
                            View Project
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </span>
                    </div>
                    <img
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        src={project.image}
                    />
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-white font-black text-2xl tracking-tight">{project.title}</h4>
                        <span className="text-[10px] font-black text-royal-blue bg-royal-blue/10 px-3 py-1 rounded-full border border-royal-blue/20 uppercase tracking-widest text-left">
                            {project.year}
                        </span>
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed mb-6 text-left">{project.description}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest text-left">
                        {project.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg group-hover:border-royal-blue/30 group-hover:text-royal-blue transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
