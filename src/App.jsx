import { useState } from 'react'
import SectionReveal from './components/SectionReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectGrid from './components/ProjectGrid'
import ProjectModal from './components/ProjectModal'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Education from './components/Education'
import Awards from './components/Awards'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background-dark font-display text-gray-200 min-h-screen antialiased">
      <div className="grain-texture"></div>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col items-center">
          <div className="w-full max-w-[1400px] px-6 py-8 md:px-12 lg:px-24 lg:py-16 flex flex-col">
            <Header />
            <main className="w-full space-y-24 md:space-y-32">
              <SectionReveal><Hero /></SectionReveal>
              <SectionReveal><ProjectGrid onOpenModal={openModal} /></SectionReveal>
              <SectionReveal><TechStack /></SectionReveal>
              <SectionReveal><Experience /></SectionReveal>
              <SectionReveal><Education /></SectionReveal>
              <SectionReveal><Awards /></SectionReveal>
              <SectionReveal><Contact /></SectionReveal>
            </main>
            <Footer />
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default App
