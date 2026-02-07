import React from 'react';

const awardsData = [
    {
        title: "Blue Scholar",
        event: "2022 - Present",
        award: "100% Full Merit Scholarship",
        icon: "school"
    },
    {
        title: "Internal Pursuit",
        event: "July 2025",
        award: "Exemplary Performance",
        icon: "workspace_premium"
    },
    {
        title: "UI/UX Design Competition",
        event: "Dec 2024",
        award: "Champion",
        icon: "brush"
    },
    {
        title: "Networking Competition",
        event: "Dec 2024",
        award: "Champion",
        icon: "lan"
    },
    {
        title: "Best Web Game Design",
        event: "March 2024",
        award: "Sole Awardee",
        icon: "sports_esports"
    }
];

const Awards = () => {
    return (
        <section id="awards" className="section-gap overflow-hidden">
            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-12 text-left">Awards & Recognition</h2>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory custom-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                {awardsData.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-[280px] md:min-w-[320px] bg-white/5 p-8 rounded-[2rem] bento-shadow flex flex-col items-start gap-4 border border-white/5 group hover:bg-white/10 transition-colors snap-center flex-shrink-0"
                    >
                        <div className="size-16 bg-royal-blue/10 border border-royal-blue/20 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-royal-blue text-4xl">{item.icon}</span>
                        </div>
                        <div className="text-left">
                            <span className="text-royal-blue text-xs font-black uppercase tracking-widest block mb-2">{item.award}</span>
                            <h5 className="text-white font-black text-xl leading-tight">{item.title}</h5>
                            <p className="text-gray-500 font-bold text-sm mt-3">{item.event}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Awards;
