import { useEffect, useState } from 'react';
import CircuitBackground from './components/visuals/CircuitBackground';
import Band from './components/visuals/Band';
import ScrollWire from './components/visuals/ScrollWire';
import Pipeline from './components/visuals/Pipeline';
import { content } from './content';
import { useFinePointer, usePrefersReducedMotion, useSmoothScroll } from './lib/motion';
import TargetCursor from './components/reactbits/TargetCursor/TargetCursor';
import Preloader from './sections/Preloader';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Stack from './sections/Stack';
import Contact from './sections/Contact';

export default function App() {
  const { profile, stats, projects, experience, education, skills, links } = content;
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const [ready, setReady] = useState(false);

  useSmoothScroll(ready, reduced);

  // Com o cursor customizado ativo, o do sistema some em toda a página (links e botões inclusos).
  const customCursor = fine && !reduced;
  useEffect(() => {
    document.documentElement.classList.toggle('no-os-cursor', customCursor);
    return () => document.documentElement.classList.remove('no-os-cursor');
  }, [customCursor]);

  const found = links.find((l) => l.kind === 'github') ?? links[0];
  const github = { ...found, label: found.href.replace('https://', '') };

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Preloader name={profile.displayName} role={profile.role} reduced={reduced} onDone={() => setReady(true)} />
      <Header name={profile.displayName} />

      <CircuitBackground reduced={reduced} />

      <main id="conteudo">
        <div className="zone">
          <ScrollWire endSelector="#about-title" reduced={reduced} />
          <Hero profile={profile} ready={ready} reduced={reduced} fine={fine} />
          <Band rows={[['Banco de dados', 'API', 'Interface'], ['Automação', 'IA aplicada', 'Web e mobile']]} reduced={reduced} />
          <About profile={profile} stats={stats} reduced={reduced} />
        </div>
        <Pipeline reduced={reduced} />
        <Projects projects={projects} github={github} />
        <Journey experience={experience} education={education} reduced={reduced} />
        <Stack skills={skills} reduced={reduced} />
        <Contact profile={profile} reduced={reduced} fine={fine} />
      </main>

      {customCursor && (
        <TargetCursor targetSelector=".cursor-target" cursorColor="#f0a53a" hideDefaultCursor parallaxOn={false} />
      )}
    </>
  );
}
