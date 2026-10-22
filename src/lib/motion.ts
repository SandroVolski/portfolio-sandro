import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

/** Instância única do Lenis, usada também pelos links de navegação. */
let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
/** Telas largas com mouse: é onde ficam o pin horizontal e o cursor customizado. */
export const useIsDesktop = () => useMediaQuery('(min-width: 900px)');
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

/**
 * Rolagem suave com Lenis, ligada ao ScrollTrigger.
 * Fica parada enquanto `enabled` for falso (durante o preloader).
 */
export function useSmoothScroll(enabled: boolean, reduced: boolean) {
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (!enabled) lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    const lenis = lenisInstance;
    if (!lenis) return;
    if (enabled) {
      lenis.start();
      ScrollTrigger.refresh();
    } else {
      lenis.stop();
    }
  }, [enabled]);
}

/** Rola até uma âncora, usando o Lenis quando ele existe. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 3, easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export { gsap, ScrollTrigger, useGSAP };
